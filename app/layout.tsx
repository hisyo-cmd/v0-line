import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Providers from "./providers"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KACHIKANタイプ診断 | 価値観フィーリング相性診断",
  description: "7つの質問を通じて、あなたのKACHIKANタイプをキャラクターで診断。友達と比較して共鳴スコアをチェック！",
  generator: "v0.app",
  openGraph: {
    title: "KACHIKANタイプ診断 | 価値観フィーリング相性診断",
    description: "7つの質問を通じて、あなたのKACHIKANタイプをキャラクターで診断。",
    url: "https://miniapp.line.me/2008251472-xW29mrlJ",
    siteName: "KACHIKAN診断",
    images: [
      {
        url: "/kachikan-logo.webp",
        width: 1200,
        height: 630,
        alt: "KACHIKAN診断",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KACHIKANタイプ診断 | 価値観フィーリング相性診断",
    description: "7つの質問を通じて、あなたのKACHIKANタイプをキャラクターで診断。",
    images: ["/kachikan-logo.webp"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
      </head>
      <body className={`font-sans antialiased`}>
        <Providers>{children}</Providers>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
