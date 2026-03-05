import { Metadata } from "next";
import { AbmRecapDocument } from "@/prismicio-types";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";

import { notFound } from "next/navigation";

import { hubspotFormFetchLinks, extractHubspotData } from "@/lib/hubspot";


import Header from "@/components/Recommendations/Header";
import Hero from "@/components/Recommendations/Hero";
import NextSteps from "@/components/Recommendations/NextSteps";
import Contact from "@/components/Recommendations/Contact";
import Understanding from "@/components/Recommendations/Understanding";
import Opportunities from "@/components/Recommendations/Opportunities";
import AbmPages from "@/components/Recommendations/AbmPages";

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
    page = await client.getByUID("abm_recap", uid, {
      lang,
      graphQuery: `
          {
            abm_recap {
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
      page = await client.getByUID("abm_recap", uid, {
        lang: "en-us",
        graphQuery: `
          {
            abm_recap {
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

export default async function AbmRecap({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>;
}) {
  
  const resolvedParams = await params;
  const { lang, uid } = resolvedParams;
  
  const client = createClient();
  
  let page;
  try {
    page = await client.getByUID("abm_recap", uid, {
      lang,
      fetchLinks: hubspotFormFetchLinks
    });
  } catch (error) {
    // Try to fall back to the default locale (en-us)
    try {
      page = await client.getByUID("abm_recap", uid, {
        lang: "en-us",
        fetchLinks: hubspotFormFetchLinks
      });
    } catch (fallbackError) {
      notFound();
    }
  }

  const { data } = page as AbmRecapDocument;

  const formProps = extractHubspotData(data);

  const abmNavLinks = [
    { id: "hero", label: "Top" },
    { id: "understanding", label: "Understanding" },
    { id: "opportunities", label: "Opportunities" },
    { id: "pages", label: "ABM Pages" },
    { id: "next-steps", label: "Next Steps" },
  ];

  return (
    <>
      <Header data={data} navLinks={abmNavLinks} />
      <main>
        <Hero data={data} />
        <Understanding data={data}></Understanding>
        <Opportunities data={data}></Opportunities>
        <AbmPages data={data}></AbmPages>
        <NextSteps data={data}></NextSteps>
        <Contact data={data} formProps={formProps}></Contact>
      </main>
    </>
  );
}
