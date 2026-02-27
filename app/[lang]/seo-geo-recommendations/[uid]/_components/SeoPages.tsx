"use client";

import { useRef, useState } from "react";
import { SeoGeoRecapDocumentData } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

import Container from "@/components/Container";
import { BottomAnimation } from "@/components/Animations/BottomAnimation";
// Import conservé si tu l'utilises ailleurs, sinon tu peux le retirer
import { col, div } from "motion/react-client";

import AiLogo from "@/assets/AI/prismic-ai.svg";
import { DotGrid } from "./DotGrid";

function getSafeMentionRate(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getSafeAveragePosition(value: number) {
  const clampedValue = Math.max(1, Math.min(10, value));
  return clampedValue.toFixed(2);
}

function getSafeRankPosition(value: number) {
  return Math.max(1, Math.min(999, Math.round(value)));
}

export default function SeoPages({ data }: { data: SeoGeoRecapDocumentData }) {
  const validPages = data.generated_page.filter((item) => {
    return (
      isFilled.keyText(item.title) &&
      isFilled.number(item.mention_rate) &&
      isFilled.link(item.page_link)
    );
  });

  // State to manage stacking order
  const [order, setOrder] = useState<number[]>(validPages.map((_, i) => i));

  // move a card to the front when clicked
  const bringToFront = (clickedIndex: number) => {
    setOrder((prevOrder) => {
      const newOrder = prevOrder.filter((i) => i !== clickedIndex);
      return [clickedIndex, ...newOrder];
    });
  };

  const colorClasses = {
    good: "text-[#3BBB96]",
    average: "text-[#ED6B22]",
    poor: "text-[#F97289]",
  };

  function getColorClass(value: number) {
    if (value >= 80) {
      return colorClasses.good;
    } else if (value >= 50) {
      return colorClasses.average;
    } else {
      return colorClasses.poor;
    }
  }

  return (
    <section
      id="pages"
      className="scroll-mt-24 relative bg-[#151515] py-15 pb-50 md:pb-87.5"
    >
      <div className="absolute bottom-0 left-0 bg-[#FFFFFF] w-full">
        <BottomAnimation />
      </div>

      <div className="relative">
        <Container
          size="xl"
          className="flex flex-col items-center text-center gap-16"
        >
          {/* --- HEADER --- */}
          <div className="z-20 flex flex-col items-center text-center gap-6 max-w-175">
            {isFilled.richText(data.pages_title) && (
              <PrismicRichText
                field={data.pages_title}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="text-4xl font-bold text-[#FFFFFF]">
                      {children}
                    </h2>
                  ),
                }}
              />
            )}

            {isFilled.richText(data.pages_text) && (
              <PrismicRichText
                field={data.pages_text}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-[#A4A4A4]">{children}</p>
                  ),
                }}
              />
            )}
          </div>

          <div className="relative w-full z-10 p-0 sm:p-8">
            <DotGrid />
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 sm:-translate-y-1/10 w-full h-175 bg-[radial-gradient(closest-side,#3BBB967e_0%,transparent_100%)] -z-10 pointer-events-none"></div>
            
            {/* --- PAGES : CONTENEUR MODIFIÉ --- */}
            <div className={`relative w-full max-w-125 mx-auto h-[700px] sm:h-[500px] mt-${validPages.length * 16} lg:mt-0 px-4{`}>
              
              {validPages.map((item, originalIndex) => {
                // calculate card position in the stack
                const stackIndex = order.indexOf(originalIndex);
                const isFront = stackIndex === 0;

                return (
                  <div
                    key={originalIndex}
                    onClick={() => bringToFront(originalIndex)}
                    style={{
                      zIndex: validPages.length - stackIndex,
                      scale: 1 - stackIndex * 0.025, // reduce size
                      "--stack-index": stackIndex, // pass index to tailwind
                    } as React.CSSProperties}
                    className={`
                      absolute cursor-pointer transition-all duration-500 ease-out
                      w-full h-full max-w-125 p-8 flex flex-col items-start justify-between gap-4 bg-[#1F1F1F] rounded-2xl
                      border border-[#333333] hover:border-[#3BBB96] shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                      origin-bottom lg:origin-left

                      // mobile
                      bottom-[calc(var(--stack-index)*64px)]
                      left-0 right-0 mx-auto

                      // desktop
                      lg:bottom-auto
                      lg:top-1/2 lg:-translate-y-1/2
                      lg:left-[calc(var(--stack-index)*96px)]
                      lg:right-auto lg:mx-0

                      ${!isFront ? "brightness-75 hover:brightness-100" : "brightness-100"}
                    `}
                  >

                    {/* Header */}
                    <div className="w-full flex flex-col items-start min-w-0">
                      {isFilled.keyText(item.eyebrow) && (
                        <span className="w-full text-sm text-left font-semibold text-[#A4A4A4] uppercase truncate">
                          {item.eyebrow}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-left text-[#FFFFFF] line-clamp-2">
                        {item.title}
                      </h3>
                    </div>

                    {/* Metrics */}
                    <div className="w-full py-4 flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between sm:items-end">
                      
                      {/* Mention rate */}
                      <div className="w-fit flex flex-col items-start">
                        <div className="flex gap-1 items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="#A4A4A4"><path d="M300-520q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm0-80q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600Zm360 440q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm42.5-97.5Q720-275 720-300t-17.5-42.5Q685-360 660-360t-42.5 17.5Q600-325 600-300t17.5 42.5Q635-240 660-240t42.5-17.5ZM177-216q0-17 11-28l528-528q11-11 28-11t28 11q11 11 11 28t-11 28L244-188q-11 11-28 11t-28-11q-11-11-11-28Z"/></svg>
                          <span className="text-[12px] font-semibold uppercase text-[#A4A4A4]">
                            Mention rate
                          </span>
                        </div>
                        <span className={`text-[80px] font-bold ${getColorClass(Number(item.mention_rate))} leading-none`}>
                          {getSafeMentionRate(Number(item.mention_rate))}%
                        </span>
                      </div>

                      {/* Average position */}
                      {isFilled.number(item.average_position) && (
                        <div className="w-fit flex flex-col items-start gap-1">
                          <div className="flex gap-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="#A4A4A4">
                              <path d="M120-120q-17 0-28.5-11.5T80-160v-400q0-17 11.5-28.5T120-600h140q17 0 28.5 11.5T300-560v400q0 17-11.5 28.5T260-120H120Zm290 0q-17 0-28.5-11.5T370-160v-640q0-17 11.5-28.5T410-840h140q17 0 28.5 11.5T590-800v640q0 17-11.5 28.5T550-120H410Zm290 0q-17 0-28.5-11.5T660-160v-320q0-17 11.5-28.5T700-520h140q17 0 28.5 11.5T880-480v320q0 17-11.5 28.5T840-120H700Z" />
                            </svg>
                            <span className="text-[12px] font-semibold uppercase text-[#A4A4A4]">
                              Average pos
                            </span>
                          </div>
                          <span className={`text-[32px] font-bold ${getColorClass(Number(item.mention_rate))} leading-none`}>
                            {getSafeAveragePosition(Number(item.average_position))}
                          </span>
                        </div>
                      )}

                      {/* Ranking */}
                      {isFilled.number(item.rank_position) && (
                        <div className="w-fit flex flex-col items-start gap-1">
                          <div className="flex gap-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="#A4A4A4">
                              <path d="M536.5-543.5Q560-567 560-600t-23.5-56.5Q513-680 480-680t-56.5 23.5Q400-633 400-600t23.5 56.5Q447-520 480-520t56.5-23.5ZM280-528v-152h-80v40q0 38 22 68.5t58 43.5Zm400 0q36-13 58-43.5t22-68.5v-40h-80v152ZM440-200v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80q0-33 23.5-56.5T360-840h240q33 0 56.5 23.5T680-760h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h120q17 0 28.5 11.5T680-160q0 17-11.5 28.5T640-120H320q-17 0-28.5-11.5T280-160q0-17 11.5-28.5T320-200h120Z" />
                            </svg>
                            <span className="text-[12px] font-semibold uppercase text-[#A4A4A4]">
                              Ranking
                            </span>
                          </div>
                          <span className={`text-[32px] font-bold ${getColorClass(Number(item.mention_rate))} leading-none`}>
                            {getSafeRankPosition(Number(item.rank_position))}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Solution */}
                    <div className="w-full flex flex-col items-start gap-4 mt-auto">
                      {/* Solution name */}
                      {isFilled.keyText(item.solution_name) ? (
                        <div className="w-fit px-3 py-1.5 flex justify-start items-center gap-2 bg-[#3bbb9740] rounded-lg">
                          <div
                            className="relative z-20 w-[20px] h-[20px] bg-[#3BBB96]"
                            style={{
                              maskImage: `url(${AiLogo.src})`,
                              maskSize: "contain",
                              maskRepeat: "no-repeat",
                              maskPosition: "center",
                              WebkitMaskImage: `url(${AiLogo.src})`,
                              WebkitMaskSize: "contain",
                              WebkitMaskRepeat: "no-repeat",
                              WebkitMaskPosition: "center",
                            }}
                          />
                          <span className="text-[12px] font-bold text-left text-[#3BBB96] uppercase">
                            {item.solution_name}
                          </span>
                        </div>
                      ) : (
                        <div className="w-fit px-3 py-1.5 flex justify-start items-center gap-2 bg-[#3bbb9740] rounded-lg">
                          <div
                            className="relative z-20 w-[20px] h-[20px] bg-[#3BBB96]"
                            style={{
                              maskImage: `url(${AiLogo.src})`,
                              maskSize: "contain",
                              maskRepeat: "no-repeat",
                              maskPosition: "center",
                              WebkitMaskImage: `url(${AiLogo.src})`,
                              WebkitMaskSize: "contain",
                              WebkitMaskRepeat: "no-repeat",
                              WebkitMaskPosition: "center",
                            }}
                          />
                          <span className="text-[12px] font-bold text-left text-[#3BBB96] uppercase">
                            AI solution
                          </span>
                        </div>
                      )}

                      {/* Improvements */}
                      {(isFilled.richText(item.upgrades) || isFilled.keyText(item.impact_projection)) && (
                        <div className="w-full flex flex-col sm:flex-row gap-4 p-4 border-2 border-[#3bbb9780] rounded-lg">
                          {/* Upgrades */}
                          {isFilled.richText(item.upgrades) && (
                            <div className="w-full flex flex-col justify-between items-start min-w-0">
                              <PrismicRichText
                                field={item.upgrades}
                                components={{
                                  paragraph: ({ children }) => (
                                    <div className="w-full flex items-center gap-2">
                                      <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="#3BBB96">
                                        <path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                                      </svg>
                                      <p className="text-[12px] text-left font-medium text-[#FFFFFF] truncate flex-1">
                                        {children}
                                      </p>
                                    </div>
                                  ),
                                }}
                              />
                            </div>
                          )}

                          {/* Impact projection */}
                          {isFilled.keyText(item.impact_projection) && (
                            <div className="w-full flex flex-col justify-center items-start min-w-0">
                              <div className="w-full flex items-center gap-2">
                                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#3BBB96">
                                  <path d="M108-255q-12-12-11.5-28.5T108-311l211-214q23-23 57-23t57 23l103 104 208-206h-64q-17 0-28.5-11.5T640-667q0-17 11.5-28.5T680-707h160q17 0 28.5 11.5T880-667v160q0 17-11.5 28.5T840-467q-17 0-28.5-11.5T800-507v-64L593-364q-23 23-57 23t-57-23L376-467 164-255q-11 11-28 11t-28-11Z" />
                                </svg>
                                <span className="text-[10px] font-semibold uppercase text-[#A4A4A4]">
                                  Impact projection
                                </span>
                              </div>
                              <p className="text-[12px] text-left text-[#FFFFFF] w-full line-clamp-2">
                                {item.impact_projection}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Link to page */}
                      <div className="w-fit max-w-full py-2 border-b-2 border-[#FFFFFF]">
                        <PrismicNextLink
                          field={item.page_link}
                          className="block text-md text-left font-semibold text-[#FFFFFF] truncate"
                        >
                          View page
                        </PrismicNextLink>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </Container>
      </div>
    </section>
  );
}