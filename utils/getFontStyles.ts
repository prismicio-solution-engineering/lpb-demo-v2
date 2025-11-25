import { LandingDocumentData } from "@/prismicio-types";

export const getFontTextStyles = (pageData: LandingDocumentData) => {
  const getFontFamily = () => {
    switch (pageData?.font_txt) {
      case "Inter":
        return "'Inter', sans-serif";
      default:
        return "Helvetica, Arial, sans-serif";
    }
  };

  return {
    fontFamily: getFontFamily()
  };
};

export const getFontHeadingStyles = (pageData: LandingDocumentData) => {
  const getFontFamily = () => {
    switch (pageData?.font_heading) {
      case "Proxima Bold":
        return "'Proxima-Bold', sans-serif";
      default:
        return "Arial, sans-serif";
    }
  };

  return {
    fontFamily: getFontFamily()
  };
};
