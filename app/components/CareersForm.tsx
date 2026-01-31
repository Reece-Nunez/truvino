"use client";

import { useState } from "react";

export default function CareersForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData, resume);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl">
          Apply <span className="text-[#C9A962]">Now</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
          Take the first step towards an exciting career with Truvino
        </p>
      </div>

      {/* Form Container */}
      <div className="mt-16 mx-auto max-w-2xl">
        {submitted ? (
          <div className="rounded-2xl bg-[#1a1a1a] p-12 border border-[#C9A962]/20 text-center">
            <div className="mb-6 text-[#C9A962]">
              <svg className="h-20 w-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-white">
              Application Submitted
            </h3>
            <p className="mt-4 font-[family-name:var(--font-montserrat)] text-gray-400">
              Thank you for your interest in joining Truvino. Our team will review your application and get back to you soon.
            </p>
            <a
              href="/"
              className="mt-8 inline-block rounded-full border-2 border-[#C9A962] px-8 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#C9A962] transition-all hover:bg-[#C9A962] hover:text-black"
            >
              Return Home
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl bg-[#1a1a1a] p-8 md:p-12 border border-[#C9A962]/10">
            {/* Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 mb-2">
                Full Name <span className="text-[#C9A962]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0a0a0a] border border-[#C9A962]/20 px-4 py-3 font-[family-name:var(--font-montserrat)] text-white placeholder-gray-500 focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962] transition-colors"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 mb-2">
                Email Address <span className="text-[#C9A962]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0a0a0a] border border-[#C9A962]/20 px-4 py-3 font-[family-name:var(--font-montserrat)] text-white placeholder-gray-500 focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962] transition-colors"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label htmlFor="phone" className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0a0a0a] border border-[#C9A962]/20 px-4 py-3 font-[family-name:var(--font-montserrat)] text-white placeholder-gray-500 focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962] transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 mb-2">
                Tell us about yourself and your preferred position <span className="text-[#C9A962]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0a0a0a] border border-[#C9A962]/20 px-4 py-3 font-[family-name:var(--font-montserrat)] text-white placeholder-gray-500 focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962] transition-colors resize-none"
                placeholder="Describe your experience, skills, and the type of role you're interested in..."
              />
            </div>

            {/* Resume Upload */}
            <div className="mb-8">
              <label className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 mb-2">
                Resume / CV <span className="text-[#C9A962]">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume"
                  className="flex items-center justify-center gap-3 w-full rounded-lg bg-[#0a0a0a] border-2 border-dashed border-[#C9A962]/30 px-4 py-8 font-[family-name:var(--font-montserrat)] text-gray-400 cursor-pointer hover:border-[#C9A962]/60 hover:bg-[#0a0a0a]/80 transition-colors"
                >
                  <svg className="h-8 w-8 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {resume ? (
                    <span className="text-[#C9A962]">{resume.name}</span>
                  ) : (
                    <div className="text-center">
                      <span className="block">Click to upload your resume</span>
                      <span className="text-sm text-gray-500">PDF, DOC, or DOCX (max 10MB)</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-full bg-[#C9A962] px-8 py-4 font-[family-name:var(--font-montserrat)] text-base font-medium text-black transition-all hover:bg-[#D4BA7A] hover:shadow-lg hover:shadow-[#C9A962]/20"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
