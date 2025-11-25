import { type ReactNode } from "react";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

export async function generateStaticParams() {
  const client = createClient();
  const repository = await client.getRepository();

  const locales = repository.languages.map((lang) => {
    return { lang: lang.id };
  });

  return locales;
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <PrismicPreview repositoryName={repositoryName} />
    </>
  );
}
