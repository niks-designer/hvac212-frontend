import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,

    async redirects() {
        return [
            {
                source: "/ductless-mini-split-2/",
                destination: "/ductless-mini-split-repair/",
                permanent: true,
            },
            {
                source: "/packaged-rooftop-unit/",
                destination: "/packaged-rooftop-unit-repair/",
                permanent: true,
            },
            {
                source: "/packaged-rooftop-installation/",
                destination: "/packaged-rooftop-unit-installation/",
                permanent: true,
            },
            {
                source: "/packaged-rooftop-maintenance/",
                destination: "/packaged-rooftop-unit-maintenance/",
                permanent: true,
            },
            {
                source: "/central-air-conditioner-repair-service/",
                destination: "/central-air-repair/",
                permanent: true,
            },
            {
                source: "/hvac-repairs/",
                destination: "/hvac-repair/",
                permanent: true,
            },
            {
                source: "/11231-red-hook/",
                destination: "/",
                permanent: true,
            },
            {
                source: "/articles/humidifiers-are-necessary-for-a-healthier-environment-at-home/",
                destination:
                    "/humidifiers-are-necessary-for-a-healthier-environment-at-home/",
                permanent: true,
            },
            {
                source: "/faq/ac-installation-nyc/",
                destination: "/",
                permanent: true,
            },
            {
                source: "/faq/air-conditioner-error-code-search/",
                destination: "/",
                permanent: true,
            },
            {
                source: "/faq/the-benefits-of-partnering-with-212-hvac-for-your-furnace-installation/",
                destination: "/",
                permanent: true,
            },
            {
                source: "/filter-club/",
                destination: "/",
                permanent: true,
            },
            {
                source: "/hvac-system/10-common-mini-split-air-conditioner-problems-and-how-to-fix-them/",
                destination:
                    "/10-common-mini-split-air-conditioner-problems-and-how-to-fix-them/",
                permanent: true,
            },
            {
                source: "/hvac-system/5-expert-tips-to-troubleshoot-and-repair-your-mini-split-air-conditioner-like-a-pro/",
                destination:
                    "/5-expert-tips-to-troubleshoot-and-repair-your-mini-split-air-conditioner-like-a-pro/",
                permanent: true,
            },
            {
                source: "/hvac-system/5-myths-about-hvac-systems-busted/",
                destination: "/5-myths-about-hvac-systems-busted/",
                permanent: true,
            },
            {
                source: "/hvac-system/6-hvac-problems-that-can-freeze-you-during-winter/",
                destination:
                    "/6-hvac-problems-that-can-freeze-you-during-winter/",
                permanent: true,
            },
            {
                source: "/hvac-system/aіr-condіtіoners-whаt-could-be-more-importаnt-thаn-a-good-brаnd-nаme/",
                destination:
                    "/aіr-condіtіoners-whаt-could-be-more-importаnt-thаn-a-good-brаnd-nаme/",
                permanent: true,
            },
            {
                source: "/hvac-system/a-breath-of-fresh-air-essential-spring-maintenance-tips-for-your-hvac-system/",
                destination:
                    "/a-breath-of-fresh-air-essential-spring-maintenance-tips-for-your-hvac-system/",
                permanent: true,
            },
            {
                source: "/hvac-system/all-that-you-need-to-know-about-hvac-systems/",
                destination: "/all-that-you-need-to-know-about-hvac-systems/",
                permanent: true,
            },
            {
                source: "/hvac-system/application-of-the-internet-of-things-in-hvac/",
                destination: "/application-of-the-internet-of-things-in-hvac/",
                permanent: true,
            },
            {
                source: "/hvac-system/beat-the-heat-why-your-ac-needs-a-tune-up/",
                destination: "/beat-the-heat-why-your-ac-needs-a-tune-up/",
                permanent: true,
            },
            {
                source: "/hvac-system/benefits-of-dehumidifiers/",
                destination: "/benefits-of-dehumidifiers/",
                permanent: true,
            },
            {
                source: "/hvac-system/common-airflow-problems-with-hvac-systems/",
                destination: "/common-airflow-problems-with-hvac-systems/",
                permanent: true,
            },
            {
                source: "/hvac-system/common-reasons-you-may-need-ac-service/",
                destination: "/common-reasons-you-may-need-ac-service/",
                permanent: true,
            },
            {
                source: "/hvac-system/costs-for-replacing-a-broken-hvac-system/",
                destination: "/costs-for-replacing-a-broken-hvac-system/",
                permanent: true,
            },
            {
                source: "/hvac-system/diy-tips-to-maintain-hvac-systems/",
                destination: "/diy-tips-to-maintain-hvac-systems/",
                permanent: true,
            },
            {
                source: "/hvac-system/do-its-yourself-hvac-system-cleaning-tips/",
                destination: "/do-its-yourself-hvac-system-cleaning-tips/",
                permanent: true,
            },
            {
                source: "/hvac-system/do-not-load-your-hvac/",
                destination: "/do-not-load-your-hvac/",
                permanent: true,
            },
            {
                source: "/hvac-system/do-you-know-these-most-common-power-failures-in-hvac-systems/",
                destination:
                    "/do-you-know-these-most-common-power-failures-in-hvac-systems/",
                permanent: true,
            },
            {
                source: "/hvac-system/expert-air-conditioning-repair-services-just-around-the-corner-find-the-best-options-near-you/",
                destination:
                    "/expert-air-conditioning-repair-services-just-around-the-corner-find-the-best-options-near-you/",
                permanent: true,
            },
            {
                source: "/hvac-system/facts-you-should-know-about-your-hvac-system/",
                destination: "/facts-you-should-know-about-your-hvac-system/",
                permanent: true,
            },
            {
                source: "/hvac-system/heres-how-to-solve-common-hvac-problems/",
                destination: "/heres-how-to-solve-common-hvac-problems/",
                permanent: true,
            },
            {
                source: "/hvac-system/how-cаn-regulаr-hvac-mаintenаnce-help-lower-your-utility-bills/",
                destination:
                    "/how-cаn-regulаr-hvac-mаintenаnce-help-lower-your-utility-bills/",
                permanent: true,
            },
            {
                source: "/hvac-system/how-do-you-know-if-your-air-conditioner-needs-repair/",
                destination:
                    "/how-do-you-know-if-your-air-conditioner-needs-repair/",
                permanent: true,
            },
            {
                source: "/hvac-system/how-to-care-for-your-hvac-system/",
                destination: "/how-to-care-for-your-hvac-system/",
                permanent: true,
            },
            {
                source: "/hvac-system/how-to-clean-a-window-air-conditioner/",
                destination: "/how-to-clean-a-window-air-conditioner/",
                permanent: true,
            },
            {
                source: "/hvac-system/how-to-increase-the-life-of-your-hvac-system/",
                destination: "/how-to-increase-the-life-of-your-hvac-system/",
                permanent: true,
            },
            {
                source: "/hvac-system/how-to-prepare-your-hvac-system-for-this-winter/",
                destination:
                    "/how-to-prepare-your-hvac-system-for-this-winter/",
                permanent: true,
            },
            {
                source: "/hvac-system/how-to-select-an-hvac-contractor/",
                destination: "/how-to-select-an-hvac-contractor/",
                permanent: true,
            },
            {
                source: "/hvac-system/how-to-use-a-humidifier-safely/",
                destination: "/how-to-use-a-humidifier-safely/",
                permanent: true,
            },
            {
                source: "/hvac-system/humidifiers-making-your-home-a-healthier-space-in-winter/",
                destination:
                    "/humidifiers-making-your-home-a-healthier-space-in-winter/",
                permanent: true,
            },
            {
                source: "/hvac-system/hvac-installation-nyc/",
                destination: "/hvac-installation-nyc/",
                permanent: true,
            },
            {
                source: "/hvac-system/hvac-servіcіng-how-regulаr-mаіntenаnce-cаn-sаve-you-money/",
                destination:
                    "/hvac-servіcіng-how-regulаr-mаіntenаnce-cаn-sаve-you-money/",
                permanent: true,
            },

            // NOTE: Excel destination appears to contain a typo:
            // https://www.212hvac.coms-installation-cost/
            // Kept exactly as provided in the Excel.
            {
                source: "/hvac-system/hvac-systems-installation-cost/",
                destination: "/s-installation-cost/",
                permanent: true,
            },

            {
                source: "/hvac-system/is-it-time-to-change-your-ac-filter-212-hvac-wants-to-help-copy-2023/",
                destination:
                    "/is-it-time-to-change-your-ac-filter-212-hvac-wants-to-help-copy-2023/",
                permanent: true,
            },
            {
                source: "/hvac-system/is-your-ac-in-need-of-repair/",
                destination: "/is-your-ac-in-need-of-repair/",
                permanent: true,
            },
            {
                source: "/hvac-system/is-your-hvac-system-making-strange-noises-212-hvac-to-the-rescue/",
                destination:
                    "/is-your-hvac-system-making-strange-noises-212-hvac-to-the-rescue/",
                permanent: true,
            },
            {
                source: "/hvac-system/know-more-about-green-hvac-systems/",
                destination: "/know-more-about-green-hvac-systems/",
                permanent: true,
            },
            {
                source: "/hvac-system/know-more-about-warm-and-cool-mist-humidifiers/",
                destination: "/know-more-about-warm-and-cool-mist-humidifiers/",
                permanent: true,
            },
            {
                source: "/hvac-system/learning-from-the-experts-of-air-conditioner-repair/",
                destination:
                    "/learning-from-the-experts-of-air-conditioner-repair/",
                permanent: true,
            },
            {
                source: "/hvac-system/mаxіmіzіng-performаnce-of-hvac-system/",
                destination: "/mаxіmіzіng-performаnce-of-hvac-system/",
                permanent: true,
            },
            {
                source: "/hvac-system/pros-of-buying-a-smart-thermostat-for-your-hvac/",
                destination:
                    "/pros-of-buying-a-smart-thermostat-for-your-hvac/",
                permanent: true,
            },
            {
                source: "/hvac-system/quick-fixes-for-central-air-emergencies-expert-tips-for-immediate-repairs/",
                destination:
                    "/quick-fixes-for-central-air-emergencies-expert-tips-for-immediate-repairs/",
                permanent: true,
            },
            {
                source: "/hvac-system/reasons-for-preventive-maintenance-of-hvac-systems/",
                destination:
                    "/reasons-for-preventive-maintenance-of-hvac-systems/",
                permanent: true,
            },
            {
                source: "/hvac-system/reasons-to-get-a-dehumidifier-for-your-home/",
                destination: "/reasons-to-get-a-dehumidifier-for-your-home/",
                permanent: true,
            },
            {
                source: "/hvac-system/signs-you-require-dehumidifier/",
                destination: "/signs-you-require-dehumidifier/",
                permanent: true,
            },
            {
                source: "/hvac-system/signs-your-furnace-is-about-to-break-down/",
                destination: "/signs-your-furnace-is-about-to-break-down/",
                permanent: true,
            },
            {
                source: "/hvac-system/spring-is-here-have-you-called-212-hvac/",
                destination: "/spring-is-here-have-you-called-212-hvac/",
                permanent: true,
            },
            {
                source: "/hvac-system/stay-cool-save-money-10-diy-hvac-maintenance-tips-to-keep-your-home-comfortable-in-2024/",
                destination:
                    "/stay-cool-save-money-10-diy-hvac-maintenance-tips-to-keep-your-home-comfortable-in-2024/",
                permanent: true,
            },
            {
                source: "/hvac-system/stay-warm-and-cozy-essential-heating-tips-for-surviving-the-winter/",
                destination:
                    "/stay-warm-and-cozy-essential-heating-tips-for-surviving-the-winter/",
                permanent: true,
            },
            {
                source: "/hvac-system/the-ultіmаte-guіde-to-buyіng-the-perfect-room-humіdіfіers/",
                destination:
                    "/the-ultіmаte-guіde-to-buyіng-the-perfect-room-humіdіfіers/",
                permanent: true,
            },
            {
                source: "/hvac-system/the-ultimate-guide-to-hvac-repair-expert-advice-for-brooklyn-homeowners/",
                destination:
                    "/the-ultimate-guide-to-hvac-repair-expert-advice-for-brooklyn-homeowners/",
                permanent: true,
            },
            {
                source: "/hvac-system/things-to-know-before-buying-hvac-system-for-your-home/",
                destination:
                    "/things-to-know-before-buying-hvac-system-for-your-home/",
                permanent: true,
            },
            {
                source: "/hvac-system/tips-maintain-your-hvac/",
                destination: "/tips-maintain-your-hvac/",
                permanent: true,
            },
            {
                source: "/hvac-system/tips-to-optimize-hvac-systems/",
                destination: "/tips-to-optimize-hvac-systems/",
                permanent: true,
            },
            {
                source: "/hvac-system/tips-to-reduce-air-conditioning-bills-in-summer/",
                destination:
                    "/tips-to-reduce-air-conditioning-bills-in-summer/",
                permanent: true,
            },
            {
                source: "/hvac-system/tips-to-save-energy-in-commercial-hvac-systems/",
                destination: "/tips-to-save-energy-in-commercial-hvac-systems/",
                permanent: true,
            },
            {
                source: "/hvac-system/types-of-air-conditioning-units/",
                destination: "/types-of-air-conditioning-units/",
                permanent: true,
            },
            {
                source: "/hvac-system/types-of-dehumidifiers/",
                destination: "/types-of-dehumidifiers/",
                permanent: true,
            },
            {
                source: "/hvac-system/types-of-hvac-system-and-what-to-consider-before-buying-them/",
                destination:
                    "/types-of-hvac-system-and-what-to-consider-before-buying-them/",
                permanent: true,
            },
            {
                source: "/hvac-system/when-to-replace-your-hvac-system/",
                destination: "/when-to-replace-your-hvac-system/",
                permanent: true,
            },
            {
                source: "/hvac-system/why-are-hvac-maintenance-contracts-important/",
                destination: "/why-are-hvac-maintenance-contracts-important/",
                permanent: true,
            },
            {
                source: "/hvac-system/why-replace-air-conditioner-at-the-end-of-the-summer/",
                destination:
                    "/why-replace-air-conditioner-at-the-end-of-the-summer/",
                permanent: true,
            },
            {
                source: "/hvac-system/why-transition-to-smart-hvac-systems/",
                destination: "/why-transition-to-smart-hvac-systems/",
                permanent: true,
            },
            {
                source: "/hvac-system/why-upgrade-your-hvac-system/",
                destination: "/why-upgrade-your-hvac-system/",
                permanent: true,
            },
            {
                source: "/packaged-tooftop/",
                destination: "/packaged-rooftop-unit-repair/",
                permanent: true,
            },
        ];
    },

    images: {
        unoptimized: process.env.NODE_ENV === "development",

        remotePatterns: [
            {
                protocol: "https",
                hostname: "nextjs212hvac.wpenginepowered.com",
            },
            {
                protocol: "https",
                hostname: "www.212hvac.com",
            },
        ],
    },
};

export default nextConfig;
