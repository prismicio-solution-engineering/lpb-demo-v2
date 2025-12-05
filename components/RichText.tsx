import { getFontTextStyles, getFontHeadingStyles } from "@/utils/getFontStyles";

import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
} from "@prismicio/react";
import type * as prismic from "@prismicio/client";
import clsx from "clsx";

// TODO : headings should be different in articles and blocks, they are too big

/** @type {import("@prismicio/react").JSXMapSerializer} */

export function RichText({
  page,
  components,
  classNames,
  ...props
}: {
  page?: prismic.Content.LandingDocumentData;
  components?: JSXMapSerializer;
  field: prismic.RichTextField;
  classNames?: string;
}) {
  const textColor = "text-[#3f3f47]";

  const defaultComponents: JSXMapSerializer = {
    heading1: ({ children }) => (
      <h1
        className={clsx(`text-5xl font-bold`, classNames)}
        style={page && getFontHeadingStyles(page)}
      >
        {children}
      </h1>
    ),
    heading2: ({ children }) => (
      <h2
        className={clsx(`text-4xl font-bold`, classNames)}
        style={page && getFontHeadingStyles(page)}
      >
        {children}
      </h2>
    ),
    heading3: (
      { children } // Done
    ) => (
      <h3
        className={clsx(
          "text-xl font-bold leading-[1.2] md:text-5xl  lg:text-6xl font-headings",
          classNames
        )}
        style={page && getFontHeadingStyles(page)}
      >
        {children}
      </h3>
    ),
    heading4: ({ children }) => (
      <h4
        className={clsx(`font-bold text-2xl`, classNames)}
        style={page && getFontHeadingStyles(page)}
      >
        {children}
      </h4>
    ),
    preformatted: ({ children }) => (
      <pre
        className={clsx(
          "font-mono mt-3 mb-7 p-4 text-lg text-gray-200 bg-gray-700 border-gray-900 rounded-lg shadow-lg whitespace-break-spaces",
          classNames
        )}
      >
        <code>{children}</code>
      </pre>
    ),
    paragraph: ({ children }) => (
      <p
        className={clsx("text-gray-700 text-lg leading-7", classNames)}
        style={page && getFontTextStyles(page)}
      >
        {children}
      </p>
    ),
    list: ({ children }) => (
      <ul
        className={clsx(
          `ml-4 my-2 wrap-break-words text-2xl font-normal marker:${textColor}`,
          classNames
        )}
        style={page && getFontTextStyles(page)}
      >
        {children}
      </ul>
    ),
    oList: ({ children }) => (
      <ol
        className={clsx(
          `ml-4 my-2 wrap-break-words text-2xl font-normal marker:${textColor}`,
          classNames
        )}
        style={page && getFontTextStyles(page)}
      >
        {children}
      </ol>
    ),
    listItem: ({ children }) => (
      <li
        className={clsx(
          "list-disc ml-5 pl-2 last:mb-0 list-outside",
          classNames
        )}
        style={page && getFontTextStyles(page)}
      >
        {children}
      </li>
    ),
    oListItem: ({ children }) => (
      <li
        className={clsx(
          "list-decimal ml-5 pl-2 last:mb-0 list-outside",
          classNames
        )}
      >
        {children}
      </li>
    ),
    hyperlink: ({ children, node }) => (
      <PrismicNextLink
        field={node.data}
        className={clsx(
          `text-2xl underline underline-offset-8 hover:underline-offset-4 transition-all duration-300 ease-in-out wrap-break-words`,
          classNames
        )}
        style={page && getFontTextStyles(page)}
      >
        {children}
      </PrismicNextLink>
    ),
    label: ({ node, children }) => {
      return (
        <>
          {node.data.label === "highlight" && (
            <span className={clsx("font-semibold", classNames)}>
              {children}
            </span>
          )}
          {node.data.label === "inline code" && (
            <code className="px-2 py-1 bg-gray-200 font-mono rounded">
              {children}
            </code>
          )}
        </>
      );
    },
  };

  return (
    <BasePrismicRichText
      components={{
        ...defaultComponents,
        ...components,
      }}
      {...props}
    />
  );
}
