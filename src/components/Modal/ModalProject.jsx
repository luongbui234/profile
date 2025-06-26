import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function ModalProjectComponent({
  openProject,
  handleCloseProject,
  detail,
}) {
  const {
    imgDetail,
    name,
    language,
    interfaceProject,
    design,
    responsive,
    environment,
  } = detail;
  const [imgOder, setImgOder] = useState(0);
  const variants = {
    initial: { opacity: 0, y: "-100%" },
    animate: { opacity: 1, y: 0, transition: { duration: 1 } },
    exit: { opacity: 0, y: "100%", transition: { duration: 1 } },
  };
  const variantsText = {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "-100%", transition: { delay: 0 } },
  };

  useEffect(() => {
    openProject && setImgOder(0);
  }, [openProject]);

  const renderText = (text, index) => {
    return (
      <motion.p
        variants={variantsText}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: index * 0.5 }}
        className="pb-2"
      >
        {text}
      </motion.p>
    );
  };
  return (
    <AnimatePresence>
      {openProject && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-2/5 m-auto fixed left-0 top-10 right-0 border-4 border-[#728156] bg-[#B6C99B] rounded-lg"
        >
          <div className="m-5">
            <div className="space-y-5">
              <div className="flex gap-5">
                <div>
                  <div className="flex gap-2 items-center">
                    <button
                      disabled={imgOder === 0 ? true : false}
                      onClick={() => setImgOder(imgOder - 1)}
                      className={`size-fit ${imgOder === 0 && "opacity-30"}`}
                    >
                      <FaArrowAltCircleLeft
                        size={20}
                        className="text-[#728156]"
                      />
                    </button>
                    <div className="overflow-hidden">
                      <motion.div
                        animate={{ x: imgOder * -248 }}
                        className="flex gap-2 size-60"
                      >
                        {imgDetail.map((img) => {
                          return (
                            <img
                              className="rounded-lg"
                              src={img.src}
                              alt={img.alt}
                            />
                          );
                        })}
                      </motion.div>
                    </div>
                    <button
                      disabled={imgOder === imgDetail.length - 1 ? true : false}
                      onClick={() => setImgOder(imgOder + 1)}
                      className={`size-fit ${
                        imgOder === imgDetail.length - 1 && "opacity-30"
                      }`}
                    >
                      <FaArrowAltCircleRight
                        size={20}
                        className="text-[#728156]"
                      />
                    </button>
                  </div>
                  <p className="text-center h-6 flex gap-2 justify-center overflow-hidden">
                    <motion.p
                      animate={{ y: imgOder * 24 }}
                      className="flex flex-col-reverse"
                    >
                      {imgDetail.map((img, index) => {
                        return <span>{index + 1}</span>;
                      })}
                    </motion.p>
                    <p>/ {imgDetail.length}</p>
                  </p>
                </div>
                <div className="text-2xl flex flex-col justify-between">
                  <p className="font-bold">Dự án:</p>
                  {renderText(name, 1)}
                  <p className="font-bold">Ngôn ngữ:</p>
                  {renderText(language, 2)}
                  <p className="font-bold">Giao diện:</p>
                  {renderText(interfaceProject, 3)}
                </div>
              </div>
              <div className="text-2xl flex flex-col justify-between">
                <p className="font-bold">Thiết kế: </p>
                {renderText(design, 4)}
                <p className="font-bold">Thích ứng: </p>
                {renderText(responsive, 5)}
                <p className="font-bold">Môi trường: </p>
                {renderText(environment, 6)}
              </div>
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="bg-red-500 px-4 py-2 rounded-lg flex"
                  onClick={handleCloseProject}
                >
                  Đóng
                  <svg
                    className="w-6 h-6 text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m8 7 4 4 4-4m-8 6 4 4 4-4"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
