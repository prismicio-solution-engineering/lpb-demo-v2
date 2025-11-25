import FaqDefault from "./default";
import FaqVariant1 from "./variation1";
import FaqVariant2 from "./variation2";

import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq = ({ slice, ...otherProps }: FaqProps) => {
  switch (slice.variation) {
    case "variation1":
      return <FaqVariant1 slice={slice} {...otherProps} />;
    case "variation2":
      return <FaqVariant2 slice={slice} {...otherProps} />;
    default:
      return <FaqDefault slice={slice} {...otherProps} />;
  }
};

export default Faq;
