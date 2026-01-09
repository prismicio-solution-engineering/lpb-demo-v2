import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLanguages } from "@/utils/getLanguages";
import { getLocales } from "@/utils/getLocales";
import { Header } from "@/components/GlobalNavigation";
import { getAllLanguages } from "@/utils/getAllLanguages";
import Container from "@/components/Container";
import { PrismicNextImage } from "@prismicio/next";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locales = await getLocales();
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const client = createClient();

  let page;
  try {
    page = await client.getSingle("home", {
      lang,
    });
  } catch (error) {
    // Try to fall back to the default locale (en-us)
    try {
      page = await client.getSingle("home", {
        lang: "en-us",
      });
    } catch (fallbackError) {
      notFound();
    }
  }

  const [header, footer, settings, landingPages, recapPages, languages] = await Promise.all(
    [
      client
        .getSingle("header", {
          lang,
        })
        .catch(() =>
          client.getSingle("header", {
            lang: "en-us",
          })
        ),

      client
        .getSingle("footer", {
          lang,
        })
        .catch(() =>
          client.getSingle("footer", {
            lang: "en-us",
          })
        ),

      client
        .getSingle("settings", {
          lang,
        })
        .catch(() =>
          client.getSingle("settings", {
            lang: "en-us",
          })
        ),

      client.getAllByType("landing", { lang }).catch(() => []),
      
      client.getAllByType("recap", { lang }).catch(() => []),

      getAllLanguages(page, client, locales),
    ]
  );
  console.log(recapPages);
  return (
    <>
      <Header settings={settings} page={header} languages={languages} />
      <Container size="xl" className="mx-auto py-10">

        <div className="flex flex-col gap-8">
          <h2>Recap pages</h2>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-4 text-sm font-medium text-gray-500">Acount Executive</th>
                  <th className="px-8 py-4 text-sm font-medium text-gray-500">Title</th>
                  <th className="px-8 py-4 text-sm font-medium text-gray-500 text-right">Page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recapPages.map((recap, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    
                    {/* AE Column */}
                    <td className="px-8 py-4">
                      <div className="flex flex-row items-center gap-4">
                        {isFilled.contentRelationship(recap.data.contact) && recap.data.contact?.data?.image && (
                          <PrismicNextImage 
                            field={recap.data.contact?.data?.image} 
                            className="w-10 h-10 rounded-full object-cover" 
                          />
                        )}
                        <div className="flex flex-col">
                          {isFilled.contentRelationship(recap.data.contact) && recap.data.contact?.data?.name && (
                            <p className="text-sm font-medium text-gray-900">
                              {recap.data.contact.data.name}
                            </p>
                          )}
                          {isFilled.contentRelationship(recap.data.contact) && recap.data.contact?.data?.position && (
                            <p className="text-xs text-[#505050]">
                              {recap.data.contact.data.position}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Title Column */}
                    <td className="px-8 py-4">
                      <p className="text-sm text-gray-700 font-medium">
                        {recap.data.title}
                      </p>
                    </td>

                    {/* Action Column */}
                    <td className="px-8 py-4 text-right">
                      <a 
                        href={`${recap.url}`} 
                        className="w-fit inline-block p-2 text-sm rounded-lg bg-[#F7F7F7] hover:bg-gray-200 transition-colors "
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#505050"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>
                      </a>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </Container>
      {/* <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ lang }}
    /> */}
    </>
  );
}
