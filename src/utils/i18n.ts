export type SiteLocale = "zh-CN" | "en-US";

export const DEFAULT_LOCALE: SiteLocale = "zh-CN";

export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function detectLocaleFromPath(pathname: string): SiteLocale {
  return isEnglishPath(pathname) ? "en-US" : "zh-CN";
}

export function localePrefix(locale: SiteLocale): string {
  return locale === "en-US" ? "/en" : "";
}

export function switchPathLocale(pathname: string, locale: SiteLocale): string {
  if (locale === "en-US") {
    if (isEnglishPath(pathname)) return pathname;
    return pathname === "/" ? "/en/" : `/en${pathname}`;
  }

  if (!isEnglishPath(pathname)) return pathname;
  const stripped = pathname.replace(/^\/en(?=\/|$)/, "");
  return stripped || "/";
}

export function withLocalePrefix(path: string, locale: SiteLocale): string {
  const prefix = localePrefix(locale);
  if (!prefix) return path;
  if (path === "/") return "/en/";
  return `${prefix}${path}`;
}
