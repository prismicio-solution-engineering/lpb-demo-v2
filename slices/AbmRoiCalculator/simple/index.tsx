"use client"

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { SimpleAbmRoiCalculator as CalculatorUI } from "@/tools/roi/components/SimpleAbmRoiCalculator";

export type AbmRoiCalculatorProps = SliceComponentProps<Content.AbmRoiCalculatorSlice>;

const AbmSimpleRoiCalculator: FC<AbmRoiCalculatorProps> = ({ slice }) => {

    if (slice.variation !== "simpleCalculator") return null;

    return (
        <section id="roi-calculator" className="scroll-mt-24 bg-[#FFFFFF] py-15">
            <Container size="xl" className="flex flex-col justify-center items-center gap-6">
                
                {/* HEADER */}
                <div className="flex flex-col gap-6 max-w-175">
                {isFilled.richText(slice.primary.title) && (
                    <PrismicRichText
                    field={slice.primary.title}
                    components={{
                        heading2: ({ children }) => <h2 className="text-4xl text-center font-bold text-[#151515]">{children}</h2>,
                    }}
                    />
                )}

                {isFilled.richText(slice.primary.text) && (
                    <PrismicRichText
                    field={slice.primary.text}
                    components={{
                        paragraph: ({ children }) => <p className="text-center text-[#505050]">{children}</p>,
                    }}
                    />
                )}
                </div>

                {/* UI CALCULATOR */}
                <CalculatorUI
                cardHeading={slice.primary.card_title}
                cardSubheading={slice.primary.card_text}
                />
            </Container>
        </section>
    )
}

export default AbmSimpleRoiCalculator;