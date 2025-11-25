import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Findling - Career Journey | Interactive Resume",
  description: "Explore Michael Findling's 25-year career journey through an interactive theme park-style map. Director of Digital Marketing & ABM with expertise in demand generation, marketing operations, and revenue growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
