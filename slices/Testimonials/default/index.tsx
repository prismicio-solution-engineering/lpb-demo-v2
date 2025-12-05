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
  const itemsPerView = 3;
  const totalItems = slice.primary.grp.length;
  const pages = Math.max(1, Math.ceil(totalItems / itemsPerView));
  const maxIndex = Math.max(0, pages - 1);
  const gapWidth = 16 * (itemsPerView - 3);

  const changeIndex = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      changeIndex(nextIndex);
    }, 8000);

    return () => clearInterval(interval);
  }, [maxIndex, currentIndex]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        fill={index < rating ? "#000000" : "#e5e7eb"}
        height="20px"
        width="20px"
        viewBox="0 0 329.942 329.942"
      >
        <path
          id="XMLID_16_"
          d="M329.208,126.666c-1.765-5.431-6.459-9.389-12.109-10.209l-95.822-13.922l-42.854-86.837
c-2.527-5.12-7.742-8.362-13.451-8.362c-5.71,0-10.925,3.242-13.451,8.362l-42.851,86.836l-95.825,13.922
c-5.65,0.821-10.345,4.779-12.109,10.209c-1.764,5.431-0.293,11.392,3.796,15.377l69.339,67.582L57.496,305.07
c-0.965,5.628,1.348,11.315,5.967,14.671c2.613,1.899,5.708,2.865,8.818,2.865c2.387,0,4.784-0.569,6.979-1.723l85.711-45.059
l85.71,45.059c2.208,1.161,4.626,1.714,7.021,1.723c8.275-0.012,14.979-6.723,14.979-15c0-1.152-0.13-2.275-0.376-3.352
l-16.233-94.629l69.339-67.583C329.501,138.057,330.972,132.096,329.208,126.666z"
        />
      </svg>
    ));
  };

  if (slice.variation !== "default") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px] overflow-hidden`}
      style={getFontTextStyles(pageData)}
    >
      <Container
        className="flex flex-col justify-between gap-4 text-left"
        size="xl"
      >
        <div className="flex flex-col justify-center gap-4 text-center">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2
                  className="font-bold text-4xl leading-tight"
                  style={getFontHeadingStyles(pageData)}
                >
                  {children}
                </h2>
              )
            }}
          />
          <PrismicRichText field={slice.primary.txt} />
        </div>
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-800 ease-inout2"
            style={{
              width: `calc(${(totalItems / itemsPerView) * 100}% + ${gapWidth}px)`,
              transform: `translateX(-${(currentIndex * itemsPerView * 100) / totalItems}%)`
            }}
          >
            {slice.primary.grp.map((item, index) => (
              <div
                key={index}
                className="box-border flex flex-col gap-4 p-6 border border-gray-900 sm:max-w-[355px]"
                style={{ flex: `0 0 ${100 / totalItems}%` }}
              >
                <div className="flex gap-1">
                  {"rate" in item &&
                    item.rate &&
                    renderStars(parseInt(item.rate as string))}
                </div>
                <div className="flex flex-col justify-between sm:min-h-60">
                  <PrismicRichText
                    field={item.quote}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="min-h-36">"{children}"</p>
                      )
                    }}
                  />
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10">
                      <PrismicNextImage
                        field={item.img}
                        className="rounded-full w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <div className="flex flex-col">
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
