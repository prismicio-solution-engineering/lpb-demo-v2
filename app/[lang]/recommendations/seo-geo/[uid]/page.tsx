import { Metadata } from "next";
import { SeoGeoRecapDocument } from "@/prismicio-types";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

import Header, { NavLink } from "@/components/Recommendations/Header";
import { TopAnimation } from "@/components/Animations/TopAnimation";
import { BottomAnimation } from "@/components/Animations/BottomAnimation";

type Params = { lang: string; uid: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, uid } = await params;
  const client = createClient();

  let page;
  try {
    page = await client.getByUID("seo_geo_recap", uid, {
      lang,
      graphQuery: `
          {
            seo_geo_recap {
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
      page = await client.getByUID("seo_geo_recap", uid, {
        lang: "en-us",
        graphQuery: `
          {
            seo_geo_recap {
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

export default async function SeoGeoRecap({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, uid } = await params;
  const client = createClient();

  let page;
  try {
    page = await client.getByUID("seo_geo_recap", uid, {
      lang,
    });
  } catch (error) {
    // Try to fall back to the default locale (en-us)
    try {
      page = await client.getByUID("seo_geo_recap", uid, {
        lang: "en-us",
      });
    } catch (fallbackError) {
      notFound();
    }
  }

  const { data } = page as unknown as SeoGeoRecapDocument;


  // Dynamic header links
  const sliceToNavMap: Record<string, { id: string; label: string }> = {
    hero_recommendation: { id: "hero", label: "Top" },
    seo_pages: { id: "pages", label: "SEO Pages" },
    roi_calculator: { id: "roi-calculator", label: "ROI" },
    next_steps: { id: "next-steps", label: "Next Steps" },
    contact: { id: "contact", label: "Contact" },
    embed_section: { id: "embed", label: "Video" }
  };

  const dynamicNavLinks = data.slices
    .map((slice) => sliceToNavMap[slice.slice_type])
    .filter(Boolean) //Delete slices with no navigation link
    // Optional : Avoid duplicates if a slice appears twice
    .filter((value, index, self) => 
      index === self.findIndex((t) => t?.id === value?.id)
    ) as NavLink[];

  // Slices color for transition
  const getBgColor = (sliceType: string) => {
    const blackSlices = ["understanding", "opportunities", "seo_pages"];
    return blackSlices.includes(sliceType) ? "black" : "white";
  };

  return (
    <>
      <Header data={data} navLinks={dynamicNavLinks} />
      
      <main>
        {data.slices.map((slice, index) => {
          const currentBg = getBgColor(slice.slice_type);
          const nextSlice = data.slices[index + 1];
          const nextBg = nextSlice ? getBgColor(nextSlice.slice_type) : null;

          return (
            <div key={slice.id || index}>
              <SliceZone 
                slices={[slice]} 
                components={components} 
                context={{ pageData: data }} 
              />

              {/* --- TRANSITION LOGIC --- */}
              {/* WHITE to BLACK */}
              {currentBg === "white" && nextBg === "black" && (
                <div className="w-full bg-[#151515]">
                  <TopAnimation />
                </div>
              )}
              {/* BLACK to WHITE */}
              {currentBg === "black" && nextBg === "white" && (
                <div className="w-full bg-[#FFFFFF]">
                  <BottomAnimation />
                </div>
              )}
            </div>
          );
        })}
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("seo_geo_recap", { lang: "*" });

  return pages.map((page) => ({
    uid: page.uid,
    lang: page.lang,
  }));
}