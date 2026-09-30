import InfiniteCarousel from "@/components/InfiniteCarousel";
import TextReveal from "@/components/TextReveal";
import { projects } from "@/data/projects";
import React from "react";

const Home = () => {
  return (
    <div className="h-screen w-full flex items-center">
      <InfiniteCarousel projects={projects} />
    </div>
  );
};

export default Home;
