import { motion, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import logo from "../../assets/images/postero-logo.webp";
import { useDialogLock } from "../../hooks/useDialogLock";
import { useOwnScroll } from "../../hooks/useOwnScroll";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { ScrollContainerContext } from "../motion/ScrollContainer";
import { Container } from "../ui/Container";
import { PillButton } from "../ui/PillButton";
import { SheetContext, type CloseIntent, type SheetApi } from "./sheetContext";

const SHEET_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const OUT_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = 1100;
const BEHIND_SHIFT = "-14vh";
const HEADER_CLEARANCE = 96;

type Props = {
  labelledBy: string;
  onClosed: (intent: CloseIntent) => void;
  children: ReactNode;
};

export function SheetPage({ labelledBy, onClosed, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({ container: scrollerRef });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useDialogLock(closeRef);
  const { scrollToId } = useOwnScroll(scrollerRef, contentRef, HEADER_CLEARANCE);

  useLayoutEffect(() => {
    const behind = document.querySelector("main");

    const animations: Animation[] = [];
    if (!reducedMotion) {
      const sheet = { duration: DURATION, easing: SHEET_EASE, fill: "both" } as const;
      animations.push(
        rootRef.current!.animate([{ transform: "translateY(100%)" }, { transform: "none" }], sheet),
        shadeRef.current!.animate([{ opacity: 0 }, { opacity: 1 }], sheet),
        contentRef.current!.animate([{ transform: "translateY(32vh)" }, { transform: "none" }], {
          duration: DURATION + 500,
          easing: OUT_EASE,
          fill: "both",
        }),
        chromeRef.current!.animate(
          [
            { opacity: 0, transform: "translateY(-12px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 700, delay: DURATION - 300, easing: OUT_EASE, fill: "both" },
        ),
      );
      if (behind) animations.push(behind.animate([{ transform: "none" }, { transform: `translateY(${BEHIND_SHIFT})` }], sheet));
    }

    return () => animations.forEach((a) => a.cancel());
  }, [reducedMotion]);

  const close = useCallback(
    async (intent: CloseIntent = "back") => {
      if (closing.current) return;
      closing.current = true;

      if (!reducedMotion) {
        const behind = document.querySelector("main");
        const sheet = { duration: DURATION - 100, easing: SHEET_EASE, fill: "both" } as const;
        const layers = [
          rootRef.current!.animate([{ transform: "none" }, { transform: "translateY(100%)" }], sheet),
          shadeRef.current!.animate([{ opacity: 1 }, { opacity: 0 }], sheet),
          contentRef.current!.animate([{ transform: "none" }, { transform: "translateY(-24vh)" }], sheet),
          ...(behind ? [behind.animate([{ transform: `translateY(${BEHIND_SHIFT})` }, { transform: "none" }], sheet)] : []),
        ];
        await Promise.all(layers.map((a) => a.finished));
        layers.forEach((a) => a.cancel());
      }

      onClosed(intent);
    },
    [reducedMotion, onClosed],
  );

  const api = useMemo<SheetApi>(() => ({ close, scrollToId }), [close, scrollToId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return createPortal(
    <>
      <div ref={shadeRef} aria-hidden className="fixed inset-0 z-50 bg-black/60" />
      <div
        ref={rootRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="fixed inset-0 z-50 bg-background text-foreground shadow-[0_-24px_80px_rgb(0_0_0/0.45)]"
      >
        <ScrollContainerContext.Provider value={scrollerRef}>
          <div ref={scrollerRef} data-own-scroll className="absolute inset-0 overflow-y-auto overscroll-contain">
            <div ref={contentRef}>
              <header ref={chromeRef} className="sticky top-0 z-10 border-b border-line bg-background/85 backdrop-blur-md">
                <Container className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center md:h-[88px]">
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => close()}
                    className="group flex min-h-11 cursor-pointer items-center gap-3 justify-self-start border-0 bg-transparent p-0 font-sans text-label tracking-label text-muted uppercase transition-colors duration-300 hover:text-heading"
                  >
                    <span aria-hidden className="transition-transform duration-500 ease-out-soft group-hover:-translate-x-1">
                      ←
                    </span>
                    Voltar
                  </button>
                  <img src={logo} alt="Postero" width={272} height={56} className="brand-art block h-5 w-auto md:h-[24px]" />
                  <PillButton onClick={() => close("schedule")} className="justify-self-end max-sm:hidden">
                    Agendar conversa
                  </PillButton>
                </Container>
                <motion.div aria-hidden className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent" style={{ scaleX: progress }} />
              </header>

              <SheetContext.Provider value={api}>{children}</SheetContext.Provider>
            </div>
          </div>
        </ScrollContainerContext.Provider>
      </div>
    </>,
    document.body,
  );
}
