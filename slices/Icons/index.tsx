import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Container from "@/components/Container";

/**
 * Props for `Icons`.
 */
export type IconsProps = SliceComponentProps<Content.IconsSlice>;

/**
 * Component for "Icons" Slices.
 */
const Icons: FC<IconsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        {slice.primary.grp.map((item, index) => (
          <div key={index}>
            <div>
              <PrismicNextImage field={item.img} />
            </div>
            <PrismicRichText field={item.title} />
            <PrismicRichText field={item.desc} />
            <PrismicNextLink field={item.lnk} />
          </div>
        ))}
      </Container>
    </section>
  );
};

export default Icons;
