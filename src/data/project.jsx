import chonGhe from "/src/assets/chonghe.png";
import trangChuDatVe from "/src/assets/trangchudatve.png";
import cumRap from "/src/assets/cumrap.png";
import bangDuAn from "/src/assets/bangduan.png";
import trangChuJira from "/src/assets/trangchujira.png";
import suaNguoiDung from "/src/assets/suanguoidung.png";

export const listProject = [
  {
    idProject: 1,
    img: {
      src: chonGhe,
      alt: "Phòng chọn ghế",
    },
    name: "React JS",
    detail: {
      imgDetail: [
        {
          src: trangChuDatVe,
          alt: "Trang chủ đặt vé",
        },
        {
          src: cumRap,
          alt: "Cụm rạp",
        },
        {
          src: chonGhe,
          alt: "Phòng chọn ghế",
        },
      ],
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
      imgDetail: [
        {
          src: bangDuAn,
          alt: "Bảng dự án",
        },
        {
          src: trangChuJira,
          alt: "Trang chủ Jira",
        },
        {
          src: suaNguoiDung,
          alt: "Sửa người dùng",
        },
      ],
      name: "Clone Jira",
      language: "Next JS",
      interfaceProject: "Tailwind và antd",
      design: "Figma",
      responsive: "Ip, Ipad, Desktop",
      environment: "VS Code",
    },
  },
];
