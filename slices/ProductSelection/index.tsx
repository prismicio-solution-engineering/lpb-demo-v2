"use client";
import { FC } from "react";
import {
  Content,
  ImageField,
  LinkField,
  RichTextField
} from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { EcommerceDocumentData, LandingDocumentData } from "@/prismicio-types";
import { useState, CSSProperties } from "react";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

type ProductItem = {
  img: ImageField;
  title: string;
  desc: RichTextField;
  price: string;
  lnk: LinkField;
};

/**
 * Props for `ProductSelection`.
 */
export type ProductSelectionProps =
  SliceComponentProps<Content.ProductSelectionSlice>;

/**
 * Component for "ProductSelection" Slices.
 */
const ProductSelection: FC<ProductSelectionProps> = ({ slice, context }) => {
  const visibleCount = 3;
  const [currentIndex, setCurrentIndex] = useState(visibleCount);
  const [transitionDuration, setTransitionDuration] = useState(0);

  const { pageData } = context as {
    pageData: EcommerceDocumentData | LandingDocumentData;
  };
  // --- DEBUT MOCK ---
  // const items = slice.primary.grp || [];
  const items = [
    {
      img: {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
        alt: "Montre",
        dimensions: { width: 600, height: 600 }
      },
      title: "Montre Chrono",
      desc: [
        {
          type: "paragraph",
          text: "Un design intemporel pour un style élégant au quotidien.",
          spans: []
        }
      ],
      price: "129,00 €",
      lnk: { link_type: "Web", url: "#" }
    },
    {
      img: {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
        alt: "Casque Audio",
        dimensions: { width: 600, height: 600 }
      },
      title: "Casque Studio",
      desc: [
        {
          type: "paragraph",
          text: "Une qualité sonore immersive avec réduction de bruit.",
          spans: []
        }
      ],
      price: "249,00 €",
      lnk: { link_type: "Web", url: "#" }
    },
    {
      img: {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
        alt: "Sneakers",
        dimensions: { width: 600, height: 600 }
      },
      title: "Sneakers Urban",
      desc: [
        {
          type: "paragraph",
          text: "Confort absolu pour vos aventures urbaines.",
          spans: []
        }
      ],
      price: "89,00 €",
      lnk: { link_type: "Web", url: "#" }
    },
    {
      img: {
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
        alt: "Sac à dos",
        dimensions: { width: 600, height: 600 }
      },
      title: "Sac Voyage",
      desc: [
        {
          type: "paragraph",
          text: "Robuste et pratique, idéal pour les weekends.",
          spans: []
        }
      ],
      price: "65,00 €",
      lnk: { link_type: "Web", url: "#" }
    }
  ] as unknown as ProductItem[];
  // --- FIN MOCK ---
  if (!items.length) return null;

  const extendedItems = [
    ...items.slice(-visibleCount),
    ...items,
    ...items.slice(0, visibleCount)
  ];

  const handleNext = () => {
    setTransitionDuration(400);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    setTransitionDuration(400);
    setCurrentIndex(prev => prev - 1);
  };

  const handleTransitionEnd = () => {
    const realLength = items.length;

    if (currentIndex >= visibleCount + realLength) {
      setTransitionDuration(0);
      setCurrentIndex(visibleCount);
    } else if (currentIndex < visibleCount) {
      setTransitionDuration(0);
      setCurrentIndex(visibleCount + realLength - 1);
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex justify-center py-[60px]"
      style={
        {
          ...getFontTextStyles(pageData),
          "--primary-color": pageData.primary_color as string,
          "--secondary-color": pageData.secondary_color as string
        } as CSSProperties
      }
    >
      <Container>
        <div className="flex md:flex-row flex-col items-center">
          <div className="relative flex flex-1 items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="top-[225px] -left-3 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-100 p-2 border border-gray-300 -translate-y-1/2 cursor-pointer"
            >
              <svg width="15px" height="15px" viewBox="-19.04 0 75.803 75.803">
                <g transform="translate(-624.082 -383.588)">
                  <path
                    id="Path_56"
                    data-name="Path 56"
                    d="M660.313,383.588a1.5,1.5,0,0,1,1.06,2.561l-33.556,33.56a2.528,2.528,0,0,0,0,3.564l33.556,33.558a1.5,1.5,0,0,1-2.121,2.121L625.7,425.394a5.527,5.527,0,0,1,0-7.807l33.556-33.559A1.5,1.5,0,0,1,660.313,383.588Z"
                    fill="#000000"
                  />
                </g>
              </svg>
            </button>

            <div className="relative flex-1 overflow-hidden">
              <div
                className="flex"
                onTransitionEnd={handleTransitionEnd}
                style={{
                  width: `${(extendedItems.length / visibleCount) * 100}%`,
                  transform: `translateX(-${(currentIndex * 100) / extendedItems.length}%)`,
                  transitionDuration: `${transitionDuration}ms`,
                  transitionProperty: "transform",
                  transitionTimingFunction: "ease-in-out"
                }}
              >
                {extendedItems.map((item, index) => (
                  <PrismicNextLink
                    field={item.lnk}
                    key={index}
                    className="flex flex-col items-center px-1 h-full text-center"
                    style={{ width: `${100 / extendedItems.length}%` }}
                  >
                    {item.img && (
                      <div className="w-full h-[400px]">
                        <PrismicNextImage
                          field={item.img}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="bg-gray-200 mb-2 w-full h-[1px]" />
                    {item.title && (
                      <h3
                        className="font-bold text-(--primary-color)"
                        style={getFontHeadingStyles(pageData)}
                      >
                        {item.title}
                      </h3>
                    )}
                    {item.desc && (
                      <PrismicRichText
                        field={item.desc}
                        components={{
                          paragraph: ({ children }) => (
                            <p className="text-lg text-(--primary-color)">
                              {children}
                            </p>
                          )
                        }}
                      />
                    )}
                    {item.price && (
                      <span className="font-bold text-(--primary-color)">
                        {item.price}
                      </span>
                    )}
                  </PrismicNextLink>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="top-[225px] -right-3 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-100 p-2 border border-gray-300 -translate-y-1/2 cursor-pointer"
            >
              <svg
                className="rotate-180"
                width="15px"
                height="15px"
                viewBox="-19.04 0 75.803 75.803"
              >
                <g transform="translate(-624.082 -383.588)">
                  <path
                    id="Path_56"
                    data-name="Path 56"
                    d="M660.313,383.588a1.5,1.5,0,0,1,1.06,2.561l-33.556,33.56a2.528,2.528,0,0,0,0,3.564l33.556,33.558a1.5,1.5,0,0,1-2.121,2.121L625.7,425.394a5.527,5.527,0,0,1,0-7.807l33.556-33.559A1.5,1.5,0,0,1,660.313,383.588Z"
                    fill="#000000"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductSelection;
