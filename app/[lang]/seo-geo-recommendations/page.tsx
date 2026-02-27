import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

export default async function SeoGeoRecommendations({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const client = createClient();
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const [pages] = await Promise.all([
    client.getAllByType("seo_geo_recap", { lang: lang }),
  ]);

  return (
    <>
      <h1>SEO & GEO Recommendations</h1>

      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <PrismicNextLink
              document={page}
            >{`${page.data.title} - ${page.url}`}</PrismicNextLink>
          </li>
        ))}
      </ul>
    </>
  );
}
