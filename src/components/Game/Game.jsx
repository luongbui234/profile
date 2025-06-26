import { useState } from "react";
import { motion } from "motion/react";
import ListGameComponent from "./ListGame";
import ModalGameComponent from "../Modal/ModalGame";

export default function GameComponent({ sectionGame }) {
  const [openGame, setOpenGame] = useState(false);
  const [idGame, setIdGame] = useState(0);
  const handleOpenGame = (src) => {
    setIdGame(src);
    setOpenGame(true);
  };
  const handleCloseGame = () => {
    setOpenGame(false);
    setIdGame(0);
  };

  const title = "GAME";
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
    <div ref={sectionGame} id="game" className="container h-lvh">
      <p className="h-1/6 text-6xl text-[#E7F5DC] font-bold flex justify-center">
        {renderTitle()}
      </p>
      <ListGameComponent handleOpenGame={handleOpenGame} />
      <ModalGameComponent
        openGame={openGame}
        handleCloseGame={handleCloseGame}
        idGame={idGame}
      />
    </div>
  );
}
