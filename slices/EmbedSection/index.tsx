import EmbedSectionDefault from './default'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `EmbedSection`.
 */
export type EmbedSectionProps = SliceComponentProps<Content.EmbedSectionSlice>;

/**
 * Component for "EmbedSection" Slices.
 */
const EmbedSection = ({ slice, ...otherProps }: EmbedSectionProps) => {
  switch (slice.variation) {
    default:
      return <EmbedSectionDefault slice={ slice } { ...otherProps } />
  }
};

export default EmbedSection;
