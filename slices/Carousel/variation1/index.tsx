"use client";
import { useState } from "react";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { LandingDocumentData } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { getIconColor, getLightIconColor } from "@/utils/getColors";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: LandingDocumentData };

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 1;
  const maxIndex = Math.max(0, slice.primary.grp.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (slice.variation !== "variation1") return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px] overflow-hidden`}
      style={getFontTextStyles(pageData)}
    >
      <Container
        className="flex flex-col justify-between gap-10 text-left"
        size="xl"
      >
        <div className="flex items-center gap-10">
          <div className="flex justify-between items-end w-full h-full">
            <div className="z-10 flex flex-col flex-1 justify-center items-center gap-5 px-4 sm:min-w-[500px] h-full">
              <PrismicRichText
                field={slice.primary.title}
                components={{
                  heading3: ({ children }) => (
                    <h2
                      className="font-bold text-4xl"
                      style={getFontHeadingStyles(pageData)}
                    >
                      {children}
                    </h2>
                  ),
                }}
              />
              <PrismicRichText
                field={slice.primary.txt}
                components={{
                  paragraph: ({ children }) => (
                    <p className="leading-7">{children}</p>
                  ),
                }}
              />
            </div>
          </div>
          <div className="relative [clip-path:inset(0_0_0_0px)]">
            <div
              className="flex gap-4 transition-transform duration-500 ease-inout2"
              style={{
                transform: `translateX(-${currentIndex * (500 + 16)}px)`,
              }}
            >
              {/* Carousel */}
              {slice.primary.grp?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-5 sm:w-[500px] cursor-pointer"
                  >
                    <div className="w-full sm:w-full h-full aspect-square">
                      {item?.img && (
                        <PrismicNextImage
                          field={item.img}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Nav carousel */}
        <div className="flex flex-row-reverse items-center gap-102 ml-auto sm:max-w-[500px]">
          <div className="flex gap-2">
            {[...Array(slice.primary.grp.length)]?.map((_, i) => (
              <div
                className={`rounded-full cursor-pointer w-2 h-2`}
                style={
                  i === currentIndex
                    ? getIconColor(pageData)
                    : getLightIconColor(pageData)
                }
                key={i}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="group hover:bg-gray-900 disabled:opacity-50 p-1 border border-gray-900 rounded-full rotate-180 transition-all duration-200 ease-in-out cursor-pointer"
            >
              <svg
                fill="#000000"
                width="25px"
                height="25px"
                viewBox="0 0 256 256"
                className="group-hover:fill-white"
              >
                <path d="M218.82812,130.82812l-72,72a3.99957,3.99957,0,0,1-5.65625-5.65625L206.34326,132H40a4,4,0,0,1,0-8H206.34326L141.17187,58.82812a3.99957,3.99957,0,0,1,5.65625-5.65625l72,72A3.99854,3.99854,0,0,1,218.82812,130.82812Z" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="group hover:bg-gray-900 disabled:opacity-50 p-1 border border-gray-900 rounded-full transition-all duration-200 ease-in-out cursor-pointer"
            >
              <svg
                fill="#000000"
                width="25px"
                height="25px"
                viewBox="0 0 256 256"
                className="group-hover:fill-white"
              >
                <path d="M218.82812,130.82812l-72,72a3.99957,3.99957,0,0,1-5.65625-5.65625L206.34326,132H40a4,4,0,0,1,0-8H206.34326L141.17187,58.82812a3.99957,3.99957,0,0,1,5.65625-5.65625l72,72A3.99854,3.99854,0,0,1,218.82812,130.82812Z" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Carousel;
