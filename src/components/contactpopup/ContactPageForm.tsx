"use client";

import React, { useId, useState } from "react";

export default function ContactPageForm() {
    const photoInputId = useId();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        zip: "",
        message: "",
        services: [] as string[],
        photo: null as File | null,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const API_URL =
        process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
        "https://nextjs212hvac.wpenginepowered.com/wp-json";
    const CONTACT_FORM_ID = process.env.NEXT_PUBLIC_CONTACT_FORM_ID || "231";
    const CONTACT_FORM_ENDPOINT = `${API_URL}/hvac/v1/contact`;

    const toggleService = (service: string) => {
        setForm((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service],
        }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");
        setErrors({});

        const data = new FormData();

        data.append("name", form.name);
        data.append("email", form.email);
        data.append("phone", form.phone);
        data.append("zip", form.zip);
        data.append("message", form.message);

        form.services.forEach((service) => {
            data.append("services", service);
        });

        if (form.photo) {
            data.append("photo", form.photo, form.photo.name);
        }

        try {
            for (const pair of data.entries()) {
                console.log(pair[0], pair[1]);
            }

            const response = await fetch(CONTACT_FORM_ENDPOINT, {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                setSuccess(result.message);
                setErrors({});

                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    zip: "",
                    message: "",
                    services: [],
                    photo: null,
                });
            } else {
                setError(result.message || "");
                setErrors(result.errors || {});
            }
        } catch (err) {
            console.error("Contact form submission failed:", err);
            setError(
                err instanceof Error ? err.message : "Something went wrong."
            );
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="relative">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="First and Last Name"
                        className="in-[.light]:border-primary in-[.light]:placeholder:text-primary w-full rounded-2xl border border-white px-5 py-4 text-center placeholder:text-white focus-visible:outline-none"
                    />
                    {errors.name && (
                        <p className="mt-2 text-[11px] text-[#9F1D20]">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="in-[.light]:border-primary in-[.light]:placeholder:text-primary w-full rounded-2xl border border-white px-5 py-4 text-center placeholder:text-white focus-visible:outline-none"
                    />
                    {errors.email && (
                        <p className="mt-2 text-[11px] text-[#9F1D20]">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="in-[.light]:border-primary in-[.light]:placeholder:text-primary w-full rounded-2xl border border-white px-5 py-4 text-center placeholder:text-white focus-visible:outline-none"
                    />
                    {errors.phone && (
                        <p className="mt-2 text-[11px] text-[#9F1D20]">
                            {errors.phone}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <input
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        placeholder="Zip Code"
                        className="in-[.light]:border-primary in-[.light]:placeholder:text-primary w-full rounded-2xl border border-white px-5 py-4 text-center placeholder:text-white focus-visible:outline-none"
                    />
                    {errors.zip && (
                        <p className="mt-2 text-[11px] text-[#9F1D20]">
                            {errors.zip}
                        </p>
                    )}
                </div>
            </div>

            <div className="relative">
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="in-[.light]:border-primary in-[.light]:placeholder:text-primary h-48 w-full resize-none content-center rounded-2xl border border-white px-5 py-4 text-center placeholder:text-white focus-visible:outline-none"
                />
                {errors.message && (
                    <p className="mt-2 text-[11px] text-[#9F1D20]">
                        {errors.message}
                    </p>
                )}
            </div>

            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-6">
                    {["Emergency Repair", "Installation", "Maintenance"].map(
                        (service) => {
                            const checked = form.services.includes(service);

                            return (
                                <label
                                    key={service}
                                    className="flex cursor-pointer items-center gap-3 select-none"
                                >
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={checked}
                                        onChange={() => toggleService(service)}
                                    />

                                    <span
                                        className={`in-[.light]:border-primary relative h-6 w-12 rounded-full border border-white transition-colors duration-300 ${
                                            checked ? "" : ""
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-0 h-6 w-6 rounded-full transition-all duration-300 ${
                                                checked
                                                    ? "bg-blue left-6"
                                                    : "in-[.light]:bg-primary -left-0.5 bg-white"
                                            }`}
                                        />
                                    </span>

                                    <span className="text-md lg:text-[19px]">
                                        {service}
                                    </span>
                                </label>
                            );
                        }
                    )}
                </div>

                <label
                    htmlFor={photoInputId}
                    className="text-md hover:text-blue flex cursor-pointer items-center gap-3 transition lg:text-[19px]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="35"
                        viewBox="0 0 9 21"
                        fill="none"
                    >
                        <path
                            d="M7.83 6.61499V16.8647C7.83 18.55 6.33402 19.9212 4.5 19.9212C2.66598 19.9212 1.17 18.55 1.17 16.8647V3.2363C1.17 2.04666 2.2154 1.07877 3.51 1.07877C4.80461 1.07877 5.85 2.04666 5.85 3.2363V14.2037C5.85 14.8977 5.25519 15.4623 4.5 15.4623C3.74481 15.4623 3.15 14.8977 3.15 14.2037V6.61499H1.98V14.2037C1.98 15.4893 3.10109 16.5411 4.5 16.5411C5.89892 16.5411 7.02 15.4893 7.02 14.2037V3.2363C7.02 1.45635 5.44694 0 3.51 0C1.57307 0 0 1.45635 0 3.2363V16.8647C0 19.1391 2.025 21 4.5 21C6.975 21 9 19.1391 9 16.8647V6.61499H7.83Z"
                            fill="currentColor"
                        />
                    </svg>
                    Upload unit photo
                    <input
                        id={photoInputId}
                        name="your-photo"
                        type="file"
                        hidden
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                photo: e.target.files?.[0] ?? null,
                            }))
                        }
                    />
                </label>
                {form.photo && (
                    <p className="text-md absolute right-0 -bottom-8">
                        File: {form.photo.name}
                    </p>
                )}
            </div>
            <div className="mt-12 text-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="theme-btn bgc-yellow"
                >
                    {loading ? (
                        <span className="relative inline-flex items-center justify-center">
                            <span className="invisible">Submit</span>
                            <span className="absolute inset-0 flex items-center justify-center">
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-90"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                            </span>
                            <span className="sr-only">Sending...</span>
                        </span>
                    ) : (
                        "Submit"
                    )}
                </button>
                {success && (
                    <p className="mt-2 text-[14px] leading-5">
                        Thank you! We will reach out to you shortly.
                    </p>
                )}

                {error && (
                    <p className="mt-2 text-[11px] text-[#9F1D20]">{error}</p>
                )}
            </div>

            <p className="mx-auto mt-5 max-w-180 text-center text-[15px] leading-5">
                By submitting, you agree to receive emails and texts from
                Triangles PH LLC. Message & data rates may apply. Frequency
                varies. Reply STOP to opt out of texts. Unsubscribe links
                included in emails.
            </p>
        </form>
    );
}
