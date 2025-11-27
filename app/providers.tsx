"use client"

import type React from "react"

import { useEffect, useState } from "react"
import liff from "@line/liff"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        // LIFF ID for KACHIKAN診断
        await liff.init({ liffId: "2008389347-yxBlO69w" })
        console.log("[v0] LIFF initialized successfully")
      } catch (error) {
        console.error("LIFF init failed:", error)
      } finally {
        setReady(true)
      }
    })()
  }, [])

  if (!ready) return null // 初期化中は何も表示しない

  return <>{children}</>
}
