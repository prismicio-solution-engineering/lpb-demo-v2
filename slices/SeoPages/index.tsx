import SeoPagesDefault from './default';
import SeoPagesAuditVariant from './auditVariant'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SeoPages`.
 */
export type SeoPagesProps = 
  SliceComponentProps<Content.SeoPagesSlice>;

/**
 * Component for "SeoPages" Slices.
 */
const SeoPages = ({ slice, ...otherProps }: SeoPagesProps) => {
  switch (slice.variation) {
    case "seoGeoAudit":
      return <SeoPagesAuditVariant slice={ slice } { ...otherProps } />
    default:
      return <SeoPagesDefault slice={ slice } {...otherProps} />
  }
};

export default SeoPages;