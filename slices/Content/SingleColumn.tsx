import Container from "@/components/Container";
import { ContentSliceDefault, LandingDocumentData } from "@/prismicio-types";
import { RichText } from "@/components/RichText";
import { getFontTextStyles } from "@/utils/getFontStyles";

export default function SingleColumn({
  slice,
  context,
}: {
  slice: ContentSliceDefault;
  context: any;
}) {
  const { pageData } = context as { pageData: LandingDocumentData };

  if (slice.variation !== "default") return null;

  return (
    <section
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      {/* TODO : create Contatiner for 1 and 2 cols like slice deck */}
      <Container
        className="flex flex-col gap-8"
        size="xl"
      >
        <RichText field={slice.primary.content} page={pageData} />
      </Container>
    </section>
  );
}
