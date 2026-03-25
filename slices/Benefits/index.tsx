import BenefitsDefault from './default'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Benefits`.
 */
export type BenefitsProps = SliceComponentProps<Content.BenefitsSlice>;

/**
 * Component for "Benefits" Slices.
 */
const Benefits = ({ slice, ...otherProps }: BenefitsProps) => {
  switch (slice.variation) {
    default:
      return <BenefitsDefault slice={ slice } { ...otherProps } />
  }
};

export default Benefits;
