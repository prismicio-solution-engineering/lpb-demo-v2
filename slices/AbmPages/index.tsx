import AbmPagesDefault from './default'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AbmPages`.
 */
export type AbmPagesProps = SliceComponentProps<Content.AbmPagesSlice>;

/**
 * Component for "AbmPages" Slices.
 */
const AbmPages = ({ slice, ...otherProps }: AbmPagesProps) => {
  switch (slice.variation) {
    default:
      return <AbmPagesDefault slice={ slice } { ...otherProps} />
  }
};

export default AbmPages;
