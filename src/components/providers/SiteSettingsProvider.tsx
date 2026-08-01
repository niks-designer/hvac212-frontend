"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type { FooterSettings } from "@/lib/wordpress";

interface SiteSettingsContextValue {
    siteSettings?: FooterSettings | null;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(
    null
);

export function SiteSettingsProvider({
    siteSettings,
    children,
}: {
    siteSettings?: FooterSettings | null;
    children: ReactNode;
}) {
    return (
        <SiteSettingsContext.Provider value={{ siteSettings }}>
            {children}
        </SiteSettingsContext.Provider>
    );
}

export function useSiteSettings() {
    const context = useContext(SiteSettingsContext);

    if (!context) {
        throw new Error("useSiteSettings must be used within SiteSettingsProvider");
    }

    return context.siteSettings;
}
