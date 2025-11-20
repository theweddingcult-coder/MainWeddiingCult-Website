import { useEffect } from "react";

/**
 * Fires low-cost HEAD requests for each image so the CDN warms up
 * before the actual <img> elements request the bytes.
 */
export const useImageLinkWarmup = (urls: string[]) => {
  useEffect(() => {
    if (typeof window === "undefined" || urls.length === 0) return;

    const controller = new AbortController();

    urls.forEach((url) => {
      if (!url) return;
      fetch(url, {
        method: "HEAD",
        mode: "no-cors",
        cache: "force-cache",
        keepalive: true,
        signal: controller.signal,
      }).catch(() => {
        // Suppress network errors; actual <img> tag will handle retries.
      });
    });

    return () => {
      controller.abort();
    };
  }, [urls.join("|")]);
};

export default useImageLinkWarmup;

