"use client";

import { useEffect, useRef } from "react";

interface CustomCodeInjectorProps {
    headCode?: string;
    bodyStartCode?: string;
    bodyEndCode?: string;
}

function appendRawHtmlToDom(
    target: HTMLElement,
    html: string,
    insertAtStart: boolean = false
): ChildNode[] {
    if (!html || !target) {
        return [];
    }

    const rawHtml = html
        .replace(/<p>\s*(?:<br\s*\/?>\s*)*<\/p>/gi, "")
        .replace(/<p>\s*/gi, "")
        .replace(/\s*<\/p>/gi, "")
        .replace(/<br\s*\/>/gi, "")
        .replace(/<br>/gi, "")
        .trim();

    if (!rawHtml) {
        return [];
    }

    const fragment = document.createRange().createContextualFragment(rawHtml);
    const nodes = Array.from(fragment.childNodes) as ChildNode[];

    nodes.forEach((node) => {
        if (insertAtStart) {
            target.insertBefore(node, target.firstChild);
            return;
        }

        target.appendChild(node);
    });

    return nodes;
}

export default function CustomCodeInjector({
    headCode,
    bodyStartCode,
    bodyEndCode,
}: CustomCodeInjectorProps) {
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
        const head = document.head;
        const body = document.body;

        if (!head || !body) {
            return;
        }

        insertedNodes.current.head.forEach((node) => node.remove());
        insertedNodes.current.bodyStart.forEach((node) => node.remove());
        insertedNodes.current.bodyEnd.forEach((node) => node.remove());
        insertedNodes.current = { head: [], bodyStart: [], bodyEnd: [] };

        if (headCode) {
            insertedNodes.current.head = appendRawHtmlToDom(head, headCode);
        }

        if (bodyStartCode) {
            insertedNodes.current.bodyStart = appendRawHtmlToDom(
                body,
                bodyStartCode,
                true
            );
        }

        if (bodyEndCode) {
            insertedNodes.current.bodyEnd = appendRawHtmlToDom(
                body,
                bodyEndCode
            );
        }

        return () => {
            insertedNodes.current.head.forEach((node) => node.remove());
            insertedNodes.current.bodyStart.forEach((node) => node.remove());
            insertedNodes.current.bodyEnd.forEach((node) => node.remove());
        };
    }, [headCode, bodyStartCode, bodyEndCode]);

    return null;
}
