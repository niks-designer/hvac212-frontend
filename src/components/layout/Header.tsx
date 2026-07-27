"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMegaMenu, type MegaMenuData } from "@/lib/megamenu";
import { SiteData, WordPressMenuItem } from "@/lib/wordpress";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import MegaMenu from "@/components/layout/MegaMenu";
import { useTheme } from "@/components/providers/ThemeProvider";
import { normalizeACFImage } from "@/lib/acfNormalizers";

interface HeaderProps {
    siteData?: SiteData | null;
}

export default function Header({ siteData }: HeaderProps) {
    const { theme } = useTheme();
    const [activeMegaSlug, setActiveMegaSlug] = useState<string | null>(null);
    const [megaMenus, setMegaMenus] = useState<Record<string, MegaMenuData>>(
        {}
    );
    const [isMegaLoading, setIsMegaLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

    const settings = siteData?.settings;
    const primaryMenu = siteData?.menus?.primary || [];

    const brandName = "212 HVAC";

    const logo = normalizeACFImage(
        theme === "dark" ? settings?.siteLogo : settings?.darkLogo
    );

    const phoneNumber = settings?.phoneNumber ?? "(917) 633-5959";
    const phoneHref = phoneNumber.replace(/[^0-9+]/g, "");
    const headerCta = settings?.headerCta;

    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
    const openMegaMenu = (slug: string) => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
    };

    const closeMegaMenu = () => {
        hoverTimeout.current = setTimeout(() => {
            setActiveMegaSlug(null);
        }, 180);
    };

    useEffect(() => {
        let cancelled = false;

        async function preloadMegaMenus() {
            setIsMegaLoading(true);

            const menuItems = primaryMenu.filter(
                (item) => item.has_mega_menu && item.slug
            );

            const results = await Promise.all(
                menuItems.map(async (item) => {
                    const data = await getMegaMenu(item.slug!);
                    return {
                        slug: item.slug!,
                        data,
                    };
                })
            );

            if (!cancelled) {
                const cache: Record<string, MegaMenuData> = {};

                results.forEach(({ slug, data }) => {
                    if (data) {
                        cache[slug] = data;
                    }
                });

                setMegaMenus(cache);
                setIsMegaLoading(false);
            }
        }

        if (primaryMenu.length) {
            preloadMegaMenus();
        }

        return () => {
            cancelled = true;
        };
    }, [primaryMenu]);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.matchMedia("(max-width: 1023px)").matches);
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    return (
        <header
            className="sticky top-0 z-50 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
            onMouseLeave={() => setActiveMegaSlug(null)}
        >
            <div className="bg-top-bar">
                <div className="mx-auto grid w-full max-w-337.5 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3">
                    <div />

                    <div className="flex justify-center">
                        <a
                            href={headerCta?.url || "#"}
                            target={headerCta?.target || "_self"}
                            rel={
                                headerCta?.target === "_blank"
                                    ? "noopener noreferrer"
                                    : undefined
                            }
                            className="text-primary-theme text-sm font-semibold uppercase transition-colors"
                        >
                            {headerCta?.title || "CUSTOMER LOGIN"}
                        </a>
                    </div>

                    <div className="flex justify-end">
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            <nav className="bg-secondary relative">
                <div className="mx-auto flex max-w-337.5 items-center justify-between p-4 lg:px-3 xl:px-4">
                    {/* Logo */}
                    <Link href="/" className="order-2 lg:order-0">
                        {logo ? (
                            <Image
                                key={theme}
                                src={logo.url}
                                alt={logo.alt || brandName}
                                // width={logo.width || 180}
                                // height={logo.height || 60}
                                width={185}
                                height={60}
                                className="h-auto w-46.25 lg:w-40 xl:w-46.25"
                                priority
                            />
                        ) : (
                            <span className="text-lg font-semibold">
                                {brandName}
                            </span>
                        )}
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden flex-1 lg:block">
                        <div className="justify-content: center; hidden lg:flex">
                            <div
                                className="relative mx-auto"
                                onMouseLeave={closeMegaMenu}
                                onMouseEnter={() => {
                                    if (hoverTimeout.current) {
                                        clearTimeout(hoverTimeout.current);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-4 text-[15px] font-bold xl:gap-8 xl:text-lg 2xl:gap-8 2xl:text-lg">
                                    {primaryMenu.length > 0
                                        ? primaryMenu.map((item) => {
                                              const target =
                                                  item.target || "_self";
                                              const rel =
                                                  target === "_blank"
                                                      ? "noopener noreferrer"
                                                      : undefined;
                                              const hasMega =
                                                  item.has_mega_menu;

                                              return (
                                                  <a
                                                      key={item.id}
                                                      href={item.url}
                                                      target={target}
                                                      rel={rel}
                                                      onMouseEnter={() => {
                                                          if (!isMobile) {
                                                              if (hasMega) {
                                                                  setActiveMegaSlug(
                                                                      item.slug ??
                                                                          null
                                                                  );
                                                              } else {
                                                                  setActiveMegaSlug(
                                                                      null
                                                                  );
                                                              }
                                                          }
                                                      }}
                                                      onFocus={() => {
                                                          if (!isMobile) {
                                                              if (hasMega) {
                                                                  setActiveMegaSlug(
                                                                      item.slug ??
                                                                          null
                                                                  );
                                                              } else {
                                                                  setActiveMegaSlug(
                                                                      null
                                                                  );
                                                              }
                                                          }
                                                      }}
                                                      onClick={(e) => {
                                                          if (
                                                              isMobile &&
                                                              hasMega
                                                          ) {
                                                              e.preventDefault();
                                                              setActiveMegaSlug(
                                                                  item.slug ??
                                                                      null
                                                              );
                                                          }
                                                      }}
                                                      className="inline-flex items-center gap-2 transition-colors"
                                                      aria-haspopup={
                                                          hasMega
                                                              ? "menu"
                                                              : undefined
                                                      }
                                                      aria-expanded={
                                                          hasMega &&
                                                          activeMegaSlug ===
                                                              item.slug
                                                              ? "true"
                                                              : "false"
                                                      }
                                                  >
                                                      <span className="whitespace-nowrap">
                                                          {item.title}
                                                      </span>
                                                      {hasMega && (
                                                          <svg
                                                              className={`transition-transform duration-200 ${
                                                                  activeMegaSlug ===
                                                                  item.slug
                                                                      ? "rotate-180"
                                                                      : ""
                                                              }`}
                                                              width="13"
                                                              height="9"
                                                              viewBox="0 0 10 6"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              aria-hidden
                                                          >
                                                              <path
                                                                  d="M1 1L5 5L9 1"
                                                                  stroke="currentColor"
                                                                  strokeWidth="1.5"
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                              />
                                                          </svg>
                                                      )}
                                                  </a>
                                              );
                                          })
                                        : [
                                              {
                                                  id: 1,
                                                  title: "Home",
                                                  url: "/",
                                                  target: "_self",
                                                  parent: 0,
                                                  order: 1,
                                              },
                                              {
                                                  id: 2,
                                                  title: "Services",
                                                  url: "/services",
                                                  target: "_self",
                                                  parent: 0,
                                                  order: 2,
                                              },
                                              {
                                                  id: 3,
                                                  title: "Contact",
                                                  url: "/contact-us",
                                                  target: "_self",
                                                  parent: 0,
                                                  order: 3,
                                              },
                                          ].map((item) => (
                                              <a
                                                  key={item.id}
                                                  href={item.url}
                                                  target={item.target}
                                                  rel={
                                                      item.target === "_blank"
                                                          ? "noopener noreferrer"
                                                          : undefined
                                                  }
                                                  className="transition-colors"
                                              >
                                                  {item.title}
                                              </a>
                                          ))}
                                </div>
                                <MegaMenu
                                    megaMenu={
                                        activeMegaSlug
                                            ? (megaMenus[activeMegaSlug] ??
                                              null)
                                            : null
                                    }
                                    isOpen={Boolean(activeMegaSlug)}
                                    isLoading={isMegaLoading}
                                    isMobile={isMobile}
                                    onClose={() => {
                                        setActiveMegaSlug(null);
                                        setMobileMenuOpen(false);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Icons*/}
                    <a
                        href={phoneHref ? `tel:${phoneHref}` : "#"}
                        className={`order-1 lg:hidden ${
                            theme === "light" ? "text-yellow" : "text-white"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="33"
                            height="42"
                            viewBox="0 0 33 42"
                            fill="none"
                        >
                            <path
                                d="M9.1807 18.5668C8.89995 17.7105 9.26107 16.7662 10.0281 16.3556C11.3566 15.6444 13.2496 14.4699 13.3411 13.5115C13.5769 11.042 12.9587 3.57099 12.1453 1.70376C11.6575 0.5838 8.86878 -0.229689 7.73038 0.058437C6.52786 0.362773 2.30349 2.5748 0.463878 8.52719C-1.37574 14.4795 2.76337 22.5126 4.05115 25.2226C5.33882 27.9326 12.0497 37.3631 16.074 39.5823C19.7682 41.6194 24.5782 43.7373 30.0815 39.7403C34.4708 36.5525 32.7944 33.1668 32.105 32.675C30.6017 31.6026 26.32 29.2997 24.2358 28.574C23.6446 28.3682 22.7586 28.2355 21.748 28.7023C21.3346 28.8933 20.7584 29.3432 20.2248 29.8052C19.3217 30.5873 18.023 30.5894 17.1183 29.8092C14.859 27.8607 10.9222 23.8788 9.1807 18.5668Z"
                                fill="currentColor"
                            />
                        </svg>
                    </a>

                    <button
                        type="button"
                        aria-label="Toggle menu"
                        onClick={() => {
                            setMobileMenuOpen(!mobileMenuOpen);
                            setActiveMegaSlug(null);
                            setMobileAccordion(null);
                        }}
                        className="order-3 flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
                    >
                        <div className="relative h-5 w-8">
                            <span
                                className={`hamburger-line absolute left-0 h-0.5 w-7.5 rounded-full transition-all duration-300 ease-in-out ${
                                    mobileMenuOpen ? "top-2 rotate-45" : "top-0"
                                }`}
                            />

                            <span
                                className={`hamburger-line absolute top-2 left-0 h-0.5 w-7.5 rounded-full transition-all duration-300 ease-in-out ${
                                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                                }`}
                            />

                            <span
                                className={`hamburger-line absolute left-0 h-0.5 w-7.5 rounded-full transition-all duration-300 ease-in-out ${
                                    mobileMenuOpen
                                        ? "top-2 -rotate-45"
                                        : "top-4"
                                }`}
                            />
                        </div>
                    </button>

                    {/* Phone  */}
                    <a
                        href={phoneHref ? `tel:${phoneHref}` : "#"}
                        className="text-yellow hidden text-xl font-bold whitespace-nowrap transition-colors lg:block xl:text-2xl 2xl:text-2xl"
                    >
                        {phoneNumber}
                    </a>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`bg-secondary fixed right-0 left-0 z-999 transition-all duration-300 ease-in-out lg:hidden ${
                        mobileMenuOpen
                            ? "visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible -translate-y-2 opacity-0"
                    }`}
                    style={{
                        top: "122px", // your header height
                        height: "calc(100vh - 122px)",
                    }}
                >
                    <div className="h-full overflow-y-auto overscroll-contain">
                        {primaryMenu.map((item) => {
                            const open = mobileAccordion === item.slug;

                            return (
                                <div
                                    key={item.id}
                                    className={`border-b ${
                                        theme === "light"
                                            ? "border-[#ececec]"
                                            : "border-white/10"
                                    }`}
                                >
                                    <button
                                        className="flex w-full items-center justify-between px-5 py-3 text-left"
                                        onClick={() => {
                                            if (!item.has_mega_menu) {
                                                window.location.href = item.url;
                                                return;
                                            }

                                            const slug = open
                                                ? null
                                                : (item.slug ?? null);

                                            setMobileAccordion(slug);
                                            setActiveMegaSlug(slug);
                                        }}
                                    >
                                        <span>{item.title}</span>

                                        {item.has_mega_menu && (
                                            <svg
                                                className={`transition-transform duration-300 ${
                                                    open ? "rotate-180" : ""
                                                }`}
                                                width="12"
                                                height="8"
                                                viewBox="0 0 12 8"
                                                fill="none"
                                            >
                                                <path
                                                    d="M1 1L6 6L11 1"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                            open
                                                ? "max-h-[2000px] opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <MegaMenu
                                            megaMenu={
                                                item.slug
                                                    ? (megaMenus[item.slug] ??
                                                      null)
                                                    : null
                                            }
                                            isOpen={open}
                                            isLoading={isMegaLoading}
                                            isMobile
                                            onClose={() => {
                                                setMobileAccordion(null);
                                                setActiveMegaSlug(null);
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </header>
    );
}
