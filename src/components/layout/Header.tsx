import Image from "next/image";
import Link from "next/link";
import { SiteData, WordPressMenuItem } from "@/lib/wordpress";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
    siteData?: SiteData | null;
}

function renderNavItems(items: WordPressMenuItem[]) {
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
                    style={{
                        color: "var(--color-foreground)",
                        transitionProperty: "color",
                    }}
                >
                    {item.title}
                </a>
            </li>
        );
    });
}

export default function Header({ siteData }: HeaderProps) {
    const settings = siteData?.settings;
    const primaryMenu = siteData?.menus?.primary || [];

    const brandName = "212 HVAC";
    const logoSrc = settings?.siteLogo || settings?.darkLogo || "";
    const phoneNumber = settings?.phoneNumber ?? "(917) 633-5959";
    const phoneHref = phoneNumber.replace(/[^0-9+]/g, "");
    const headerCta = settings?.headerCta;

    return (
        <header>
            <div style={{ backgroundColor: "var(--color-primary)" }}>
                <div className="container mx-auto grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 sm:px-0">
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
                            className="text-sm font-semibold uppercase transition-colors"
                            style={{ color: "var(--color-blue)" }}
                        >
                            {headerCta?.title || "CUSTOMER LOGIN"}
                        </a>
                    </div>

                    <div className="flex justify-end">
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            <nav style={{ backgroundColor: "var(--color-secondary)" }}>
                <div className="container flex items-center justify-between py-4">
                    <Link href="/">
                        {logoSrc ? (
                            <Image
                                src={logoSrc}
                                alt={brandName}
                                width={180}
                                height={60}
                                priority
                            />
                        ) : (
                            <span
                                className="text-lg font-semibold"
                                style={{ color: "var(--color-foreground)" }}
                            >
                                {brandName}
                            </span>
                        )}
                    </Link>

                    <ul className="hidden items-center gap-8 lg:flex">
                        {primaryMenu.length > 0
                            ? renderNavItems(primaryMenu)
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
                                  <li key={item.id}>
                                      <a
                                          href={item.url}
                                          target={item.target}
                                          rel={
                                              item.target === "_blank"
                                                  ? "noopener noreferrer"
                                                  : undefined
                                          }
                                          className="transition-colors"
                                          style={{
                                              color: "var(--color-foreground)",
                                          }}
                                      >
                                          {item.title}
                                      </a>
                                  </li>
                              ))}
                    </ul>

                    <a
                        href={phoneHref ? `tel:${phoneHref}` : "#"}
                        className="text-2xl font-bold transition-colors"
                        style={{ color: "var(--color-yellow)" }}
                    >
                        {phoneNumber}
                    </a>
                </div>
            </nav>
        </header>
    );
}
