"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { LandingDocumentData } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: LandingDocumentData };
  if (slice.variation !== "variation2") return null;

  const itemWidth = 160;
  const groupWidth = slice.primary.grp.length * itemWidth;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      <Container
        className="flex flex-col justify-between gap-10 text-left"
        size="full"
      >
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading2: ({ children }) => (
              <h2
                className="font-bold text-4xl text-center"
                style={getFontHeadingStyles(pageData)}
              >
                {children}
              </h2>
            ),
          }}
        />
        <div className="relative overflow-hidden">
          <div
            className="flex"
            style={{
              animation: `scroll-left 10s linear infinite`,
              width: `${groupWidth * 2}px`,
            }}
          >
            {Array.from({ length: 4 }, (_, groupIndex) =>
              slice.primary.grp.map((item, index) => (
                <div
                  key={`group-${groupIndex}-${index}`}
                  className="shrink-0 mx-4 w-32 h-16"
                >
                  <PrismicNextImage
                    field={item.logo}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </Container>
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${groupWidth}px);
          }
        }
      `}</style>
    </section>
  );
};

export default Carousel;
