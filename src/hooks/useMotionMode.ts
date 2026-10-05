import { useMediaQuery } from "./useMediaQuery";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useMotionMode() {
  const reduced = usePrefersReducedMotion();
  const desktop = useMediaQuery("(min-width: 900px)");
  return { reduced, desktop, rich: desktop && !reduced };
}
