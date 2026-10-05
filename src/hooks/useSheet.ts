import { useEffect, useRef, useState } from "react";
import type { CloseIntent } from "../components/sheet/sheetContext";
import { scrollToHash, setSmoothScrollPaused } from "../lib/smoothScroll";

export function useSheet() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const afterClose = useRef<CloseIntent | null>(null);

  const show = () => {
    setSmoothScrollPaused(true);
    setOpen(true);
  };

  const onClosed = (intent: CloseIntent) => {
    afterClose.current = intent;
    setOpen(false);
  };

  useEffect(() => {
    if (open || !afterClose.current) return;
    const intent = afterClose.current;
    afterClose.current = null;
    setSmoothScrollPaused(false);
    triggerRef.current?.focus({ preventScroll: true });
    if (intent === "schedule") scrollToHash("#contato");
  }, [open]);

  return { open, show, onClosed, triggerRef };
}
