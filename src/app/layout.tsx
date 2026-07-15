import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteData, SiteData } from "@/lib/wordpress";

const themeScript = `
  (function () {
    try {
      const storedTheme = window.localStorage.getItem('hvac-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isLight = storedTheme === 'light';
      const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);

      if (isLight) {
        document.documentElement.classList.add('light');
        document.documentElement.style.colorScheme = 'light';
      } else if (isDark) {
        document.documentElement.classList.remove('light');
        document.documentElement.style.colorScheme = 'dark';
      }
    } catch (error) {
      document.documentElement.style.colorScheme = 'dark';
    }
  })();
`;

export const dynamic = "force-dynamic";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: "HVAC Installation Brooklyn, NY | AC Repair NYC | 212 HVAC®",
    description:
        "212 HVAC® premier Air conditioning services company providing best AC Installation , repair & maintenance Brooklyn, NYC & nearby.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const siteData: SiteData | null = await getSiteData();

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="flex min-h-full flex-col">
                <ThemeProvider>
                    <Header siteData={siteData} />
                    <main className="flex-grow">{children}</main>
                    <Footer siteData={siteData} />
                </ThemeProvider>
            </body>
        </html>
    );
}
