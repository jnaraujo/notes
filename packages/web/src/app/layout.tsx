import Provider from "@/components/Provider";
import "./globals.css";
import { Inter, Roboto_Slab } from "next/font/google";

const sans = Inter({ subsets: ["latin"] });
const serif = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
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
    <html lang="en">
      <body
        className={`${sans.className} ${serif.className} bg-zinc-950 text-zinc-200`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
