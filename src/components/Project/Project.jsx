import { useState } from "react";
import { motion } from "motion/react";
import ListProjectComponent from "./ListProject";
import ModalProjectComponent from "../Modal/ModalProject";

export default function ProjectComponent({ sectionProject }) {
  const [openProject, setOpenProject] = useState(false);
  const [detail, setDetail] = useState({});
  const handleOpenProject = (detailProject) => {
    setDetail(detailProject);
    setOpenProject(true);
  };
  const handleCloseProject = () => {
    setOpenProject(false);
  };

  const title = "PROJECT";
  const renderTitle = () => {
    return title.split("").map((char, index) => {
      console.log(char);
      return (
        <motion.span
          key={index}
          className="whitespace-pre"
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: index * 0.1 },
          }}
          viewport={{ once: true }}
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <div
      ref={sectionProject}
      id="project"
      className="container h-lvh flex flex-col gap-5"
    >
      <p className="h-1/6 text-6xl text-[#E7F5DC] font-bold flex justify-center">
        {renderTitle()}
      </p>
      <ListProjectComponent handleOpenProject={handleOpenProject} />
      <ModalProjectComponent
        openProject={openProject}
        handleCloseProject={handleCloseProject}
        detail={detail}
      />
    </div>
  );
}
