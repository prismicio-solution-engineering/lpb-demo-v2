import { FC, CSSProperties } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Container from "@/components/Container";
import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";
import { EcommerceDocumentData } from "@/prismicio-types";

/**
 * Props for `Banner`.
 */
export type BannerProps = SliceComponentProps<Content.BannerSlice>;

/**
 * Component for "Banner" Slices.
 */
const Banner: FC<BannerProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: EcommerceDocumentData };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="group relative my-20 py-20 min-h-125 overflow-hidden"
      style={
        {
          ...getFontTextStyles(pageData),
          "--primary-color": pageData?.primary_color as string,
          "--secondary-color": pageData?.secondary_color as string
        } as CSSProperties
      }
    >
      <Container>
        <PrismicNextLink field={slice.primary.lnk}>
          <PrismicNextImage
            field={slice.primary.img}
            fill
            className="object-cover"
          />
          <div className="top-1/2 right-30 absolute flex flex-col gap-2 bg-white/80 p-12 max-w-70 -translate-y-1/2">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2
                    className="text-(--primary-color) text-5xl leading-12"
                    style={getFontHeadingStyles(pageData)}
                  >
                    {children}
                  </h2>
                )
              }}
            />
            <PrismicRichText
              field={slice.primary.txt}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-(--primary-color) text-lg">{children}</p>
                )
              }}
            />
            <span className="text-(--primary-color) group-hover:text-(--secondary-color) underline underline-offset-3">
              {slice.primary.lnk.text}
            </span>
          </div>
        </PrismicNextLink>
      </Container>
    </section>
  );
};

export default Banner;
