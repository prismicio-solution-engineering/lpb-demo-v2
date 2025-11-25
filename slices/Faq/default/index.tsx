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

  if (slice.variation !== "default") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      <Container className="flex justify-between gap-10 text-left" size="xl">
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
          <PrismicNextLink
            field={slice.primary.btn}
            className="flex hover:opacity-90 p-3 w-fit text-white transition-opacity duration-300 ease-inout2"
            style={
              getButtonStyles(
                slice.primary.btn,
                pageData
              ) as React.CSSProperties
            }
          />
        </div>
        <div className="flex flex-col gap-4 sm:max-w-[700px]">
          {slice.primary.grp?.map((item, index) => {
            const isOpen = selectedIndex === index;
            return (
              <div
                key={index}
                className={`flex flex-col border border-gray-900 overflow-hidden ${isOpen ? "bg-gray-50" : ""}`}
              >
                <div
                  className="flex justify-between items-center hover:bg-gray-50 p-4 transition-colors duration-300 cursor-pointer"
                  onClick={() => toggleItem(index)}
                >
                  <PrismicRichText
                    field={item.question}
                    components={{
                      heading3: ({ children }) => (
                        <h3
                          className="font-bold text-xl"
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
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-4">
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
          })}
        </div>
      </Container>
    </section>
  );
};

export default Faq;
