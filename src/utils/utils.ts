export function parseHtml(html: string): string {
  return (
    new DOMParser().parseFromString(html, "text/html").documentElement
      .textContent || ""
  );
}
