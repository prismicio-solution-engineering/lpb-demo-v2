import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `NavigationLinks`.
 */
export type NavigationLinksProps =
  SliceComponentProps<Content.NavigationLinksSlice>;

/**
 * Component for "NavigationLinks" Slices.
 */
const NavigationLinks: FC<NavigationLinksProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for navigation_links (variation: {slice.variation})
      slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use the Prismic MCP server with your code editor
       * 📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
       */}
    </section>
  );
};

export default NavigationLinks;
