import React from "react";
import TextReveal from "./TextReveal";

const Navbar = () => {
  return (
    <div className="h-[6vh] w-full fixed flex items-center justify-between px-4">
      <div className="leftNameSide ">
        <TextReveal splitBy="chars" duration="0.04">
          <h3 className="text-xl font-bold">ADHIRAJ SINGH</h3>
        </TextReveal>
      </div>
      <div className="rightLinkSide flex gap-8 px-4 font-bold text-lg">
        <TextReveal splitBy="chars" duration="0.22">
          <h3>Home</h3>
        </TextReveal>
        <TextReveal splitBy="chars" duration="0.22">
          <h3>About</h3>
        </TextReveal>
        <TextReveal splitBy="chars" duration="0.22">
          <h3>Contact</h3>
        </TextReveal>
      </div>
    </div>
  );
};

export default Navbar;
