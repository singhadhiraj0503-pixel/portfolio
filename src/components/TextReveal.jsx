"use client";

import React, { forwardRef, useRef } from "react";
import gsap, { ScrollTrigger, SplitText, useGSAP } from "../lib/gsap";

const TextReveal = forwardRef(
  (
    {
      children,
      className = "",
      trigger = "mount",
      scrollStart = "top 75%",
      splitBy = "lines",
      duration = 0.69,
      stagger = 0.08,
      delay = 0,
      ease = "power3.out",
    },
    ref,
  ) => {
    const wrapperRef = useRef();
    const splitRef = useRef(null);
    const tlRef = useRef(null);

    useGSAP(
      () => {
        splitRef.current = new SplitText(wrapperRef.current, {
          type: splitBy,
        });

        const elements = splitRef.current[splitBy];

        gsap.set(elements, { yPercent: 110 });

        tlRef.current = gsap.timeline({
          paused: true,
          defaults: { delay },
        });

        tlRef.current.to(elements, {
          yPercent: 0,
          opacity: 1,
          duration,
          ease,
          stagger: {
            each: stagger,
            from: "start",
          },
        });

        if (trigger === "mount") {
          tlRef.current.play();
        }

        if (trigger === "scroll") {
          ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: scrollStart,
            once: true,
            onEnter: () => tlRef.current?.play(),
          });
        }

        return () => {
          tlRef.current?.kill();
          splitRef.current?.revert();
        };
      },
      { scope: wrapperRef },
    );
    return (
      <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
        {children}
      </div>
    );
  },
);

export default TextReveal;
