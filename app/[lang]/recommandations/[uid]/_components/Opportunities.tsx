import { RecapDocumentData, Simplify } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";

import Container from "@/components/Container";
import { iconsMap } from "@/utils/getIconsMap";


export default function Opportunities({data}:{data:Simplify<RecapDocumentData>}) {
  return (
<section id="opportunities" className="scroll-mt-24 bg-[#151515] py-15 ">
          <Container size="xl" className="flex flex-col items-start gap-16">
            {isFilled.richText(data.opportunities_title) && (
              <PrismicRichText
                field={data.opportunities_title}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="text-4xl font-bold text-[#FFFFFF]">
                      {children}
                    </h2>
                  ),
                }}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {data.opportunity.map((item, index) => {
                // get the correct icon component
                const IconComponent = item.icon ? iconsMap[item.icon] : null;
                return (
                  <div
                    key={index}
                    className="bg-[#1F1F1F] rounded-xl p-12 gap-4 flex flex-col items-start"
                  >
                    {IconComponent && (
                      <IconComponent className="w-12 h-12 text-[#59B5F8]" />
                    )}

                    {isFilled.richText(item.title) && (
                      <PrismicRichText
                        field={item.title}
                        components={{
                          heading3: ({ children }) => (
                            <h3 className="text-xl font-semibold text-[#FFFFFF]">
                              {children}
                            </h3>
                          ),
                        }}
                      />
                    )}

                    {isFilled.richText(item.text) && (
                      <PrismicRichText
                        field={item.text}
                        components={{
                          paragraph: ({ children }) => (
                            <p className="text-[#A4A4A4]">{children}</p>
                          ),
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
  )
}
