import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ContactPopupProvider } from "@/components/contactpopup";
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
            <body className={`flex min-h-full flex-col`}>
                <ThemeProvider>
                    <ContactPopupProvider>
                        <Header siteData={siteData} />
                        <main className="grow">{children}</main>
                        <Footer siteData={siteData} />
                    </ContactPopupProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
