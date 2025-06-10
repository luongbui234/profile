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
  return (
    <div
      className={`w-2/5 m-auto fixed left-0 top-10 right-0 border bg-gray-400 ${
        openProject === true ? "block" : "hidden"
      }`}
    >
      <div className="m-5">
        <div className="space-y-5">
          <div className="flex gap-5">
            <img
              className="size-60"
              src={imgDetail?.src}
              alt={imgDetail?.alt}
            />
            <div className="text-2xl flex flex-col justify-between">
              <p className="font-bold">Dự án:</p>
              <p className="pb-2">{name}</p>
              <p className="font-bold">Ngôn ngữ:</p>
              <p className="pb-2">{language}</p>
              <p className="font-bold">Giao diện:</p>
              <p className="pb-2">{interfaceProject}</p>
            </div>
          </div>
          <div className="text-2xl flex flex-col justify-between">
            <p className="font-bold">Thiết kế: </p>
            <p className="pb-2">{design}</p>
            <p className="font-bold">Thích ứng: </p>
            <p className="pb-2">{responsive}</p>
            <p className="font-bold">Môi trường: </p>
            <p className="pb-2">{environment}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-500 px-4 py-2 rounded-lg"
              onClick={() => handleCloseProject(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
