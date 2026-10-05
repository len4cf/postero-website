import { useEffect, useState } from "react";

export function useActiveChapter(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = [...ids].reverse().find((id) => visible.has(id));
        if (current) return setActive(current);
        const first = document.getElementById(ids[0]);
        if (first && first.getBoundingClientRect().top > window.innerHeight / 2) setActive(null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  return active;
}
