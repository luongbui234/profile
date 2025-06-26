import { useEffect, useRef } from "react";
import p5 from "p5";
import ClickCircle from "../../data/game/src/ClickCircle";
import PingPong from "../../data/game/src/PingPong";
import Snake from "../../data/game/src/Snake";
import { IoMdClose } from "react-icons/io";
import JumpSquare from "../../data/game/src/JumpSquare";
import { AnimatePresence, motion } from "motion/react";

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
      case 4:
        newSketch = JumpSquare;
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
    <AnimatePresence>
      {openGame && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          exit={{ opacity: 0, y: "100%", transition: { duration: 1 } }}
          className="w-fit m-auto fixed left-0 top-10 right-0 border-4 border-[#728156] rounded-lg"
        >
          <div ref={canvasRef} className="relative">
            <IoMdClose
              className="cursor-pointer absolute top-0 left-full"
              onClick={handleCloseGame}
              size={40}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
