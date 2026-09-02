"use client";

import React, { useId, useState } from "react";
import { useRouter } from "next/navigation";

type CareerFormState = {
    fullName: string;
    email: string;
    phone: string;
    position: string;
    summary: string;
    resume: File | null;
};

const initialForm: CareerFormState = {
    fullName: "",
    email: "",
    phone: "",
    position: "",
    summary: "",
    resume: null,
};

export default function CareerForm() {
    const router = useRouter();
    const resumeInputId = useId();

    const [form, setForm] = useState<CareerFormState>(initialForm);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL!;
    const CAREER_FORM_ID = "759";
    const CAREER_FORM_ENDPOINT = `${API_URL}/contact-form-7/v1/contact-forms/${CAREER_FORM_ID}/feedback`;

    const isValidEmail = (value: string) => {
        return /^[^\s@]+@([^\s@]+\.)+[^\s@]{2,}$/i.test(value.trim());
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

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};

        if (!form.fullName.trim()) {
            nextErrors.fullName = "First and Last Name is required.";
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

        if (!form.position.trim()) {
            nextErrors.position = "Position is required.";
        }

        if (!form.summary.trim()) {
            nextErrors.summary = "A brief summary is required.";
        }

        if (!form.resume) {
            nextErrors.resume = "Please attach your resume.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
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

        // required CF7 hidden fields
        data.append("_wpcf7", CAREER_FORM_ID);
        data.append("_wpcf7_version", "5");
        data.append("_wpcf7_locale", "en_US");
        data.append("_wpcf7_unit_tag", `wpcf7-f${CAREER_FORM_ID}-p0-o1`);
        data.append("_wpcf7_container_post", "0");

        data.append("full-name", form.fullName);
        data.append("email", form.email);
        data.append("phone", form.phone);
        data.append("position", form.position);
        data.append("summary", form.summary);

        if (form.resume) {
            data.append("resume", form.resume, form.resume.name);
        }

        const startTime = Date.now();

        try {
            const response = await fetch(CAREER_FORM_ENDPOINT, {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (result.status === "mail_sent") {
                setSuccess(
                    result.message ||
                        "Thank you! Your application has been sent."
                );
                setErrors({});
                setError("");
                setForm(initialForm);
                router.push("/thank-you/");
                return;
            } else {
                setError(result.message || "Something went wrong.");
                // map CF7 invalid_fields array to a flat errors object
                const fieldErrors: Record<string, string> = {};
                if (Array.isArray(result.invalid_fields)) {
                    for (const f of result.invalid_fields) {
                        const rawKey = (f.field || "").replace(
                            /^wpcf7-f\d+-o1-/,
                            ""
                        );

                        const key =
                            rawKey === "full-name" ? "fullName" : rawKey;

                        if (key) {
                            fieldErrors[key] = f.message || "Invalid value.";
                        }
                    }
                }
                setErrors(fieldErrors);
            }
        } catch (err) {
            console.error("Career form submission failed:", err);
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
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="First and Last Name"
                        className="in-[.light]:border-primary in-[.light]:placeholder:text-primary w-full rounded-2xl border border-white px-5 py-4 text-center placeholder:text-white focus-visible:outline-none"
                    />
                    {errors.fullName && (
                        <p className="mt-1 text-center text-sm text-red-400">
                            {errors.fullName}
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
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        placeholder="Position"
                        className="in-[.light]:border-primary in-[.light]:placeholder:text-primary w-full rounded-2xl border border-white px-5 py-4 text-center placeholder:text-white focus-visible:outline-none"
                    />
                    {errors.position && (
                        <p className="mt-1 text-center text-sm text-red-400">
                            {errors.position}
                        </p>
                    )}
                </div>
            </div>

            <div className="relative">
                <textarea
                    name="summary"
                    value={form.summary}
                    onChange={handleChange}
                    placeholder="A brief summary of your field experience"
                    className="in-[.light]:border-primary in-[.light]:placeholder:text-primary h-48 w-full resize-none content-center rounded-2xl border border-white px-5 py-4 text-center placeholder:text-white focus-visible:outline-none"
                />
                {errors.summary && (
                    <p className="mt-1 text-center text-sm text-red-400">
                        {errors.summary}
                    </p>
                )}
            </div>

            {/* <div className="flex flex-col gap-4 rounded-2xl border border-white/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <label
                    htmlFor={resumeInputId}
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
                    Attach Your Resume
                    <input
                        id={resumeInputId}
                        name="resume"
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                resume: e.target.files?.[0] ?? null,
                            }))
                        }
                    />
                </label>

                {form.resume ? (
                    <p className="text-sm">File: {form.resume.name}</p>
                ) : (
                    <p className="text-sm text-white/80">
                        PDF, DOC, or DOCX files accepted
                    </p>
                )}
            </div> */}
            <div className="flex flex-col items-center">
                <label
                    htmlFor={resumeInputId}
                    className="text-md hover:text-blue flex cursor-pointer items-center gap-3 transition lg:text-[19px]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="33"
                        viewBox="0 0 9 21"
                        fill="none"
                    >
                        <path
                            d="M7.83 6.61499V16.8647C7.83 18.55 6.33402 19.9212 4.5 19.9212C2.66598 19.9212 1.17 18.55 1.17 16.8647V3.2363C1.17 2.04666 2.2154 1.07877 3.51 1.07877C4.80461 1.07877 5.85 2.04666 5.85 3.2363V14.2037C5.85 14.8977 5.25519 15.4623 4.5 15.4623C3.74481 15.4623 3.15 14.8977 3.15 14.2037V6.61499H1.98V14.2037C1.98 15.4893 3.10109 16.5411 4.5 16.5411C5.89892 16.5411 7.02 15.4893 7.02 14.2037V3.2363C7.02 1.45635 5.44694 0 3.51 0C1.57307 0 0 1.45635 0 3.2363V16.8647C0 19.1391 2.025 21 4.5 21C6.975 21 9 19.1391 9 16.8647V6.61499H7.83Z"
                            fill="currentColor"
                        />
                    </svg>
                    <span className="underline"> Attach Your Resume</span>
                    <input
                        id={resumeInputId}
                        name="resume"
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                resume: e.target.files?.[0] ?? null,
                            }))
                        }
                    />
                </label>

                {form.resume && (
                    <p className="text-sm">File: {form.resume.name}</p>
                )}
                {errors.resume && (
                    <p className="mt-1 text-center text-sm text-red-400">
                        {errors.resume}
                    </p>
                )}
            </div>
            <div className="mt-8 text-center lg:mt-12">
                <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="theme-btn bgc-yellow w-40"
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
                    <p className="mt-3 text-[14px] leading-5">{success}</p>
                )}

                {error && (
                    <p className="mt-1 text-center text-sm text-red-400">
                        {error}
                    </p>
                )}
            </div>
        </form>
    );
}
