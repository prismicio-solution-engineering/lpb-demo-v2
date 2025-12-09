import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLanguages } from "@/utils/getLanguages";
import { getLocales } from "@/utils/getLocales";

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

  const [header, footer, landingPages, languages] = await Promise.all([
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
    client.getAllByType("landing", { lang }).catch(() => []),
    getLanguages(page, client, locales),
  ]);

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ lang }}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const client = createClient();
  let page;
  try {
    page = await client.getSingle("home", {
      lang,
      graphQuery: `
        {
          home {
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
      page = await client.getSingle("home", {
        lang: "en-us",
        graphQuery: `
        {
          home {
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
