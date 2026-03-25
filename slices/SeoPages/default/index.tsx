"use client";

import { FC, useRef, useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

import Container from "@/components/Container";
import { DotGrid } from "@/components/Recommendations/DotGrid";

export type SeoPagesProps = SliceComponentProps<Content.SeoPagesSlice>;

const SeoPagesDefault: FC<SeoPagesProps> = ({ slice }) => {

  if (slice.variation !== "default") return null;
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      const progress = totalScrollable > 0 ? (scrollLeft / totalScrollable) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      const currentScroll = scrollContainerRef.current.scrollLeft;

      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const validPages = slice.primary.generated_page.filter(
    (item) =>
      isFilled.keyText(item.topic) ||
      isFilled.keyText(item.details) ||
      isFilled.keyText(item.instructions) ||
      isFilled.link(item.page_link)
  );

  if (validPages.length === 0) return null;

  return (
    <section id="pages" className="scroll-mt-24 py-15 relative bg-[#151515] ">
        <div className="relative">
            <Container size="xl" className="flex flex-col items-center text-center gap-4">
            
            {/* --- HEADER --- */}
            <div className="z-20 flex flex-col items-center text-center gap-6 max-w-175">
                {isFilled.richText(slice.primary.title) && (
                  <PrismicRichText
                      field={slice.primary.title}
                      components={{ heading2: ({ children }) => <h2 className="text-4xl font-bold text-[#FFFFFF]">{children}</h2> }}
                  />
                )}
                {isFilled.richText(slice.primary.text) && (
                  <PrismicRichText
                      field={slice.primary.text}
                      components={{ paragraph: ({ children }) => <p className="text-[#A4A4A4]">{children}</p> }}
                  />
                )}
            </div>

            <div className="relative w-full z-10 p-0 sm:p-8 mt-8">
                <DotGrid isCenterDark={false} />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 sm:-translate-y-1/10 w-full h-175 bg-[radial-gradient(closest-side,#3BBB967e_0%,transparent_100%)] -z-10 pointer-events-none"></div>

                <div className="relative w-full">
                
                {/* NAV */}
                <div className="flex justify-end gap-2 mb-4 pr-4 sm:pr-0">
                    <button onClick={() => scroll("left")} className="p-2 rounded-full hover:bg-[#2A2A2A] border border-[#3BBB96] transition active:scale-95 text-[#FFFFFF] cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <button onClick={() => scroll("right")} className="p-2 rounded-full hover:bg-[#2A2A2A] border border-[#3BBB96] transition active:scale-95 text-[#FFFFFF] cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>

                {/* CARDS (Default Version) */}
                <div 
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="relative flex gap-6 overflow-x-auto pb-8 items-stretch snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                >   
                    {validPages.map((item, index) => (
                    <div key={index} className="snap-center shrink-0 w-[85vw] md:w-[420px] lg:w-[480px] transition-all duration-500 ease-out p-8 flex flex-col items-start gap-4 bg-[#1F1F1F] rounded-2xl border border-[#333333] hover:border-[#3BBB96] shadow-[0_10px_40px_rgba(0,0,0,0.6)] origin-bottom lg:origin-left">
                        
                        {isFilled.keyText(item.topic) && <h3 className="text-xl font-bold text-left text-[#FFFFFF]">{item.topic}</h3>}

                        {isFilled.keyText(item.details) && (
                        <div className="w-full">
                            <span className="text-xs uppercase font-bold text-[#A4A4A4] mb-2 block text-left">Details</span>
                            <p className="text-[#FFFFFF] text-left text-sm">{item.details}</p>
                        </div>
                        )}

                        {isFilled.keyText(item.instructions) && (
                        <div className="w-full">
                            <span className="text-xs uppercase font-bold text-[#A4A4A4] mb-2 block text-left">Instructions</span>
                            <p className="text-[#FFFFFF] text-left text-sm">{item.instructions}</p>
                        </div>
                        )}

                        {isFilled.link(item.page_link) && (
                            <div className="w-fit max-w-full py-2 border-b-2 border-[#FFFFFF]">
                                <PrismicNextLink field={item.page_link} className="block text-md text-left font-semibold text-[#FFFFFF] truncate">
                                    {item.page_link.text || "View page"}
                                </PrismicNextLink>
                            </div>
                        )}

                    </div>
                    ))}
                </div>

                {/* PROGRESS BAR */}
                <div className="mt-8 flex justify-center">
                    <div className="relative w-32 h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 h-full bg-[#3BBB96] rounded-full transition-transform duration-150 ease-out"
                        style={{ width: `${100 / validPages.length}%`, transform: `translateX(${(scrollProgress * (validPages.length - 1))}%)` }}
                    />
                    </div>
                </div>

                </div>
            </div>

            </Container>
        </div>
    </section>
  );
};

export default SeoPagesDefault;