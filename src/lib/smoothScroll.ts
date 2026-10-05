import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  const instance = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.9,
    prevent: (node) => node.hasAttribute?.("data-own-scroll"),
  });
  lenis = instance;

  const raf = (time: number) => instance.raf(time * 1000);
  instance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute("href")!;
    if (!document.querySelector(hash === "#" ? "body" : hash)) return;
    event.preventDefault();
    scrollToHash(hash);
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(raf);
    instance.destroy();
    lenis = null;
  };
}

export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  history.pushState(null, "", hash);
  const focus = () => {
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, onComplete: focus });
  } else {
    target.scrollIntoView();
    focus();
  }
}

export function setSmoothScrollPaused(paused: boolean) {
  if (paused) lenis?.stop();
  else lenis?.start();
}
