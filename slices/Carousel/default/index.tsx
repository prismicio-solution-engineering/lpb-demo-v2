"use client";
import { useState } from "react";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { ArticleDocument, LandingDocumentData } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice, context }) => {
  const { pageData, locale } = context as {
    pageData: LandingDocumentData;
    locale?: string;
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 1;
  const maxIndex = Math.max(0, slice.primary.grp.length - itemsPerView);

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";

    const [y, m, d] = isoDate.split("-").map(Number);
    const date = new Date(y, (m ?? 1) - 1, d ?? 1);

    const formattedDate = new Intl.DateTimeFormat(locale || "fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(date);

    return formattedDate
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
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
        className="flex flex-col justify-between gap-10 text-left"
        size="xl"
      >
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-5 sm:max-w-[500px]">
            <PrismicRichText
              field={slice.primary.ontitle}
              components={{
                heading2: ({ children }) => (
                  <h2
                    className="font-bold text-xl"
                    style={getFontHeadingStyles(pageData)}
                  >
                    {children}
                  </h2>
                )
              }}
            />
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
                )
              }}
            />
            <PrismicRichText
              field={slice.primary.txt}
              components={{
                paragraph: ({ children }) => (
                  <p className="leading-7">{children}</p>
                )
              }}
            />
          </div>
          <div className="hover:bg-gray-900 px-4 py-2 border border-gray-900 hover:text-white transition-all duration-200 ease-inout1 cursor-pointer">
            <span>{slice.primary.btn_txt}</span>
          </div>
        </div>
        <div
          className="flex gap-4 transition-transform duration-500 ease-inout2"
          style={{
            transform: `translateX(-${currentIndex * (350 + 16)}px)`
          }}
        >
          {/* Carousel */}
          {slice.primary.grp?.map((item, index) => {
            // To do => fix type any
            const data = (item.article as unknown as ArticleDocument)
              .data as any;
            return (
              <div
                key={index}
                className="flex flex-col gap-5 p-4 border border-gray-900 sm:w-[350px] cursor-pointer"
              >
                <div className="w-full sm:w-[300px] sm:h-[200px]">
                  {data?.img && (
                    <PrismicNextImage
                      field={data.img}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <span
                    className="font-bold text-md"
                    style={{ color: pageData?.primary_color || "#000000" }}
                  >
                    {data?.category?.data?.name}
                  </span>
                  <h4
                    className="font-bold text-2xl"
                    style={getFontHeadingStyles(pageData)}
                  >
                    {data?.title[0].text}
                  </h4>
                  <div className="max-h-[100px] overflow-hidden text-ellipsis line-clamp-3">
                    <PrismicRichText field={data?.desc} />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-10 h-10">
                    <PrismicNextImage
                      field={data?.author?.data.img}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">{data?.author?.data.name}</span>
                    <div className="flex gap-2">
                      <span>{formatDate(data?.date)}</span>
                      <span>•</span>
                      <span>
                        {data?.read_time} {data?.read_time_txt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Nav carousel */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {[...Array(slice.primary.grp.length)]?.map((_, i) => (
              <div
                className={`rounded-full w-2 h-2 cursor-pointer ${
                  i === currentIndex ? "bg-gray-900" : "bg-gray-500"
                }`}
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
