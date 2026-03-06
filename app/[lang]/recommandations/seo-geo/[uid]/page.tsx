import { Metadata } from "next";
import { SeoGeoRecapDocument } from "@/prismicio-types";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";

import { notFound } from "next/navigation";

import { hubspotFormFetchLinks, extractHubspotData } from "@/lib/hubspot";
import { getHubSpotFormSchema } from '@/actions/hubspot';


import Header from "@/components/Recommendations/Header";
import Hero from "@/components/Recommendations/Hero";
import RoiCalculator from "@/components/Recommendations/RoiCalculator";
import NextSteps from "@/components/Recommendations/NextSteps";
import Contact, { contactFetchLinks } from "@/components/Recommendations/Contact";
import SeoPages from "@/components/Recommendations/SeoPages";

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
      fetchLinks: [...hubspotFormFetchLinks, ...contactFetchLinks],
    });
  } catch (error) {
    // Try to fall back to the default locale (en-us)
    try {
      page = await client.getByUID("seo_geo_recap", uid, {
        lang: "en-us",
        fetchLinks: [...hubspotFormFetchLinks, ...contactFetchLinks],
      });
    } catch (fallbackError) {
      notFound();
    }
  }

  const { data } = page as SeoGeoRecapDocument;

  let formProps = extractHubspotData(data);
  if (formProps && formProps.formId) {
    const schema = await getHubSpotFormSchema(formProps.formId);
    formProps = {
      ...formProps,
      schema: schema 
    };
  }

  const seoNavLinks = [
    { id: "hero", label: "Top" },
    { id: "pages", label: "SEO Pages" },
  ];
  if (data.roi_calculator) {
    seoNavLinks.push({ id: "roi-calculator", label: "ROI" });
  }
  seoNavLinks.push({ id: "next-steps", label: "Next Steps" });

  return (
    <>
      <Header data={data} navLinks={seoNavLinks} formProps={formProps} />
      <main>
        <Hero data={data}></Hero>
        <SeoPages data={data}></SeoPages>
        <RoiCalculator data={data}></RoiCalculator>
        <NextSteps data={data}></NextSteps>
        <Contact data={data} formProps={formProps}></Contact>
      </main>
    </>
  );
}
