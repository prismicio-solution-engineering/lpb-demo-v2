"use client";

import clsx from "clsx";
import { isFilled, LinkField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

interface AbmRoiCtaProps {
  className?: string;
  ctaTitle?: RichTextField;
  ctaText?: RichTextField;
  ctaLink?: LinkField;
}

export function AbmRoiCta({ className, ctaTitle, ctaText, ctaLink }: AbmRoiCtaProps) {
  return (
    <div
      className={clsx(
        "h-full rounded-xl bg-tertiary-blue p-6 relative overflow-hidden",
        className
      )}
    >
      <svg className="absolute h-full w-auto bottom-0 top-0 right-0 text-quaternary-blue" width="319" height="163" viewBox="0 0 319 163" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.0761 298.542C-0.64149 258.671 -8.56464 176.981 54.5259 120.532C124.488 57.935 274.652 29.5208 338.647 117.612C394.443 194.417 294.309 271.743 216.717 229.646C139.125 187.549 143.752 102.183 173.763 51.6904C269.52 -109.416 520.316 -100.418 588.162 -32.3291" stroke="currentColor" strokeWidth="8" />
      </svg>
      <div className="relative z-10">
        {isFilled.richText(ctaTitle) ? (
          <PrismicRichText 
            field={ctaTitle}
            components={{
              heading3: ({ children }) => (
                <h3 className="text-[#151515] text-2xl-tight lg:text-3xl-tight font-medium mt-1 wrap-balance">
                  {children}
                </h3>
              ),
            }}
          />
        ) : (
          <h3 className="text-[#151515] text-2xl-tight lg:text-3xl-tight font-medium mt-1 wrap-balance">
            Ready to fuel your ABM strategy?
          </h3>
        )}

        <div className="flex flex-col xl:flex-row xl:gap-12 items-end">
          {isFilled.richText(ctaText) ? (
            <PrismicRichText 
              field={ctaText}
              components={{
                paragraph: ({ children }) => (
                  <p className="w-full mt-2 max-w-lg text-[#505050]">
                    {children}
                  </p>
                ),
              }}
            />
          ) : (
            <p className="w-full mt-2 max-w-lg text-[#505050]">
              Scale in a flash and convert high-intent prospects with personalized
              narratives for every account. Turn your strategy into a high-velocity
              revenue engine.
            </p>
          )}

            <div className="w-fit mt-6 flex justify-end">
            {isFilled.link(ctaLink) && (
              <PrismicNextLink
              field={ctaLink}
              className="w-fit px-4 py-2 rounded-lg border-2 border-[#151515] bg-[#151515] text-[#FFFFFF] whitespace-nowrap"
              >
              {ctaLink.text || "Talk to sales"}
              </PrismicNextLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
