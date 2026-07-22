import SimpleRoiCalculator from './simple';
import ComplexRoiCalculator from './complex';

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type RoiCalculatorProps = SliceComponentProps<Content.RoiCalculatorSlice>;

const RoiCalculator = ({ slice, ...otherProps }: RoiCalculatorProps) => {
  switch (slice.variation) {
    case "simpleCalculator":
      return <SimpleRoiCalculator slice={slice} {...otherProps} />;
    case "complexCalculator":
      return <ComplexRoiCalculator slice={slice} {...otherProps} />;
    default:
      return null;
  }
};

export default RoiCalculator;