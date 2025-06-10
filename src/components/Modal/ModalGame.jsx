import { useEffect, useRef } from "react";
import p5 from "p5";
import ClickCircle from "../../data/game/src/ClickCircle";
import PingPong from "../../data/game/src/PingPong";
import Snake from "../../data/game/src/Snake";
import { IoMdClose } from "react-icons/io";

export default function ModalGameComponent({
  openGame,
  handleCloseGame,
  idGame,
}) {
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);

  const runGame = () => {
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove(); // Loại bỏ sketch hiện tại
      p5InstanceRef.current = null;
    }

    let newSketch;
    switch (idGame) {
      case 1:
        newSketch = ClickCircle;
        break;
      case 2:
        newSketch = PingPong;
        break;
      case 3:
        newSketch = Snake;
        break;
    }

    if (newSketch) {
      p5InstanceRef.current = new p5(newSketch, canvasRef.current); // Chạy sketch mới trong div
    }
  };

  useEffect(() => {
    runGame();
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [idGame]);
  return (
    <div
      className={`w-fit m-auto fixed left-0 top-10 right-0 ${
        openGame === true ? "block" : "hidden"
      } flex justify-center`}
    >
      <div ref={canvasRef}></div>
      <IoMdClose
        className="cursor-pointer"
        onClick={handleCloseGame}
        size={40}
      />
    </div>
  );
}
