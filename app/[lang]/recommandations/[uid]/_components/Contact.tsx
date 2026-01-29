import Container from '@/components/Container';
import { RecapDocumentData } from '@/prismicio-types';
import { isFilled } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

import footerCtaIllustration from '@/assets/Illustrations/footer-cta.svg';

export default function Contact({ data }: { data: RecapDocumentData }) {

    const contactData = data.contact;
      const contact =
        isFilled.contentRelationship(contactData) && "data" in contactData
          ? (contactData as any).data
          : null;

    return (
        <section id="contact" className="scroll-mt-24 bg-[#FFFFFF] py-15">
            <Container
                size="xl"
                className="flex flex-col items-center gap-8"
            >
                <div className='relative w-full px-12 rounded-2xl overflow-hidden bg-[#F5E6FF] text-gray-15 py-32 xl:px-24 shadow-sm'>
                    <div className='relative z-10 flex flex-col gap-10'>
                        <div className='w-full max-w-[90%] sm:max-w-[60%] md:max-w-[50%] xl:max-w-[412px] flex flex-col items-start gap-4'>
                            {isFilled.richText(data.contact_title) ? (
                                <PrismicRichText
                                    field={data.contact_title}
                                    components={{
                                    heading2: ({ children }) => (
                                        <h2 className="text-4xl font-bold">{children}</h2>
                                    ),
                                    }}
                                />
                            ) : (
                                <h2 id="hit-your-website-goals" className="text-4xl font-bold">Grow your website one slice at a time</h2>
                            )}

                            {isFilled.richText(data.contact_text) ? (
                                <PrismicRichText
                                    field={data.contact_text}
                                    components={{
                                    paragraph: ({ children }) => (
                                        <p className="text-[#505050] max-w-175">{children}</p>
                                    ),
                                    }}
                                />
                            ) : (
                                <p className="text-[#505050] max-w-175">The best time to build your marketing site with Prismic is now.</p>
                            )}
                        </div>

                        {contact && (
                            <div className="w-full sm:w-fit flex flex-col justify-center tems-start gap-4 md:gap-4 ">
                                <div className='flex flex-row justify-start items-start gap-4'>
                                    <div className="relative">
                                        <PrismicNextImage
                                            field={contact.image}
                                            width={40}
                                            height={40}
                                            className="object-cover aspect-square rounded-full shadow-md"
                                        />
                                     </div>

                                    <div className="flex flex-col justify-center items-start">
                                        <p className="text-sm font-semibold">{contact.name}</p>
                                        <p className='text-xs'>{contact.position}</p>
                                    </div>
                                </div>

                                <div className='flex flex-row flex-wrap items-start gap-2'>
                                    {isFilled.keyText(contact.email) && (
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="text-center text-[#FFFFFF] bg-[#151515] px-4 py-2 rounded-lg border-2 border-[#151515]"
                                        >
                                            Email me
                                        </a>
                                    )}
                                    
                                    {isFilled.link(contact.calendar) && (
                                        <PrismicNextLink
                                            field={contact.calendar}
                                            className="text-center text-[#151515] px-4 py-2 rounded-lg border-2 border-[#151515]"
                                        >
                                            { contact.calendar.text ? contact.calendar.text : "Book a call" }
                                        </PrismicNextLink>
                                    )}
                                </div>

                            </div>
                        )}

                    </div>
                    
                    <div className='absolute top-0 bottom-0 right-0 left-1/2 lg:left-[40%] 2xl:left-[35%]'>
                        <img src={footerCtaIllustration.src} alt="footer illustration" className='w-full h-full object-cover object-left' />
                    </div>
                </div>
            </Container>
        </section>
    )
}