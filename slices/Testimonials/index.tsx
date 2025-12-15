import TestimonialsDefault from "./default";
import TestimonialsVariant1 from "./variation1";
import TestimonialsVariant2 from "./variation2";

import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const Testimonials = ({ slice, ...otherProps }: TestimonialsProps) => {
  switch (slice.variation) {
    case "variation1":
      return <TestimonialsVariant1 slice={slice} {...otherProps} />;
    case "variation2":
      return <TestimonialsVariant2 slice={slice} {...otherProps} />;
    default:
      return <TestimonialsDefault slice={slice} {...otherProps} />;
  }
};

export default Testimonials;
