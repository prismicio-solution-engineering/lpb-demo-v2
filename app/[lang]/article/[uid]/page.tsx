import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLanguages } from "@/utils/getLanguages";

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
    page = await client.getByUID("article", uid, {
      lang,
      graphQuery: `
        {
          article {
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
      page = await client.getByUID("article", uid, {
        lang: "en-us",
        graphQuery: `
        {
          article {
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

export default async function Article({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>;
}) {
  const resolvedParams = await params;
  const { lang, uid } = resolvedParams;

  const client = createClient();

  let page;
  try {
    page = await client.getByUID("article", uid, {
      lang,
    });
  } catch (error) {
    // Try to fall back to the default locale (en-us)
    try {
      page = await client.getByUID("article", uid, {
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

    getLanguages(page, client),
  ]);

  return (
    <>
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{
          pageData: page.data,
          locale: page?.lang,
        }}
      />
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("article", { lang: "*" });

  return pages?.map((page) => {
    return { uid: page.uid, lang: page.lang };
  });
}
