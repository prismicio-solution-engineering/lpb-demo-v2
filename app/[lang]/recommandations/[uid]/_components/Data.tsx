"use client";

import { useRef } from "react";
import { RecapDocumentData } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

import { DotGrid } from "./DotGrid";
import Container from "@/components/Container";
import { BottomAnimation } from "@/components/Animations/BottomAnimation";

export default function Data({ data }: { data: RecapDocumentData }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      const currentScroll = scrollContainerRef.current.scrollLeft;

      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="pages"
      className="scroll-mt-24 relative bg-[#151515] py-15 pb-50 md:pb-87.5"
    >
      <div className="absolute bottom-0 left-0 bg-[#E8F8F3] w-full">
        <BottomAnimation />
      </div>

      <div className="relative">
        <Container
          size="xl"
          className="flex flex-col items-center text-center gap-16"
        >
          {/* --- HEADER --- */}
          <div className="z-20 flex flex-col items-center text-center gap-6 max-w-175">
            {isFilled.richText(data.data_title) && (
              <PrismicRichText
                field={data.data_title}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="text-4xl font-bold text-[#FFFFFF]">
                      {children}
                    </h2>
                  ),
                }}
              />
            )}

            {isFilled.richText(data.data_text) && (
              <PrismicRichText
                field={data.data_text}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-[#A4A4A4]">{children}</p>
                  ),
                }}
              />
            )}
          </div>

          {/* --- CAROUSEL --- */}
          <div className="relative w-full z-10 p-0 sm:p-8">
            <DotGrid />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full h-175 bg-[radial-gradient(closest-side,#8E44EC7e_0%,transparent_100%)] -z-10 pointer-events-none"></div>

            <div className="relative w-full bg-[#FFFFFF] rounded-2xl p-4 md:p-8 shadow-[0px_0px_64px_0px_#8E44EC7E]">
              {/* NAV */}
              <div className="flex justify-end gap-2 mb-4">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 rounded-full hover:bg-gray-100 border border-gray-200 transition active:scale-95 text-[#505050] cursor-pointer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 rounded-full hover:bg-gray-100 border border-gray-200 transition active:scale-95 text-[#505050] cursor-pointer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* CARDS */}
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-4 items-stretch snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              >
                {data.generated_page.map((item, index) => {
                  const hasAllFields =
                    isFilled.keyText(item.company) &&
                    isFilled.keyText(item.role) &&
                    isFilled.keyText(item.personalization_instructions) &&
                    isFilled.link(item.page_link);

                  if (!hasAllFields) return null;

                  return (
                    <div
                      key={index}
                      className="snap-center shrink-0 w-[80vw] md:w-[320px] lg:w-87.5"
                    >
                      <div className="h-full flex flex-col rounded-xl border border-[#50505032] bg-white p-6 hover:border-[#8E44EC] transition-colors duration-300">
                        <div className="grow flex flex-col gap-5 text-left mb-6">
                          {/* COMPANY */}
                          <div>
                            <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                              {data.agent === "SEO-GEO" ? "Topic" : "Company"}
                            </span>
                            {isFilled.keyText(item.company) && (
                              <h3 className="text-lg font-bold text-[#151515]">
                                {item.company}
                              </h3>
                            )}
                          </div>

                          {/* ROLE */}
                          <div>
                            <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                              {data.agent === "SEO-GEO" ? "Details" : "Role"}
                            </span>
                            {isFilled.keyText(item.role) && (
                              <p className="text-[#505050] font-medium">
                                {item.role}
                              </p>
                            )}
                          </div>

                          {/* INSTRUCTIONS */}
                          <div>
                            <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                              {data.agent === "SEO-GEO"
                                ? "Instructions"
                                : "Personalization Instructions"}
                            </span>
                            {isFilled.keyText(
                              item.personalization_instructions,
                            ) && (
                              <p className="text-sm text-[#505050] whitespace-pre-wrap leading-relaxed">
                                {item.personalization_instructions}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* BUTTON */}
                        <div className="mt-auto pt-4 border-t border-gray-100">
                          {isFilled.link(item.page_link) && (
                            <PrismicNextLink
                              field={item.page_link}
                              target="blank"
                              className="inline-flex justify-center items-center w-full text-[#151515] px-6 py-3 rounded-lg bg-[#E8C7FF] font-medium hover:bg-[#d9a5ff] transition-colors"
                            >
                              View Page
                            </PrismicNextLink>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
