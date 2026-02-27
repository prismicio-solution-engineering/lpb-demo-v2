import { SeoGeoRecapDocumentData } from "@/prismicio-types";

import Container from "@/components/Container";
import { SimpleRoiCalculator } from "@/tools/roi/components/SimpleRoiCalculator";
import { DefaultRoiCalculator } from "@/tools/roi/components/DefaultRoiCalculator";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

export default function RoiCalculator({ data }: { data: SeoGeoRecapDocumentData }) {
  const calculator = data.roi_calculator;
  if (!calculator || calculator == undefined || calculator == null) {
    return null;
  }

  const initialConfig = {
    costPerPage: data.roi_cost_per_page ?? 48,
  };

  return (
    <section id="roi-calculator" className="scroll-mt-24 bg-[#FFFFFF] py-15">
      <Container size="xl" className="flex flex-col justify-center items-center gap-6">

        <div className="flex flex-col gap-6 max-w-175">
          {isFilled.richText(data.roi_title) ? (
            <PrismicRichText
              field={data.roi_title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-4xl text-center font-bold text-[#151515]">
                    {children}
                  </h2>
                ),
              }}
            />
          ) : (
            <h2 className="text-4xl text-center font-bold text-[#151515]">
              Calculate your ROI
            </h2>
          )}


          {isFilled.richText(data.roi_text) ? (
            <PrismicRichText
              field={data.roi_text}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-center text-[#505050]">{children}</p>
                ),
              }}
            />
          ) : (
            <p className="text-center text-[#505050]">
              Use our ROI calculator to estimate the potential return on investment
              for implementing our recommendations.
            </p>
          )}
        </div>

        {data.roi_simple_calculator || data.roi_simple_calculator === null || data.roi_simple_calculator === undefined ? (
            <SimpleRoiCalculator
            cardHeading={data.roi_card_title}
            cardSubheading={data.roi_card_text}
            initialData={initialConfig}
            />
          ) : (
            <DefaultRoiCalculator
            cardHeading={data.roi_card_title}
            cardSubheading={data.roi_card_text}
            initialData={initialConfig}
            />
          )
        }


      </Container>
    </section>
  );
}
