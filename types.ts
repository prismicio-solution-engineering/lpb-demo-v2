import { LandingDocument } from "@/prismicio-types";
import { AlternateLanguage } from "@prismicio/client";

export type PropsLayoutHF = {
  lang: string;
  altLang: AlternateLanguage<string, string>[];
  currentPage: string;
  page: LandingDocument;
};
