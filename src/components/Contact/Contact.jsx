import { motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";
import { FaPhone, FaFacebook } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import EditorCursor from "../EditorCursor/EditorCursor";

export default function ContactComponent({ sectionContact }) {
  const speed = 0.1;
  const text1 = "Bạn muốn hợp tác với mình?";
  const text2 =
    "Bởi vì bạn chính là nguồn cảm hứng để mình có thể sáng tạo, học hỏi kinh nghiệm và tiếp tục làm nghề trên con đường trở thành Master và hơn thế nữa.😊";

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
        await controls.start({ opacity: 1, transition: { duration: 0.1 } });
      }
    };

    const timeoutId = setTimeout(typeCharacter, speed * 1000);

    return () => clearTimeout(timeoutId);
  }, [inView, currentIndex]);

  return (
    <div ref={sectionContact} id="contact" className="container h-lvh">
      <p className="h-1/6 text-6xl text-center text-white font-bold">CONTACT</p>
      <div className="flex">
        <div className="w-1/2">
          <motion.span
            ref={ref}
            initial={{ opacity: 0 }}
            animate={controls}
            className="inline-block"
          >
            <motion.p className="text-4xl py-3">
              {display1}
              {currentIndex < text1.length ? <EditorCursor /> : null}
            </motion.p>
            <motion.p className="text-2xl">
              {display2}
              {currentIndex > text1.length ? <EditorCursor /> : null}
            </motion.p>
          </motion.span>
          <div className="text-2xl py-3">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { delay: 18.5 } }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <FaPhone />
              <motion.p>0327477511</motion.p>
            </motion.div>
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { delay: 19 } }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <IoMail />
              <motion.p>luongbui0610@gmail.com</motion.p>
            </motion.div>
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { delay: 19.5 } }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <FaFacebook />
              <motion.a
                href="https://www.facebook.com/share/15GrUKfdix/"
                target="_blank"
              >
                buivanluong
              </motion.a>
            </motion.div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <img
            src="./src/assets/2nguoibattay-xoaphong.png"
            alt=""
            className="h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}
