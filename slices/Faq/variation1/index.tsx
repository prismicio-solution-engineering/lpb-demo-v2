"use client";
import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { PrismicNextLink } from "@prismicio/next";
import { getButtonStyles } from "@/utils/getButtonStyles";
import { LandingDocumentData } from "@/prismicio-types";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq: FC<FaqProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: LandingDocumentData };
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  type FaqItemProps = {
    item: (typeof slice.primary.grp)[0];
    index: number;
  };

  const FaqItem: FC<FaqItemProps> = ({ item, index }) => {
    const isOpen = selectedIndex === index;

    if (slice.variation !== "variation1" || !item) return null;
    return (
      <div
        className={`break-inside-avoid flex flex-col border border-gray-900 overflow-hidden ${isOpen ? "bg-gray-50" : ""}`}
      >
        <div
          className="flex justify-between items-center hover:bg-gray-50 p-4 text-left transition-colors duration-300 cursor-pointer"
          onClick={() => toggleItem(index)}
        >
          <PrismicRichText
            field={item.question}
            components={{
              heading3: ({ children }) => (
                <h3
                  className="font-bold text-lg"
                  style={getFontHeadingStyles(pageData)}
                >
                  {children}
                </h3>
              )
            }}
          />
          <div className="relative w-6 h-6 cursor-pointer">
            <div className="top-1/2 left-1/2 absolute bg-gray-900 w-4 h-0.5 -translate-x-1/2 -translate-y-1/2 transform" />
            <div
              className={`top-1/2 left-1/2 absolute bg-gray-900 w-4 h-0.5 -translate-x-1/2 -translate-y-1/2 transform transition-transform duration-300 ease-inout2 ${
                isOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
          </div>
        </div>
        <div
          className={`transition-all duration-300 ease-inout2 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-[0px] opacity-0"
          }`}
        >
          <div className="px-4 pb-4 text-left">
            <PrismicRichText
              field={item.answer}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-gray-700">{children}</p>
                )
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  if (slice.variation !== "variation1") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      <Container
        className="flex flex-col justify-center items-center gap-10 text-center"
        size="xl"
      >
        <div className="flex flex-col flex-1 gap-4">
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
              )
            }}
          />
          <PrismicRichText
            field={slice.primary.txt}
            components={{
              paragraph: ({ children }) => (
                <p className="text-gray-700 text-lg leading-7">{children}</p>
              )
            }}
          />
        </div>
        {/* Mobile */}
        <div className="sm:hidden flex flex-col gap-4">
          {slice.primary.grp?.map((item, index) => (
            <FaqItem key={index} item={item} index={index} />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden gap-4 sm:grid sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            {slice.primary.grp?.map((item, index) =>
              index % 2 === 0 ? (
                <FaqItem key={index} item={item} index={index} />
              ) : null
            )}
          </div>
          <div className="flex flex-col gap-4">
            {slice.primary.grp?.map((item, index) =>
              index % 2 === 1 ? (
                <FaqItem key={index} item={item} index={index} />
              ) : null
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <PrismicRichText
            field={slice.primary.title_foot}
            components={{
              heading4: ({ children }) => (
                <h4
                  className="font-bold text-2xl"
                  style={getFontHeadingStyles(pageData)}
                >
                  {children}
                </h4>
              )
            }}
          />
          <PrismicRichText
            field={slice.primary.txt_foot}
            components={{
              paragraph: ({ children }) => (
                <p className="text-gray-700 text-lg leading-7">{children}</p>
              )
            }}
          />
        </div>
        <div className="flex -mt-2">
          <PrismicNextLink
            field={slice.primary.btn}
            className="flex hover:opacity-90 p-3 text-white transition-opacity duration-300 ease-inout2"
            style={
              getButtonStyles(
                slice.primary.btn,
                pageData
              ) as React.CSSProperties
            }
          />
        </div>
      </Container>
    </section>
  );
};

export default Faq;
