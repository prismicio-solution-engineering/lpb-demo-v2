"use client";
import { useEffect, useState } from "react";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { ArticleDocument, LandingDocumentData } from "@/prismicio-types";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { getIconColor, getLightIconColor } from "@/utils/getColors";
import { getButtonStyles } from "@/utils/getButtonStyles";

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
  const [itemsPerView, setItemsPerView] = useState(1);
  // const itemsPerView = 1;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3); // Desktop : 3 articles
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2); // Tablette : 2 articles
      } else {
        setItemsPerView(1); // Mobile : 1 article
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalItems = slice.primary.grp.length;
  const maxIndex = Math.max(0, slice.primary.grp.length - itemsPerView);
  const showNavigation = totalItems > itemsPerView;

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";

    const [y, m, d] = isoDate.split("-").map(Number);
    const date = new Date(y, (m ?? 1) - 1, d ?? 1);

    const formattedDate = new Intl.DateTimeFormat(locale || "fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);

    return formattedDate
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const GAP_PX = 16; 
  const gapWidthPx = GAP_PX * Math.max(0, totalItems - 1);

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
                ),
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
          <div
            className="px-4 py-2 hover:opacity-90 text-white  transition-all duration-200 ease-inout1 cursor-pointer"
            style={getButtonStyles("Primary", pageData)}
          >
            <span>{slice.primary.btn_txt}</span>
          </div>
        </div>
        <div
          className="flex gap-4 justify-center transition-transform duration-500 ease-inout2"
          style={{
            width: `calc(${(totalItems / itemsPerView) * 100}% + ${gapWidthPx}px)`,
            transform: `translateX(-${(currentIndex * 100) / totalItems}%)`,
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
                className="flex flex-col rounded-xl shadow-[4px_4px_24px_0px_rgba(175,175,175,0.25)] overflow-hidden"
                style={{ 
                    // Chaque item prend exactement la largeur nécessaire (1/total)
                    flex: `0 0 calc((100% - ${gapWidthPx}px) / ${totalItems})` 
                  }}
              >
                <div className="w-full rounded-t-xl">
                  {data?.img && (
                    <PrismicNextImage
                      field={data.img}
                      className="w-full h-full aspect-video object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex justify-between">
                    <span
                      className="text-sm"
                      style={{ color: pageData?.primary_color || "#000000" }}
                    >
                      {data?.category?.data?.name}
                    </span>
                    <span className="text-sm">{formatDate(data?.date)}</span>
                  </div>
                  <h4
                    className="font-bold text-3xl"
                    style={getFontHeadingStyles(pageData)}
                  >
                    {data?.title[0].text}
                  </h4>
                  <div className="text-sm max-h-[100px] overflow-hidden text-ellipsis line-clamp-3">
                    <PrismicRichText field={data?.desc} />
                  </div>
                  <PrismicNextLink
                    href={"#"}
                    className="mt-2 text-sm hover:underline"
                    style={{ color: pageData?.primary_color || "#000000" }}
                  >
                    Read more →
                  </PrismicNextLink>
                </div>
              </div>
            );
          })}
        </div>
        {/* Nav carousel */}
        {showNavigation && (
          <div className="px-4 flex justify-between items-center mt-4">
            <div className="hidden lg:block"></div>
            <div className="flex gap-2">
              {/* Correction de la boucle des points : maxIndex + 1 */}
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full w-2 h-2 cursor-pointer transition-colors duration-300`}
                  style={
                    i === currentIndex
                      ? getIconColor(pageData)
                      : getLightIconColor(pageData)
                  }
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="group hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed p-2 border border-gray-900 rounded-full rotate-180 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <svg
                  fill="#000000"
                  width="20px"
                  height="20px"
                  viewBox="0 0 256 256"
                  className="group-hover:fill-white transition-colors"
                >
                  <path d="M218.82812,130.82812l-72,72a3.99957,3.99957,0,0,1-5.65625-5.65625L206.34326,132H40a4,4,0,0,1,0-8H206.34326L141.17187,58.82812a3.99957,3.99957,0,0,1,5.65625-5.65625l72,72A3.99854,3.99854,0,0,1,218.82812,130.82812Z" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
                className="group hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed p-2 border border-gray-900 rounded-full transition-all duration-200 ease-in-out cursor-pointer"
              >
                <svg
                  fill="#000000"
                  width="20px"
                  height="20px"
                  viewBox="0 0 256 256"
                  className="group-hover:fill-white transition-colors"
                >
                  <path d="M218.82812,130.82812l-72,72a3.99957,3.99957,0,0,1-5.65625-5.65625L206.34326,132H40a4,4,0,0,1,0-8H206.34326L141.17187,58.82812a3.99957,3.99957,0,0,1,5.65625-5.65625l72,72A3.99854,3.99854,0,0,1,218.82812,130.82812Z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Carousel;
