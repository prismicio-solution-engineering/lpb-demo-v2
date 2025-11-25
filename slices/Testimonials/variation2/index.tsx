"use client";
import { useState, useEffect } from "react";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { LandingDocumentData } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials: FC<TestimonialsProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: LandingDocumentData };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerView = 1;
  const totalItems = slice.primary.grp.length;
  const maxIndex = Math.max(0, Math.ceil(totalItems / itemsPerView) - 1);

  const changeIndex = (newIndex: number) => {
    if (newIndex === currentIndex) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      changeIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex, currentIndex]);

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerView;
    return slice.primary.grp.slice(startIndex, startIndex + itemsPerView);
  };

  if (slice.variation !== "variation2") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px] overflow-hidden`}
      style={getFontTextStyles(pageData)}
    >
      <Container
        className="flex flex-col justify-center items-center gap-4"
        size="xl"
      >
        <div
          className={`flex justify-center gap-4 transition-opacity duration-500 ease-inout2 mt-5 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {getCurrentItems().map((item, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className="flex flex-col justify-center items-center gap-8 p-4 sm:min-w-[50%] sm:max-w-[50%]"
            >
              <div className="max-w-30 h-full">
                {"logo" in item && item.logo && (
                  <PrismicNextImage
                    field={item.logo}
                    className="w-full h-full object-contain object-left"
                    priority
                  />
                )}
              </div>
              <div className="flex flex-col gap-10 sm:min-h-[300px]">
                <PrismicRichText
                  field={item.quote}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="font-bold text-lg text-center">
                        "{children}"
                      </p>
                    )
                  }}
                />
                <div className="flex flex-col justify-center items-center gap-4 w-full">
                  <div className="w-14 h-14">
                    <PrismicNextImage
                      field={item.img}
                      className="rounded-full w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="flex flex-col text-center">
                    <PrismicRichText
                      field={item.author}
                      components={{
                        paragraph: ({ children }) => (
                          <span className="font-bold">{children}</span>
                        )
                      }}
                    />
                    <PrismicRichText field={item.company} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ease-in-out cursor-pointer ${
                index === currentIndex ? "bg-gray-900" : "bg-gray-300"
              }`}
              onClick={() => changeIndex(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
