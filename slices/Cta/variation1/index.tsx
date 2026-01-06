"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { getButtonStyles } from "@/utils/getButtonStyles";
import { LandingDocumentData } from "@/prismicio-types";
import { getLightBackgroundColor } from "@/utils/getColors";

/**
 * Props for `Cta`.
 */
export type CtaProps = SliceComponentProps<Content.CtaSlice>;

/**
 * Component for "Cta" Slices.
 */
const Cta: FC<CtaProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: LandingDocumentData };

  if (slice.variation !== "variation1") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={{
        ...getFontTextStyles(pageData),
        ...getLightBackgroundColor(pageData),
      }}
    >
      <Container className="flex flex-col gap-20" size="xl">
        <div className="flex flex-col lg:flex-row items-start gap-10">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2
                  className="font-bold text-4xl"
                  style={getFontHeadingStyles(pageData)}
                >
                  {children}
                </h2>
              ),
            }}
          />
          <div className="flex flex-col gap-8 sm:max-w-[600px]">
            <PrismicRichText field={slice.primary.txt} />
            <div className="flex gap-2">
              {slice?.primary?.btns?.map((btn, index) => (
                <PrismicNextLink
                  field={btn}
                  key={index}
                  className="hover:opacity-90 p-3 text-white transition-opacity duration-300 ease-inout2"
                  style={getButtonStyles(btn, pageData) as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full sm:max-h-[600px]">
          <PrismicNextImage
            field={slice.primary.img}
            className="w-full h-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
};

export default Cta;
