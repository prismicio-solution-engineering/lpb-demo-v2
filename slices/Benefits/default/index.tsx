import Container from "@/components/Container";
import { LandingDocumentData } from "@/prismicio-types";
import { getBackgroundColor } from "@/utils/getColors";
import { getFontHeadingStyles } from "@/utils/getFontStyles";
import { iconsMap } from "@/utils/getIconsMap";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

export type BenefitsProps = SliceComponentProps<Content.BenefitsSlice>;

const Benefits: FC<BenefitsProps> = ({ slice, context }) => {
    const { pageData } = context as {
        pageData: LandingDocumentData;
    };

    if (slice.variation !== "default") return null;

    return (
        <section className="bg-white py-24 lg:py-32">
            <Container size="xl" className="flex flex-col items-center gap-20">
                
                <div className="flex flex-col items-center text-center max-w-4xl gap-6">
                    {isFilled.richText(slice.primary.title) && (
                        <PrismicRichText
                        field={slice.primary.title}
                        components={{
                            heading2: ({ children }) => (
                                <h2
                                    className="font-bold text-4xl leading-none"
                                    style={getFontHeadingStyles(pageData)}
                                >
                                    {children}
                                </h2>
                            ),
                        }}
                        />
                    )}

                    {isFilled.richText(slice.primary.text) && (
                        <div className="max-w-2xl">
                        <PrismicRichText
                            field={slice.primary.text}
                            components={{
                            paragraph: ({ children }) => (
                                <p className="text-[#424245]">{children}</p>
                            ),
                            }}
                        />
                        </div>
                    )}
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 w-full">
                {slice.primary.items.map((item, index) => {
                    const IconComponent = item.icon ? iconsMap[item.icon as keyof typeof iconsMap] : null;
                    const iconColor: string | undefined =
                        typeof pageData?.primary_color === "string"
                            ? (pageData.primary_color as string)
                            : (pageData?.primary_color as any)?.hex ?? undefined;
                    
                    return (
                        <div key={index} className="flex flex-col items-start gap-6">

                            <div style={{ color: iconColor }}>
                                {IconComponent && (
                                    <IconComponent className="w-12 h-12" />
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                {isFilled.richText(item.title) && (
                                    <PrismicRichText
                                    field={item.title}
                                    components={{
                                        heading3: ({ children }) => (
                                        <h3 className="text-xl font-semibold text-[#1d1d1f]">
                                    {children}
                                    </h3>

                                        ),
                                    }}
                                    />
                                )}

                                {isFilled.richText(item.text) && (
                                    <PrismicRichText
                                    field={item.text}
                                    components={{
                                        paragraph: ({ children }) => (
                                        <p className="text-[#424245]">
                                            {children}
                                        </p>
                                        ),
                                    }}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
                </div>
            </Container>
        </section>
    )
}

export default Benefits