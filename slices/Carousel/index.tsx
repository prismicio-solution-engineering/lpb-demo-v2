import CarouselDefault from "./default";
import CarouselVariant1 from "./variation1";
import CarouselVariant2 from "./variation2";

import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

const Carousel = ({ slice, ...otherProps }: CarouselProps) => {
  switch (slice.variation) {
    case "variation1":
      return <CarouselVariant1 slice={slice} {...otherProps} />;
    case "variation2":
      return <CarouselVariant2 slice={slice} {...otherProps} />;
    default:
      return <CarouselDefault slice={slice} {...otherProps} />;
  }
};

export default Carousel;
