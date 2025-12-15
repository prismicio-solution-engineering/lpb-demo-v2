import { FooterDocument } from "@/prismicio-types";

import { PropsLayoutHF } from "@/types";
import Container from "../Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

const LandingFooter = ({ footer, ...props }: { footer: FooterDocument }) => {
  const { data } = footer;
  const { lang, altLang, currentPage } = props as PropsLayoutHF;
  // console.log("alt langs in footer:", altLang );
  return (
    <footer className="flex h-2">
      {/* <Container>Footer</Container> */}
    </footer>
  );
};

export default LandingFooter;
