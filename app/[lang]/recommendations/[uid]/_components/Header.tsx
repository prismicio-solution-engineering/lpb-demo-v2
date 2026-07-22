"use client";

import { useState, useEffect, useRef } from "react";
import { RecapDocumentData, Simplify } from "@/prismicio-types";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

import Container from "@/components/Container";
import Logo from "@/assets/Logo/logo.svg";
import Calendar from "@/components/Icons/Calendar";
import Quote from "@/components/Icons/Quote";

export default function Header({
  data,
}: {
  data: Simplify<RecapDocumentData>;
}) {
  const [activeSection, setActiveSection] = useState("hero");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Stocke la position et la largeur de la barre violette
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0, opacity: 0 });
  // Ref pour stocker les éléments DOM des liens de navigation
  // C'est un objet où la clé est l'ID (ex: "hero") et la valeur est l'élément HTML <a>
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const AbmNavLinks = [
    { id: "hero", label: "Top" },
    { id: "understanding", label: "Understanding" },
    { id: "opportunities", label: "Opportunities" },
    { id: "pages", label: "ABM Pages" },
    { id: "roi-calculator", label: "ROI" },
    { id: "next-steps", label: "Next Steps" },
  ];

  const seoNavLinks = [
    { id: "hero", label: "Top" },
    { id: "understanding", label: "Understanding" },
    { id: "opportunities", label: "Opportunities" },
    { id: "pages", label: "AI-Generated Pages" },
    { id: "roi-calculator", label: "ROI" },
    { id: "next-steps", label: "Next Steps" },
  ];

  if (data.roi_calculator == null || data.roi_calculator == undefined || data.roi_calculator == false) {
    AbmNavLinks.splice(4,1);
    seoNavLinks.splice(4,1);
  }

  const navLinks = data.agent === "SEO-GEO" ? seoNavLinks : AbmNavLinks;


  // Observer pour détecter le scroll et changer la section active
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    });

    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Calculer la position de la barre violette
  // Se déclenche à chaque fois que 'activeSection' change
  useEffect(() => {
    const activeElement = navRefs.current[activeSection];
    if (activeElement) {
      setBarStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
        opacity: 1,
      });
    }
  }, [activeSection]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Mise à jour du clic sur les liens : change la section ET ferme le menu
  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-999 w-full bg-[#FFFFFF] border-b border-[#EEEEEE]">
      <Container
        size="xl"
        className="flex justify-between items-center gap-8 relative"
      >
        {/* ------ Logo ------ */}
        <img src={Logo.src} alt="Logo" className="w-32 h-auto relative z-20" />

        {/* ------ Desktop Menu ------ */}
        <div className="w-full hidden lg:flex justify-between items-center gap-8">
          {/* Links */}
          <div className="relative flex items-center gap-2 text-[rgba(80,80,80,0.8)] py-6 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.id}
                ref={(el) => {
                  navRefs.current[link.id] = el;
                }}
                href={`#${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`
                  px-3 transition-colors duration-200 ease-in-out
                  hover:text-[#151515]
                  ${activeSection === link.id ? "text-[#151515]" : ""}
                `}
              >
                {link.label}
              </a>
            ))}
            <div
              className="absolute -bottom-px h-0.75 bg-[#8E44EC] transition-all duration-500 ease-in-out z-10 pointer-events-none"
              style={{
                left: `${barStyle.left}px`,
                width: `${barStyle.width}px`,
                opacity: barStyle.opacity,
              }}
            />
          </div>

          {/* CTA */}
          {isFilled.link(data.header_button) && (
            <div className="flex items-center cursor-pointer group gap-1">
              {isFilled.select(data.header_button_icon) && (
                <>
                  {data.header_button_icon === "calendar" && (
                    <Calendar className="text-[#A4A4A4]" />
                  )}
                  {data.header_button_icon === "quote" && (
                    <Quote className="text-[#A4A4A4]" />
                  )}
                </>
              )}
              <PrismicNextLink 
                field={data.header_button} 
                className="text-[#151515]" 
              />
            </div>
          )}
        </div>

        {/* ------ Menu Buttons ------ */}
        <div
          className="w-8 h-8 relative my-5 block lg:hidden cursor-pointer z-20"
          onClick={toggleMenu} // Ajout de l'événement clic
        >
          {/* Close */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 absolute top-0 left-0 transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100" : "opacity-0 -"}`}
          >
            <path
              d="m7.757 7.757 8.486 8.486M7.757 16.243l8.486-8.486"
              stroke="currentColor"
              strokeWidth="1.5"
            ></path>
          </svg>

          {/* Burger */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 absolute top-0 left-0 transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-0 " : "opacity-100"}`}
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.5"
            ></path>
          </svg>
        </div>

        {/* ------ Mobile Panel ------ */}
        <div
          className={`
            absolute top-0 w-full h-screen mt-18.25 bg-[#FFFFFF] lg:hidden 
            transition-all duration-500 ease-in-out flex flex-col
            ${isMenuOpen ? "left-0" : "left-full"}
          `}
        >
          <div className="flex flex-col">
            {/* Links */}
            <div className="max-w-3xl w-full mx-auto flex justify-end p-6">
            {isFilled.link(data.header_button) && (
              <div className="flex items-center cursor-pointer group gap-1">
                {isFilled.select(data.header_button_icon) && (
                  <>
                    {data.header_button_icon === "calendar" && (
                      <Calendar className="text-[#A4A4A4]" />
                    )}
                    {data.header_button_icon === "quote" && (
                      <Quote className="text-[#A4A4A4]" />
                    )}
                  </>
                )}
                <PrismicNextLink 
                  field={data.header_button} 
                  className="text-[#151515]" 
                />
              </div>
            )}
            </div>

            {/* CTA */}
            <div className="max-w-3xl w-full mx-auto px-8 flex flex-col justify-center items-center">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full py-4 text-left border-b border-[#EEEEEE] ${activeSection === link.id ? "font-medium text-[#151515]" : "text-[#505050]"}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
