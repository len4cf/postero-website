import type { MouseEvent } from "react";
import { chapters, type ChapterId } from "../../data/entenda";
import { cn } from "../../lib/cn";

type Props = { active: ChapterId | null; onNavigate: (id: ChapterId) => void };

export function ChapterNav({ active, onNavigate }: Props) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: ChapterId) => {
    event.preventDefault();
    onNavigate(id);
  };

  return (
    <nav aria-label="Capítulos" className="sticky top-[120px] hidden self-start pt-[120px] min-[1000px]:block">
      <ol className="m-0 list-none p-0">
        {chapters.map((chapter) => {
          const isActive = chapter.id === active;
          return (
            <li key={chapter.id} className="relative">
              <span
                aria-hidden
                className={cn(
                  "absolute top-0 bottom-0 left-0 w-px origin-top bg-accent transition-transform duration-700 ease-out-soft",
                  isActive ? "scale-y-100" : "scale-y-0",
                )}
              />
              <a
                href={`#${chapter.id}`}
                onClick={(e) => handleClick(e, chapter.id)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "grid grid-cols-[32px_minmax(0,1fr)] gap-2 border-l border-line-strong py-2.5 pl-4 text-[13px] leading-[18px] no-underline transition-colors duration-300 hover:text-heading",
                  isActive ? "text-heading" : "text-dim",
                )}
              >
                <span className="font-display text-accent">{chapter.numeral}</span>
                <span>{chapter.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
