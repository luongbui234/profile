import { listProject } from "../../data/project";
import ItemProjectComponent from "./ItemProject";

export default function ListProjectComponent({ handleOpenProject }) {
  const renderProject = () => {
    return listProject.map((project, index) => {
      return (
        <ItemProjectComponent
          key={index}
          index={index}
          project={project}
          handleOpenProject={handleOpenProject}
        />
      );
    });
  };
  return (
    <div className="snap-x overflow-hidden flex gap-5 p-5">
      {renderProject()}
    </div>
  );
}
