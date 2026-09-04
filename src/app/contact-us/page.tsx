export const dynamic = "force-dynamic";

import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import ContactPageForm from "@/components/contactpopup/ContactPageForm";
import { getPageContentBySlug, getSiteData } from "@/lib/wordpress";
import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata() {
    return generatePageMetadata("contact-us");
}

export default async function ContactUsPage() {
    const siteData = await getSiteData();
    const flexibleContent = await getPageContentBySlug("contact-us");
    const settings = siteData?.settings;
    const address = settings?.officeAddress?.trim() || "Brooklyn, NY";
    const phone = settings?.phoneNumber?.trim() || "(917) 633-5959";
    const email = settings?.email?.trim() || "info@212hvac.com";
    const phoneHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
    const mapIframe =
        (settings as { mapiframe?: string } | undefined)?.mapiframe?.trim() ||
        "";

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="bg-shapes">
                {/* Background Shape 1 */}
                <div
                    className="pointer-events-none absolute -top-123 -left-122 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Background Shape 2 */}
                <div
                    className="pointer-events-none absolute top-95.75 -left-17.75 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(252,177,22,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Background Shape 3 */}
                <div
                    className="pointer-events-none absolute top-374.5 -left-62.5 -z-10 h-[1816px] w-[1916px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(228,187,76,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />

                {/* Background Shape 4 */}
                <div
                    className="pointer-events-none absolute top-254 left-126.75 -z-10 h-375 w-[1582px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,191,255,0.36)_0%,rgba(7,15,29,0)_100%)]"
                    aria-hidden="true"
                />
            </div>
            <section className="relative py-10 lg:py-18">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="sec-ttl mb-7 space-y-4 text-center lg:mb-10">
                        <h1 className="h2-title">Contact Us</h1>
                        <p className="fs-19">
                            Enter your details below to schedule a specialist
                        </p>
                    </div>

                    <div className="">
                        <ContactPageForm />
                    </div>
                </div>
            </section>

            <section className="relative">
                <div className="container">
                    <div className="grid gap-8 rounded-3xl bg-[#ececec] p-6 sm:p-8 lg:gap-10.5 lg:p-12 xl:grid-cols-[minmax(0,1fr)_512px] xl:items-center xl:p-16 dark:bg-[#070F1D99]">
                        <div className="min-w-0">
                            <div className="flex items-start gap-2 lg:gap-5">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 71 102"
                                        fill="none"
                                        className="w-9 sm:w-14 lg:w-12"
                                    >
                                        <path
                                            d="M35.4804 0C15.8759 0 -0.168118 16.2339 0.00133001 36.258C0.172923 58.0128 25.8905 90.4588 33.4406 100.931C34.4487 102.355 36.5078 102.355 37.5374 100.931C45.0875 90.4588 70.9766 53.3464 70.9766 36.258C70.9788 16.2339 55.0849 0 35.4804 0ZM35.4804 55.8439C24.8845 55.8439 16.3048 47.0806 16.3048 36.258C16.3048 25.4354 24.8845 16.6502 35.4804 16.6502C46.0763 16.6502 54.6774 25.4135 54.6774 36.258C54.6774 47.1025 46.0977 55.8439 35.4804 55.8439Z"
                                            fill="#00BFFF"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="h2-title">Our Location</p>
                                    <div className="mt-5 flex flex-col gap-1 text-sm sm:text-base lg:text-lg">
                                        <p>{address}</p>
                                        <Link
                                            href={phoneHref}
                                            className="hover:text-blue transition-colors"
                                        >
                                            {phone}
                                        </Link>
                                        <Link
                                            href={`mailto:${email}`}
                                            className="hover:text-blue underline underline-offset-4 transition-colors"
                                        >
                                            {email}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-[20px] xl:w-lg">
                            <div
                                className="h-72 w-full [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
                                dangerouslySetInnerHTML={{ __html: mapIframe }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {flexibleContent.length > 0 ? (
                <FlexibleContentRenderer sections={flexibleContent} />
            ) : null}
        </div>
    );
}
