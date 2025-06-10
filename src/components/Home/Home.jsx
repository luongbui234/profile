import { animate, motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";
import EditorCursor from "../EditorCursor/EditorCursor";

export default function HomeComponent({ sectionHome }) {
  const speed = 0.1;

  const text1 = "Xin chào, mình là";
  const text2 = "Bùi Văn Lương";
  const text3 = "và mình là lập trình viên Frontend";

  const controls = useAnimation();
  const [display1, setDisplay1] = useState("");
  const [display2, setDisplay2] = useState("");
  const [display3, setDisplay3] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typeCharacter = async () => {
      if (currentIndex < text1.length + text2.length + text3.length) {
        if (currentIndex < text1.length) {
          setDisplay1((prevText) => prevText + text1[currentIndex]);
        } else if (currentIndex < text1.length + text2.length) {
          setDisplay2(
            (prevText) => prevText + text2[currentIndex - text1.length]
          );
        } else {
          setDisplay3(
            (prevText) =>
              prevText + text3[currentIndex - (text1.length + text2.length)]
          );
        }

        setCurrentIndex((prevIndex) => prevIndex + 1);
        await controls.start({ opacity: 1, transition: { duration: speed } });
      }
    };

    const timeoutId = setTimeout(typeCharacter, speed * 1000);

    return () => clearTimeout(timeoutId);
  }, [currentIndex]);

  return (
    <div
      ref={sectionHome}
      id="home"
      className="container h-lvh flex justify-between items-center"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={controls}
        className="inline-block"
      >
        <motion.p className="text-2xl">
          {display1}
          {currentIndex < text1.length ? <EditorCursor /> : null}
        </motion.p>
        <motion.p className="text-5xl">
          {display2}
          {currentIndex > text1.length &&
          currentIndex < text1.length + text2.length ? (
            <EditorCursor />
          ) : null}
        </motion.p>
        <motion.p className="text-2xl">
          {display3}
          {currentIndex > text1.length + text2.length ? <EditorCursor /> : null}
        </motion.p>
      </motion.span>
      <div className="relative size-[500px] flex justify-center items-center">
        <img
          className="rounded-md w-96"
          src="./src/assets/luongbuichill.jpg"
          alt="Lương đang chill"
        />
        <img
          className="absolute top-0 left-0 size-full"
          src="./src/assets/khunghinh3.png"
          alt=""
        />
      </div>
    </div>
  );
}
