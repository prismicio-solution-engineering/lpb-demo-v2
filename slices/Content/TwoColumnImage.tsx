import Container from "@/components/Container";
import {
  ContentSliceTwoColumnsImage,
  LandingDocumentData,
} from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { getFontTextStyles } from "@/utils/getFontStyles";

export default function TwoColumnsImage({
  slice,
  context,
}: {
  slice: ContentSliceTwoColumnsImage;
  context: any;
}) {
  const { pageData } = context as { pageData: LandingDocumentData };

  if (slice.variation !== "twoColumnsImage") return null;

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
        {slice.primary.image_side ? (
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div>
              <RichText field={slice.primary.content} page={pageData} />
            </div>
            <div>
              <PrismicNextImage
                field={slice.primary.image}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div>
              <PrismicNextImage
                field={slice.primary.image}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <RichText field={slice.primary.content} page={pageData} />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
