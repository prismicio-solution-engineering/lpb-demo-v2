import { ReactNode } from "react";

import FooterComponent from "@/components/LandingNavigation/LandingFooter";
import HeaderComponent from "@/components/LandingNavigation/LandingHeader";
import {
  FooterDocument,
  // HeaderDocument,
  LandingDocument,
} from "@/prismicio-types";
import { AlternateLanguage } from "@prismicio/client";

import { PropsLayoutHF } from "@/types";
import { createClient } from "@/prismicio";

const Header = async (props: PropsLayoutHF) => {
  return <HeaderComponent {...props} />;
};

const Footer = async (props: PropsLayoutHF) => {
  const client = createClient();

  const footer = (await client.getSingle("footer", {
    lang: props.lang,
  })) as FooterDocument;

  return <FooterComponent footer={footer} {...props} />;
};

export default function Layout({
  children,
  ...props
}: {
  children: ReactNode;
  languages: { url: string; lang_name: string }[];
  lang: string;
  altLang: AlternateLanguage<string, string>[];
  currentPage: string;
  page: LandingDocument;
}) {
  return (
    <>
      <Header {...props} />
      <main>{children}</main>
      <Footer {...props} />
    </>
  );
}
