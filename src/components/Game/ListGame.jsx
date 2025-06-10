import { listGame } from "../../data/game/game";
import ItemGameComponent from "./ItemGame";

export default function ListGameComponent({ handleOpenGame }) {
  const renderGame = () => {
    return listGame.map((game, index) => {
      return (
        <ItemGameComponent
          key={index}
          index={index}
          game={game}
          handleOpenGame={handleOpenGame}
        />
      );
    });
  };
  return (
    <div className="snap-x overflow-auto overflow-y-hidden flex gap-5 p-5">
      {renderGame()}
    </div>
  );
}
