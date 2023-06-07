import Provider from "@/components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className + " bg-zinc-950 text-zinc-200"}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
