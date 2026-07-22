import ContactDefault from './default'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice, ...otherProps }: ContactProps) => {
  switch (slice.variation) {
    default:
      return <ContactDefault slice={slice} {...otherProps} />
  }
};

export default Contact;
