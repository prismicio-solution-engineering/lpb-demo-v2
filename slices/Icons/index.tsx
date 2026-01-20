import { FC, CSSProperties } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Container from "@/components/Container";
import { getFontTextStyles } from "@/utils/getFontStyles";
import { EcommerceDocumentData } from "@/prismicio-types";

/**
 * Props for `Icons`.
 */
export type IconsProps = SliceComponentProps<Content.IconsSlice>;

/**
 * Component for "Icons" Slices.
 */
const Icons: FC<IconsProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: EcommerceDocumentData };
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pt-30 pb-10"
      style={
        {
          ...getFontTextStyles(pageData),
          "--primary-color": pageData.primary_color as string,
          "--secondary-color": pageData.secondary_color as string
        } as CSSProperties
      }
    >
      <Container>
        <div className="flex justify-between">
          {slice.primary.grp.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-2">
                <PrismicNextImage field={item.img} />
              </div>
              <PrismicRichText
                field={item.title}
                components={{
                  paragraph: ({ children }) => (
                    <p className="font-bold text-(--primary-color)">
                      {children}
                    </p>
                  )
                }}
              />
              <PrismicRichText
                field={item.desc}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-(--primary-color) text-sm">{children}</p>
                  )
                }}
              />
              <PrismicNextLink
                field={item.lnk}
                className="text-(--primary-color) hover:text-(--secondary-color) underline underline-offset-2"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Icons;
