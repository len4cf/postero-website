import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import logo from "../../assets/images/postero-logo.webp";
import { chapters, type ChapterKey } from "../../data/content";
import { EASE } from "../../lib/motion";
import { cn } from "../../lib/cn";
import { Container } from "../ui/Container";
import { PillLink } from "../ui/PillButton";
import { ThemeToggle } from "../ui/ThemeToggle";

const slot = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
};

export function Header({ active }: { active: ChapterKey | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const current = chapters.find((c) => c.id === active);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.6 }}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 border-b border-line bg-background/85 backdrop-blur-md transition-opacity duration-500",
          scrolled || open ? "opacity-100" : "opacity-0",
        )}
      />
      <Container className="relative grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-4 md:h-[88px]">
        <a href="#topo" aria-label="Postero, início" className="flex shrink-0 items-center">
          <img src={logo} alt="Postero" width={272} height={56} className="brand-art block h-5 w-auto max-w-none md:h-[24px]" />
        </a>

        <div className="relative flex min-w-0 justify-center">
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
            className="group flex min-h-11 min-w-0 cursor-pointer items-center gap-3 border-0 bg-transparent px-2 text-label tracking-label text-muted uppercase transition-colors duration-300 hover:text-heading"
          >
            <span className="sr-only">Capítulos{current ? `, atual: ${current.numeral} ${current.label}` : ""}</span>
            <span aria-hidden className="relative block h-4 min-w-0 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={current?.id ?? "inicio"}
                  className="block truncate"
                  {...slot}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {current ? (
                    <>
                      <span className="font-display text-[13px] tracking-normal text-accent normal-case">{current.numeral}</span>
                      <span className="mx-2 text-dim">—</span>
                      {current.label}
                    </>
                  ) : (
                    "Capítulos"
                  )}
                </motion.span>
              </AnimatePresence>
            </span>
            <svg
              aria-hidden
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className={cn("shrink-0 transition-transform duration-500 ease-out-soft", open && "rotate-180")}
            >
              <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                ref={menuRef}
                id={menuId}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute top-full mt-3 w-[min(320px,calc(100vw-40px))] border border-line-strong bg-background p-2 shadow-2xl"
              >
                <nav aria-label="Capítulos">
                  <ol className="m-0 list-none p-0">
                    {chapters.map((c) => (
                      <li key={c.id}>
                        <a
                          href={`#${c.id}`}
                          onClick={() => setOpen(false)}
                          aria-current={c.id === active ? "location" : undefined}
                          className="group grid min-h-11 grid-cols-[44px_1fr] items-center px-3 text-sm text-muted no-underline transition-colors duration-300 hover:bg-surface hover:text-heading aria-[current]:text-heading"
                        >
                          <span className="font-display text-accent">{c.numeral}</span>
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
                <div className="mt-2 border-t border-line p-2 pt-4 md:hidden">
                  <PillLink href="#contato" onClick={() => setOpen(false)} className="w-full justify-center">
                    Agendar conversa
                  </PillLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden md:block">
            <PillLink href="#contato">Agendar conversa</PillLink>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
