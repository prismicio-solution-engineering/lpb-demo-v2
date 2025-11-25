import CtaDefault from "./default";
import CtaVariant1 from "./variation1";
import CtaVariant2 from "./variation2";

import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type CtaProps = SliceComponentProps<Content.CtaSlice>;

const Cta = ({ slice, ...otherProps }: CtaProps) => {
  switch (slice.variation) {
    case "variation1":
      return <CtaVariant1 slice={slice} {...otherProps} />;
    case "variation2":
      return <CtaVariant2 slice={slice} {...otherProps} />;
    default:
      return <CtaDefault slice={slice} {...otherProps} />;
  }
};

export default Cta;
