"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { PrismicNextImage } from "@prismicio/next";
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

  if (slice.variation !== "variation2") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      <Container className="flex justify-between gap-20 text-left" size="xl">
        <div className="flex flex-col flex-1 justify-center gap-5">
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
          <div className="flex flex-col gap-4">
            <form className="flex flex-wrap gap-2">
              <input
                className="flex-1 border-grayscale-900 p-2 border"
                style={{
                  outlineColor: pageData?.primary_color || "#000"
                }}
                placeholder={slice.primary.input_placeholder || "Your email"}
              />
              <button
                type="submit"
                style={getButtonStyles("Primary", pageData)}
                className="hover:opacity-90 transition-opacity duration-300 ease-inout2 cursor-pointer"
              >
                <span className="text-white">{slice.primary.btn_txt}</span>
              </button>
            </form>
            <PrismicRichText
              field={slice.primary.legals_dsc}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-gray-600 text-xs">{children}</p>
                )
              }}
            />
          </div>
        </div>
        <div className="flex-1 max-w-[1000px]">
          <PrismicNextImage
            field={slice.primary.img}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
};

export default HeroLanding;
