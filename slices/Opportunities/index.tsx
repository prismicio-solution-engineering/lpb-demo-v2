import OpportunitiesDefault from './default'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Opportunities`.
 */
export type OpportunitiesProps =
  SliceComponentProps<Content.OpportunitiesSlice>;

/**
 * Component for "Opportunities" Slices.
 */
const Opportunities = ({ slice, ...otherProps }: OpportunitiesProps) => {
  switch (slice.variation) {
    default:
      return <OpportunitiesDefault slice={ slice } { ...otherProps } />
  }
};

export default Opportunities;
