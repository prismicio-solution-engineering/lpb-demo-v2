import { Metadata } from "next";
import { RecapDocument } from "@/prismicio-types";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { asImageSrc, isFilled } from "@prismicio/client";
import Container from "@/components/Container";
// icons
import Zoom from "@/components/Icons/Zoom";
import Reuse from "@/components/Icons/Reuse";
import Hammer from "@/components/Icons/Hammer";
// animations
import { Animation } from "@/components/Animations/Animation";
import { TopAnimation } from "@/components/Animations/TopAnimation";
import { BottomAnimation } from "@/components/Animations/BottomAnimation";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang, uid } = resolvedParams;

  const client = createClient();

  let page;
  try {
    page = await client.getByUID("recap", uid, {
      lang,
      graphQuery: `
        {
          recap {
            meta_title
            meta_description
            meta_image
          }
        }
      `,
    });
  } catch (error) {
    // Try to fall back to the default locale (en-us)
    try {
      page = await client.getByUID("recap", uid, {
        lang: "en-us",
        graphQuery: `
        {
          recap {
            meta_title
            meta_description
            meta_image
          }
        }
      `,
      });
    } catch (fallbackError) {
      notFound();
    }
  }

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>;
}) {
  const client = createClient();
  const resolvedParams = await params;
  const { lang, uid } = resolvedParams;

  const [page] = await Promise.all([
    client.getByUID("recap", uid, { lang: lang }),
  ]);

  const { data } = page as RecapDocument;
  console.log(data);

  // map of icon components
  const iconsMap: Record<string, React.FC<{ className?: string }>> = {
    zoom: Zoom,
    reuse: Reuse,
    hammer: Hammer,
  };

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative bg-[#FFFFFF] pt-20 pb-50 md:pb-75">
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
            <div className="flex flex-col items-center text-center gap-6 max-w-175">
              {isFilled.richText(data.hero_title) && (
                <PrismicRichText
                  field={data.hero_title}
                  components={{
                    heading1: ({ children }) => (
                      <h1 className="text-6xl font-bold">{children}</h1>
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
                <div className="flex justify-center items-center gap-4">
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

      {/* Context */}
      <section id="context" className="bg-[#151515] py-15">
        <Container
          size="xl"
          className="flex flex-col items-center text-center gap-16"
        >
          <div className="flex flex-col items-center text-center gap-6 max-w-175">
            {isFilled.richText(data.context_title) && (
              <PrismicRichText
                field={data.context_title}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="text-4xl font-bold text-[#FFFFFF]">
                      {children}
                    </h2>
                  ),
                }}
              />
            )}

            {isFilled.richText(data.context_text) && (
              <PrismicRichText
                field={data.context_text}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-[#A4A4A4]">{children}</p>
                  ),
                }}
              />
            )}
          </div>
        </Container>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className="bg-[#151515] py-15">
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

      {/* Data */}
      <section
        id="data"
        className="relative bg-[#151515] py-15 pb-50 md:pb-87.5"
      >
        <div className="absolute bottom-0 left-0 bg-[#FFFFFF] w-full">
          <BottomAnimation></BottomAnimation>
        </div>
        <div className="relative">
          <Container
            size="xl"
            className="flex flex-col items-center text-center gap-16"
          >
            <div className="flex flex-col items-center text-center gap-6 max-w-175">
              {isFilled.richText(data.data_title) && (
                <PrismicRichText
                  field={data.data_title}
                  components={{
                    heading2: ({ children }) => (
                      <h2 className="text-4xl font-bold text-[#FFFFFF]">
                        {children}
                      </h2>
                    ),
                  }}
                />
              )}

              {isFilled.richText(data.data_text) && (
                <PrismicRichText
                  field={data.data_text}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-[#A4A4A4]">{children}</p>
                    ),
                  }}
                />
              )}
            </div>
            <div className="w-full border border-solid border-[#ffffff32] rounded-2xl overflow-x-auto">
              <table className="min-w-250 text-white font-light text-left">
                <thead>
                  <tr>
                    <th className="p-4 border border-[#ffffff32] rounded-tl-2xl align-top text-left">
                      Company
                    </th>
                    <th className="p-4 border border-[#ffffff32] align-top text-left">
                      Role
                    </th>
                    <th className="p-4 border border-[#ffffff32] align-top text-left">
                      Challenges
                    </th>
                    <th className="p-4 border border-[#ffffff32] align-top text-left">
                      Pain Point
                    </th>
                    <th className="p-4 border border-[#ffffff32] align-top text-left">
                      Industry Information
                    </th>
                    <th className="p-4 border border-[#ffffff32] align-top text-left">
                      Key Message
                    </th>
                    <th className="p-4 border border-[#ffffff32] rounded-tr-2xl align-top text-left">
                      Page
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.generated_page.map((item, index) => (
                    <tr key={index}>
                      <th className="p-4 border border-[#ffffff32] align-top text-left">
                        {item.company_name}
                      </th>
                      <td className="p-4 border border-[#ffffff32] text-[#A4A4A4] text-sm align-top text-left">
                        {item.role}
                      </td>
                      <td className="p-4 border border-[#ffffff32] text-[#A4A4A4] text-sm align-top text-left">
                        {item.challenges}
                      </td>
                      <td className="p-4 border border-[#ffffff32] text-[#A4A4A4] text-sm align-top text-left">
                        {item.pain_point}
                      </td>
                      <td className="p-4 border border-[#ffffff32] text-[#A4A4A4] text-sm align-top text-left">
                        {item.industry_information}
                      </td>
                      <td className="p-4 border border-[#ffffff32] text-[#A4A4A4] text-sm align-top text-left">
                        {item.key_message}
                      </td>
                      <td className="p-4 border border-[#ffffff32] text-sm align-center text-left">
                        {isFilled.link(item.page_link) && (
                          <PrismicNextLink 
                            field={item.page_link}
                            target="blank"
                            className="text-[#FFFFFF] px-4 py-2 rounded-lg border-2 border-[#8E44EC]"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </div>
      </section>

      {/* Next steps */}
      <section id="next-steps" className="bg-[#FFFFFF] pb-15">
        <Container
          size="xl"
          className="flex flex-col items-center gap-16 text-center"
        >
          <div className="w-full max-w-175 flex flex-col items-center gap-6">
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
            </div>
            <div className="flex flex-col gap-6 text-left">
              {isFilled.richText(data.next_text) && (
                <PrismicRichText
                  field={data.next_text}
                  components={{
                    heading3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-[#151515]">
                        {children}
                      </h3>
                    ),
                    heading4: ({ children }) => (
                      <h4 className="text-lg font-semibold text-[#151515]">
                        {children}
                      </h4>
                    ),
                    paragraph: ({ children }) => (
                      <p className="text-[#505050]">{children}</p>
                    ),
                    listItem: ({ children }) => (
                      <li className="text-[#505050] list-disc list-inside">
                        {children}
                      </li>
                    ),
                    oListItem: ({ children }) => (
                      <li className="text-[#505050] list-decimal list-inside mb-4">
                        {children}
                      </li>
                    ),
                  }}
                />
              )}
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
    </>
  );
}
