import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

export default function rehypeEcharts() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (!parent || index === undefined || node.tagName !== "pre") {
        return;
      }

      const code = node.children?.find(
        (child) => child.type === "element" && child.tagName === "code",
      );
      if (!code) {
        return;
      }

      const classNames = Array.isArray(code.properties?.className)
        ? code.properties.className
        : [];

      if (!classNames.includes("language-echarts")) {
        return;
      }

      const source = toString(code).trim();

      try {
        const option = JSON.parse(source);

        parent.children[index] = {
          type: "element",
          tagName: "div",
          properties: {
            className: ["chart-frame"],
            "data-echarts-option": JSON.stringify(option),
          },
          children: [],
        };
      } catch {
        parent.children[index] = {
          type: "element",
          tagName: "pre",
          properties: {
            className: ["chart-error"],
          },
          children: [
            {
              type: "text",
              value:
                "Invalid echarts block. Expected valid JSON option object in ```echarts.",
            },
          ],
        };
      }
    });
  };
}

