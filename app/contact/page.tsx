"use client";

import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Address",
      value: "PO BOX 42,\nWaldwick, NJ 07463, USA",
      href: "https://maps.google.com/?q=Waldwick+NJ+07463",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+1 (201) 212-6338",
      href: "tel:+12012905627",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "sales@truvinonj.com",
      href: "mailto:sales@truvinonj.com",
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden pt-32">
          <Image
            src="/hero-slideshow/product2.jpeg"
            alt="Contact Truvino"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
              >
                Get In <span className="text-[#C9A962]">Touch</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-300 sm:text-xl"
              >
                We&apos;d love to hear from you. Let&apos;s discuss how we can help your brand succeed.
              </motion.p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </section>

        {/* Contact Section */}
        <section className="bg-[#0a0a0a] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Contact Info */}
              <AnimatedSection>
                <div className="flex mb-6">
                  <div className="decorative-line" />
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl">
                  Let&apos;s Start a <span className="text-[#C9A962]">Conversation</span>
                </h2>
                <p className="mt-6 font-[family-name:var(--font-montserrat)] text-gray-400 leading-relaxed">
                  Whether you&apos;re a winery looking for distribution, a retailer seeking premium products, or simply want to learn more about our services, we&apos;re here to help.
                </p>

                {/* Contact Details */}
                <div className="mt-10 space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#C9A962]/10 border border-[#C9A962]/20 flex items-center justify-center text-[#C9A962] group-hover:bg-[#C9A962]/20 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-montserrat)] text-sm text-[#C9A962] font-medium">
                          {item.label}
                        </p>
                        <p className="font-[family-name:var(--font-montserrat)] text-gray-300 whitespace-pre-line group-hover:text-white transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-10">
                  <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-500 mb-4">
                    Follow us
                  </p>
                  <div className="flex gap-4">
                    <motion.a
                      href="https://www.instagram.com/truvinowines/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#C9A962]/20 flex items-center justify-center text-[#C9A962] hover:bg-[#C9A962] hover:text-black transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/company/bevcon-group/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#C9A962]/20 flex items-center justify-center text-[#C9A962] hover:bg-[#C9A962] hover:text-black transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.45,20.45H16.9V14.88c0-1.33,0-3-1.85-3s-2.13,1.45-2.13,2.94v5.66H9.37V9h3.41v1.56h.05a3.74,3.74,0,0,1,3.37-1.85c3.6,0,4.27,2.37,4.27,5.46v6.32ZM5.34,7.43A2.06,2.06,0,1,1,7.4,5.37,2.06,2.06,0,0,1,5.34,7.43Zm1.78,13H3.56V9H7.12ZM22.22,0H1.78A1.75,1.75,0,0,0,0,1.73V22.27A1.75,1.75,0,0,0,1.78,24H22.22A1.76,1.76,0,0,0,24,22.27V1.73A1.76,1.76,0,0,0,22.22,0Z" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </AnimatedSection>

              {/* Contact Form */}
              <AnimatedSection>
                {submitted ? (
                  <div className="rounded-2xl bg-[#1a1a1a] p-12 border border-[#C9A962]/20 text-center h-full flex flex-col items-center justify-center">
                    <div className="mb-6 text-[#C9A962]">
                      <svg className="h-20 w-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-white">
                      Message Sent
                    </h3>
                    <p className="mt-4 font-[family-name:var(--font-montserrat)] text-gray-400">
                      Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="mt-8 inline-block rounded-full border-2 border-[#C9A962] px-8 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#C9A962] transition-all hover:bg-[#C9A962] hover:text-black"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="rounded-2xl bg-[#1a1a1a] p-8 md:p-10 border border-[#C9A962]/10">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Name */}
                      <div>
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
                      <div>
                        <label htmlFor="email" className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 mb-2">
                          Email <span className="text-[#C9A962]">*</span>
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
                      <div>
                        <label htmlFor="phone" className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 mb-2">
                          Phone
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

                      {/* Company */}
                      <div>
                        <label htmlFor="company" className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-lg bg-[#0a0a0a] border border-[#C9A962]/20 px-4 py-3 font-[family-name:var(--font-montserrat)] text-white placeholder-gray-500 focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962] transition-colors"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="mt-6">
                      <label htmlFor="subject" className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 mb-2">
                        Subject <span className="text-[#C9A962]">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-[#0a0a0a] border border-[#C9A962]/20 px-4 py-3 font-[family-name:var(--font-montserrat)] text-white focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962] transition-colors"
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="Distribution Inquiry">Distribution Inquiry</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                        <option value="Product Information">Product Information</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="mt-6">
                      <label htmlFor="message" className="block font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 mb-2">
                        Message <span className="text-[#C9A962]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-[#0a0a0a] border border-[#C9A962]/20 px-4 py-3 font-[family-name:var(--font-montserrat)] text-white placeholder-gray-500 focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962] transition-colors resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-full bg-[#C9A962] px-8 py-4 font-[family-name:var(--font-montserrat)] text-base font-medium text-black transition-all hover:bg-[#D4BA7A] hover:shadow-lg hover:shadow-[#C9A962]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </motion.button>
                    </div>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
