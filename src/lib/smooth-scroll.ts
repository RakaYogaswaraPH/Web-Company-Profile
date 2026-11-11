export function smoothScrollTo(targetHref: string) {
  if (typeof window === "undefined") return;

  const targetId = targetHref.replace(/^#/, "");
  const targetEl = document.getElementById(targetId);

  if (targetEl) {
    targetEl.scrollIntoView({ behavior: "smooth" });
    // Keep URL clean without # anchor
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  } else if (window.location.pathname !== "/") {
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/";
  }
}
