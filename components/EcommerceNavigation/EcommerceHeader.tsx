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
      className="z-10 fixed flex flex-col justify-center items-center bg-white py-3 w-screen"
      style={
        {
          ...getFontTextStyles(pageData),
          "--primary-color": pageData.primary_color as string,
          "--secondary-color": pageData.secondary_color as string
        } as CSSProperties
      }
    >
      <Container>
        <div className="flex justify-center">
          <PrismicNextImage field={page.data.logo} className="invert" />
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
