import clsx from "clsx";
import type * as prismic from "@prismicio/client";
import type * as clsxT from "clsx";
import { PrismicNextLink } from "@prismicio/next";
import { getButtonStyles } from "@/utils/getButtonStyles";

const baseStyles: clsxT.ClassDictionary = {
  primary: "group inline-flex items-center justify-center rounded-lg  font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  secondary: "group inline-flex ring-1 items-center justify-center rounded-lg focus:outline-none font-semibold border-2 rounded-lg",
  link: "font-semibold underline underline-offset-8 hover:underline-offset-4 mt-4 transition-all duration-300 ease-in-out",
  text: "font-semibold",
};

const variantStyles: clsxT.ClassDictionary = {
  primary:
    "bg-gray-900 text-white hover:bg-gray-900 transition duration-500 ease-in-out",
  secondary:
    "ring-slate-200 hover:ring-slate-300 bg-transparent text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white transition duration-500 ease-in-out",
  link: "text-gray-900",
  text: "text-gray-900",
};

const variantSize: clsxT.ClassDictionary = {
  sm: "text-md py-2 px-4",
  md: "text-lg py-3 px-6",
  lg: "text-xl py-4 px-8",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href = "#",
  field,
  document,
  submit,
  button,
  ...props
}: {
  variant?: string;
  size?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  field?: prismic.LinkField;
  document?: prismic.PrismicDocument;
  submit?: boolean;
  button?: boolean;
}) {
  className = clsx(
    baseStyles[variant],
    // variantStyles[variant][color],
    variantStyles[variant],
    variantSize[size],
    className
  );

  if (submit) {
    return <button type="submit" className={className} {...props} />;
  }

  if (button) {
    return <button type="button" className={className} {...props} />;
  }

  if (field) {
    return <PrismicNextLink className={className} {...props} field={field} />;
  }

  return document ? (
    <PrismicNextLink className={className} {...props} document={document} />
  ) : (
    <PrismicNextLink className={className} {...props} href={href} />
  );
}
