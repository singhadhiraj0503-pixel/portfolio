"use client";

import React, { useEffect, useRef } from "react";
import CarouselCard from "./CarouselCard";
import gsap from "@/lib/gsap";

const CARD_W = 200;
const CARD_H = 280;
const SCALE = 1.35;
const CARD_GAP = 10;
const DURATION = 15;
const TRACK_H = CARD_H * SCALE;

const InfiniteCarousel = ({ projects }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const singleWidth = projects.length * (CARD_W + CARD_GAP);

    tweenRef.current = gsap.to(trackRef.current, {
      x: -singleWidth,
      ease: "none",
      duration: DURATION,
      repeat: -1,
    });

    return () => tweenRef.current?.kill();
  }, [projects]);

  const double = [...projects, ...projects];

  return (
    <div
      style={{ padding: `${TRACK_H * 0.35}px 0 24px` }}
      className="overflow-hidden "
    >
      <div
        ref={trackRef}
        style={{
          gap: `${CARD_GAP}px`,
          width: "max-content",
          height: `${TRACK_H}px`,
        }}
        className="track flex items-center"
      >
        {double.map((project, i) => {
          return (
            <CarouselCard
              key={i}
              project={project}
              onHoverStart={() => tweenRef.current?.pause()}
              onHoverEnd={() => tweenRef.current?.play()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
