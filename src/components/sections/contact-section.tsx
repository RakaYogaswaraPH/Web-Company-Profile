"use client";

import { useState } from "react";
import { Mail, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";

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
    // Brief client simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="kontak" className="scroll-mt-20 bg-white text-slate-900 py-16 sm:py-24 border-b border-[#E2E5DC]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Kolom Kiri: Konsultasi & Kerjasama + Judul + Deskripsi + Kontak Cepat */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
              Konsultasi &amp; Kerjasama
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-light text-slate-950 tracking-tight leading-[1.1] text-balance">
              Bangun infrastruktur andal bersama kami.
            </h2>
            <p className="max-w-md text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              Hubungi tim kami untuk evaluasi soal kebutuhan, pengadaan, atau integrasi Layanan TIK Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <ExternalLink
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Halo%20PT%20Jamparing%20Masagi,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20TIK.`}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-red-600 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                <span>Hotline WhatsApp</span>
                <ArrowUpRight className="size-3.5 shrink-0" />
              </ExternalLink>

              <ExternalLink
                href={`mailto:${SITE_CONFIG.email}?subject=Permintaan%20Informasi%20Layanan%20TIK`}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-slate-400 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate-900 hover:border-slate-950 hover:bg-slate-50 transition-colors"
              >
                <Mail className="size-3.5 shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </ExternalLink>
            </div>
          </div>

          {/* Kolom Kanan: Formulir Kontak (menggantikan tulisan kantor) */}
          <div className="lg:col-span-7 lg:border-l lg:border-[#E2E5DC] lg:pl-12 xl:pl-16 pt-6 lg:pt-0">
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
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-slate-950 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-red-600 transition-colors duration-300 cursor-pointer disabled:opacity-50"
                >
                  <Send className="size-3.5 shrink-0" />
                  <span>{isSubmitting ? "Mengirim..." : "Kirim Pesan"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
