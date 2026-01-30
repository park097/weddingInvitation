import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  variable: "--font-pretendard",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/Pretendard-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

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
  title: "이충기 · 주은화 결혼합니다",
  description: "2026년 04월 26일 일요일 오후 12시30분\n마렌지 9",
  metadataBase: new URL("https://eunhwa-chunggi-wedding.vercel.app/"),
  openGraph: {
    title: "이충기 · 주은화 결혼합니다",
    description: "2026년 04월 26일 일요일 오후 12시30분\n마렌지 9",
    url: "https://eunhwa-chunggi-wedding.vercel.app/",
    siteName: "이충기 · 주은화 결혼합니다",
    images: [
      {
        url: "https://eunhwa-chunggi-wedding.vercel.app/img/og.jpg",
        width: 1200,
        height: 630,
        alt: "이충기 · 주은화 결혼합니다",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "이충기 · 주은화 결혼합니다",
    description: "2026년 04월 26일 일요일 오후 12시30분\n마렌지 9",
    images: ["https://eunhwa-chunggi-wedding.vercel.app/img/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${maruBuri.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
