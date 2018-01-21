function log(type, params) {
  if (typeof window !== "undefined") {
    if (window.gtag) {
      window.gtag("event", type, params);
    }
  }
}

export function event(type, params) {
  log(type, params);
}

export function pageview() {
  log("page_view");
}
