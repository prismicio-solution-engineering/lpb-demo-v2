"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { SimpleRoiCalculator as CalculatorUI } from "@/tools/roi/components/SimpleRoiCalculator";

export type RoiCalculatorProps = SliceComponentProps<Content.RoiCalculatorSlice>;

const SimpleRoiCalculator: FC<RoiCalculatorProps> = ({ slice }) => {

  if (slice.variation !== "simpleCalculator") return null;

  const initialConfig = {
    costPerPage: slice.primary.cost_per_page ?? 48,
  };

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
          initialData={initialConfig}
        />
      </Container>
    </section>
  );
};

export default SimpleRoiCalculator;