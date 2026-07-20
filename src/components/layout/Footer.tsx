"use client";

import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
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
                    className="transition-colors"
                    style={{ color: "var(--color-subtle)" }}
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
    const manhattanLink = footerSettings.manhattanLink;
    const copyright =
        footerSettings.copyright ||
        `All Rights Reserved. © ${currentYear} 212 HVAC®.`;

    return (
        <footer className="bg-primary pt-12 text-white">
            <div className="container">
                <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_0.8fr_1.5fr]">
                    <div className="space-y-4">
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
                                <span
                                    className="text-2xl font-bold"
                                    style={{ color: "var(--color-white)" }}
                                >
                                    212 HVAC
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="space-y-3">
                        <h3
                            className="text-xl font-semibold"
                            style={{ color: "var(--color-blue)" }}
                        >
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-base">
                            {footerMenu.length > 0
                                ? renderMenuItems(footerMenu)
                                : [
                                      {
                                          id: 1,
                                          title: "Home",
                                          url: "/",
                                          target: "",
                                          parent: 0,
                                          order: 1,
                                      },
                                      {
                                          id: 2,
                                          title: "Services",
                                          url: "/services",
                                          target: "",
                                          parent: 0,
                                          order: 2,
                                      },
                                      {
                                          id: 3,
                                          title: "Heating",
                                          url: "/heating",
                                          target: "",
                                          parent: 0,
                                          order: 3,
                                      },
                                      {
                                          id: 4,
                                          title: "Air Conditioning",
                                          url: "/air-conditioning",
                                          target: "",
                                          parent: 0,
                                          order: 4,
                                      },
                                      {
                                          id: 5,
                                          title: "Air Care",
                                          url: "/air-care",
                                          target: "",
                                          parent: 0,
                                          order: 5,
                                      },
                                      {
                                          id: 6,
                                          title: "Why Us",
                                          url: "/why-us",
                                          target: "",
                                          parent: 0,
                                          order: 6,
                                      },
                                      {
                                          id: 7,
                                          title: "Contact Us",
                                          url: "/contact-us",
                                          target: "",
                                          parent: 0,
                                          order: 7,
                                      },
                                  ].map((item) => (
                                      <li key={item.id}>
                                          <a
                                              href={item.url}
                                              className="transition-colors"
                                              style={{
                                                  color: "var(--color-subtle)",
                                              }}
                                          >
                                              {item.title}
                                          </a>
                                      </li>
                                  ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3
                            className="text-xl font-semibold"
                            style={{ color: "var(--color-blue)" }}
                        >
                            Our Services
                        </h3>
                        <ul className="space-y-2 text-base">
                            {servicesMenu.length > 0
                                ? renderMenuItems(servicesMenu)
                                : [
                                      {
                                          id: 101,
                                          title: "HVAC Repair dsadsads",
                                          url: "#",
                                          target: "",
                                          parent: 0,
                                          order: 1,
                                      },
                                      {
                                          id: 102,
                                          title: "HVAC Installation dsdasd",
                                          url: "#",
                                          target: "",
                                          parent: 0,
                                          order: 2,
                                      },
                                      {
                                          id: 103,
                                          title: "HVAC Maintenance",
                                          url: "#",
                                          target: "",
                                          parent: 0,
                                          order: 3,
                                      },
                                      {
                                          id: 104,
                                          title: "AirCare",
                                          url: "#",
                                          target: "",
                                          parent: 0,
                                          order: 4,
                                      },
                                  ].map((item) => (
                                      <li key={item.id}>
                                          <a
                                              href={item.url}
                                              className="transition-colors"
                                              style={{
                                                  color: "var(--color-subtle)",
                                              }}
                                          >
                                              {item.title}
                                          </a>
                                      </li>
                                  ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3
                            className="text-xl font-semibold"
                            style={{ color: "var(--color-blue)" }}
                        >
                            Media
                        </h3>
                        <ul className="space-y-2 text-base">
                            <li>
                                <Link
                                    href="/blog"
                                    className="transition-colors"
                                    style={{ color: "var(--color-subtle)" }}
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-5">
                            <h3
                                className="text-xl font-semibold"
                                style={{ color: "var(--color-blue)" }}
                            >
                                Follow Us
                            </h3>
                            <div className="flex items-center gap-4">
                                {footerSettings.facebook ? (
                                    <a
                                        href={footerSettings.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors"
                                        style={{ color: "var(--color-subtle)" }}
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
                                        className="transition-colors"
                                        style={{ color: "var(--color-subtle)" }}
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
                                        className="transition-colors"
                                        style={{ color: "var(--color-subtle)" }}
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
                                        className="transition-colors"
                                        style={{ color: "var(--color-subtle)" }}
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
                                        className="transition-colors"
                                        style={{ color: "var(--color-subtle)" }}
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
                                    className="text-md font-bold underline underline-offset-4 transition-colors"
                                    style={{ color: "var(--color-blue)" }}
                                >
                                    {email}
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-[#070f1d]">
                <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
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
                    <div className="space-y-2">
                        {officeAddress ? (
                            <p className="text-lg font-normal">
                                <span
                                    className="font-semibold"
                                    style={{ color: "var(--color-blue)" }}
                                >
                                    Office &amp; Warehouse:
                                </span>{" "}
                                {officeAddress}
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
                                    className="text-lg font-bold underline transition-colors"
                                    style={{ color: "var(--color-blue)" }}
                                >
                                    {manhattanLink.title}
                                </a>
                            </p>
                        ) : null}
                    </div>
                </div>
                <div
                    className="py-4 text-center"
                    style={{ borderColor: "var(--color-border)" }}
                >
                    {copyright}
                </div>
            </div>
        </footer>
    );
}
