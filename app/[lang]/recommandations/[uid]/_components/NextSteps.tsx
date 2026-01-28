import { RecapDocumentData } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

import Container from "@/components/Container";
import { iconsMap } from "@/utils/getIconsMap";

export default function NextSteps({ data }: { data: RecapDocumentData }) {
  return (
    <section id="next-steps" className="scroll-mt-24 bg-gradient-to-b from-[#E8F8F3] from-85% to-white pb-15">
      <Container
        size="xl"
        className="flex flex-col items-center gap-16 text-center"
      >
        <div className="w-full  flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <p className="text-[#3BBB96]">{data.next_eyebrow}</p>

            {isFilled.richText(data.next_title) && (
              <PrismicRichText
                field={data.next_title}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="text-4xl font-bold">{children}</h2>
                  ),
                }}
              />
            )}

            {isFilled.richText(data.next_text) && (
              <PrismicRichText
                field={data.next_text}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-[#505050] max-w-175">{children}</p>
                  ),
                }}
              />
            )}
          </div>

          <div className="w-full flex flex-col">
            {data.step.map((item, index) => {
              const IconComponent = item.icon ? iconsMap[item.icon] : null;
              return (
                <div
                  key={index}
                  className="xl:col-span-10 xl:col-start-2 group flex flex-col sm:flex-row lg:items-center gap-6 p-6 sm:p-8 lg:p-12 rounded-xl"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#E8F8F3" : "#d4f2e9dd",
                  }}
                >
                  <div className="relative w-12 h-12 flex justify-center items-center rounded-full bg-[#3BBB96] text-white font-semibold text-xl shrink-0">
                    {index + 1}
                    <div
                      className="absolute -bottom-3 -right-3 border rounded-md"
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#E8F8F3" : "#D4F2E9",
                        borderColor: index % 2 === 0 ? "#E8F8F3" : "#D4F2E9",
                      }}
                    >
                      {IconComponent && (
                        <IconComponent className="w-7 h-7 text-[#3BBB96]" />
                      )}
                    </div>
                  </div>

                  <div className="w-full flex flex-col sm:flex-row lg:items-center gap-6 sm:gap-12">
                    <div className="flex flex-col gap-2 lg:grid lg:grid-cols-5 lg:items-center lg:gap-12 flex-1">
                      {isFilled.richText(item.title) && (
                        <PrismicRichText
                          field={item.title}
                          components={{
                            heading3: ({ children }) => (
                              <h3 className="text-left text-xl font-semibold text-[#151515] col-span-3">
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
                              <p className="text-left text-[#505050] col-span-2">
                                {children}
                              </p>
                            ),
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4">
            {data.buttons.map((link, index) => (
              <PrismicNextLink
                key={index}
                field={link}
                className={`${link.variant === "Filled" ? "bg-[#151515] text-[#FFFFFF]" : "text-[#151515]"} px-4 py-2 rounded-lg border-2 border-[#151515]`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
