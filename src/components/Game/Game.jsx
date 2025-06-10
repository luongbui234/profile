import { useState } from "react";
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
  return (
    <div ref={sectionGame} id="game" className="container h-lvh">
      <p className="h-1/6 text-6xl text-center text-white font-bold">GAME</p>
      <div className="flex">
        <ListGameComponent handleOpenGame={handleOpenGame} />
        <ModalGameComponent
          openGame={openGame}
          handleCloseGame={handleCloseGame}
          idGame={idGame}
        />
      </div>
    </div>
  );
}
