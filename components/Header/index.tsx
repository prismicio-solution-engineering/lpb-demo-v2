"use client";
import React, { useEffect, useState } from "react";

import { PropsLayoutHF } from "@/types";
import Container from "../Container";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { getFontTextStyles } from "@/utils/getFontStyles";
import { getButtonStyles } from "@/utils/getButtonStyles";
import Link from "next/link";

const Header = (props: PropsLayoutHF) => {
  const { page } = props;
  const { data } = page;
  const [showHeader, setShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

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

  return (
    <>
      <header
        className={`fixed top-5 w-[calc(100%-40px)] md:w-[calc(100%-80px)] left-5 md:left-10 bg-white z-100 flex items-center shadow-lg rounded-lg h-[75px] -translate-y-[150%] ${showHeader ? "translate-y-0" : "-translate-y-[150%]"} transition-all duration-500 ease-inout2 ${isMounted && showHeader ? "duration-800" : "duration-500"}`}
        style={getFontTextStyles(data)}
      >
        <Container className="flex justify-between items-center h-full">
          <Link href={"/"} className="flex items-center gap-2">
            <PrismicNextImage field={data.logo} className="w-auto h-8" />
          </Link>
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
        </Container>
      </header>
      <div className="h-10" />
    </>
  );
};

export default Header;
