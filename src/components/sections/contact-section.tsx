"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate brief client submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="kontak" className="scroll-mt-20 bg-white text-slate-900 py-16 sm:py-24 border-b border-[#E2E5DC]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Konsultasi & Kerjasama + Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
              Konsultasi &amp; Kerjasama
            </span>

            {isSubmitted ? (
              <div className="p-8 border border-emerald-200 bg-emerald-50/60 text-slate-900 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="size-5 shrink-0" />
                  <span className="font-semibold text-sm uppercase tracking-wider font-mono">
                    Pesan Terkirim
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  Terima kasih, <strong className="font-medium text-slate-900">{formData.name}</strong>. Tim teknis PT. Jamparing Masagi akan segera menindaklanjuti pesan Anda melalui email <strong className="font-medium text-slate-900">{formData.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-4 text-xs font-mono uppercase tracking-widest text-slate-700 hover:text-slate-950 underline underline-offset-4 cursor-pointer"
                >
                  Kirim Pesan Lainnya &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-slate-600 block">
                      Nama <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-slate-300 bg-[#FBFBFA] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-slate-600 block">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="nama@perusahaan.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-slate-300 bg-[#FBFBFA] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-mono uppercase tracking-wider text-slate-600 block">
                    Subjek <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder="Contoh: Pengadaan Perangkat / Integrasi Sistem"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border border-slate-300 bg-[#FBFBFA] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-slate-600 block">
                    Isi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tuliskan isi pesan atau spesifikasi kebutuhan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-slate-300 bg-[#FBFBFA] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white transition-colors resize-y min-h-[120px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-slate-950 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition-colors duration-300 cursor-pointer disabled:opacity-50"
                >
                  <Send className="size-3.5 shrink-0" />
                  <span>{isSubmitting ? "Mengirim..." : "Kirim Pesan"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Offices List - Kantor & Workshop (sebelahan) */}
          <div className="lg:col-span-5 space-y-10 lg:border-l lg:border-[#E2E5DC] lg:pl-16 pt-4 lg:pt-0">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
                Kantor
              </span>
              <div className="text-sm font-light text-slate-600 leading-relaxed">
                <p className="font-medium text-slate-900">{SITE_CONFIG.offices[0].line1}</p>
                <p>{SITE_CONFIG.offices[0].line2}</p>
                <p>{SITE_CONFIG.offices[0].cityPostal}</p>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
                Workshop
              </span>
              <div className="text-sm font-light text-slate-600 leading-relaxed">
                <p className="font-medium text-slate-900">{SITE_CONFIG.offices[1].line1}</p>
                <p>{SITE_CONFIG.offices[1].line2}</p>
                <p>{SITE_CONFIG.offices[1].cityPostal}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E5DC] text-xs font-mono text-slate-500 space-y-2">
              <p className="text-slate-900 font-medium uppercase tracking-wider">
                Jam Operasional
              </p>
              <p>Senin &ndash; Jumat: 08:30 &ndash; 17:00 WIB</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
