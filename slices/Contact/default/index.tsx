"use client";

import { FC } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import Container from '@/components/Container';
import footerCtaIllustration from '@/assets/Illustrations/footer-cta.svg';

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const ContactDefault: FC<ContactProps> = ({ slice }) => {
    
    if (slice.variation !== "default") return null;
    
    return (
        <section id="contact" className="scroll-mt-24 bg-[#FFFFFF] py-15">
            <Container size="xl" className="flex flex-col items-center gap-8">
                
                {/* --- CARD WRAPPER --- */}
                <div className='relative w-full px-12 rounded-2xl overflow-hidden bg-[#F5E6FF] text-gray-15 py-32 xl:px-24 shadow-sm'>
                    
                    <div className='relative z-10 flex flex-col gap-10'>
                        
                        {/* --- TEXT CONTENT --- */}
                        <div className='w-full max-w-[90%] sm:max-w-[60%] md:max-w-[50%] xl:max-w-[412px] flex flex-col items-start gap-4'>
                            {isFilled.richText(slice.primary.title) ? (
                                <PrismicRichText
                                    field={slice.primary.title}
                                    components={{
                                        heading2: ({ children }) => <h2 className="text-4xl font-bold">{children}</h2>,
                                    }}
                                />
                            ) : (
                                <h2 className="text-4xl font-bold">Grow your website one slice at a time</h2>
                            )}

                            {isFilled.richText(slice.primary.text) ? (
                                <PrismicRichText
                                    field={slice.primary.text}
                                    components={{
                                        paragraph: ({ children }) => <p className="text-[#505050] max-w-175">{children}</p>,
                                    }}
                                />
                            ) : (
                                <p className="text-[#505050] max-w-175">The best time to build your marketing site with Prismic is now.</p>
                            )}
                        </div>

                        {/* --- CONTACT SECTION (Directly from slice.primary.contact.data) --- */}
                        {isFilled.contentRelationship(slice.primary.contact) && (
                            <div className="w-full sm:w-fit flex flex-col justify-center items-start gap-4 md:gap-4 ">
                                
                                {/* Profile Info */}
                                <div className='flex flex-row justify-start items-start gap-4'>
                                    {isFilled.image(slice.primary.contact.data?.image) && (
                                        <div className="relative">
                                            <PrismicNextImage
                                                field={slice.primary.contact.data.image}
                                                width={40}
                                                height={40}
                                                className="object-cover aspect-square rounded-full shadow-md"
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col justify-center items-start">
                                        {isFilled.keyText(slice.primary.contact.data?.name) && (
                                            <p className="text-sm font-semibold">{slice.primary.contact.data.name}</p>
                                        )}
                                        {isFilled.keyText(slice.primary.contact.data?.position) && (
                                            <p className='text-xs'>{slice.primary.contact.data.position}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Actions Buttons */}
                                <div className='flex flex-row flex-wrap items-start gap-2'>
                                    {isFilled.keyText(slice.primary.contact.data?.email) && (
                                        <a
                                            href={`mailto:${slice.primary.contact.data.email}`}
                                            className="text-center text-[#FFFFFF] bg-[#151515] px-4 py-2 rounded-lg border-2 border-[#151515] transition-transform active:scale-95"
                                        >
                                            Email me
                                        </a>
                                    )}
                                    
                                    {isFilled.link(slice.primary.contact.data?.calendar) && (
                                        <PrismicNextLink
                                            field={slice.primary.contact.data.calendar}
                                            className="text-center text-[#151515] px-4 py-2 rounded-lg border-2 border-[#151515] transition-transform active:scale-95"
                                        >
                                            {slice.primary.contact.data.calendar.text || "Book a call"}
                                        </PrismicNextLink>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>
                    
                    {/* --- BACKGROUND ILLUSTRATION --- */}
                    <div className='absolute top-0 bottom-0 right-0 left-1/2 lg:left-[40%] 2xl:left-[35%]'>
                        <img 
                            src={footerCtaIllustration.src} 
                            alt="footer illustration" 
                            className='w-full h-full object-cover object-left pointer-events-none' 
                        />
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default ContactDefault;