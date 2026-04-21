import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/shared/providers/query-provider";

export const metadata: Metadata = {
  title: "RoomMatch – Pronađi savršenog cimera",
  description: "Poveži se s ljudima koji traže cimera. Brzo, jednostavno i besplatno pronađi idealnog sustanara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
