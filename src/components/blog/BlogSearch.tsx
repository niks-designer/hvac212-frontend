"use client";

import { useEffect, useState } from "react";

interface BlogSearchProps {
    query: string;
    onSearch: (value: string) => void;
    isLoading: boolean;
}

export default function BlogSearch({
    query,
    onSearch,
    isLoading,
}: BlogSearchProps) {
    const [inputValue, setInputValue] = useState(query);
    const [validationError, setValidationError] = useState<string>("");

    useEffect(() => {
        setInputValue(query);
        setValidationError("");
    }, [query]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) {
            setValidationError("Please enter a search term.");
            return;
        }

        setValidationError("");
        onSearch(trimmedValue);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative mx-auto mt-7 mb-18 max-w-145.5"
        >
            <div className="in-[.light]:border-primary in-[.light]:placeholder:text-primary relative w-full rounded-2xl border border-white text-center">
                <input
                    value={inputValue}
                    onChange={(event) => {
                        setInputValue(event.target.value);
                        if (validationError) {
                            setValidationError("");
                        }
                    }}
                    type="search"
                    placeholder="Search"
                    className="in-[.light]:placeholder:text-primary w-full rounded-full border-none bg-transparent px-6 py-4 pr-14 text-center text-lg outline-none placeholder:text-white focus-visible:outline-none"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="hover:text-blue absolute top-1/2 right-2 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full p-3 transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                    <span className="sr-only">Search</span>

                    {isLoading ? (
                        <svg
                            className="h-6 w-6 animate-spin"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="20"
                                cy="20"
                                r="17"
                                stroke="#E5E7EB"
                                strokeWidth="3"
                            />
                            <path
                                d="M20 3C13.1 3 7.2 7.1 4.6 13"
                                stroke="#00BFFF"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    ) : (
                        <>
                            <svg
                                width="26"
                                height="27"
                                viewBox="0 0 26 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="10"
                                    cy="10"
                                    r="9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="16.4142"
                                    y1="17"
                                    x2="25"
                                    y2="25.5858"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </>
                    )}
                </button>
            </div>
            {validationError && (
                <p className="text-yellow absolute inset-x-0 mt-2 text-center text-sm">
                    {validationError}
                </p>
            )}
        </form>
    );
}
