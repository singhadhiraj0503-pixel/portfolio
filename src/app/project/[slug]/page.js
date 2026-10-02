import Navbar from "@/components/Navbar";
import ProjectPage from "@/components/ProjectPage";
import { projects } from "@/data/projects";
import React from "react";

const page = async ({ params }) => {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  return (
    <div className="h-screen w-full">
      {/* <Navbar /> */}

      <ProjectPage project={project} />
    </div>
  );
};

export default page;
