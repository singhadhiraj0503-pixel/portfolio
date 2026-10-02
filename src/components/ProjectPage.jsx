"use client";

import React, { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap, { ScrollTrigger, useGSAP } from "@/lib/gsap";

const ProjectPage = ({ project }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray("section");
      //   console.log(sections);

      gsap.to(imageRef.current, {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.8,
      });

      sections.forEach((section, idx) => {
        const container = section.children[0];

        gsap.to(container, {
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });

        if (idx === sections.length - 1) return;

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div>
      <main ref={containerRef}>
        <section className="h-screen w-full ">
          <div className="sectionContainer size-full pt-15 px-4 pb-5 flex">
            <div className="firstSegment h-full w-[10%]">
              <h3 className="text-3xl">{project.number}</h3>
            </div>
            <div className="secondSegment h-[85%] w-[40%]">
              <div className="imageDiv size-full overflow-hidden">
                <img
                  ref={imageRef}
                  style={{
                    clipPath: "inset(100% 0 0 0)",
                  }}
                  src={project.coverImage}
                  alt=""
                  className="size-full object-cover scale-[2]"
                />
              </div>
            </div>
            <div className="thirdSegment h-[85%] w-[50%] flex flex-col justify-end pl-4">
              <div className="heading pb-5">
                <TextReveal delay="0.85" splitBy="words">
                  <h1 className="text-5xl font-semibold">{project.title}</h1>
                </TextReveal>
              </div>
              <div className="subHeading flex items-center gap-5 pb-5">
                <TextReveal delay="0.85" splitBy="words">
                  <h3 className="text-2xl">{project.subtitle}</h3>
                </TextReveal>
                <TextReveal delay="0.85" splitBy="chars">
                  <h3 className="text-xl font-bold">({project.year})</h3>
                </TextReveal>
              </div>
              <div className="description w-[68%]">
                <TextReveal delay="0.12" splitBy="lines" duration="1.5">
                  <p className="italic text-xl">{project.description}</p>
                </TextReveal>
              </div>
            </div>
          </div>
        </section>
        {project.gallery.map((elem, idx) => {
          return (
            <section key={idx} className="h-screen w-full">
              <div
                style={{ transformOrigin: "bottom left" }}
                className="sectionContainer size-full rotate-[30deg]"
              >
                <img src={elem} alt="" className="size-full object-cover" />
              </div>
            </section>
          );
        })}
        <footer className="h-screen w-full"></footer>
      </main>
    </div>
  );
};

export default ProjectPage;
