import { Fragment } from "react";
import symbol from "../../assets/images/postero-symbol.webp";
import { Marquee } from "../motion/Marquee";

type Separator = "diamond" | "symbol";

type Props = {
  phrases: string[];
  echo?: string[];
  separator?: Separator;
};

function Mark({ separator }: { separator: Separator }) {
  if (separator === "symbol") {
    return (
      <img
        src={symbol}
        alt=""
        width={121}
        height={144}
        loading="lazy"
        className="brand-art mx-[0.4em] inline-block h-[0.62em] w-auto align-middle"
      />
    );
  }
  return <span className="mx-[0.35em] inline-block size-[0.14em] rotate-45 bg-accent align-middle" />;
}

function Band({ phrases, outline, separator }: { phrases: string[]; outline?: boolean; separator: Separator }) {
  return (
    <>
      {phrases.map((phrase, i) => (
        <Fragment key={i}>
          <span className={outline ? "text-outline" : undefined}>{phrase}</span>
          <Mark separator={separator} />
        </Fragment>
      ))}
    </>
  );
}

export function Interlude({ phrases, echo, separator = "diamond" }: Props) {
  return (
    <div className="flex flex-col gap-2 overflow-hidden border-y border-line py-14 md:py-24">
      <Marquee speed={-3} className="display text-[clamp(56px,10vw,152px)] leading-[1.05]">
        <Band phrases={phrases} separator={separator} />
      </Marquee>
      {echo && (
        <Marquee speed={2.4} className="display text-[clamp(56px,10vw,152px)] leading-[1.05]">
          <Band phrases={echo} outline separator={separator} />
        </Marquee>
      )}
    </div>
  );
}
