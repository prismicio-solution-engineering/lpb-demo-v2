import type { Client, Content } from "@prismicio/client";

export async function getLanguages(
  doc: Content.AllDocumentTypes,
  client: Client<Content.AllDocumentTypes>
) {
  // Fetch the actual translated docs (if any)
  const altDocs =
    doc.alternate_languages?.length > 0
      ? await client.getAllByIDs(
          doc.alternate_languages.map((alt) => alt.id),
          {
            lang: "*",
            // speed: fetch nothing useful, we only need lang + url
            fetch: `${doc.type}.__nonexistent-field__`,
          }
        )
      : [];

  // Optional: map lang codes to the human names configured in the repo
  const repo = await client.getRepository(); // has .languages :contentReference[oaicite:0]{index=0}
  const nameByLang = new Map(
    repo.languages.map((l) => [l.id, l.name] as const)
  );

  // Only languages where THIS document exists
  const docs = [doc, ...altDocs];

  // Current language first, then the rest
  docs.sort((a, b) => (a.lang === doc.lang ? -1 : b.lang === doc.lang ? 1 : 0));

  return docs.map((d) => ({
    url: d.url ?? `/${d.lang}`, // should exist for real translated docs
    // lang_name: nameByLang.get(d.lang) ?? d.lang, // display name
    lang_name: d.lang, // keep the code if you want it
  }));
}
