// import React, { useRef } from "react";
// import TextReveal from "./TextReveal";
// import gsap from "@/lib/gsap";

// const CARD_W = 300;
// const CARD_H = 380;
// const SCALE = 1.35;

// const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
//   const cardRef = useRef(null);
//   const imgRef = useRef(null);
//   const numberRef = useRef(null);
//   const titleRef = useRef(null);

//   const onEnter = () => {
//     onHoverStart?.();

//     gsap.to(cardRef.current, {
//       height: CARD_H * SCALE,
//       width: CARD_W * SCALE,
//       duration: 0.45,
//       ease: "power3.out",
//     });

//     numberRef.current?.play();
//     titleRef.current?.play();
//   };

//   const onLeave = () => {
//     onHoverEnd?.();

//     gsap.to(cardRef.current, {
//       height: CARD_H,
//       width: CARD_W,
//       duration: 0.25,
//       ease: "power3.out",
//     });

//     numberRef.current?.reverse();
//     titleRef.current?.reverse();
//   };

//   return (
//     <div
//       ref={cardRef}
//       onMouseEnter={onEnter}
//       onMouseLeave={onLeave}
//       style={{
//         height: CARD_H,
//         width: CARD_W,
//         overflow: "visible",
//         flexShrink: 0,
//         cursor: "pointer",
//       }}
//       className="relative"
//     >
//       {/* Title Panel */}

//       <div
//         style={{ bottom: "calc(100% + 3rem)" }}
//         className="titlePanel absolute left-0 pointer-events-none flex flex-col gap-4"
//       >
//         <TextReveal ref={numberRef} trigger="mannual" splitBy="chars">
//           <h3 className="text-xl font-bold font-mono">{project.number}</h3>
//         </TextReveal>

//         <TextReveal ref={titleRef} trigger="mannual" splitBy="words">
//           <h2 className="text-xl italic font-mono">{project.title}</h2>
//         </TextReveal>

//         <div className="imageDiv size-full overflow-hidden">
//           <img
//             ref={imgRef}
//             src={project.coverImage}
//             alt={project.title}
//             style={{ transformOrigin: "center center", userSelect: "none" }}
//             className="size-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarouselCard;

import React, { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap from "@/lib/gsap";
import useViewTransition from "@/hooks/useViewTransition";

const CARD_W = 200;
const CARD_H = 280;
const SCALE = 1.35;

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);

  const onEnter = () => {
    onHoverStart?.();

    gsap.to(cardRef.current, {
      width: CARD_W * SCALE,
      height: CARD_H * SCALE,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.17,
      ease: "power3.inOut",
    });

    numberRef.current?.play();
    titleRef.current?.play();
  };

  const onLeave = () => {
    onHoverEnd?.();

    gsap.to(cardRef.current, {
      width: CARD_W,
      height: CARD_H,
      duration: 0.25,
      ease: "power3.out",
    });

    gsap.to(imgRef.current, {
      scale: 1.6,
      duration: 0.19,
      ease: "power3.inOut",
    });

    numberRef.current?.reverse();
    titleRef.current?.reverse();
  };

  const { navigateTo } = useViewTransition();

  const handleClick = () => {
    navigateTo(`/project/${project.slug}`);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: CARD_W,
        height: CARD_H,
        flexShrink: 0,
      }}
      className="relative cursor-pointer"
    >
      {/* Title */}
      <div
        className="
          absolute
          left-0
          bottom-full
          mb-6
          flex
          flex-col
          gap-2
          pointer-events-none
        "
      >
        <TextReveal ref={numberRef} trigger="manual" splitBy="chars">
          <h3 className="text-xl font-bold font-mono">{project.number}</h3>
        </TextReveal>

        <TextReveal ref={titleRef} trigger="manual" splitBy="words">
          <h2 className="text-xl italic font-mono">{project.title}</h2>
        </TextReveal>
      </div>

      {/* Image */}
      <div className="w-full h-full overflow-hidden">
        <img
          ref={imgRef}
          src={project.coverImage}
          alt={project.title}
          draggable={false}
          className="w-full h-full object-cover scale-[1.6] select-none"
          style={{
            transformOrigin: "center center",
          }}
        />
      </div>
    </div>
  );
};

export default CarouselCard;
