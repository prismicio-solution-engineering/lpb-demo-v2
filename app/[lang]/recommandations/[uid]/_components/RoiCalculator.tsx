import { RecapDocumentData } from "@/prismicio-types";

import Container from "@/components/Container";
import { SimpleRoiCalculator } from "../_tools/roi/components/SimpleRoiCalculator";
import { DefaultRoiCalculator } from "../_tools/roi/components/DefaultRoiCalculator";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

export default function RoiCalculator({ data }: { data: RecapDocumentData }) {
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
                  <p className="text-[#505050]">{children}</p>
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

        {data.agent === "SEO-GEO" ? (
          data.simple_calculator || data.simple_calculator === null || data.simple_calculator === undefined ? (
            <SimpleRoiCalculator
              cardHeading={data.roi_card_title}
              cardSubheading={data.roi_card_text}
            />
          ) : (
            <DefaultRoiCalculator
              cardHeading={data.roi_card_title}
              cardSubheading={data.roi_card_text}
            />
          )
        ) : (
          <div 
          className={`max-w-175 m-4 p-4 flex flex-col sm:flex-row gap-4 border border-[#F9E796] rounded-xl bg-[#FFFBED] text-[#70391A]`}
          >
              <div className="w-full sm:w-fit flex justify-between items-center sm:items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-6 h-6" fill="#CC7C2E"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480v-160q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v160q0 17 11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
              </div>
              <div className="text-sm line">
                The ROI calculator for ABM pages is not currentlty available.
              </div>
          </div>
        )}


      </Container>
    </section>
  );
}
