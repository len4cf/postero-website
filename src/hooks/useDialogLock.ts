import { useLayoutEffect, type RefObject } from "react";

export function useDialogLock(focusRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const appRoot = document.getElementById("root");
    html.style.overflow = "hidden";
    html.style.scrollbarGutter = "stable";
    if (appRoot) appRoot.inert = true;
    focusRef.current?.focus({ preventScroll: true });
    return () => {
      html.style.overflow = "";
      html.style.scrollbarGutter = "";
      if (appRoot) appRoot.inert = false;
    };
  }, [focusRef]);
}
