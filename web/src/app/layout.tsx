import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wisma Dempo",
  description: "Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {/* HANYA RENDER CHILDREN, JANGAN ADA SIDEBAR DISINI */}
          {children}

          {/* Toaster tetap disini agar notifikasi bisa muncul di Login & Dashboard */}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                color: "white",
                backgroundColor: "black",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
