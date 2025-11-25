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

  if (slice.variation !== "variation2") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      <Container className="flex flex-col gap-15" size="xl">
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
        <div className="flex flex-col border-b border-b-gray-900">
          {slice.primary.grp?.map((item, index) => {
            const isOpen = selectedIndex === index;
            return (
              <div
                key={index}
                className="flex flex-col py-1 border-t border-t-gray-900 overflow-hidden"
              >
                <div
                  className="flex justify-between items-center py-4 transition-colors duration-300 cursor-pointer"
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
                    <svg
                      width="15px"
                      height="15px"
                      viewBox="0 -4.5 20 20"
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-inout2 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          transform="translate(-220.000000, -6684.000000)"
                          fill="#000000"
                        >
                          <g transform="translate(56.000000, 160.000000)">
                            <path d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div
                  className={`transition-all duration-300 ease-inout2 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pr-4 pb-4">
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
        <div className="flex -mt-10">
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
