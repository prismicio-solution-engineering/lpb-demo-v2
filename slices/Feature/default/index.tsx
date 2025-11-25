"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { getButtonStyles } from "@/utils/getButtonStyles";
import Container from "@/components/Container";
import { LandingDocumentData } from "@/prismicio-types";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Feature`.
 */
export type FeatureProps = SliceComponentProps<Content.MediaFeatureSlice>;

const Feature: FC<FeatureProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: LandingDocumentData };

  const content = (
    <div className="flex flex-col flex-1 justify-left gap-5 text-left">
      <p>{slice.primary.tagline}</p>
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
      <PrismicRichText field={slice.primary.description}></PrismicRichText>
      <div className="flex gap-2">
        {slice.primary.buttons?.map((btn: any, index: number) => (
          <PrismicNextLink
            field={btn}
            key={index}
            className="hover:opacity-90 p-3 text-white transition-opacity duration-300 ease-inout2"
            style={getButtonStyles(btn, pageData) as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );

  const image = (
    <div className="flex-1 max-w-[1000px] w-full aspect-square">
      <PrismicNextImage
        field={slice.primary.image}
        className="rounded-lg w-full h-full object-cover"
      />
    </div>
  );

  if (slice.variation !== "default") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex justify-center py-[60px]"
    >
      <Container
        className="flex flex-col md:flex-row justify-center items-center gap-10 text-center"
        size="lg"
      >
        {slice.primary.image_side ? (
          <>
            {content}
            {image}
          </>
        ) : (
          <>
            {image}
            {content}
          </>
        )}
      </Container>
    </section>
  );
};

export default Feature;
