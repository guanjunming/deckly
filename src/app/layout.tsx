import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProviders from "@/components/providers/QueryProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Deckly",
  description: "Flash cards to help you remember things easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <QueryProviders>
          <main>{children}</main>
          <Toaster position="bottom-left" />
        </QueryProviders>
      </body>
    </html>
  );
}
