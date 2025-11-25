"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { PrismicNextLink } from "@prismicio/next";
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

  if (slice.variation !== "variation1") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      <Container className="flex justify-between gap-10 text-left" size="xl">
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
        <div className="flex-1 max-w-[1000px] h-full">
          {slice.primary.video?.embed_url && (
            <iframe
              src={slice.primary.video.embed_url.replace("watch?v=", "embed/")}
              title={slice.primary.video.title as string}
              className="rounded-lg w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </Container>
    </section>
  );
};

export default HeroLanding;
