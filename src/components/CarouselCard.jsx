import React, { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap from "@/lib/gsap";

const CARD_W = 300;
const CARD_H = 380;
const SCALE = 1.35;

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);

  const onEnter = () => {
    onHoverStart?.();

    gsap.to(cardRef.current, {
      height: CARD_H * SCALE,
      width: CARD_W * SCALE,
      duration: 0.45,
      ease: "power3.out",
    });

    numberRef.current?.play();
    titleRef.current?.play();
  };

  const onLeave = () => {
    onHoverEnd?.();

    gsap.to(cardRef.current, {
      height: CARD_H,
      width: CARD_W,
      duration: 0.25,
      ease: "power3.out",
    });

    numberRef.current?.reverse();
    titleRef.current?.reverse();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        height: CARD_H,
        width: CARD_W,
        overflow: "visible",
        flexShrink: 0,
        cursor: "pointer",
      }}
      className="relative"
    >
      {/* Title Panel */}

      <div
        style={{ bottom: "calc(100% + 2.5rem)" }}
        className="titlePanel absolute left-0 pointer-events-none flex flex-col gap-4"
      >
        <TextReveal ref={numberRef} trigger="mannual" splitBy="chars">
          <h3 className="text-xl font-bold font-mono">{project.number}</h3>
        </TextReveal>

        <TextReveal ref={titleRef} trigger="mannual" splitBy="words">
          <h2 className="text-xl italic font-mono">{project.title}</h2>
        </TextReveal>

        <div className="imageDiv size-full overflow-hidden">
          <img
            ref={imgRef}
            src={project.coverImage}
            alt="coverImage"
            style={{ transformOrigin: "center center", userSelect: "none" }}
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
