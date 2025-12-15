import { Metadata } from "next";
import { RecapDocument } from "@/prismicio-types";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";

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

  return (
    <>
      <h1>{data.title}</h1>

      {/* Hero */}
      {/* Context */}
      {/* Opps */}
      {/* Data */}
      {/* Next steps */}
    </>
  );
}
