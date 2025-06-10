import { useEffect, useRef, useState } from "react";
import "./App.css";
import HomeComponent from "./components/Home/Home";
import AboutMeComponent from "./components/AboutMe/AboutMe";
import ProjectComponent from "./components/Project/Project";
import ContactComponent from "./components/Contact/Contact";
import MenuComponent from "./components/Menu/Menu";
import GameComponent from "./components/Game/Game";

function App() {
  const sectionHome = useRef(null);
  const sectionAboutMe = useRef(null);
  const sectionProject = useRef(null);
  const sectionGame = useRef(null);
  const sectionContact = useRef(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // Phần trăm của phần tử hiển thị để kích hoạt callback
      }
    );

    if (sectionHome.current) observer.observe(sectionHome.current);
    if (sectionAboutMe.current) observer.observe(sectionAboutMe.current);
    if (sectionProject.current) observer.observe(sectionProject.current);
    if (sectionGame.current) observer.observe(sectionGame.current);
    if (sectionContact.current) observer.observe(sectionContact.current);

    return () => {
      if (sectionHome.current) observer.unobserve(sectionHome.current);
      if (sectionAboutMe.current) observer.unobserve(sectionAboutMe.current);
      if (sectionProject.current) observer.unobserve(sectionProject.current);
      if (sectionGame.current) observer.unobserve(sectionGame.current);
      if (sectionContact.current) observer.unobserve(sectionContact.current);
    };
  }, []);

  return (
    <div className="scroll-smooth h-lvh overflow-auto bg-[#B6C99B] font-mono">
      <MenuComponent activeSection={activeSection} />
      <HomeComponent sectionHome={sectionHome} />
      <AboutMeComponent sectionAboutMe={sectionAboutMe} />
      <ProjectComponent sectionProject={sectionProject} />
      <GameComponent sectionGame={sectionGame} />
      <ContactComponent sectionContact={sectionContact} />
    </div>
  );
}

export default App;
