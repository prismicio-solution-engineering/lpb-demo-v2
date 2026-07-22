import { createClient } from "@/prismicio";

const client = createClient();

export const getEcommercePages = async (lang: string) => {
  try {
    const articles = await client.getAllByType("ecommerce", {
      lang,
      orderings: {
        field: "document.last_publication_date",
        direction: "desc"
      }
    });
    return articles;
  } catch (error) {
    console.log("Error fetching Showcase websites :", error);
    return [];
  }
};
