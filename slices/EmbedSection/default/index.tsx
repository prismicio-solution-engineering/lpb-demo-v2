import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { DotGrid } from "@/components/Recommendations/DotGrid";

export type EmbedSectionProps = SliceComponentProps<Content.EmbedSectionSlice>;

const EmbedSection: FC<EmbedSectionProps> = ({ slice }) => {

    if (slice.variation !== "default") return null

    return (
        <section id="embed" className="scroll-mt-24 py-15 bg-[#FFFFFF]" >
             <Container size="xl" className="flex flex-col items-center gap-8 sm:gap-12">
                <div className="flex flex-col items-center gap-4">
                    {isFilled.richText(slice.primary.eyebrow) && (
                        <PrismicRichText 
                            field={slice.primary.eyebrow}
                            components={{
                                paragraph: ({ children }) => (
                                    <p className="w-full text-left sm:text-center text-[#F97289] max-w-175">{children}</p>
                                ),
                            }}
                        />
                    )}

                    {isFilled.richText(slice.primary.title) && (
                        <PrismicRichText 
                            field={slice.primary.title}
                            components={{
                                heading2: ({ children }) => <h2 className="w-full text-left sm:text-center text-4xl font-bold">{children}</h2>,
                            }}
                        />
                    )}

                    {isFilled.richText(slice.primary.text) && (
                        <PrismicRichText 
                            field={slice.primary.text}
                            components={{
                                paragraph: ({ children }) => (
                                    <p className="w-full text-left sm:text-center text-[#505050] max-w-175">{children}</p>
                                ),
                            }}
                        />
                    )}
                </div>

                {isFilled.embed(slice.primary.embed) && slice.primary.embed.html && (
                    <div className="relative w-full p-4 sm:p-12 isolate rounded-3xl overflow-hidden">
        
                        {/*Grid */}
                        <div className="absolute inset-0 -z-20">
                            <DotGrid dotColor="#F97289" />
                        </div>
                        {/* Fade gradient */}
                        <div 
                            className="absolute inset-0 pointer-events-none -z-10 rounded-3xl shadow-[inset_0_0_120px_60px_#FFFFFF]"
                            aria-hidden="true"
                        />

                        {/* Embed content */}
                        <div 
                            dangerouslySetInnerHTML={{ __html: slice.primary.embed.html }}
                            className="relative z-10 w-full aspect-video [&>iframe]:w-full [&>iframe]:h-full overflow-hidden rounded-2xl"
                        />

                    </div>
                )}
            </Container>
        </section>
    )
};

export default EmbedSection;