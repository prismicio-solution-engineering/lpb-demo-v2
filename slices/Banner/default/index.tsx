import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Container from "@/components/Container";

/**
 * Props for `Banner`.
 */
export type BannerProps = SliceComponentProps<Content.BannerSlice>;

/**
 * Component for "Banner" Slices.
 */
const Banner: FC<BannerProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <PrismicNextImage field={slice.primary.img} />
        <div className="bg-white">
          <PrismicRichText field={slice.primary.title} />
          <PrismicRichText field={slice.primary.txt} />
          <PrismicNextLink field={slice.primary.lnk} />
        </div>
      </Container>
    </section>
  );
};

export default Banner;
