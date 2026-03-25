import UnderstandingDefault from './default'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Understanding`.
 */
export type UnderstandingProps =
  SliceComponentProps<Content.UnderstandingSlice>;

/**
 * Component for "Understanding" Slices.
 */
const Understanding = ({ slice, ...otherProps }: UnderstandingProps) => {
  switch (slice.variation) {
    default:
      return <UnderstandingDefault slice={ slice } { ...otherProps } />
  }
};

export default Understanding;
