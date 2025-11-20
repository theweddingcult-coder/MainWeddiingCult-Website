import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PhaseKey = "welcome" | "to" | "logo" | "slideshow";

type PhaseDefinition = {
  key: PhaseKey;
  enter: number;
  hold: number;
  exit: number;
};

const PHASES: PhaseDefinition[] = [
  { key: "welcome", enter: 300, hold: 400, exit: 250 },
  { key: "to", enter: 250, hold: 350, exit: 250 },
  { key: "logo", enter: 350, hold: 1500, exit: 300 },
  { key: "slideshow", enter: 150, hold: 1100, exit: 250 },
];

const OVERLAY_FADE_OUT = 550;
const SLIDESHOW_FRAME = 240;

export type WelcomeScreenProps = {
  logoSrc: string;
  logoAlt: string;
  slideshowImages: string[];
  onFinish?: () => void;
};

export const WelcomeScreen = ({
  logoSrc,
  logoAlt,
  slideshowImages,
  onFinish,
}: WelcomeScreenProps) => {
  const [currentPhase, setCurrentPhase] = useState<PhaseKey | null>(null);
  const [phaseVisible, setPhaseVisible] = useState(false);
  const [overlayState, setOverlayState] = useState<"visible" | "fading" | "hidden">("visible");
  const [slideshowActive, setSlideshowActive] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const bodyOverflowRef = useRef<string | null>(null);
  const hasStartedRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);
  const intervalsRef = useRef<number[]>([]);
  const scrollRestorationRef = useRef<History["scrollRestoration"]>();

  const prefersReducedMotion = usePrefersReducedMotion();
  const hasSlides = slideshowImages.length > 0;

  const effectiveSlideIndex = useMemo(() => {
    if (hasSlides) return slideIndex % slideshowImages.length;
    return 0;
  }, [hasSlides, slideIndex, slideshowImages.length]);

  const slideshowDuration = useMemo(() => {
    if (!hasSlides || prefersReducedMotion) {
      return 600;
    }
    const visibleFrames = Math.max(slideshowImages.length, 4);
    return visibleFrames * SLIDESHOW_FRAME + 1200;
  }, [hasSlides, prefersReducedMotion, slideshowImages.length]);

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    intervalsRef.current.forEach((id) => window.clearInterval(id));
    timeoutsRef.current = [];
    intervalsRef.current = [];
  }, []);

  const finalizeSequence = useCallback(() => {
    setOverlayState("fading");
    const finishTimer = window.setTimeout(() => {
      setOverlayState("hidden");
      onFinish?.();
    }, OVERLAY_FADE_OUT);
    timeoutsRef.current.push(finishTimer);
  }, [onFinish]);

  const playPhase = useCallback(
    (index: number) => {
      if (index >= PHASES.length) {
        finalizeSequence();
        return;
      }

      const phase = PHASES[index];
      setCurrentPhase(phase.key);
      setPhaseVisible(true);

      if (phase.key === "slideshow") {
        if (prefersReducedMotion) {
          setSlideIndex(Math.max(slideshowImages.length - 1, 0));
        } else if (hasSlides && slideshowImages.length > 1) {
          setSlideshowActive(true);
        }
      } else {
        setSlideshowActive(false);
      }

      const phaseHold = phase.key === "slideshow" ? slideshowDuration : phase.hold;

      const hideTimer = window.setTimeout(() => {
        setPhaseVisible(false);
      }, phase.enter + phaseHold);

      const nextTimer = window.setTimeout(() => {
        playPhase(index + 1);
      }, phase.enter + phaseHold + phase.exit);

      timeoutsRef.current.push(hideTimer, nextTimer);
    },
    [finalizeSequence, hasSlides, prefersReducedMotion, slideshowDuration, slideshowImages]
  );

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const kickOffTimer = window.setTimeout(() => {
      playPhase(0);
    }, 120);

    timeoutsRef.current.push(kickOffTimer);

    return () => {
      clearTimers();
    };
  }, [playPhase, clearTimers]);

  useEffect(() => {
    if (!slideshowActive || prefersReducedMotion || !hasSlides) return;

    const frameTimer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, SLIDESHOW_FRAME);

    const stopTimer = window.setTimeout(() => {
      window.clearInterval(frameTimer);
      setSlideshowActive(false);
    }, slideshowDuration);

    intervalsRef.current.push(frameTimer);
    timeoutsRef.current.push(stopTimer);

    return () => {
      window.clearInterval(frameTimer);
      window.clearTimeout(stopTimer);
    };
  }, [slideshowActive, prefersReducedMotion, hasSlides, slideshowImages.length, slideshowDuration]);

  const overlayHidden = overlayState === "hidden";

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;

    const restoreScrollRestoration = () => {
      if (typeof window === "undefined") return;
      if (scrollRestorationRef.current !== undefined) {
        window.history.scrollRestoration = scrollRestorationRef.current;
        scrollRestorationRef.current = undefined;
      }
    };

    if (!overlayHidden) {
      if (bodyOverflowRef.current === null) {
        bodyOverflowRef.current = body.style.overflow || "";
      }
      body.style.overflow = "hidden";
      body.classList.add("overscroll-none");

      if (typeof window !== "undefined") {
        if (scrollRestorationRef.current === undefined) {
          scrollRestorationRef.current = window.history.scrollRestoration ?? "auto";
        }
        try {
          window.history.scrollRestoration = "manual";
        } catch {
          // Some browsers don't allow programmatic scrollRestoration changes.
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    } else {
      if (bodyOverflowRef.current !== null) {
        body.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      } else {
        body.style.removeProperty("overflow");
      }
      body.classList.remove("overscroll-none");
      restoreScrollRestoration();
    }

    return () => {
      if (bodyOverflowRef.current !== null) {
        body.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      } else {
        body.style.removeProperty("overflow");
      }
      body.classList.remove("overscroll-none");
      restoreScrollRestoration();
    };
  }, [overlayHidden]);

  if (overlayHidden) {
    return null;
  }

  const transitionClass = prefersReducedMotion
    ? "transition-none"
    : "transition-all duration-300 ease-[cubic-bezier(0.22,0.9,0.34,1)]";

  const isSlideshowZooming = currentPhase === "slideshow" && phaseVisible;

  return (
    <div
      aria-hidden={!overlayHidden}
      className={[
        "fixed inset-0 z-[999] flex min-h-screen w-full items-center justify-center",
        "bg-gradient-to-br from-maroon/95 via-[#1f1d1b]/90 to-[#2b1812]/95",
        "backdrop-blur-[3px] text-ivory pointer-events-none overscroll-none",
        "grain-texture overflow-hidden",
        transitionClass,
        overlayState === "fading" ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="relative flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
        {currentPhase && currentPhase !== "slideshow" && (
          <div
            className={[
              "text-3xl sm:text-4xl md:text-6xl tracking-[0.3em] sm:tracking-[0.35em] uppercase font-heading",
              "text-ivory/90 drop-shadow-lg leading-tight",
              "transform",
              transitionClass,
              phaseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{
              transitionDuration: prefersReducedMotion ? "0ms" : `${getPhaseEnterDuration(currentPhase)}ms`,
              transitionTimingFunction: "cubic-bezier(0.22, 0.9, 0.34, 1)",
            }}
          >
            {currentPhase === "welcome" && "WELCOME"}
            {currentPhase === "to" && "TO"}
            {currentPhase === "logo" && (
              <img
                src={logoSrc}
                alt={logoAlt}
                className={[
                  "mx-auto h-80 w-auto sm:h-84 md:h-88",
                  "object-contain",
                  prefersReducedMotion ? "" : "scale-150",
                ].join(" ")}
                style={{
                  transform: prefersReducedMotion ? "scale(1.05)" : "scale(1.2)",
                  transformOrigin: "center",
                }}
              />
            )}
          </div>
        )}

        {currentPhase === "slideshow" && (
          <div
            className={[
              "relative aspect-square",
              "overflow-hidden rounded-2xl",
              "shadow-2xl border border-ivory/10",
              transitionClass,
              phaseVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
            ].join(" ")}
            style={{
              transitionDuration: prefersReducedMotion ? "0ms" : `${getPhaseEnterDuration("slideshow")}ms`,
              transitionTimingFunction: "cubic-bezier(0.22, 0.9, 0.34, 1)",
              width:
                isSlideshowZooming
                  ? "min(420px, 70vw)"
                  : "min(360px, 65vw)",
              height:
                isSlideshowZooming
                  ? "min(420px, 70vw)"
                  : "min(360px, 65vw)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-maroon/40 via-transparent to-black/50" />
            {hasSlides ? (
              slideshowImages.map((src, idx) => (
                <img
                  key={src + idx}
                  src={src}
                  alt={`Welcome slideshow frame ${idx + 1}`}
                  className={[
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover",
                    "will-change-[opacity,width,height]",
                    prefersReducedMotion
                      ? idx === effectiveSlideIndex
                        ? "opacity-100"
                        : "opacity-0"
                      : idx === effectiveSlideIndex
                        ? "opacity-100"
                        : "opacity-0",
                    prefersReducedMotion
                      ? "transition-none"
                      : "transition-[opacity,width,height] duration-[320ms] ease-[cubic-bezier(0.22,0.9,0.34,1)]",
                  ].join(" ")}
                  style={{
                    width: prefersReducedMotion ? "100%" : idx === effectiveSlideIndex ? "135%" : "100%",
                    height: prefersReducedMotion ? "100%" : idx === effectiveSlideIndex ? "135%" : "100%",
                    maxWidth: "none",
                    maxHeight: "none",
                  }}
                />
              ))
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-900/70 text-sm uppercase tracking-[0.3em] text-ivory/30">
                IMAGERY
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const getPhaseEnterDuration = (phase: PhaseKey) => {
  const found = PHASES.find((item) => item.key === phase);
  return found?.enter ?? 300;
};

const usePrefersReducedMotion = () => {
  const [preferred, setPreferred] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setPreferred(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return preferred;
};

export default WelcomeScreen;

