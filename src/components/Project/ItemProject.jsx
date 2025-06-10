import { motion } from "motion/react";

export default function ItemProjectComponent({
  index,
  project,
  handleOpenProject,
}) {
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { duration: 1, delay: index * 0.1 },
      }}
      className="snap-start min-w-72 border flex flex-col items-center gap-5 p-5"
    >
      <img className="size-60" src={project.img.src} alt={project.img.alt} />
      <p className="text-2xl">{project.name}</p>
      <button
        className="bg-gray-300 p-2 rounded-lg flex"
        onClick={() => handleOpenProject(project.detail)}
      >
        Chi tiết
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m8 7 4 4 4-4m-8 6 4 4 4-4"
          />
        </svg>
      </button>
    </motion.div>
  );
}
