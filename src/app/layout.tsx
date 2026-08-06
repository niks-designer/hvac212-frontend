import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ContactPopupProvider } from "@/components/contactpopup";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteData, SiteData } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["400", "700"],
});

// Note: metadata is provided per-page by `generateMetadata` or `head.tsx`.

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const siteData: SiteData | null = await getSiteData();

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`relative min-h-full`}>
                <ThemeProvider>
                    <SiteSettingsProvider
                        siteSettings={siteData?.settings ?? null}
                    >
                        <ContactPopupProvider>
                            <Header siteData={siteData} />
                            <main
                                className="grow"
                                style={{
                                    paddingTop: "var(--site-header-height)",
                                }}
                            >
                                {children}
                            </main>
                            <Footer siteData={siteData} />
                        </ContactPopupProvider>
                    </SiteSettingsProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
