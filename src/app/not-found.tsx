import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16 sm:py-24">
      <Container className="text-center">
        <p className="text-sm font-semibold tracking-wider text-red-600 uppercase">
          404 — Halaman Tidak Ditemukan
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Tautan yang Anda tuju tidak tersedia
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-slate-600">
          Halaman yang Anda cari mungkin telah dipindahkan atau URL yang dimasukkan kurang tepat.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" variant="primary" size="lg">
            Kembali ke Beranda
          </Button>
        </div>
      </Container>
    </div>
  );
}
