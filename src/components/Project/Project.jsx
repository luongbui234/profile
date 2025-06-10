import { useState } from "react";
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

  return (
    <div
      ref={sectionProject}
      id="project"
      className="container h-lvh flex flex-col gap-5"
    >
      <p className="h-1/6 text-6xl text-center text-white font-bold">PROJECT</p>
      <div>
        <ListProjectComponent handleOpenProject={handleOpenProject} />
        <ModalProjectComponent
          openProject={openProject}
          handleCloseProject={handleCloseProject}
          detail={detail}
        />
      </div>
    </div>
  );
}
