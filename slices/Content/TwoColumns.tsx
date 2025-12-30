import Container from "@/components/Container";
import { ContentSliceTwoColumns, LandingDocumentData } from "@/prismicio-types";
import { RichText } from "@/components/RichText";
import { getFontTextStyles } from "@/utils/getFontStyles";

export default function TwoColumns({
  slice,
  context,
}: {
  slice: ContentSliceTwoColumns;
  context: any;
}) {
  const { pageData } = context as { pageData: LandingDocumentData };

  if (slice.variation !== "twoColumns") return null;

  return (
    <section
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      {/* TODO : create Container for 1 and 2 cols like slice deck */}
      <Container
        // className="flex flex-col md:flex-row justify-center items-center gap-10"
        size="xl"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div>
            <RichText
              field={slice.primary.content_left_column}
              page={pageData}
            />
          </div>
          <div>
            <RichText
              field={slice.primary.content_right_column}
              page={pageData}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
