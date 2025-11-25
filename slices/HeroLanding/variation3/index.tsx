"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { getButtonStyles } from "@/utils/getButtonStyles";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { LandingDocumentData } from "@/prismicio-types";
/**
 * Props for `HeroLanding`.
 */
export type HeroLandingProps = SliceComponentProps<
  Content.HeroLandingSlice,
  { pageData: LandingDocumentData }
>;
/**
 * Component for "HeroLanding" Slices.
*/
const HeroLanding: FC<HeroLandingProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: LandingDocumentData };

  if (slice.variation !== "variation3") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`relative flex justify-center h-[75vh] box-border`}
      style={getFontTextStyles(pageData)}
    >
      <Container className="flex justify-between gap-10 text-left h-full z-10 text-white" size="xl">
        <div className="flex flex-col flex-1 justify-center gap-6 max-w-lg">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <h1
                  className="font-bold text-5xl"
                  style={getFontHeadingStyles(pageData)}
                >
                  {children}
                </h1>
              )
            }}
          />
          <PrismicRichText field={slice.primary.txt} />
          <div className="flex gap-2">
            {slice.primary.btns?.map((btn, index) => (
              <PrismicNextLink
                field={btn}
                key={index}
                className="hover:opacity-90 p-3 text-white transition-opacity duration-300 ease-inout2"
                style={getButtonStyles(btn, pageData) as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </Container>
        <div className="
          absolute top-0 left-0 w-full h-full object-fill z-0
          before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-50
        ">
          <PrismicNextImage
            field={slice.primary.img}
            className="w-full h-full object-cover"
          />
        </div>
    </section>
  );
};

export default HeroLanding;
