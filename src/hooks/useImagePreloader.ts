import { useEffect } from "react";

type UseImagePreloaderOptions = {
  /**
   * How many URLs should be treated as high priority.
   * These are flushed immediately before the rest of the queue.
   */
  priorityCount?: number;
  /**
   * Delay between loading low-priority images (in ms).
   * Helps keep the queue in the background without blocking main thread.
   */
  throttleMs?: number;
};

const loadedImages = new Set<string>();

/**
 * Starts downloading images in the background so they're ready
 * by the time the user reaches the portfolio grid.
 */
export const useImagePreloader = (
  urls: string[],
  { priorityCount = 8, throttleMs = 75 }: UseImagePreloaderOptions = {}
) => {
  useEffect(() => {
    if (typeof window === "undefined" || urls.length === 0) return;

    const uniqueQueue = Array.from(new Set(urls.filter(Boolean))).filter(
      (url) => !loadedImages.has(url)
    );

    if (uniqueQueue.length === 0) return;

    let cancelled = false;
    let timer: number | null = null;
    let pointer = 0;

    const scheduleNext = (delay: number) => {
      if (cancelled || pointer >= uniqueQueue.length) return;
      timer = window.setTimeout(runQueue, delay);
    };

    const runQueue = () => {
      if (cancelled || pointer >= uniqueQueue.length) return;

      const url = uniqueQueue[pointer];
      const priority: "high" | "low" = pointer < priorityCount ? "high" : "low";
      pointer += 1;

      const image = new Image();
      image.decoding = "async";
      image.loading = priority === "high" ? "eager" : "lazy";

      try {
        image.fetchPriority = priority;
      } catch {
        // Some browsers haven't implemented fetchPriority on Image.
      }

      const finalize = () => {
        loadedImages.add(url);
        scheduleNext(priority === "high" ? 10 : throttleMs);
      };

      image.onload = finalize;
      image.onerror = finalize;
      image.src = url;
    };

    runQueue();

    return () => {
      cancelled = true;
      if (timer !== null) {
        window.clearTimeout(timer);
      }
    };
  }, [urls.join("|"), priorityCount, throttleMs]);
};

export default useImagePreloader;

