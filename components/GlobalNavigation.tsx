"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
import { Button } from "./Button";
import { PrismicImageProps } from "@prismicio/react";
import {
  PrismicNextImage,
  PrismicNextLink,
  PrismicNextLinkProps,
} from "@prismicio/next";
import {
  HeaderDocument,
  HeaderDocumentData,
  NavigationLinksSliceWithSublinks,
  SettingsDocument,
  SettingsDocumentData,
} from "@/prismicio-types";
import useMediaQuery from "@/hooks/useMediaQuery";
import { LanguageSwitcher } from "./LanguageSwitcher";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Props = {
  logo: PrismicImageProps;
  navLinks: PrismicNextLinkProps[];
  // buttons: typeof Button[];
  buttons: PrismicNextLinkProps[];
};

export type Navbar2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

// export const Header = (props: Navbar2Props) => {
export const Header = ({
  settings,
  page,
  languages,
}: {
  settings: SettingsDocument;
  page: HeaderDocument;
  languages: {
    url: string;
    lang_name: string;
  }[];
}) => {
  // const { logo, navLinks, buttons } = {
  //   ...Navbar2Defaults,
  //   ...props,
  // };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  return (
    <section
      id="relume"
      className="z-999 flex w-full items-center border-b border-border-primary bg-background-primary lg:min-h-18 lg:px-[5%]"
    >
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0 lg:basis-1/6">
          <PrismicNextLink href={"/"}>
            <PrismicNextImage
              field={settings.data.company_logo}
              className="h-10 object-contain"
            />
          </PrismicNextLink>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
            />
          </button>
        </div>
        <motion.div
          variants={{
            open: {
              height: "var(--height-open, 100dvh)",
            },
            close: {
              height: "var(--height-closed, 0)",
            },
          }}
          initial="close"
          exit="close"
          animate={isMobileMenuOpen ? "open" : "close"}
          transition={{ duration: 0.4 }}
          className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto] lg:flex-none"
        >
          {page.data.slices.map((slice, index) =>
            slice.variation === "withSublinks" &&
            slice.primary.sublinks.length > 0 ? (
              <SubMenu key={index} navLink={slice} isMobile={isMobile} />
            ) : (
              <Button
                key={index}
                variant="text"
                field={slice.primary.link}
                className="block py-3 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
              />
            )
          )}
          <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
            {page.data.ctas.map((cta, index) => (
              <Button key={index} field={cta} />
            ))}
          </div>
          <LanguageSwitcher languages={languages} />
        </motion.div>
      </div>
    </section>
  );
};

const SubMenu = ({
  navLink,
  isMobile,
}: {
  navLink: NavigationLinksSliceWithSublinks;
  isMobile: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="flex w-full items-center justify-center gap-4 py-3 text-center text-md lg:w-auto lg:flex-none lg:justify-start lg:gap-2 lg:px-4 lg:py-2 lg:text-base"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <PrismicNextLink field={navLink.primary.link} />
        <motion.span
          animate={isDropdownOpen ? "rotated" : "initial"}
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown />
        </motion.span>
      </button>
      {isDropdownOpen && (
        <AnimatePresence>
          <motion.nav
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            variants={{
              open: {
                visibility: "visible",
                opacity: "var(--opacity-open, 100%)",
                y: 0,
              },
              close: {
                visibility: "hidden",
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
              },
            }}
            transition={{ duration: 0.2 }}
            className="bg-background-primary lg:absolute lg:z-50 lg:border lg:border-border-primary lg:p-2 lg:[--y-close:25%]"
          >
            {navLink.primary.sublinks?.map((subMenuLink, index) => (
              <PrismicNextLink
                key={index}
                field={subMenuLink}
                className="block py-3 text-center lg:px-4 lg:py-2 lg:text-left"
              />
              // <a
              //   key={index}
              //   href={subMenuLink.url}
              //   className="block py-3 text-center lg:px-4 lg:py-2 lg:text-left"
              // >
              //   {subMenuLink.title}
              // </a>
            ))}
          </motion.nav>
        </AnimatePresence>
      )}
    </section>
  );
};

// export const Navbar2Defaults: Props = {
//   logo: {
//     url: "#",
//     src: "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg",
//     alt: "Logo image",
//   },
//   navLinks: [
//     { title: "Link One", url: "#" },
//     { title: "Link Two", url: "#" },
//     { title: "Link Three", url: "#" },
//     {
//       title: "Link Four",
//       url: "#",
//       subMenuLinks: [
//         { title: "Link Five", url: "#" },
//         { title: "Link Six", url: "#" },
//         { title: "Link Seven", url: "#" },
//       ],
//     },
//   ],
//   buttons: [
//     {
//       title: "Button",
//       size: "sm",
//     },
//   ],
// };

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};
