"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import Container from "@/components/Container";
import { iconsMap } from "@/utils/getIconsMap";

export type UnderstandingProps = SliceComponentProps<Content.UnderstandingSlice>;

const Understanding: FC<UnderstandingProps> = ({ slice }) => {
    
    if (slice.variation !== "default") return null;

    return (
        <section
          id="understanding"
          className="scroll-mt-24 bg-[#151515] pb-15 pt-8"
        >
          <Container
            size="xl"
            className="flex flex-col items-center gap-16 text-center"
          >
            <div className="w-full  flex flex-col items-center gap-10">
              <div className="flex flex-col items-center gap-4">

                {isFilled.richText(slice.primary.eyebrow) && (
                  <PrismicRichText
                    field={slice.primary.eyebrow}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="max-w-175 text-[#ED6B22]">{children}</p>
                      ),
                    }}
                  />
                )}
    
                {isFilled.richText(slice.primary.title) && (
                  <PrismicRichText
                    field={slice.primary.title}
                    components={{
                      heading2: ({ children }) => (
                        <h2 className="text-4xl font-bold text-[#FFFFFF]">
                          {children}
                        </h2>
                      ),
                    }}
                  />
                )}
    
                {isFilled.richText(slice.primary.text) && (
                  <PrismicRichText
                    field={slice.primary.text}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="max-w-175 text-[#A4A4A4]">{children}</p>
                      ),
                    }}
                  />
                )}
              </div>
    
              <div className="w-full flex flex-col">
                {slice.primary.key_problem.map((item, index) => {
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
                            backgroundColor:
                              index % 2 === 0 ? "#151515" : "#202020",
                            borderColor: index % 2 === 0 ? "#151515" : "#202020",
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
                                  <p className="text-left text-[#A4A4A4] col-span-2">
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
            </div>
          </Container>
        </section>  
    )
}

export default Understanding;