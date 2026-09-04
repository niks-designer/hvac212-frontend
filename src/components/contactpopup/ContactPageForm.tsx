"use client";

import React, { useId, useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPageForm() {
    const router = useRouter();
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

    const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL!;
    const CONTACT_FORM_ID = "231";
    const CONTACT_FORM_ENDPOINT = `${API_URL}/contact-form-7/v1/contact-forms/${CONTACT_FORM_ID}/feedback`;

    const toggleService = (service: string) => {
        setForm((prev) => {
            const services = prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service];

            return {
                ...prev,
                services,
            };
        });

        if (errors.services) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next.services;
                return next;
            });
        }
    };

    const isValidEmail = (value: string) => {
        return /^[^\s@]+@([^\s@]+\.)+[^\s@]{2,}$/i.test(value.trim());
    };

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};

        if (!form.name.trim()) {
            nextErrors.name = "Name is required.";
        }
        if (!form.email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (!isValidEmail(form.email)) {
            nextErrors.email = "Please enter a valid email address.";
        }

        const phone = form.phone.trim();
        const phoneDigits = phone.replace(/\D/g, "");

        if (!phone) {
            nextErrors.phone = "Phone Number is required.";
        } else if (!/^[0-9+\-().\s]+$/.test(phone)) {
            nextErrors.phone = "Please enter a valid phone number.";
        } else if (phoneDigits.length < 10) {
            nextErrors.phone = "Please enter at least 10 digits.";
        }

        if (!form.zip.trim()) {
            nextErrors.zip = "Zip is required.";
        }
        if (!form.message.trim()) {
            nextErrors.message = "Message is required.";
        }
        if (form.services.length === 0) {
            nextErrors.services = "Please select at least one service.";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (errors[name]) {
            const nextErrors = { ...errors };
            delete nextErrors[name];
            setErrors(nextErrors);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSuccess("");
        setError("");
        setLoading(true);
        setErrors({});

        await new Promise((resolve) => setTimeout(resolve, 0));

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        const data = new FormData();

        data.append("_wpcf7", CONTACT_FORM_ID);
        data.append("_wpcf7_version", "5");
        data.append("_wpcf7_locale", "en_US");
        data.append("_wpcf7_unit_tag", `wpcf7-f${CONTACT_FORM_ID}-p0-o1`);
        data.append("_wpcf7_container_post", "0");

        data.append("your-name", form.name);
        data.append("your-email", form.email);
        data.append("your-phone", form.phone);
        data.append("your-zip", form.zip);
        data.append("your-message", form.message);

        form.services.forEach((service) => {
            data.append("services[]", service);
        });

        if (form.photo) {
            data.append("your-photo", form.photo, form.photo.name);
        }

        const startTime = Date.now();

        try {
            const response = await fetch(CONTACT_FORM_ENDPOINT, {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (result.status === "mail_sent") {
                setSuccess(
                    result.message ||
                        "Thank you! We will reach out to you shortly."
                );
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
                router.push("/thank-you/");
                return;
            } else {
                const fieldErrors: Record<string, string> = {};
                if (Array.isArray(result.invalid_fields)) {
                    for (const f of result.invalid_fields) {
                        const rawField = (f.field || "").replace(
                            /^wpcf7-f\d+-o1-/,
                            ""
                        );
                        const keyMap: Record<string, string> = {
                            "your-name": "name",
                            "your-email": "email",
                            "your-phone": "phone",
                            "your-zip": "zip",
                            "your-message": "message",
                            services: "services",
                            "your-photo": "photo",
                        };
                        const key = keyMap[rawField] || rawField;
                        if (key) {
                            fieldErrors[key] = f.message || "Invalid value.";
                        }
                    }
                }

                if (Object.keys(fieldErrors).length > 0) {
                    setErrors(fieldErrors);
                    setError("");
                } else {
                    setError(
                        /one or more fields have an error/i.test(
                            result.message || ""
                        )
                            ? ""
                            : result.message || "Something went wrong."
                    );
                }
            }
        } catch (err) {
            console.error("Contact form submission failed:", err);
            setError(
                err instanceof Error ? err.message : "Something went wrong."
            );
        } finally {
            const elapsed = Date.now() - startTime;
            const minDisplay = 250;
            if (elapsed < minDisplay) {
                await new Promise((resolve) =>
                    setTimeout(resolve, minDisplay - elapsed)
                );
            }
            setLoading(false);
        }
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
                        <p className="mt-1 text-center text-sm text-red-400">
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
                        <p className="mt-1 text-center text-sm text-red-400">
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
                        <p className="mt-1 text-center text-sm text-red-400">
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
                        <p className="mt-1 text-center text-sm text-red-400">
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
                    <p className="mt-1 text-center text-sm text-red-400">
                        {errors.message}
                    </p>
                )}
            </div>

            <div className="relative flex flex-col items-center gap-4 md:flex-row md:justify-between">
                <div className="flex items-center gap-2 md:gap-6">
                    {["Emergency Repair", "Installation", "Maintenance"].map(
                        (service) => {
                            const checked = form.services.includes(service);

                            return (
                                <label
                                    key={service}
                                    className="flex cursor-pointer items-center gap-2 select-none md:gap-3"
                                >
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={checked}
                                        onChange={() => toggleService(service)}
                                    />

                                    <span
                                        className={`in-[.light]:border-primary relative h-3 w-5 rounded-full border border-white transition-colors duration-300 md:h-6 md:w-12 ${
                                            checked ? "" : ""
                                        }`}
                                    >
                                        <span
                                            className={`absolute -top-px h-3 w-3 rounded-full transition-all duration-300 md:h-6 md:w-6 ${
                                                checked
                                                    ? "bg-blue left-2 md:left-6"
                                                    : "in-[.light]:bg-primary -left-0.5 bg-white"
                                            }`}
                                        />
                                    </span>

                                    <span className="text-[10.5px] md:text-[16px] lg:text-[19px]">
                                        {service}
                                    </span>
                                </label>
                            );
                        }
                    )}
                    {errors.services && (
                        <p className="absolute -bottom-6 mt-1 text-center text-sm text-red-400">
                            {errors.services}
                        </p>
                    )}
                </div>

                <label
                    htmlFor={photoInputId}
                    className="text-md hover:text-blue flex cursor-pointer items-center gap-2 transition md:gap-3 lg:text-[19px]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="35"
                        viewBox="0 0 9 21"
                        fill="none"
                        className="h-6 w-6 md:h-auto md:w-auto"
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
                    <p className="mt-1 text-center text-sm text-red-400">
                        {error}
                    </p>
                )}
            </div>

            <p className="mx-auto mt-5 mb-1 max-w-180 text-center text-[15px] leading-5">
                By submitting, you agree to receive emails and texts from 212
                HVAC LLC. Message & data rates may apply. Frequency varies.
                Reply STOP to opt out of texts. Unsubscribe links included in
                emails.
            </p>
        </form>
    );
}
