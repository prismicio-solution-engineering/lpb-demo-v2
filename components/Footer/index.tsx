import { FooterDocument } from "@/prismicio-types";

import { PropsLayoutHF } from "@/types";
import Container from "../Container";

const Footer = ({ footer, ...props }: { footer: FooterDocument }) => {
  const { data } = footer;
  const { lang, altLang, currentPage } = props as PropsLayoutHF;
  return (
    <footer className="flex h-2">{/* <Container>Footer</Container> */}</footer>
  );
};

export default Footer;
