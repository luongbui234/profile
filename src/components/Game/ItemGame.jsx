import { motion } from "motion/react";

import { IoLogoGameControllerA } from "react-icons/io";

export default function ItemGameComponent({ index, game, handleOpenGame }) {
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
      <img className="size-60" src={game.img.src} alt={game.img.alt} />
      <p className="text-2xl">{game.name}</p>
      <button
        className="bg-gray-300 p-2 rounded-lg flex items-center gap-2"
        onClick={() => handleOpenGame(game.idGame)}
      >
        <span>Mở</span>
        <IoLogoGameControllerA size={30} />
      </button>
    </motion.div>
  );
}
