
import { RecapDocumentData, Simplify } from "@/prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

import { DotGrid } from "./DotGrid";

import Container from "@/components/Container";
import { BottomAnimation } from "@/components/Animations/BottomAnimation";


export default function Data({data}:{data:Simplify<RecapDocumentData>}) {
  return (
    <section
          id="data"
          className="scroll-mt-24 relative bg-[#151515] py-15 pb-50 md:pb-87.5"
        >
          <div className="absolute bottom-0 left-0 bg-[#E8F8F3] w-full">
            <BottomAnimation></BottomAnimation>
          </div>
          <div className="relative">
            <Container
              size="xl"
              className="flex flex-col items-center text-center gap-16"
            >
              <div className="z-20 flex flex-col items-center text-center gap-6 max-w-175">
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
              <div className="relative w-full z-10 p-0 sm:p-8">
                <DotGrid></DotGrid>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full h-175 bg-[radial-gradient(closest-side,#8E44EC7e_0%,transparent_100%)] -z-10 pointer-events-none"></div>
                <div className="w-full z-10 border border-solid border-[#ffffff32] rounded-2xl overflow-x-auto bg-[#FFFFFF] p-4 shadow-[0px_0px_64px_0px_#8E44EC7E]">

                  <table className="w-full text-[#505050] text-sm text-left block md:table">
                    {/* THEAD : Caché sur mobile (hidden), visible sur desktop (md:table-header-group) */}
                    <thead className="hidden md:table-header-group">
                      <tr>
                        <td className="p-4 rounded-tl-2xl align-top text-left font-bold bg-gray-50 md:bg-transparent">
                          Company
                        </td>
                        <td className="p-4 align-top text-left font-bold">Role</td>
                        <td className="p-4 align-top text-left font-bold">
                          Personalization Instructions
                        </td>
                        <td className="p-4 rounded-tr-2xl align-top text-left font-bold">
                          Page
                        </td>
                      </tr>
                    </thead>

                    {/* TBODY : Block sur mobile */}
                    <tbody className="flex flex-col gap-6 md:table-row-group">
                      {data.generated_page.map((item, index) => {

                        const hasAllFields = 
                        isFilled.keyText(item.company) &&
                        isFilled.keyText(item.role) &&
                        isFilled.keyText(item.personalization_instructions) &&
                        isFilled.link(item.page_link);

                        if (!hasAllFields) return null;

                        return (
                        <tr
                          key={index}
                          // TR : Devient une carte sur mobile (block, mb-6, border)
                          // redevient une ligne de tableau sur desktop (md:table-row, md:border-t-[1.5px])
                          className="block rounded-lg border border-[#50505032] p-4 md:p-0 md:table-row md:border-0 md:border-t-[1.5px] md:rounded-none bg-white"
                        >
                          {/* CELLULE COMPANY */}
                            <td className="block py-2 px-0 md:px-4 md:py-8 align-top text-left md:table-cell">
                              {/* Label Mobile : Visible uniquement sur mobile */}
                              {isFilled.keyText(item.company) && (
                                <>
                                  <span className="block font-bold text-[#505050] mb-1 md:hidden">
                                    Company
                                  </span>
                                  <span className=" md:text-sm md:font-normal">
                                    {item.company}
                                  </span>
                                </>
                              )}
                            </td>

                          {/* CELLULE ROLE */}
                          <td className="block py-2 px-0 md:px-4 md:py-8 text-sm align-top text-left md:table-cell">
                            {isFilled.keyText(item.role) && (
                              <>
                                <span className="block font-bold text-[#505050] mb-1 md:hidden">
                                  Role
                                </span>
                                {item.role}
                              </>
                            )}
                          </td>

                          {/* CELLULE INSTRUCTIONS */}
                          <td className="block py-2 px-0 md:px-4 md:py-8 text-sm align-top text-left md:table-cell">
                            {isFilled.keyText(item.personalization_instructions) && (
                              <>
                                <span className="block font-bold text-[#505050] mb-1 md:hidden">
                                  Instructions
                                </span>
                                {item.personalization_instructions}
                              </>
                            )}
                          </td>

                          {/* CELLULE PAGE / LIEN */}
                          <td className="block py-4 px-0 md:px-4 md:py-8 text-sm align-center text-left md:table-cell">
                            {isFilled.link(item.page_link) && (
                              <PrismicNextLink
                                field={item.page_link}
                                target="blank"
                                className="text-[#151515] px-6 py-2 rounded-lg bg-[#E8C7FF] block w-full text-center md:inline md:w-auto"
                              />
                            )}
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              </div>
            </Container>
          </div>
        </section>
    )
}
