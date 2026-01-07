import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLanguages } from "@/utils/getLanguages";
import { getLocales } from "@/utils/getLocales";
import { Header } from "@/components/GlobalNavigation";
import Layout from "@/components/Layout";
import { LandingDocument } from "@/prismicio-types";
import Disclaimer from "@/components/Disclaimer";

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
    page = await client.getByUID("landing", uid, {
      lang,
      graphQuery: `
        {
          landing {
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
      page = await client.getByUID("landing", uid, {
        lang: "en-us",
        graphQuery: `
        {
          landing {
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

export default async function Landing({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>;
}) {
  // Fetch all available locales in the repo
  const locales = await getLocales();

  const resolvedParams = await params;
  const { lang, uid } = resolvedParams;

  const client = createClient();

  let page;
  try {
    page = await client.getByUID("landing", uid, {
      lang,
    });
  } catch (error) {
    // Try to fall back to the default locale (en-us)
    try {
      page = await client.getByUID("landing", uid, {
        lang: "en-us",
      });
    } catch (fallbackError) {
      notFound();
    }
  }

  const [header, footer, settings, languages] = await Promise.all([
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

    // Fetch available languages for the page and all exisitng locales in the project
    getLanguages(page, client),
  ]);

  return (
    <>
      {/* <Header settings={settings} page={header} languages={languages} /> */}
      <Disclaimer />
      <Layout
        lang={lang}
        languages={languages}
        altLang={page.alternate_languages}
        currentPage={page.type}
        page={page as LandingDocument}
      >
        <SliceZone
          slices={page.data.slices}
          components={components}
          context={{
            pageData: page.data,
            locale: page?.lang,
          }}
        />
      </Layout>
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("landing", { lang: "*" });

  return pages?.map((page) => {
    return { uid: page.uid, lang: page.lang };
  });
}
