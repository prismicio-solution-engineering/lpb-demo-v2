import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLanguages } from "@/utils/getLanguages";
import Layout from "@/components/Layout";
import { LandingDocument } from "@/prismicio-types";
import QueryParamsNote from "@/components/QueryParamsNote";

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
  searchParams,
}: {
  params: Promise<{ lang: string; uid: string }>;
  searchParams: Promise<{
    company?: string;
    role?: string;
    topic?: string;
    details?: string;
    instructions?: string;
  }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
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
        }),
      ),

    client
      .getSingle("footer", {
        lang,
      })
      .catch(() =>
        client.getSingle("footer", {
          lang: "en-us",
        }),
      ),

    client
      .getSingle("settings", {
        lang,
      })
      .catch(() =>
        client.getSingle("settings", {
          lang: "en-us",
        }),
      ),

    // Fetch available languages for the page and all exisitng locales in the project
    getLanguages(page, client),
  ]);
  // console.log("uid", page.uid);
  return (
    <>
      {/* <Header settings={settings} page={header} languages={languages} /> */}
      <div className="fixed right-4 bottom-4 z-[1200] max-w-[95vw] flex flex-col items-end gap-1.5">
        <QueryParamsNote query={resolvedSearchParams} embedded />
      </div>
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
            query: resolvedSearchParams,
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
    if (!page.uid) {
      console.warn("Found a landing page without a uid:", page, page.uid);
      return null;
    }
    // console.log("uid", page.uid);

    return { uid: page.uid, lang: page.lang };
  });
}
