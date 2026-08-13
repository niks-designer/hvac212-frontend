"use client";

import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { normalizeACFImage } from "@/lib/acfNormalizers";
import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaXTwitter,
    FaLinkedin,
} from "react-icons/fa6";

import { SiteData, WordPressMenuItem } from "@/lib/wordpress";

interface FooterProps {
    siteData?: SiteData | null;
}

function renderMenuItems(items: WordPressMenuItem[]) {
    return items.map((item) => {
        const target = item.target || "_self";
        const rel = target === "_blank" ? "noopener noreferrer" : undefined;

        return (
            <li key={item.id}>
                <a
                    href={item.url}
                    target={target}
                    rel={rel}
                    className="hover:text-blue transition-colors"
                >
                    {item.title}
                </a>
            </li>
        );
    });
}

export default function Footer({ siteData }: FooterProps) {
    const { theme } = useTheme();
    const settings = siteData?.settings;
    const footerMenu = siteData?.menus?.footerQuickLinks || [];
    const servicesMenu = siteData?.menus?.footerServices || [];

    const currentYear = new Date().getFullYear();
    const footerSettings = settings ?? {};

    const footerLogo = normalizeACFImage(
        footerSettings.footerLogo ||
            (theme === "dark"
                ? footerSettings.darkLogo
                : footerSettings.siteLogo)
    );
    const email = footerSettings.email;
    const officeAddress = footerSettings.officeAddress;
    const phone = footerSettings.phoneNumber;
    const phoneHref = phone ? `tel:${phone.replace(/[^0-9+]/g, "")}` : "";
    const manhattanLink = footerSettings.manhattanLink;
    const copyright =
        footerSettings.copyright ||
        `All Rights Reserved. © ${currentYear} 212 HVAC®.`;

    return (
        <>
            <footer className="bg-primary pt-12 text-white">
                <div className="container">
                    <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_1.5fr]">
                        <div className="col-span-full space-y-4 lg:col-auto">
                            <Link href="/" className="inline-block">
                                {footerLogo?.url ? (
                                    <Image
                                        key={theme}
                                        src={footerLogo.url}
                                        alt={footerLogo.alt || "212 HVAC"}
                                        // width={footerLogo.width || 180}
                                        // height={footerLogo.height || 60}
                                        width={185}
                                        height={60}
                                    />
                                ) : (
                                    <span className="text-2xl font-bold text-white">
                                        212 HVAC
                                    </span>
                                )}
                            </Link>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-blue text-xl font-semibold">
                                Quick Links
                            </h3>
                            <ul className="space-y-2 text-base">
                                {renderMenuItems(footerMenu)}
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-blue text-xl font-semibold">
                                Our Services
                            </h3>
                            <ul className="space-y-2 text-base">
                                {renderMenuItems(servicesMenu)}
                            </ul>
                            <div className="mt-5 space-y-3 lg:hidden">
                                <h3 className="text-blue text-xl font-semibold">
                                    Media
                                </h3>
                                <ul className="space-y-2 text-base">
                                    <li>
                                        <Link
                                            href="/blog"
                                            className="hover:text-blue transition-colors"
                                        >
                                            Blog
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="hidden space-y-3 lg:block">
                            <h3 className="text-blue text-xl font-semibold">
                                Media
                            </h3>
                            <ul className="space-y-2 text-base">
                                <li>
                                    <Link
                                        href="/blog"
                                        className="hover:text-blue transition-colors"
                                    >
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4 md:col-span-2 lg:col-span-1">
                            <div className="flex flex-col gap-4 sm:gap-5 xl:flex-row">
                                <h3 className="text-blue text-xl font-semibold">
                                    Follow Us
                                </h3>
                                <div className="flex flex-wrap items-center gap-4">
                                    {footerSettings.facebook ? (
                                        <a
                                            href={footerSettings.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue transition-colors"

                                            aria-label="Facebook"
                                        >
                                            <FaFacebookF className="h-7 w-7" />
                                        </a>
                                    ) : null}
                                    {footerSettings.instagram ? (
                                        <a
                                            href={footerSettings.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue transition-colors"

                                            aria-label="Instagram"
                                        >
                                            <FaInstagram className="h-7 w-7" />
                                        </a>
                                    ) : null}
                                    {footerSettings.twitter ? (
                                        <a
                                            href={footerSettings.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue transition-colors"

                                            aria-label="Twitter"
                                        >
                                            <FaXTwitter className="h-7 w-7" />
                                        </a>
                                    ) : null}
                                    {footerSettings.youtube ? (
                                        <a
                                            href={footerSettings.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue transition-colors"

                                            aria-label="Youtube"
                                        >
                                            <FaYoutube className="h-7 w-7" />
                                        </a>
                                    ) : null}
                                    {footerSettings.linkedin ? (
                                        <a
                                            href={footerSettings.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue transition-colors"

                                            aria-label="LinkedIn"
                                        >
                                            <FaLinkedin className="h-7 w-7" />
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                            {email ? (
                                <div className="flex flex-col gap-3 pt-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="41"
                                        height="25"
                                        viewBox="0 0 41 25"
                                        fill="currentColor"
                                    >
                                        <g clipPath="url(#clip0_189_331)">
                                            <path
                                                d="M40.9997 25H0.000610352V0H40.9997V25ZM2.03775 22.9748H38.9618V2.02519H2.03775V22.9748Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M40.8628 25.0001H0.10144L15.8555 12.0959L17.1511 13.6589L5.77749 22.9749H35.137L23.5746 13.6087L24.8621 12.0391L40.8628 25.0001Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M20.4699 17.1392L0.166138 0H40.7737L20.4699 17.1392ZM5.71292 2.02519L20.4692 14.482L35.2262 2.02519H5.71292Z"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_189_331">
                                                <rect
                                                    width="41"
                                                    height="25"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <a
                                        href={`mailto:${email}`}
                                        className="text-md text-blue font-bold underline underline-offset-4 transition-colors"
                                    >
                                        {email}
                                    </a>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-[#070f1d]">
                    <div className="flex flex-col items-center justify-center space-y-4 px-4 py-10 text-center sm:px-6">
                        <svg
                            width="24"
                            height="34"
                            viewBox="0 0 24 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.9934 0C5.36649 0 -0.0568288 5.41131 0.000449579 12.086C0.058453 19.3376 8.75171 30.1529 11.3039 33.6436C11.6446 34.1183 12.3407 34.1183 12.6887 33.6436C15.2408 30.1529 23.9921 17.7821 23.9921 12.086C23.9928 5.41131 18.6203 0 11.9934 0ZM11.9934 18.6146C8.41167 18.6146 5.5115 15.6935 5.5115 12.086C5.5115 8.47846 8.41167 5.55007 11.9934 5.55007C15.5751 5.55007 18.4825 8.47115 18.4825 12.086C18.4825 15.7008 15.5823 18.6146 11.9934 18.6146Z"
                                fill="currentColor"
                            />
                        </svg>
                        <div className="max-w-4xl space-y-2">
                            {officeAddress ? (
                                <p className="text-base leading-relaxed font-normal sm:text-lg">
                                    <span className="text-blue font-semibold">
                                        Office &amp; Warehouse:
                                    </span>{" "}
                                    {officeAddress}
                                    {phone ? (
                                        <>
                                            {" | "}
                                            <a
                                                href={phoneHref}
                                                className="hover:text-blue transition-colors"
                                            >
                                                {phone}
                                            </a>
                                        </>
                                    ) : null}
                                </p>
                            ) : null}
                            {manhattanLink?.title && manhattanLink?.url ? (
                                <p>
                                    <a
                                        href={manhattanLink.url}
                                        target={manhattanLink.target || "_self"}
                                        rel={
                                            manhattanLink.target === "_blank"
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="text-blue hover:text-blue text-base font-bold underline transition-colors sm:text-lg"
                                    >
                                        {manhattanLink.title}
                                    </a>
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="px-4 py-4 text-center text-sm italic sm:px-6 sm:text-base">
                        <p dangerouslySetInnerHTML={{ __html: copyright }}></p>
                    </div>
                </div>
            </footer>
        </>
    );
}
