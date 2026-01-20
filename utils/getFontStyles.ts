import { EcommerceDocumentData, LandingDocumentData } from "@/prismicio-types";

export const getFontTextStyles = (
  pageData: LandingDocumentData | EcommerceDocumentData
) => {
  const getFontFamily = () => {
    switch (pageData?.font_txt) {
      case "Inter":
        return "'Inter', sans-serif";
      case "Function Book":
        return "'Function-Book', sans-serif";
      default:
        return "Helvetica, Arial, sans-serif";
    }
  };

  return {
    fontFamily: getFontFamily()
  };
};

export const getFontHeadingStyles = (
  pageData: LandingDocumentData | EcommerceDocumentData
) => {
  const getFontFamily = () => {
    switch (pageData?.font_heading) {
      case "Proxima Bold":
        return "'Proxima-Bold', sans-serif";
      case "Function Book":
        return "'Function-Book', sans-serif";
      default:
        return "Arial, sans-serif";
    }
  };

  return {
    fontFamily: getFontFamily()
  };
};
