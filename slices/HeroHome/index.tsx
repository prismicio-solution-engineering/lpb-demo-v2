import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import Link from "next/link";
import { getLandingPages } from "@/utils/getLandingPages";

/**
 * Props for `HeroHome`.
 */
export type HeroHomeProps = SliceComponentProps<Content.HeroHomeSlice>;

/**
 * Component for "HeroHome" Slices.
 */
const HeroHome: FC<HeroHomeProps> = async ({ slice, context }) => {
  const { lang } = context as { lang: string };

  const landingPages = await getLandingPages(lang) || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container
        className="flex flex-col justify-center items-center gap-2 py-[120px]"
        size="xl"
      >
        {landingPages.map((lp, i) => (
          <Link
            key={i}
            href={`/${
              lp.lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE
                ? `${lp.lang}/`
                : ""
            }${lp.uid}`}
            className="font-bold underline"
          >
            {process.env.NEXT_PUBLIC_DOMAIN}/
            {lp.lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE
              ? `${lp.lang}/`
              : ""}
            {lp.uid}
          </Link>
        ))}
      </Container>
    </section>
  );
};

export default HeroHome;
