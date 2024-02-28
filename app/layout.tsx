import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virtual Meet",
  description: "Virtual Meet is an online meeting platform developed by AJTimePyro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-800 h-screen w-full">{children}</body>
    </html>
  );
}
