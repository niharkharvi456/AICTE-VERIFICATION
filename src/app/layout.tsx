import type { Metadata } from "next";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";


export const metadata: Metadata = {
  title: "AICTE Smart Verify",
  description: "AI-assisted document verification and application review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}