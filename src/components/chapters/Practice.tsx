import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, useState, type PointerEvent } from "react";
import { chapter, services, servicesIntro } from "../../data/content";
import { photos } from "../../data/photos";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useMotionMode } from "../../hooks/useMotionMode";
import { EASE } from "../../lib/motion";
import { cn } from "../../lib/cn";
import { ParallaxColumn } from "../motion/ParallaxColumn";
import { ParallaxImage } from "../motion/ParallaxImage";
import { Accent, RevealText } from "../motion/RevealText";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

const { numeral } = chapter("atuacao");

function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
      <ParallaxColumn
        progress={scrollYProgress}
        distance={80}
        className="flex flex-col gap-3 md:gap-6"
      >
        <ParallaxImage {...photos.plateia} ratio="4 / 5" />
        <ParallaxImage {...photos.humberto} ratio="3 / 4" />
      </ParallaxColumn>
      <ParallaxColumn
        progress={scrollYProgress}
        distance={260}
        className="flex flex-col gap-3 pt-16 md:gap-6 md:pt-32"
      >
        <ParallaxImage {...photos.trilhas} ratio="4 / 3" />
        <ParallaxImage {...photos.conversa} ratio="4 / 5" />
      </ParallaxColumn>
      <ParallaxColumn
        progress={scrollYProgress}
        distance={140}
        className="col-span-2 grid grid-cols-2 gap-3 md:col-span-1 md:flex md:flex-col md:gap-6"
      >
        <ParallaxImage {...photos.mesa} ratio="1 / 1" />
        <ParallaxImage {...photos.apresentacao} ratio="4 / 5" />
      </ParallaxColumn>
    </div>
  );
}

function ServiceList() {
  const [active, setActive] = useState<number | null>(null);
  const [inside, setInside] = useState(false);
  const { reduced } = useMotionMode();
  const finePointer = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (min-width: 900px)",
  );
  const showLens = finePointer && !reduced;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lensX = useSpring(x, { stiffness: 900, damping: 50 });
  const lensY = useSpring(y, { stiffness: 900, damping: 50 });

  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - box.left);
    y.set(e.clientY - box.top);
  };

  return (
    <ul
      className={cn("relative m-0 list-none border-b border-line-strong p-0", showLens && "cursor-none")}
      onPointerMove={showLens ? onMove : undefined}
      onPointerEnter={() => setInside(true)}
      onPointerLeave={() => {
        setActive(null);
        setInside(false);
      }}
    >
      {services.map((service, i) => (
        <motion.li
          key={service.title}
          onPointerEnter={() => setActive(i)}
          className="group relative grid grid-cols-[48px_1fr] gap-x-4 gap-y-3 border-t border-line-strong py-8 md:grid-cols-[96px_minmax(0,7fr)_minmax(0,4fr)] md:items-center md:gap-x-10 md:py-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
        >
          <span
            aria-hidden
            className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-soft group-hover:scale-x-100"
          />
          <span
            aria-hidden
            className="font-display text-2xl text-accent md:text-[32px]"
          >
            {service.numeral}
          </span>
          <h3 className="display m-0 text-[32px] leading-none transition-transform duration-700 ease-out-soft group-hover:translate-x-3 md:text-[clamp(40px,4.6vw,68px)]">
            {service.title}
          </h3>
          <p className="col-start-2 m-0 max-w-[360px] text-base text-muted md:col-start-3 md:text-[17px]">
            {service.description}
          </p>
        </motion.li>
      ))}


      {showLens &&
        ["bg-lens mix-blend-multiply", "border border-accent-line"].map((look) => (
          <motion.div
            key={look}
            aria-hidden
            className={cn("pointer-events-none absolute top-0 left-0 z-20 size-28 rounded-full", look)}
            style={{ x: lensX, y: lensY, translateX: "-50%", translateY: "-50%" }}
            initial={false}
            animate={{ scale: inside ? (active !== null ? 1.35 : 1) : 0, opacity: inside ? 1 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        ))}
    </ul>
  );
}

export function Practice() {
  return (
    <section
      id="atuacao"
      aria-labelledby="atuacao-title"
      className="border-t border-line"
    >
      <Container className="flex flex-col gap-16 py-24 md:gap-28 md:py-40">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <div className="flex flex-col gap-10 md:col-span-8">
            <Eyebrow numeral={numeral}>{servicesIntro.eyebrow}</Eyebrow>
            <RevealText
              id="atuacao-title"
              className="display text-[clamp(44px,11vw,64px)] md:text-[clamp(64px,7vw,108px)]"
              lines={["Como atuo", <Accent key="m">nas empresas</Accent>]}
            />
          </div>
          <p className="m-0 text-lg text-muted md:col-span-4">
            {servicesIntro.lead}
          </p>
        </div>
        <Gallery />
        <ServiceList />
      </Container>
    </section>
  );
}
