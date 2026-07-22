import NextStepsDefault from './default'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `NextSteps`.
 */
export type NextStepsProps = SliceComponentProps<Content.NextStepsSlice>;

/**
 * Component for "NextSteps" Slices.
 */
const NextSteps = ({ slice, ...otherProps }: NextStepsProps) => {
  switch (slice.variation) {
    default:
      return <NextStepsDefault slice={ slice } { ...otherProps } />
  }
};

export default NextSteps;
