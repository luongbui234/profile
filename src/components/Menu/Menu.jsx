import { CiCircleInfo, CiFolderOn, CiPhone } from "react-icons/ci";
import { IoGameControllerOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { motion } from "motion/react";
import { useState } from "react";

export default function MenuComponent({ activeSection }) {
  const [open, setOpen] = useState(false);

  const variantsOpen = {
    initial: { y: "-90%" },
    animate: { y: 0 },
  };

  return (
    <motion.nav
      variants={variantsOpen}
      initial="initial"
      animate={open ? "animate" : null}
      className="fixed top-0 left-0 w-[10%] flex flex-col items-center"
    >
      <div className="w-full bg-yellow-600 flex flex-col items-center gap-2 text-2xl border-4 border-amber-700 divide-y-2">
        <a
          href="#home"
          className={`flex items-center gap-2 font-bold hover:text-yellow-200 ${
            activeSection === "home" ? "text-yellow-200" : ""
          }`}
        >
          <GoHome />
          <p>Home</p>
        </a>
        <a
          href="#aboutMe"
          className={`flex items-center gap-2 font-bold hover:text-yellow-200 ${
            activeSection === "aboutMe" ? "text-yellow-200" : ""
          }`}
        >
          <CiCircleInfo />
          <p>About Me</p>
        </a>
        <a
          href="#project"
          className={`flex items-center gap-2 font-bold hover:text-yellow-200 ${
            activeSection === "project" ? "text-yellow-200" : ""
          }`}
        >
          <CiFolderOn />
          <p>Project</p>
        </a>
        <a
          href="#game"
          className={`flex items-center gap-2 font-bold hover:text-yellow-200 ${
            activeSection === "game" ? "text-yellow-200" : ""
          }`}
        >
          <IoGameControllerOutline />
          <p>Game</p>
        </a>
        <a
          href="#contact"
          className={`flex items-center gap-2 font-bold hover:text-yellow-200 ${
            activeSection === "contact" ? "text-yellow-200" : ""
          }`}
        >
          <CiPhone />
          <p>Contact</p>
        </a>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-5 cursor-pointer border-amber-500 border-4 border-t-0 rounded-b-md shadow-sm shadow-gray-600"
      />
    </motion.nav>
  );
}
