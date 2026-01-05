import { RecapDocumentData, Simplify } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";

import Container from "@/components/Container";
import { iconsMap } from "@/utils/getIconsMap";

export default function Understanding({data}:{data:Simplify<RecapDocumentData>}) {
    
    return (
        <section id="understanding" className="scroll-mt-24 bg-[#151515] pb-15 pt-8">
          <Container
            size="xl"
            className="flex flex-col items-center gap-16 text-center"
          >
            <div className="w-full  flex flex-col items-center gap-10">
              <div className="flex flex-col items-center gap-4">
                <p className="text-[#ED6B22]">{data.understanding_eyebrow}</p>

                {isFilled.richText(data.understanding_title) && (
                  <PrismicRichText
                    field={data.understanding_title}
                    components={{
                      heading2: ({ children }) => (
                        <h2 className="text-4xl font-bold text-[#FFFFFF]">{children}</h2>
                      ),
                    }}
                  />
                )}

                {isFilled.richText(data.understanding_text) && (
                  <PrismicRichText
                    field={data.understanding_text}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="max-w-175 text-[#A4A4A4]">{children}</p>
                      ),
                    }}
                  />
                )}
              </div>

              <div className="w-full flex flex-col">
                {data.key_problem.map((item, index) => {
                  const IconComponent = item.icon ? iconsMap[item.icon] : null;
                  return (
                    <div
                      key={index}
                      className="xl:col-span-10 xl:col-start-2 group flex flex-col sm:flex-row lg:items-center gap-6 p-6 sm:p-8 lg:p-12 rounded-xl"
                      style={{
                        backgroundColor: index % 2 === 0 ? "#151515" : "#202020",
                      }}
                    >
                      {/* Icon */}
                      <div className="relative w-12 h-12 flex justify-center items-center rounded-full bg-[#ED6B22] text-white font-semibold text-xl shrink-0">
                        {index + 1}
                        <div 
                          className="absolute -bottom-3 -right-3 border rounded-md"
                          style={{
                            backgroundColor: index % 2 === 0 ? "#151515" : "#202020",
                            borderColor: index % 2 === 0 ? "#151515" : "#202020"
                          }}
                        >
                          {IconComponent && (
                            <IconComponent className="w-7 h-7 text-[#ED6B22]" />
                          )}
                        </div>
                      </div>
                      {/* Text */}
                      <div className="w-full flex flex-col sm:flex-row lg:items-center gap-6 sm:gap-12">
                          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-5 lg:items-center lg:gap-12 flex-1">
                            {isFilled.richText(item.title) && (
                              <PrismicRichText
                                field={item.title}
                                components={{
                                  heading3: ({ children }) => (
                                    <h3 className="text-left text-xl font-semibold text-[#FFFFFF] col-span-3">
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
                                    <p className="text-left text-[#A4A4A4] col-span-2">{children}</p>
                                  ),
                                }}
                              />
                            )}
                          </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Container>
        </section>
    )
}
