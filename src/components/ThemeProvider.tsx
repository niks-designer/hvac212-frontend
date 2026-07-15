"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { type ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="hvac-theme"
      themes={["dark", "light"]}
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
