"use client";
import React, { useEffect, useState } from "react";

import { PropsLayoutHF } from "@/types";
import Container from "../Container";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { getFontTextStyles } from "@/utils/getFontStyles";
import { getButtonStyles } from "@/utils/getButtonStyles";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";

const LandingHeader = (props: PropsLayoutHF) => {
  const { page } = props;
  const { data } = page;
  const [showHeader, setShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMounted(true);
    setShowHeader(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determine logo dimensions and aspect ratio for styling
  const { width, height } = data.logo.dimensions || { width: 100, height: 100 };
  const aspectRatio = width / height;
  const isWide = aspectRatio > 2;

  return (
    <>
      <header
        // className={`fixed top-5 w-[calc(100%-40px)] md:w-[calc(100%-80px)] left-5 md:left-10 bg-white z-100 flex items-center shadow-lg rounded-lg h-[75px] -translate-y-[150%] ${showHeader ? "translate-y-0" : "-translate-y-[150%]"} transition-all duration-500 ease-inout2 ${isMounted && showHeader ? "duration-800" : "duration-500"}`}
        className={`fixed w-full bg-white z-100 flex items-center shadow-lg rounded-lg h-[75px] -translate-y-[150%] ${showHeader ? "translate-y-0" : "-translate-y-[150%]"} transition-all duration-500 ease-inout2 ${isMounted && showHeader ? "duration-800" : "duration-500"}`}
        style={getFontTextStyles(data)}
      >
        <Container
          className="relative flex justify-between items-center h-full"
          size="full"
        >
          {/* ------ Logo ------ */}
          <Link href={"/"} className="flex items-center gap-2">
            <PrismicNextImage field={data.logo} className={`w-auto object-contain transition-all ${isWide ? 'h-6 lg:h-10 max-w-[200px]' : 'h-6 lg:h-10'}`} />
          </Link>

          {/* ------ Desktop Panel ------ */}
          <div className="hidden lg:flex flex-row justify-between items-center w-full">
            {/* Links */}
            <nav className="flex gap-4">
              {data?.lnks?.map((item, index) => (
                <PrismicNextLink
                  field={item}
                  key={index}
                  className="flex items-center gap-2 ml-6 font-medium text-gray-700 hover:text-gray-900 text-sm"
                >
                  <span>{item.text}</span>
                  <svg width="10px" height="10px" viewBox="0 -4.5 20 20">
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        transform="translate(-220.000000, -6684.000000)"
                        fill="#000000"
                      >
                        <g transform="translate(56.000000, 160.000000)">
                          <path d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </PrismicNextLink>
              ))}
            </nav>

            {/* CTA & Lang */}
            <div className="flex gap-4">
              <PrismicNextLink
                field={data.cta}
                className="flex items-center gap-2 hover:opacity-90 p-3 w-fit text-white transition-opacity duration-300 ease-inout2"
                style={getButtonStyles(data.cta, data) as React.CSSProperties}
              >
                <span>{data.cta?.text}</span>
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
                  <path
                    d="M7.69603 0.870117L12.9993 6.17342M12.9993 6.17342L7.69603 11.4767M12.9993 6.17342L1 6.17342"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                  ></path>
                </svg>
              </PrismicNextLink>
              {/* {props.languages.length > 1 && ( */}
              <LanguageSwitcher languages={props.languages} />
              {/* )} */}
            </div>
          </div>

          {/* ------ Menu Buttons ------ */}
          <div
            className="lg:hidden block z-20 relative my-5 w-8 h-8 cursor-pointer"
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
              absolute top-0 w-full h-screen mt-18.75 bg-[#FFFFFF] lg:hidden 
              transition-all duration-500 ease-in-out flex flex-col
              ${isMenuOpen ? "left-0" : "left-full"}
            `}
          >
            <div className="flex flex-col">
              {/* CTA & Lang */}
              <div className="flex justify-end mx-auto p-6 w-full max-w-3xl">
                <div className="flex gap-4">
                  <PrismicNextLink
                    field={data.cta}
                    className="flex items-center gap-2 hover:opacity-90 p-3 w-fit text-white transition-opacity duration-300 ease-inout2"
                    style={
                      getButtonStyles(data.cta, data) as React.CSSProperties
                    }
                  >
                    <span>{data.cta?.text}</span>
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
                      <path
                        d="M7.69603 0.870117L12.9993 6.17342M12.9993 6.17342L7.69603 11.4767M12.9993 6.17342L1 6.17342"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="currentColor"
                      ></path>
                    </svg>
                  </PrismicNextLink>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col justify-center items-center mx-auto px-8 w-full max-w-3xl">
                {data?.lnks?.map((item, index) => (
                  <PrismicNextLink
                    field={item}
                    key={index}
                    className="flex justify-between items-center py-4 border-[#EEEEEE] border-b w-full"
                  >
                    <span>{item.text}</span>
                    <svg width="10px" height="10px" viewBox="0 -4.5 20 20">
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          transform="translate(-220.000000, -6684.000000)"
                          fill="#000000"
                        >
                          <g transform="translate(56.000000, 160.000000)">
                            <path d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </PrismicNextLink>
                ))}
              </div>

              {/* Lang */}
              {/* {props.languages.length > 1 && ( */}
              <div className="flex justify-center items-center mt-10 w-full">
                <LanguageSwitcher languages={props.languages} />
              </div>
              {/* )} */}
            </div>
          </div>
        </Container>
      </header>
      <div className="h-10" />
    </>
  );
};

export default LandingHeader;
