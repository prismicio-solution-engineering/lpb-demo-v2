"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { PrismicNextImage } from "@prismicio/next";
import { getButtonStyles } from "@/utils/getButtonStyles";
import { LandingDocumentData } from "@/prismicio-types";

/**
 * Props for `Cta`.
 */
export type CtaProps = SliceComponentProps<Content.CtaSlice>;

/**
 * Component for "Cta" Slices.
 */
const Cta: FC<CtaProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: LandingDocumentData };

  if (slice.variation !== "variation2") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      <div className="absolute w-full h-full sm:max-h-[400px] overflow-hidden">
        <PrismicNextImage
          field={slice.primary.img}
          className="brightness-30 w-full h-full object-cover"
        />
      </div>
      <Container
        className="relative flex flex-col justify-center items-center gap-20 py-10"
        size="xl"
      >
        <div className="flex flex-col items-center gap-5">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2
                  className="font-bold text-white text-4xl"
                  style={getFontHeadingStyles(pageData)}
                >
                  {children}
                </h2>
              )
            }}
          />
          <div className="flex flex-col justify-center items-center gap-4 sm:max-w-[600px]">
            <PrismicRichText
              field={slice.primary.txt}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-white text-center">{children}</p>
                )
              }}
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <form className="flex flex-wrap justify-center items-center gap-2">
              <input
                className="flex-1 p-2 border border-white text-white"
                style={{
                  outlineColor: "#FFFFFF"
                }}
                placeholder={slice.primary.input_placeholder || "Your email"}
              />
              <button
                type="submit"
                className="bg-white! hover:opacity-90 transition-opacity duration-300 ease-inout2 cursor-pointer"
                style={getButtonStyles("Primary", pageData)}
              >
                <span className="text-gray-900">{slice.primary.btn_txt}</span>
              </button>
            </form>
            <PrismicRichText
              field={slice.primary.legals_dsc}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-white text-xs text-center">{children}</p>
                )
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Cta;
