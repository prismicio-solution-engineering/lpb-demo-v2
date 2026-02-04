"use client";
import { CSSProperties } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Container from "../Container";
import { EcommerceDocument } from "@/prismicio-types";
import { getFontTextStyles } from "@/utils/getFontStyles";
const EcommerceHeader = ({ page }: { page: EcommerceDocument }) => {
  const pageData = page.data;
  
  return (
    <header
      className="z-10 fixed top-0 left-0 flex flex-col justify-center items-center bg-white py-4 w-screen"
      style={
        {
          ...getFontTextStyles(pageData),
          "--primary-color": pageData.primary_color as string,
          "--secondary-color": pageData.secondary_color as string
        } as CSSProperties
      }
    >
      <Container className="relative flex items-center">
        <div className="relative w-full flex justify-center items-center">
          <div className="h-full left-5 absolute flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M17.8467 17.1064L13.7568 13.0165C15.0121 11.5851 15.7047 9.77389 15.7047 7.85232C15.7047 5.75479 14.8877 3.78302 13.4047 2.29997C11.9216 0.816927 9.94987 0 7.85235 0C5.75482 0 3.78305 0.816927 2.3 2.29997C0.816958 3.78302 3.05176e-05 5.75479 3.05176e-05 7.85232C3.05176e-05 9.94984 0.816958 11.9216 2.3 13.4047C3.78305 14.8877 5.75482 15.7046 7.85235 15.7046C9.77392 15.7046 11.5851 15.012 13.0165 13.7568L17.1064 17.8466C17.2087 17.9489 17.3426 18 17.4765 18C17.6105 18 17.7444 17.9489 17.8467 17.8466C18.0512 17.6421 18.0512 17.3109 17.8467 17.1064ZM3.04025 12.6644C1.75504 11.379 1.04701 9.66995 1.04701 7.85232C1.04701 6.03468 1.75504 4.32568 3.04025 3.04022C4.32571 1.75501 6.03471 1.04698 7.85235 1.04698C9.66998 1.04698 11.379 1.75501 12.6644 3.04022C13.9496 4.32568 14.6577 6.03468 14.6577 7.85232C14.6577 9.66995 13.9496 11.379 12.6644 12.6644C11.379 13.9496 9.66998 14.6577 7.85235 14.6577C6.03471 14.6577 4.32571 13.9496 3.04025 12.6644Z"
                fill="#1D2424"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="border-b border-b-gray-900 text-(--primary-color) placeholder:text-(--primary-color) outline-0"
            />
          </div>
          <div className="flex justify-center">
            <PrismicNextImage field={page.data.logo} className="w-auto object-contain transition-all h-8 lg:h-12 max-w-[200px]" />
          </div>
        </div>
        <ul className="flex justify-between mt-4">
          {page.data.lnks.map((item, index) => (
            <li
              key={index}
              className=" text-(--primary-color) hover:text-(--secondary-color) text-sm"
            >
              <PrismicNextLink field={item} />
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
};
export default EcommerceHeader;
