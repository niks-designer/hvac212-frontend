"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { decodeWordPressHtml, getApiUrl } from "@/lib/wordpress";

interface PageSchemaCode {
    header_schema_code?: string | null;
    after_body_start_code?: string | null;
    before_body_end_code?: string | null;
}

interface WordPressPageResponse {
    acf?: PageSchemaCode;
}

interface CustomCodeInjectorProps {
    headCode?: string;
    bodyStartCode?: string;
    bodyEndCode?: string;
}

function normalizeRawHtml(html: string): string {
    return html
        .replace(/<p>\s*(?:<br\s*\/?>\s*)*<\/p>/gi, "")
        .replace(/<p>\s*/gi, "")
        .replace(/\s*<\/p>/gi, "")
        .replace(/<br\s*\/>/gi, "")
        .replace(/<br>/gi, "")
        .trim();
}

function mergeUniqueCode(...values: Array<string | null | undefined>): string {
    const uniqueValues = new Set(
        values.map((value) => normalizeRawHtml(value ?? "")).filter(Boolean)
    );

    return [...uniqueValues].join("\n");
}

function appendRawHtmlToDom(
    target: HTMLElement,
    html: string,
    insertAtStart: boolean = false
): ChildNode[] {
    const rawHtml = normalizeRawHtml(html);

    if (!rawHtml) {
        return [];
    }

    const fragment = document.createRange().createContextualFragment(rawHtml);
    const nodes = Array.from(fragment.childNodes) as ChildNode[];
    const anchor = insertAtStart ? target.firstChild : null;
    const insertedNodes: ChildNode[] = [];

    nodes.forEach((node) => {
        let insertedNode = node;

        if (node instanceof HTMLScriptElement) {
            const script = document.createElement("script");
            Array.from(node.attributes).forEach((attribute) => {
                script.setAttribute(attribute.name, attribute.value);
            });
            script.textContent = node.textContent;
            insertedNode = script;
        }

        if (insertAtStart) {
            target.insertBefore(insertedNode, anchor);
        } else {
            target.appendChild(insertedNode);
        }

        insertedNodes.push(insertedNode);
    });

    return insertedNodes;
}

export default function CustomCodeInjector({
    headCode,
    bodyStartCode,
    bodyEndCode,
}: CustomCodeInjectorProps) {
    const pathname = usePathname();
    const [pageCode, setPageCode] = useState<{
        pathname: string;
        values: PageSchemaCode;
    } | null>(null);
    const insertedNodes = useRef<{
        head: ChildNode[];
        bodyStart: ChildNode[];
        bodyEnd: ChildNode[];
    }>({
        head: [],
        bodyStart: [],
        bodyEnd: [],
    });

    useEffect(() => {
        const slug = pathname.replace(/^\/+|\/+$/g, "") || "home";
        const controller = new AbortController();

        if (slug.includes("/")) {
            return () => controller.abort();
        }

        const pageUrl = getApiUrl(`hvac/v1/page/${encodeURIComponent(slug)}`);

        fetch(pageUrl, {
            signal: controller.signal,
        })
            .then((response) => {
                if (response.ok) {
                    return response
                        .json()
                        .then((page: WordPressPageResponse) => page.acf ?? {});
                }

                const postsUrl = getApiUrl(
                    `wp/v2/posts?slug=${encodeURIComponent(slug)}`
                );
                return fetch(postsUrl, { signal: controller.signal })
                    .then((postsResponse) => {
                        if (!postsResponse.ok) {
                            throw new Error("Unable to fetch WordPress page.");
                        }

                        return postsResponse.json() as Promise<
                            WordPressPageResponse[]
                        >;
                    })
                    .then((posts) => posts[0]?.acf ?? {});
            })
            .then((acf) => {
                const values: PageSchemaCode = {
                    header_schema_code: decodeWordPressHtml(
                        acf?.header_schema_code
                    ),
                    after_body_start_code: decodeWordPressHtml(
                        acf?.after_body_start_code
                    ),
                    before_body_end_code: decodeWordPressHtml(
                        acf?.before_body_end_code
                    ),
                };

                setPageCode({ pathname, values });
            })
            .catch(() => {
                if (!controller.signal.aborted) {
                    setPageCode({ pathname, values: {} });
                }
            });

        return () => controller.abort();
    }, [pathname]);

    useEffect(() => {
        const head = document.head;
        const body = document.body;

        if (!head || !body) {
            return;
        }

        insertedNodes.current.head.forEach((node) => node.remove());
        insertedNodes.current.bodyStart.forEach((node) => node.remove());
        insertedNodes.current.bodyEnd.forEach((node) => node.remove());
        insertedNodes.current = { head: [], bodyStart: [], bodyEnd: [] };

        const currentPageCode =
            pageCode?.pathname === pathname ? pageCode.values : {};
        const combinedHeadCode = mergeUniqueCode(
            headCode,
            currentPageCode.header_schema_code
        );
        const combinedBodyStartCode = mergeUniqueCode(
            bodyStartCode,
            currentPageCode.after_body_start_code
        );
        const combinedBodyEndCode = mergeUniqueCode(
            bodyEndCode,
            currentPageCode.before_body_end_code
        );

        if (combinedHeadCode) {
            insertedNodes.current.head = appendRawHtmlToDom(
                head,
                combinedHeadCode
            );
        }

        if (combinedBodyStartCode) {
            insertedNodes.current.bodyStart = appendRawHtmlToDom(
                body,
                combinedBodyStartCode,
                true
            );
        }

        if (combinedBodyEndCode) {
            insertedNodes.current.bodyEnd = appendRawHtmlToDom(
                body,
                combinedBodyEndCode
            );
        }

        return () => {
            insertedNodes.current.head.forEach((node) => node.remove());
            insertedNodes.current.bodyStart.forEach((node) => node.remove());
            insertedNodes.current.bodyEnd.forEach((node) => node.remove());
        };
    }, [headCode, bodyStartCode, bodyEndCode, pageCode, pathname]);

    return null;
}
