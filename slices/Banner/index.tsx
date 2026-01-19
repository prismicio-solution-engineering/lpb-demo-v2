import BannerDefault from "./default";
import BannerVariation1 from "./variation1";

import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type BannerProps = SliceComponentProps<Content.BannerSlice>;

const Banner = ({ slice, ...otherProps }: BannerProps) => {
  switch (slice.variation) {
    case "variation1":
      return <BannerVariation1 slice={slice} {...otherProps} />;
    default:
      return <BannerDefault slice={slice} {...otherProps} />;
  }
};

export default Banner;
