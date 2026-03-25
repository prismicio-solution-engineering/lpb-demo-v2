import HeroRecommendationDefault from "./default";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HeroRecommendation`.
 */
export type HeroRecommendationProps =
  SliceComponentProps<Content.HeroRecommendationSlice>;

/**
 * Component for "HeroRecommendation" Slices.
 */
const HeroRecommendation = ({ slice, ...otherProps }: HeroRecommendationProps) => {
  switch (slice.variation) {
    default:
      return <HeroRecommendationDefault slice={ slice } { ...otherProps } />
  }
};

export default HeroRecommendation;
