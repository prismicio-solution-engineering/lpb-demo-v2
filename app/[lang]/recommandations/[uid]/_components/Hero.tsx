import { RecapDocumentData, Simplify } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";

import Container from "@/components/Container";
import { Animation } from "@/components/Animations/Animation";
import { TopAnimation } from "@/components/Animations/TopAnimation";

export default function Hero({data}:{data:Simplify<RecapDocumentData>}) {

    return (
        <section id="hero" className="scroll-mt-24 relative bg-[#FFFFFF] pt-40 pb-50 md:pb-75">
          <div className="absolute bottom-0 left-0 w-full ">
            <TopAnimation></TopAnimation>
          </div>
          <div className="relative">
            <Container
              size="xl"
              className="flex flex-col items-center text-center gap-16"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <PrismicNextImage field={data.client_logo} height={48} />
                <p>{data.hero_eyebrow}</p>
              </div>
              <div className="w-full flex flex-col items-center text-center gap-6 max-w-175">
                {isFilled.richText(data.hero_title) && (
                  <PrismicRichText
                    field={data.hero_title}
                    components={{
                      heading1: ({ children }) => (
                        <h1 className="w-full text-4xl sm:text-6xl font-bold">{children}</h1>
                      ),
                    }}
                  />
                )}

                {isFilled.richText(data.hero_text) && (
                  <PrismicRichText
                    field={data.hero_text}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="text-[#505050]">{children}</p>
                      ),
                    }}
                  />
                )}
              </div>

              <div className="px-8 py-4 rounded-2xl bg-[#F7F7F7]">
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                  {isFilled.contentRelationship(data.contact) && (
                    <PrismicNextImage
                      field={data.contact.data?.image}
                      width={64}
                      height={64}
                      className="object-cover aspect-square rounded-full"
                    />
                  )}
                  <div className="flex flex-col justify-center items-center md:items-start">
                    {isFilled.contentRelationship(data.contact) && (
                      <p className="font-semibold">{data.contact.data?.name}</p>
                    )}
                    {isFilled.contentRelationship(data.contact) && (
                      <p>{data.contact.data?.position}</p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    {isFilled.contentRelationship(data.contact) && (
                      <a
                        href={`mailto:${data.contact.data?.email}`}
                        className="text-[#FFFFFF] bg-[#151515] px-4 py-2 rounded-lg border-2 border-[#151515]"
                      >
                        Email me
                      </a>
                    )}
                    {isFilled.contentRelationship(data.contact) && (
                      <a
                        href={`${data.contact.data?.calendar}`}
                        className="text-[#151515] px-4 py-2 rounded-lg border-2 border-[#151515]"
                      >
                        Book a call
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Container>
            <Animation></Animation>
          </div>
        </section>
    )
}
