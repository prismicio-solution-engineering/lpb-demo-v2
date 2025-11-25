import { ReactNode } from "react";

import FooterComponent from "@/components/Footer";
import HeaderComponent from "@/components/Header";
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
