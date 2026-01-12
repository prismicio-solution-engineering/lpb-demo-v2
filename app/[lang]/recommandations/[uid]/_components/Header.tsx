"use client";

import { useState, useEffect, useRef } from "react";
import { RecapDocumentData, Simplify } from "@/prismicio-types";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

import Container from "@/components/Container";
import Logo from "@/assets/Logo/logo.svg";
import { header } from "motion/react-client";

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

  const navLinks = [
    { id: "hero", label: "Top" },
    { id: "understanding", label: "Understanding" },
    { id: "opportunities", label: "Opportunities" },
    { id: "pages", label: "ABM Pages" },
    { id: "next-steps", label: "Next Steps" },
  ];

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
            <PrismicNextLink
              field={data.header_button}
              className="flex items-center cursor-pointer group"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 64 64"
                fill="#FF0000"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  opacity="0.2"
                  d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V48C64 56.8366 56.8366 64 48 64H16C7.16344 64 0 56.8366 0 48V16Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M26 16C27.1063 16 28 16.8937 28 18V20H36V18C36 16.8937 36.8938 16 38 16C39.1063 16 40 16.8937 40 18V20H43C44.6562 20 46 21.3438 46 23V26H18V23C18 21.3438 19.3438 20 21 20H24V18C24 16.8937 24.8938 16 26 16ZM18 28H46V45C46 46.6562 44.6562 48 43 48H21C19.3438 48 18 46.6562 18 45V28ZM22 33V35C22 35.55 22.45 36 23 36H25C25.55 36 26 35.55 26 35V33C26 32.45 25.55 32 25 32H23C22.45 32 22 32.45 22 33ZM30 33V35C30 35.55 30.45 36 31 36H33C33.55 36 34 35.55 34 35V33C34 32.45 33.55 32 33 32H31C30.45 32 30 32.45 30 33ZM39 32C38.45 32 38 32.45 38 33V35C38 35.55 38.45 36 39 36H41C41.55 36 42 35.55 42 35V33C42 32.45 41.55 32 41 32H39ZM22 41V43C22 43.55 22.45 44 23 44H25C25.55 44 26 43.55 26 43V41C26 40.45 25.55 40 25 40H23C22.45 40 22 40.45 22 41ZM31 40C30.45 40 30 40.45 30 41V43C30 43.55 30.45 44 31 44H33C33.55 44 34 43.55 34 43V41C34 40.45 33.55 40 33 40H31ZM38 41V43C38 43.55 38.45 44 39 44H41C41.55 44 42 43.55 42 43V41C42 40.45 41.55 40 41 40H39C38.45 40 38 40.45 38 41Z"
                  fill="#A4A4A4"
                />
              </svg>
              {data.header_button.text
                ? data.header_button.text
                : "Request a demo"}
            </PrismicNextLink>
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
                <PrismicNextLink
                  field={data.header_button}
                  className="flex items-center cursor-pointer group"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 64 64"
                    fill="#FF0000"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      opacity="0.2"
                      d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V48C64 56.8366 56.8366 64 48 64H16C7.16344 64 0 56.8366 0 48V16Z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M26 16C27.1063 16 28 16.8937 28 18V20H36V18C36 16.8937 36.8938 16 38 16C39.1063 16 40 16.8937 40 18V20H43C44.6562 20 46 21.3438 46 23V26H18V23C18 21.3438 19.3438 20 21 20H24V18C24 16.8937 24.8938 16 26 16ZM18 28H46V45C46 46.6562 44.6562 48 43 48H21C19.3438 48 18 46.6562 18 45V28ZM22 33V35C22 35.55 22.45 36 23 36H25C25.55 36 26 35.55 26 35V33C26 32.45 25.55 32 25 32H23C22.45 32 22 32.45 22 33ZM30 33V35C30 35.55 30.45 36 31 36H33C33.55 36 34 35.55 34 35V33C34 32.45 33.55 32 33 32H31C30.45 32 30 32.45 30 33ZM39 32C38.45 32 38 32.45 38 33V35C38 35.55 38.45 36 39 36H41C41.55 36 42 35.55 42 35V33C42 32.45 41.55 32 41 32H39ZM22 41V43C22 43.55 22.45 44 23 44H25C25.55 44 26 43.55 26 43V41C26 40.45 25.55 40 25 40H23C22.45 40 22 40.45 22 41ZM31 40C30.45 40 30 40.45 30 41V43C30 43.55 30.45 44 31 44H33C33.55 44 34 43.55 34 43V41C34 40.45 33.55 40 33 40H31ZM38 41V43C38 43.55 38.45 44 39 44H41C41.55 44 42 43.55 42 43V41C42 40.45 41.55 40 41 40H39C38.45 40 38 40.45 38 41Z"
                      fill="#A4A4A4"
                    />
                  </svg>
                  {data.header_button.text
                    ? data.header_button.text
                    : "Request a demo"}
                </PrismicNextLink>
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
