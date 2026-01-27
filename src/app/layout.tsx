import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const maruBuri = localFont({
  variable: "--font-maru-buri",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/MaruBuri-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/MaruBuri-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/MaruBuri-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/MaruBuri-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/MaruBuri-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "A single-page wedding invitation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${maruBuri.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
