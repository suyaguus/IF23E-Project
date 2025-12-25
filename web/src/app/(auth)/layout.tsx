import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Wisma Dempo",
  description: "Halaman masuk pengguna",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Container utama: Full layar, background abu-abu muda, konten di tengah
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
      {/* children di sini adalah halaman Login/Register */}
      {children}
    </div>
  );
}
