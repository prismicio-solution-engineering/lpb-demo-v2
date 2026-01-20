"use client";

import { FC } from "react";
import { Content, ImageField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { EcommerceDocumentData, LandingDocumentData } from "@/prismicio-types";
import { useState, CSSProperties } from "react";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { PrismicNextImage } from "@prismicio/next";

interface IntegrationProduct {
  image_url: string;
  brand: string;
  description: string;
  price: string;
}

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

  const items = slice.primary.grp || [];

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
      className="flex justify-center py-15"
      style={
        {
          ...getFontTextStyles(pageData),
          "--primary-color": pageData.primary_color as string,
          "--secondary-color": pageData.secondary_color as string
        } as CSSProperties
      }
    >
      <Container>
        <div className="flex items-baseline gap-2 mb-15 ml-10">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2
                  className="text-(--primary-color) tracking-wider text-4xl"
                  style={getFontHeadingStyles(pageData)}
                >
                  {children}
                </h2>
              )
            }}
          />
          <div className="w-8 h-0.75 bg-(--secondary-color)" />
        </div>
        <div className="flex md:flex-row flex-col items-center">
          <div className="relative flex flex-1 items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="top-56.25 -left-3 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-100 p-2 border border-gray-300 -translate-y-1/2 cursor-pointer"
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
                {extendedItems.map((item, index) => {
                  const product = (item as { product: IntegrationProduct })
                    .product;

                  if (!product) return null;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center px-1 h-full text-center"
                      style={{ width: `${100 / extendedItems.length}%` }}
                    >
                      {product?.image_url && (
                        <div className="relative w-full h-87.5">
                          <PrismicNextImage
                            field={
                              {
                                url: product.image_url,
                                alt: product?.description || "Product Image",
                                copyright: null,
                                dimensions: { width: 1000, height: 1000 }
                              } as ImageField
                            }
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div className="bg-gray-200 mb-2 w-full h-px" />
                      {product?.brand && (
                        <h3
                          className="font-bold text-(--primary-color)"
                          style={getFontHeadingStyles(pageData)}
                        >
                          {product?.brand}
                        </h3>
                      )}
                      {product?.description && (
                        <p className="text-lg text-(--primary-color)">
                          {product?.description}
                        </p>
                      )}
                      {product?.price && (
                        <span className="font-bold text-(--primary-color)">
                          €{product?.price}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="top-56.25 -right-3 z-10 absolute flex justify-center items-center bg-white hover:bg-gray-100 p-2 border border-gray-300 -translate-y-1/2 cursor-pointer"
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
