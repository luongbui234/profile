import { motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import EditorCursor from "../EditorCursor/EditorCursor";
import luongBui from "/src/assets/luongbui.jpeg";

export default function AboutMeComponent({ sectionAboutMe }) {
  const speed = 0.1;
  const text1 = "Bùi Văn Lương";
  const text2 =
    "Mình là lập trình viên Frontend, sinh năm 2003. Đã học ở Cao đẳng Bách Khoa Bách Việt và trung tâm đào tạo lập trình Cybersoft Academy. Mục tiêu của mình là áp dụng kiến thức kinh nghiệm và trải nghiệm vào quá trình làm việc và mình muốn có một môi trường làm việc phù hợp, thăng tiến trong công việc.";

  const controls = useAnimation();
  const [display1, setDisplay1] = useState("");
  const [display2, setDisplay2] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true, // Chỉ chạy hiệu ứng một lần khi vào viewport
  });

  useEffect(() => {
    const typeCharacter = async () => {
      if (inView && currentIndex < text1.length + text2.length) {
        currentIndex < text1.length
          ? setDisplay1((prevText) => prevText + text1[currentIndex])
          : setDisplay2(
              (prevText) => prevText + text2[currentIndex - text1.length]
            );

        setCurrentIndex((prevIndex) => prevIndex + 1);
        await controls.start({ opacity: 1, transition: { duration: speed } });
      }
    };

    const timeoutId = setTimeout(typeCharacter, speed * 1000);

    return () => clearTimeout(timeoutId);
  }, [inView, currentIndex]);

  const [open, setOpen] = useState(false);
  const variantsOpen = {
    initial: { height: "100%" },
    animate: { height: 0 },
  };

  const title = "ABOUT ME";
  const renderTitle = () => {
    return title.split("").map((char, index) => {
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
    <div ref={sectionAboutMe} id="aboutMe" className="container h-lvh">
      <p className="h-1/6 text-6xl text-[#E7F5DC] font-bold flex justify-center">
        {renderTitle()}
      </p>
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: 0, transition: { duration: 1, ease: "easeOut" } }}
          viewport={{ once: true }}
          className="relative w-1/2 flex justify-center items-center"
        >
          <img className="size-96 rounded-md" src={luongBui} alt="Lương Bùi" />
          <div className="absolute top-0 size-96 border-[12px] border-[#728156] rounded-md shadow-2xl">
            <motion.div
              variants={variantsOpen}
              initial="initial"
              animate={open ? "animate" : null}
              className="size-full bg-[#728156] flex items-end"
            >
              <div className="w-full h-[14%] flex justify-center">
                <motion.svg
                  onClick={() => setOpen(true)}
                  animate={open ? { opacity: 0 } : null}
                  width={40}
                  height={50}
                  className={"cursor-pointer"}
                >
                  <motion.polygon
                    points="5 15, 20 5, 35 15"
                    fill="yellow"
                    stroke="yellow"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: [0.5, 0.5, 1, 0.5],
                      transition: {
                        repeatDelay: 1,
                        repeat: Infinity,
                      },
                    }}
                  />
                  <motion.polygon
                    points="5 30, 20 20, 35 30"
                    fill="yellow"
                    stroke="yellow"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      transition: {
                        repeatDelay: 1,
                        repeat: Infinity,
                      },
                    }}
                  />
                  <motion.polygon
                    points="5 45, 20 35, 35 45"
                    fill="yellow"
                    stroke="yellow"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: [1, 0.5, 0.5],
                      transition: {
                        repeatDelay: 1,
                        repeat: Infinity,
                      },
                    }}
                  />
                </motion.svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <div className="w-1/2">
          <motion.span
            ref={ref}
            initial={{ opacity: 0 }}
            animate={controls}
            className="inline-block"
          >
            <motion.p className="text-5xl">
              {display1}
              {currentIndex < text1.length ? <EditorCursor /> : null}
            </motion.p>
            <motion.p className="text-2xl py-3">
              {display2}
              {currentIndex > text1.length ? <EditorCursor /> : null}
            </motion.p>
          </motion.span>
        </div>
      </div>
    </div>
  );
}
