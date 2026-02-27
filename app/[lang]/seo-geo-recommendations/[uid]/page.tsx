import { Metadata } from "next";
import { SeoGeoRecapDocument } from "@/prismicio-types";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";

import { notFound } from "next/navigation";

import Header from "./_components/Header";
import Hero from "./_components/Hero";
import RoiCalculator from "./_components/RoiCalculator";
import NextSteps from "./_components/NextSteps";
import Contact from "./_components/Contact";
import SeoPages from "./_components/SeoPages";

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
    page = await client.getByUID("seo_geo_recap", uid, {
      lang,
      graphQuery: `
          {
            seo_geo_recap {
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
      page = await client.getByUID("seo_geo_recap", uid, {
        lang: "en-us",
        graphQuery: `
          {
            seo_geo_recap {
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

export default async function SeoGeoRecap({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>;
}) {
  
  const resolvedParams = await params;
  const { lang, uid } = resolvedParams;
  
  const client = createClient();
  
  let page;
  try {
    page = await client.getByUID("seo_geo_recap", uid, {
      lang,
    });
  } catch (error) {
    // Try to fall back to the default locale (en-us)
    try {
      page = await client.getByUID("seo_geo_recap", uid, {
        lang: "en-us",
      });
    } catch (fallbackError) {
      notFound();
    }
  }

  const { data } = page as SeoGeoRecapDocument;

  return (
    <>
      <Header data={data} />
      <main>
        <Hero data={data}></Hero>
        <SeoPages data={data}></SeoPages>
        <RoiCalculator data={data}></RoiCalculator>
        <NextSteps data={data}></NextSteps>
        <Contact data={data}></Contact>
      </main>
    </>
  );
}
