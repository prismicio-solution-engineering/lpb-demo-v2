import AbmSimpleRoiCalculator from './simple';
import AbmComplexRoiCalculator from './complex';

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AbmRoiCalculator`.
 */
export type AbmRoiCalculatorProps = SliceComponentProps<Content.AbmRoiCalculatorSlice>;

/**
 * Component for "AbmRoiCalculator" Slices.
 */
const AbmRoiCalculator = ({ slice, ...otherProps }: AbmRoiCalculatorProps) => {
  switch( slice.variation ) {
    case "simpleCalculator":
      return <AbmSimpleRoiCalculator slice={ slice } { ...otherProps } />
    case "complexCalculator":
      return <AbmComplexRoiCalculator slice={ slice } { ...otherProps } />
    default:
      return null
  }
};

export default AbmRoiCalculator;
