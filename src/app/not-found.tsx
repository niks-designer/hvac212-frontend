import Link from "next/link";

export const metadata = {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="bg-shapes">
                {/* Blue Background */}
                <div
                    className="pointer-events-none absolute top-95.75 left-1/2 -z-10 h-375 w-[1582px] -translate-x-1/2"
                    style={{
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(0, 191, 255, 0.36) 0%, rgba(7, 15, 29, 0.36) 100%)",
                    }}
                    aria-hidden="true"
                />
            </div>

            <section className="px-4 py-24 md:px-8 lg:px-16">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-8 space-y-4">
                        <h1 className="text-yellow text-6xl font-bold md:text-7xl lg:text-8xl">
                            404
                        </h1>
                        <h2 className="text-3xl font-bold md:text-4xl">
                            Page Not Found
                        </h2>
                        <p className="text-lg text-gray-400">
                            We can't find the page you're looking for. It might
                            have been moved, deleted, or never existed.
                        </p>
                    </div>

                    <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href="/"
                            className="theme-btn bgc-yellow inline-block"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
