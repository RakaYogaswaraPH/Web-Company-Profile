import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] items-center justify-center py-20 sm:py-32">
      <Container className="text-center">
        <p className="text-xs font-mono font-medium tracking-widest text-red-600 uppercase">
          404 &mdash; Halaman Tidak Ditemukan
        </p>
        <h1 className="mt-4 text-3xl sm:text-5xl font-light tracking-tight text-slate-950">
          Tautan yang Anda tuju tidak tersedia
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm sm:text-base font-light text-slate-600 leading-relaxed">
          Halaman yang Anda cari mungkin telah dipindahkan atau URL yang dimasukkan kurang tepat.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-slate-950 text-white hover:bg-red-600 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 shadow-sm"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </Container>
    </div>
  );
}
