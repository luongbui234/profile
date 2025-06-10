import chonGhe from "/src/assets/chonghe.png";
import bangDuAn from "/src/assets/bangduan.png";

export const listProject = [
  {
    idProject: 1,
    img: {
      src: chonGhe,
      alt: "Phòng chọn ghế",
    },
    name: "React JS",
    detail: {
      imgDetail: {
        src: chonGhe,
        alt: "Phòng chọn ghế",
      },
      name: "Đặt vé xem phim",
      language: "React JS",
      interfaceProject: "Tailwind và antd",
      design: "Figma",
      responsive: "Ip, Ipad, Desktop",
      environment: "VS Code",
    },
  },
  {
    idProject: 2,
    img: {
      src: bangDuAn,
      alt: "Bảng dự án",
    },
    name: "Next JS",
    detail: {
      imgDetail: {
        src: bangDuAn,
        alt: "Bảng dự án",
      },
      name: "Clone Jira",
      language: "Next JS",
      interfaceProject: "Tailwind và antd",
      design: "Figma",
      responsive: "Ip, Ipad, Desktop",
      environment: "VS Code",
    },
  },
];
