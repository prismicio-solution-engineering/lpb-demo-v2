import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";

export default async function Recommandations({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const client = createClient();
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const [pages] = await Promise.all([
    client.getAllByType("recap", { lang: lang }),
  ]);

  return (
    <>
      <h1>Recommandations</h1>

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
