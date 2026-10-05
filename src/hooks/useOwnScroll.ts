import Lenis from "lenis";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useOwnScroll(
  scrollerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  clearance = 0,
) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      wrapper: scrollerRef.current!,
      content: contentRef.current!,
      lerp: 0.1,
      wheelMultiplier: 0.9,
      autoRaf: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced, scrollerRef, contentRef]);

  const scrollToId = useCallback(
    (id: string) => {
      const scroller = scrollerRef.current;
      const target = scroller?.querySelector<HTMLElement>(`#${id}`);
      if (!scroller || !target) return;
      const top = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - clearance;
      if (lenisRef.current) lenisRef.current.scrollTo(top, { duration: 1.4 });
      else scroller.scrollTo({ top });
    },
    [scrollerRef, clearance],
  );

  return { scrollToId };
}
