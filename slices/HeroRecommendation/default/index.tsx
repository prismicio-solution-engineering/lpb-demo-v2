"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import Container from "@/components/Container";
import { Animation } from "@/components/Animations/Animation";

export type HeroRecommendationProps = SliceComponentProps<Content.HeroRecommendationSlice>;

const HeroRecommendation: FC<HeroRecommendationProps> = ({ slice }) => {

    if (slice.variation !== "default") return null;

    return (
        <section
          id="hero"
          className="scroll-mt-24 relative bg-[#FFFFFF] pt-40 pb-10"
        >
          <div className="relative">
            <Container
              size="xl"
              className="flex flex-col items-center text-center gap-16"
            >
              <div className="flex flex-col items-center text-center gap-4">
                {isFilled.image(slice.primary.client_logo) && (
                  <PrismicNextImage field={slice.primary.client_logo} height={48} />
                )}
                
                {isFilled.richText(slice.primary.eyebrow) && (
                  <PrismicRichText
                    field={slice.primary.eyebrow}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="text-[#505050]">{children}</p>
                      ),
                    }}
                  />
                )}
              </div>
              
              <div className="w-full flex flex-col items-center text-center gap-6 max-w-175">
                {isFilled.richText(slice.primary.title) && (
                  <PrismicRichText
                    field={slice.primary.title}
                    components={{
                      heading1: ({ children }) => (
                        <h1 className="w-full text-4xl sm:text-6xl font-bold">
                          {children}
                        </h1>
                      ),
                    }}
                  />
                )}

                {isFilled.richText(slice.primary.text) && (
                  <PrismicRichText
                    field={slice.primary.text}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="text-[#505050]">{children}</p>
                      ),
                    }}
                  />
                )}
              </div>

              {isFilled.contentRelationship(slice.primary.contact) && (
                <div className="px-8 py-4 rounded-2xl bg-[#F7F7F7]">
                  <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    {isFilled.image(slice.primary.contact.data?.image) && (
                      <PrismicNextImage
                        field={slice.primary.contact.data.image}
                        width={72}
                        height={72}
                        className="object-cover aspect-square rounded-full"
                      />
                    )}
                    
                    <div className="flex flex-col justify-center items-center md:items-start">
                      {isFilled.keyText(slice.primary.contact.data?.name) && (
                        <p className="text-xl font-semibold">{slice.primary.contact.data.name}</p>
                      )}
                      {isFilled.keyText(slice.primary.contact.data?.position) && (
                        <p>{slice.primary.contact.data.position}</p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                      {isFilled.keyText(slice.primary.contact.data?.email) && (
                        <a
                          href={`mailto:${slice.primary.contact.data.email}`}
                          className="text-[#FFFFFF] bg-[#151515] px-4 py-2 rounded-lg border-2 border-[#151515]"
                        >
                          Email me
                        </a>
                      )}
                      
                      <div>
                        {isFilled.link(slice.primary.contact.data?.calendar) && (
                          <PrismicNextLink
                            field={slice.primary.contact.data.calendar}
                            className="text-[#151515] px-4 py-2 rounded-lg border-2 border-[#151515]"
                          >
                            {slice.primary.contact.data?.calendar.text
                              ? slice.primary.contact.data?.calendar.text
                              : "Book a call"}
                          </PrismicNextLink>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Container>
            <Animation></Animation>
          </div>
        </section>
    )
}

export default HeroRecommendation;