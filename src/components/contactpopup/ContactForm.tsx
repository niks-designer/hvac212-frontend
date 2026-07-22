"use client";

import React, { useState } from "react";

export default function ContactForm() {
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

        const data = new FormData();

        data.append("your-name", form.name);
        data.append("your-email", form.email);
        data.append("your-phone", form.phone);
        data.append("your-zip", form.zip);
        data.append("your-message", form.message);

        form.services.forEach((service) => {
            data.append("services[]", service);
        });

        if (form.photo) {
            data.append("your-photo", form.photo);
        }

        try {
            const response = await fetch(
                "http://localhost/triangles-ph/wp-json/contact-form-7/v1/contact-forms/231/feedback",
                {
                    method: "POST",
                    body: data,
                }
            );

            const result = await response.json();

            if (result.status === "mail_sent") {
                setSuccess(result.message);

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
                setError(result.message);
            }
        } catch {
            setError("Something went wrong.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full rounded-full px-4 py-1 text-sm text-[#9B9B9B] placeholder:opacity-60 bg-white text-primary"
                />

                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full rounded-full px-4 py-1 text-sm text-[#9B9B9B] placeholder:opacity-60 bg-white text-primary"
                />

                <div className="grid grid-cols-2 gap-3">
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full rounded-full px-4 py-1 text-sm text-[#9B9B9B] placeholder:opacity-60 bg-white text-primary"
                    />
                    <input
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        placeholder="Zip"
                        className="w-full rounded-full px-4 py-1 text-sm text-[#9B9B9B] placeholder:opacity-60 bg-white text-primary"
                    />
                </div>
                <div className="space-y-3">
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
                                        className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
                                            checked
                                                ? "bg-[#ffffff]"
                                                : "bg-white/40"
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-0 h-5 w-5 rounded-full bg-[#07253F] transition-all duration-300 ${
                                                checked ? "left-5" : "left-0"
                                            }`}
                                        />
                                    </span>

                                    <span className="text-sm text-[#002D3E]">
                                        {service}
                                    </span>
                                </label>
                            );
                        }
                    )}
                </div>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Additional Information"
                    className="h-15 w-full resize-none rounded-2xl px-4 py-3 text-sm placeholder:opacity-60 bg-white text-primary"
                />

                <label htmlFor="photo" className="cursor-pointer underline">
                    <span className="flex items-center gap-2 text-sm text-[#002D3E]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="21"
                            viewBox="0 0 9 21"
                            fill="none"
                        >
                            <path
                                d="M7.83 6.61499V16.8647C7.83 18.55 6.33402 19.9212 4.5 19.9212C2.66598 19.9212 1.17 18.55 1.17 16.8647V3.2363C1.17 2.04666 2.2154 1.07877 3.51 1.07877C4.80461 1.07877 5.85 2.04666 5.85 3.2363V14.2037C5.85 14.8977 5.25519 15.4623 4.5 15.4623C3.74481 15.4623 3.15 14.8977 3.15 14.2037V6.61499H1.98V14.2037C1.98 15.4893 3.10109 16.5411 4.5 16.5411C5.89892 16.5411 7.02 15.4893 7.02 14.2037V3.2363C7.02 1.45635 5.44694 0 3.51 0C1.57307 0 0 1.45635 0 3.2363V16.8647C0 19.1391 2.025 21 4.5 21C6.975 21 9 19.1391 9 16.8647V6.61499H7.83Z"
                                fill="#002D3E"
                            />
                        </svg>{" "}
                        Upload unit photo
                    </span>
                    <input
                        type="file"
                        hidden
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                photo: e.target.files?.[0] ?? null,
                            })
                        }
                    />
                </label>

                <div className="pt-2 text-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-primary hover:text-primary w-fit w-full cursor-pointer rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Sending..." : "Submit"}
                    </button>
                    {success && (
                        <p className="text-center text-green-600">{success}</p>
                    )}

                    {error && (
                        <p className="text-center text-red-600">{error}</p>
                    )}
                </div>

                <p className="mt-2 text-center text-[14px] leading-5 text-[#002D3E]">
                    Thank you! We will reach out to you shortly.
                </p>
                <p className="mt-2 text-center text-[9px] leading-3 text-[#002D3E]">
                    By submitting, you agree to receive emails and texts from
                    212 HVAC LLC. Message & data rates may apply. Frequency
                    varies. Reply STOP to opt out of texts. Unsubscribe links
                    included in emails.
                </p>
            </div>
        </form>
    );
}
