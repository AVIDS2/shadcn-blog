import { visit } from "unist-util-visit";

export default function remarkEcharts() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || index === undefined || node.lang !== "echarts") {
        return;
      }

      const source = (node.value ?? "").trim();

      try {
        const option = JSON.parse(source);
        const encoded = encodeURIComponent(JSON.stringify(option));
        parent.children[index] = {
          type: "html",
          value: `<div class="chart-frame" data-echarts-option="${encoded}"></div>`,
        };
      } catch {
        parent.children[index] = {
          type: "html",
          value:
            '<pre class="chart-error">Invalid echarts block. Expected valid JSON option object in ```echarts.</pre>',
        };
      }
    });
  };
}
