import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/wp-content/uploads/"],
            disallow: [
                "/wp-admin/",
                "/wp-includes/",
                "/readme.html",
                "/license.txt",
                "/xmlrpc.php",
                "/*?s=",
                "/search/",
                "/feed/",
                "/trackback/",
                "/*/feed/",
                "/*/trackback/",
                "/wp-content/plugins/",
                "/wp-content/themes/",
                "/staging/",
                "/cart/",
                "/checkout/",
                "/my-account/",
            ],
        },
        sitemap: "https://www.212hvac.com/sitemap_index.xml",
    };
}
