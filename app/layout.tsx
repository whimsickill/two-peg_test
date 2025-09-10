import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Two Peg Test Calculator",
  description: "Calculate collimation error per foot and per meter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}