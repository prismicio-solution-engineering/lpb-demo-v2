import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { getLanguages } from "@/utils/getLanguages";
import { Header } from "@/components/GlobalNavigation";
import Container from "@/components/Container";

export default async function Home({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const client = createClient();

  let page;
  try {
    page = await client.getSingle("home", {
      lang
    });
  } catch (error) {
    // Try to fall back to the default locale (en-us)
    try {
      page = await client.getSingle("home", {
        lang: "en-us"
      });
    } catch (fallbackError) {
      notFound();
    }
  }

  const [header, footer, settings, landingPages, languages] = await Promise.all(
    [
      client
        .getSingle("header", {
          lang
        })
        .catch(() =>
          client.getSingle("header", {
            lang: "en-us"
          })
        ),

      client
        .getSingle("footer", {
          lang
        })
        .catch(() =>
          client.getSingle("footer", {
            lang: "en-us"
          })
        ),

      client
        .getSingle("settings", {
          lang
        })
        .catch(() =>
          client.getSingle("settings", {
            lang: "en-us"
          })
        ),

      client.getAllByType("landing", { lang }).catch(() => []),

      getLanguages(page, client)
    ]
  );

  return (
    <>
      <Header settings={settings} page={header} languages={languages} />
      <Container size="full" className="mx-auto py-10">
        <h1 className="text-center">Hello World</h1>
      </Container>
      {/* <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ lang }}
    /> */}
    </>
  );
}
