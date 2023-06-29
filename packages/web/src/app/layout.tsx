import Provider from "@/components/Provider";
import "./globals.css";
import { Inter, Roboto_Slab } from "next/font/google";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const serif = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata = {
  title: "AweNote",
  description: "AweNote is a note taking app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className={`bg-zinc-950 text-zinc-200`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
