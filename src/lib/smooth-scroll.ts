export function smoothScrollTo(targetHref: string) {
  if (typeof window === "undefined") return;

  const targetId = targetHref.replace(/^#/, "");
  let targetEl = document.getElementById(targetId);

  // Fallback alias resolution
  if (!targetEl) {
    if (targetId === "tentang" || targetId === "tentang-kami") {
      targetEl =
        document.getElementById("tentang-kami") ||
        document.getElementById("tentang");
    }
  }

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
