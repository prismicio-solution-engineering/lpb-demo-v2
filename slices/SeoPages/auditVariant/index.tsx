"use client";

import { FC, useRef, useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

import Container from "@/components/Container";
import { DotGrid } from "@/components/Recommendations/DotGrid";
import AiLogo from "@/assets/AI/prismic-ai.svg";

// Helpers Audit
function getSafeMentionRate(value: number) { return Math.max(0, Math.min(100, Math.round(value))); }
function getSafeAveragePosition(value: number) { return value.toFixed(2); }
function getSafeRankPosition(value: number) { return value === 0 ? "N/A" : Math.max(1, Math.min(999, Math.round(value))); }

const colorClasses = { good: "text-[#3BBB96]", average: "text-[#ED6B22]", poor: "text-[#F97289]" };
function getColorClass(value: number) {
  if (value >= 80) return colorClasses.good;
  if (value >= 50) return colorClasses.average;
  return colorClasses.poor;
}

export type SeoPagesAuditProps = SliceComponentProps<Content.SeoPagesSlice>;

const SeoPagesAuditVariant: FC<SeoPagesAuditProps> = ({ slice }) => {

    if (slice.variation !== "seoGeoAudit" ) return null;

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
        isFilled.keyText(item.eyebrow) ||
        isFilled.keyText(item.topic) || 
        isFilled.number(item.mention_rate) ||
        isFilled.number(item.average_position) ||
        isFilled.number(item.rank_position) ||
        isFilled.keyText(item.solution_name) ||
        isFilled.richText(item.upgrades) ||
        isFilled.keyText(item.impact_projection) ||
        isFilled.link(item.page_link) ||
        isFilled.link(item.analysis_link)
    );

    if (validPages.length === 0) return null;

    return (
    <section id="pages" className="scroll-mt-24 py-15 relative bg-[#151515]">
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

            <div className="relative w-full z-10 p-0 sm:p-8">
                
                {/*Grid */}
                <div className="absolute inset-0 opacity-50">
                    <DotGrid />
                </div>
                {/* Black */}
                <div 
                    className="absolute inset-0 w-full h-full bg-[radial-gradient(closest-side,transparent_60%,#151515_100%)] pointer-events-none"
                    aria-hidden="true"
                />
                {/* Green glow */}
                <div 
                    className="absolute inset-0 m-auto w-[100%] h-[100%] bg-[radial-gradient(closest-side,#3BBB96B0_0%,transparent_100%)] pointer-events-none blur-3xl opacity-80"
                    aria-hidden="true"
                />
                
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

                    {/* CARDS (Version Audit) */}
                    <div 
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="relative flex gap-6 overflow-x-auto pb-8 items-stretch snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                    >   
                        {validPages.map((item, index) => {
                            const commonColorClass = getColorClass(Number(item.mention_rate || 0));

                            return (
                                <div key={index} className="snap-center shrink-0 w-[85vw] md:w-[420px] lg:w-[480px] transition-all duration-500 ease-out p-8 flex flex-col items-start justify-between gap-4 bg-[#1F1F1F] rounded-2xl border border-[#333333] hover:border-[#3BBB96] shadow-[0_10px_40px_rgba(0,0,0,0.6)] origin-bottom lg:origin-left">
                                    
                                    {/* Header Item */}
                                    <div className="w-full flex flex-col items-start min-w-0">
                                    {isFilled.keyText(item.eyebrow) && <span className="w-full text-sm text-left font-semibold text-[#A4A4A4] uppercase truncate">{item.eyebrow}</span>}
                                    <h3 className="text-xl font-bold text-left text-[#FFFFFF] line-clamp-4">{item.topic}</h3>
                                    </div>
            
                                    {/* Metrics */}
                                    <div className="w-full py-4 flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between sm:items-end">
                                    {isFilled.number(item.mention_rate) && (
                                        <div className="w-fit flex flex-col items-start">
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="#A4A4A4"><path d="M300-520q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm0-80q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600Zm360 440q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm42.5-97.5Q720-275 720-300t-17.5-42.5Q685-360 660-360t-42.5 17.5Q600-325 600-300t17.5 42.5Q635-240 660-240t42.5-17.5ZM177-216q0-17 11-28l528-528q11-11 28-11t28 11q11 11 11 28t-11 28L244-188q-11 11-28 11t-28-11q-11-11-11-28Z"/></svg>
                                            <span className="text-[12px] font-semibold uppercase text-[#A4A4A4]">Mention rate</span>
                                        </div>
                                        <span className={`text-[80px] font-bold ${commonColorClass} leading-none`}>{getSafeMentionRate(Number(item.mention_rate))}%</span>
                                        </div>
                                    )}
            
                                    {isFilled.number(item.average_position) && (
                                        <div className="w-fit flex flex-col items-start gap-1">
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="#A4A4A4"><path d="M120-120q-17 0-28.5-11.5T80-160v-400q0-17 11.5-28.5T120-600h140q17 0 28.5 11.5T300-560v400q0 17-11.5 28.5T260-120H120Zm290 0q-17 0-28.5-11.5T370-160v-640q0-17 11.5-28.5T410-840h140q17 0 28.5 11.5T590-800v640q0 17-11.5 28.5T550-120H410Zm290 0q-17 0-28.5-11.5T660-160v-320q0-17 11.5-28.5T700-520h140q17 0 28.5 11.5T880-480v320q0 17-11.5 28.5T840-120H700Z" /></svg>
                                            <span className="text-[12px] font-semibold uppercase text-[#A4A4A4]">Average pos</span>
                                        </div>
                                        <span className={`text-[32px] font-bold ${commonColorClass} leading-none`}>{getSafeAveragePosition(Number(item.average_position))}</span>
                                        </div>
                                    )}
            
                                    {isFilled.number(item.rank_position) && (
                                        <div className="w-fit flex flex-col items-start gap-1">
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="#A4A4A4"><path d="M536.5-543.5Q560-567 560-600t-23.5-56.5Q513-680 480-680t-56.5 23.5Q400-633 400-600t23.5 56.5Q447-520 480-520t56.5-23.5ZM280-528v-152h-80v40q0 38 22 68.5t58 43.5Zm400 0q36-13 58-43.5t22-68.5v-40h-80v152ZM440-200v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80q0-33 23.5-56.5T360-840h240q33 0 56.5 23.5T680-760h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h120q17 0 28.5 11.5T680-160q0 17-11.5 28.5T640-120H320q-17 0-28.5-11.5T280-160q0-17 11.5-28.5T320-200h120Z" /></svg>
                                            <span className="text-[12px] font-semibold uppercase text-[#A4A4A4]">Ranking</span>
                                        </div>
                                        <span className={`text-[32px] font-bold ${commonColorClass} leading-none`}>{getSafeRankPosition(Number(item.rank_position))}</span>
                                        </div>
                                    )}
                                    </div>
            
                                    {/* Solution & Upgrades */}
                                    <div className="w-full flex flex-col items-start gap-4 mt-auto">
                                    {isFilled.keyText(item.solution_name) && (
                                        <div className="w-fit px-3 py-1.5 flex justify-start items-center gap-2 bg-[#3bbb9740] rounded-lg">
                                        <div className="relative z-20 w-[20px] h-[20px] bg-[#3BBB96]" style={{ maskImage: `url(${AiLogo.src})`, WebkitMaskImage: `url(${AiLogo.src})`, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }} />
                                        <span className="text-[12px] font-bold text-[#3BBB96] uppercase">{item.solution_name}</span>
                                        </div>
                                    )}
                                    
                                    {(isFilled.richText(item.upgrades) || isFilled.keyText(item.impact_projection)) && (
                                        <div className="w-full flex flex-col sm:flex-row gap-4 p-4 border-2 border-[#3bbb9780] rounded-lg">
                                        {isFilled.richText(item.upgrades) && (
                                            <div className="w-full flex flex-col justify-between items-start min-w-0">
                                            <PrismicRichText field={item.upgrades} components={{ 
                                                listItem: ({ children }) => (
                                                <div className="w-full flex items-center gap-2 mb-1">
                                                    <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="#3BBB96"><path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" /></svg>
                                                    <p className="text-[12px] text-left font-medium text-[#FFFFFF] truncate flex-1">{children}</p>
                                                </div>
                                                ) 
                                            }} />
                                            </div>
                                        )}
                                        {isFilled.keyText(item.impact_projection) && (
                                            <div className="w-full flex flex-col justify-center items-start min-w-0">
                                            <div className="w-full flex items-center gap-2">
                                                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#3BBB96"><path d="M108-255q-12-12-11.5-28.5T108-311l211-214q23-23 57-23t57 23l103 104 208-206h-64q-17 0-28.5-11.5T640-667q0-17 11.5-28.5T680-707h160q17 0 28.5 11.5T880-667v160q0 17-11.5 28.5T840-467q-17 0-28.5-11.5T800-507v-64L593-364q-23 23-57 23t-57-23L376-467 164-255q-11 11-28 11t-28-11Z" /></svg>
                                                <span className="text-[10px] font-semibold uppercase text-[#A4A4A4]">Impact projection</span>
                                            </div>
                                            <p className="text-[12px] text-left text-[#FFFFFF] w-full line-clamp-2">{item.impact_projection}</p>
                                            </div>
                                        )}
                                        </div>
                                    )}
            
                                    {/* Liens */}
                                    <div className="w-full flex flex-row justify-between flex-wrap items-end gap-4">
                                        {isFilled.link(item.page_link) && (
                                        <div className="w-fit max-w-full py-2 border-b-2 border-[#FFFFFF]">
                                            <PrismicNextLink field={item.page_link} className="block text-md text-left font-semibold text-[#FFFFFF] truncate">
                                            {item.page_link.text || "View page"}
                                            </PrismicNextLink>
                                        </div>
                                        )}
                                        {isFilled.link(item.analysis_link) && (
                                        <div className="w-fit h-fit max-w-full px-2.75 py-1.5 flex justify-items-center gap-2 bg-[#50505080] rounded-lg">
                                            <PrismicNextLink field={item.analysis_link} className="block text-xs uppercase text-left font-semibold text-[#A4A4A4] truncate">
                                            {item.analysis_link.text || "See analysis"}
                                            </PrismicNextLink>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#A4A4A4"><path d="M680-624 244-188q-11 11-28 11t-28-11q-11-11-11-28t11-28l436-436H400q-17 0-28.5-11.5T360-720q0-17 11.5-28.5T400-760h320q17 0 28.5 11.5T760-720v320q0 17-11.5 28.5T720-360q-17 0-28.5-11.5T680-400v-224Z"/></svg>
                                        </div>
                                        )}
                                    </div>
                                    </div>
            
                                </div>
                            )
                        })}
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

export default SeoPagesAuditVariant;