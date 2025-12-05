import Container from "@/components/Container";
import {
  ContentSliceTwoColumnsImages,
  LandingDocumentData,
} from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { getFontTextStyles } from "@/utils/getFontStyles";
import { RichText } from "@/components/RichText";

export default function TwoColumnsImages({
  slice,
  context,
}: {
  slice: ContentSliceTwoColumnsImages;
  context: any;
}) {
  const { pageData } = context as { pageData: LandingDocumentData };

  if (slice.variation !== "twoColumnsImages") return null;

  return (
    <section
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      <Container
        // className="flex flex-col md:flex-row justify-center items-center gap-10 text-center"
        size="xl"
      >
        {slice.primary.images_side ? (
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div className="static top-20 lg:sticky">
              <RichText field={slice.primary.content} page={pageData} />
            </div>
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {slice.primary.images.map((img, index) => (
                <div key={index}>
                  <PrismicNextImage
                    field={img.image}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {slice.primary.images.map((img, index) => (
                <div key={index}>
                  <PrismicNextImage
                    field={img.image}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="static top-20 lg:sticky">
              <RichText field={slice.primary.content} page={pageData} />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
