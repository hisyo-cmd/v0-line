"use client"

import { Button } from "@/components/ui/button"
import { typeData } from "@/lib/type-data"
import { useState, useEffect } from "react"
import Image from "next/image"

interface SimpleDiagnosisViewProps {
  typeNumber: number
}

const typeColors = {
  1: { main: "#FF4C33", sub: "#FAD961" },
  2: { main: "#3570E3", sub: "#B5E0FF" },
  3: { main: "#38C46C", sub: "#A4FFCC" },
  4: { main: "#2476E3", sub: "#8EC9FF" },
  5: { main: "#4B45C7", sub: "#C1A9FF" },
  6: { main: "#FF8A3D", sub: "#FFD58C" },
  7: { main: "#F9B733", sub: "#FFF8A0" },
  8: { main: "#F47BA0", sub: "#FFD6E5" },
  9: { main: "#3C3C3C", sub: "#CFCFCF" },
}

export function SimpleDiagnosisView({ typeNumber }: SimpleDiagnosisViewProps) {
  const [isVisible, setIsVisible] = useState(false)
  const type = typeData[typeNumber]
  const colors = typeColors[typeNumber as keyof typeof typeColors]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!type) {
    return null
  }

  const returnUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/characters/${typeNumber}?from=${typeNumber}`
  const liffUrlWithReturn = `${type.detailUrl}&returnUrl=${encodeURIComponent(returnUrl)}`

  return (
    <div
      className="min-h-screen transition-opacity duration-700 relative overflow-hidden animate-gradient-fast"
      style={{
        backgroundImage: `linear-gradient(135deg, ${colors.main} 0%, ${colors.sub} 50%, ${colors.main} 100%)`,
        backgroundSize: "200% 200%",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="absolute pointer-events-none animate-color-shift"
        style={{
          top: "5%",
          right: "-5%",
          opacity: isVisible ? 0.35 : 0,
          transition: "opacity 1s ease-out",
          transform: "rotate(-15deg)",
        }}
      >
        <span
          className="font-black select-none"
          style={{
            fontSize: "clamp(25rem, 60vw, 50rem)",
            lineHeight: 0.8,
            backgroundImage: `linear-gradient(135deg, ${colors.sub} 0%, ${colors.main} 50%, ${colors.sub} 100%)`,
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "blur(1px)",
          }}
        >
          {typeNumber}
        </span>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-3 flex justify-center">
          <Image
            src="/kachikan-logo.webp"
            alt="KACHIKAN"
            width={280}
            height={60}
            className="w-auto h-7 sm:h-8 drop-shadow-lg"
            priority
          />
        </div>
      </header>

      <div className="pt-16 p-3 py-6 relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <div
            className="space-y-3 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="text-center space-y-2 px-4">
              <p className="text-sm font-medium text-white/90">あなたのタイプは</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance leading-tight">
                {type.name}
              </h1>
              <p className="text-sm text-white/90 font-medium">TYPE {typeNumber}</p>
            </div>

            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 delay-200"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.95)",
              }}
            >
              <div className="w-full aspect-square relative">
                <img src={type.image || "/placeholder.svg"} alt={type.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p
                    className="text-lg font-bold text-white text-balance leading-relaxed text-center"
                    style={{
                      textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.7)",
                    }}
                  >
                    {type.catchphrase}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="space-y-3 px-2 transition-all duration-700 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <a href={liffUrlWithReturn} target="_blank" rel="noopener noreferrer" className="block">
              <Button
                className="button-sparkle w-full h-14 text-lg font-bold shadow-xl hover:scale-105 transition-transform"
                style={{
                  backgroundColor: "white",
                  color: colors.main,
                }}
              >
                あなたの価値観を見る
              </Button>
            </a>

            <p className="text-center text-xs text-white/80">
              ※外部サイトに移動します。詳細な診断結果をご覧いただけます。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
