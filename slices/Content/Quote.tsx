import Container from "@/components/Container";
import { ContentSliceQuote, LandingDocumentData } from "@/prismicio-types";
import { getFontTextStyles } from "@/utils/getFontStyles";
import { PrismicRichText } from "@prismicio/react";

export default function Quote({
  slice,
  context,
}: {
  slice: ContentSliceQuote;
  context: any;
}) {
  const { pageData } = context as { pageData: LandingDocumentData };

  if (slice.variation !== "quote") return null;

  return (
    <section
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[60px]`}
      style={getFontTextStyles(pageData)}
    >
      <Container size="xl">
        <PrismicRichText
          field={slice.primary.content}
          components={{
            paragraph: ({ children }) => (
              <blockquote
                className="italic my-6 py-3 px-5 border-l-2 border-l-black text-2xl mb-2 wrap-break-words font-normal font-body"
                style={getFontTextStyles(pageData)}
              >
                "{children}"
              </blockquote>
            ),
          }}
        />
      </Container>
    </section>
  );
}
