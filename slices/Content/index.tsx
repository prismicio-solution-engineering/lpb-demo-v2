import { SliceComponentProps } from "@prismicio/react";
import { ContentSlice } from "@/prismicio-types";
import TwoColumns from "./TwoColumns";
import TwoColumnsImage from "./TwoColumnImage";
import SingleColumn from "./SingleColumn";
import Quote from "./Quote";
import TwoColumnsImages from "./TwoColumnsImages";

/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<ContentSlice>;

/**
 * Component for "Content" Slices.
 */
const Content = ({ slice, ...otherProps }: ContentProps) => {
  switch (slice.variation) {
    case "twoColumnsImage":
      return <TwoColumnsImage slice={slice} {...otherProps} />;
      case "twoColumnsImages":
      return <TwoColumnsImages slice={slice} {...otherProps} />;
    case "twoColumns":
      return <TwoColumns slice={slice} {...otherProps} />;
      case "quote":
      return <Quote slice={slice} {...otherProps} />;
    default:
      return <SingleColumn slice={slice} {...otherProps} />;
  }
};

export default Content;
