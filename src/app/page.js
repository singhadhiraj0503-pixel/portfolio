import TextReveal from "@/components/TextReveal";
import React from "react";

const Home = () => {
  return (
    <div className="h-[300vh] w-full bg-black">
      <div className="h-[50%] "></div>
      <TextReveal
        splitBy="chars"
        trigger="scroll"
        className="text-2xl text-white"
      >
        Hello World !!
      </TextReveal>
    </div>
  );
};

export default Home;
