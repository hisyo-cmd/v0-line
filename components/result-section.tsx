"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { typeData } from "@/lib/type-data"
import { Share2, RotateCcw, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect, useCallback } from "react"
import { ShareModal } from "@/components/share-modal"
import { useRouter } from "next/navigation"
import { DawnTransition } from "@/components/dawn-transition"
import { CharacterTransition } from "@/components/character-transition"
import { characterPartsData } from "@/lib/character-parts-data"

interface ResultSectionProps {
  typeNumber: number
  onRestart: () => void
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

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 0, l: 0 }

  const r = Number.parseInt(result[1], 16) / 255
  const g = Number.parseInt(result[2], 16) / 255
  const b = Number.parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  } else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  } else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  } else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  } else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  } else if (h >= 300 && h < 360) {
    r = c
    g = 0
    b = x
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function ResultSection({ typeNumber, onRestart }: ResultSectionProps) {
  const resultRef = useRef<HTMLDivElement>(null)
  const type = typeData[typeNumber]
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [showDawnTransition, setShowDawnTransition] = useState(true)
  const [bgPosition, setBgPosition] = useState(0)
  const [showCharacterTransition, setShowCharacterTransition] = useState(false)
  const [targetCharacter, setTargetCharacter] = useState<number | null>(null)
  const router = useRouter()

  const colors = typeColors[typeNumber as keyof typeof typeColors]
  const [currentMainColor, setCurrentMainColor] = useState(colors.main)
  const [currentSubColor, setCurrentSubColor] = useState(colors.sub)
  const [gradientAngle, setGradientAngle] = useState(180)

  const handleDawnComplete = useCallback(() => {
    console.log("[v0] Dawn transition onComplete called")
    setShowDawnTransition(false)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const animateColors = () => {
      const mainHSL = hexToHSL(colors.main)
      const subHSL = hexToHSL(colors.sub)

      const hueVariation = (Math.random() - 0.5) * 16
      const satVariation = (Math.random() - 0.5) * 12
      const lightVariation = (Math.random() - 0.5) * 12

      const newMainH = Math.max(0, Math.min(360, mainHSL.h + hueVariation))
      const newMainS = Math.max(0, Math.min(100, mainHSL.s + satVariation))
      const newMainL = Math.max(0, Math.min(100, mainHSL.l + lightVariation))

      const newSubH = Math.max(0, Math.min(360, subHSL.h + hueVariation))
      const newSubS = Math.max(0, Math.min(100, subHSL.s + satVariation))
      const newSubL = Math.max(0, Math.min(100, subHSL.l + lightVariation))

      setCurrentMainColor(hslToHex(newMainH, newMainS, newMainL))
      setCurrentSubColor(hslToHex(newSubH, newSubS, newSubL))

      const angleVariation = (Math.random() - 0.5) * 30
      setGradientAngle(180 + angleVariation)
    }

    const initialTimer = setTimeout(() => {
      animateColors()
    }, 2000)

    const interval = setInterval(
      () => {
        animateColors()
      },
      12000 + Math.random() * 6000,
    )

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [colors.main, colors.sub])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setBgPosition((prev) => (prev + 0.1) % 100)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Only show dawn transition if coming from quiz completion
    const isFromQuiz = sessionStorage.getItem("fromQuiz")
    if (!isFromQuiz) {
      setShowDawnTransition(false)
    } else {
      sessionStorage.removeItem("fromQuiz")
    }
  }, [])

  const handleShare = () => {
    setShareModalOpen(true)
  }

  const handleCharacterClick = (targetType: number) => {
    setTargetCharacter(targetType)
    setShowCharacterTransition(true)
  }

  const handleCharacterTransitionComplete = useCallback(() => {
    if (targetCharacter !== null) {
      router.push(`/characters/${targetCharacter}?from=${typeNumber}`)
    }
  }, [targetCharacter, typeNumber, router])

  const characterParts = characterPartsData[typeNumber]
  const characterImage = type.image || "/placeholder.svg"
  const shareText = `私のKACHIKANタイプは「${type.name}」でした！\n${type.catchphrase}`

  return (
    <>
      {showDawnTransition && (
        <DawnTransition onComplete={handleDawnComplete} mainColor={colors.main} subColor={colors.sub} />
      )}

      {showCharacterTransition && targetCharacter !== null && (
        <CharacterTransition
          onComplete={handleCharacterTransitionComplete}
          mainColor={typeColors[targetCharacter as keyof typeof typeColors].main}
          subColor={typeColors[targetCharacter as keyof typeof typeColors].sub}
          typeNumber={targetCharacter}
        />
      )}

      <div
        className="min-h-screen p-3 py-6 transition-all duration-[3000ms] ease-in-out"
        style={{
          backgroundImage: `linear-gradient(${gradientAngle}deg, ${currentMainColor} 0%, ${currentSubColor} 100%)`,
          backgroundSize: "200% 200%",
          backgroundPosition: `${bgPosition}% ${bgPosition}%`,
        }}
      >
        <div className="max-w-2xl mx-auto space-y-4">
          <div ref={resultRef} className="space-y-4">
            <div className="space-y-3">
              <div className="text-center space-y-1 px-4">
                <p className="text-xs font-medium text-white">あなたのタイプは</p>
                <h1 className="hero-type text-4xl font-bold text-balance text-white">{type.name}</h1>
                <p className="text-xs text-white">TYPE {typeNumber}</p>
              </div>

              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="hero-image-container w-full aspect-square relative">
                  <img src={type.image || "/placeholder.svg"} alt={type.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="hero-caption rounded-2xl p-4">
                      <p
                        className="text-base font-bold text-white text-balance leading-relaxed text-center"
                        style={{
                          textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.5)",
                        }}
                      >
                        {type.catchphrase}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-4 space-y-4 border-0 shadow-md">
              <div className="space-y-2">
                <h3 className="font-bold text-base">タイプ概要</h3>
                <p className="text-muted-foreground leading-relaxed text-balance text-sm">{type.description}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base">キーワード</h3>
                <div className="flex flex-wrap gap-2">
                  {type.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: type.color,
                        color: type.textColor,
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-base">あなたのセリフ</h3>
                <div className="p-3 rounded-lg relative" style={{ backgroundColor: `${type.color}20` }}>
                  <p className="font-medium text-balance leading-relaxed text-sm">「{type.quote}」</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 space-y-3 border-0 shadow-md">
              <h3 className="font-bold text-base">相性診断</h3>

              <div className="space-y-2">
                <div onClick={() => handleCharacterClick(type.bestMatch)} className="block cursor-pointer">
                  <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-300 transition-all group">
                    <span className="text-xl">❤️</span>
                    <div className="flex-1">
                      <p className="font-medium text-xs text-green-700 mb-0.5">最高の相性</p>
                      <p className="font-bold text-green-900 text-sm">{typeData[type.bestMatch].name}</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-700 group-hover:text-green-900 transition-colors">
                      <span className="text-xs font-medium">詳細を見る</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Good Match cards if they exist */}
                {type.goodMatch &&
                  type.goodMatch.map((goodType) => (
                    <div key={goodType} onClick={() => handleCharacterClick(goodType)} className="block cursor-pointer">
                      <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all group">
                        <span className="text-xl">👍</span>
                        <div className="flex-1">
                          <p className="font-medium text-xs text-blue-700 mb-0.5">良い相性</p>
                          <p className="font-bold text-blue-900 text-sm">{typeData[goodType].name}</p>
                        </div>
                        <div className="flex items-center gap-1 text-blue-700 group-hover:text-blue-900 transition-colors">
                          <span className="text-xs font-medium">詳細を見る</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Bad Match cards if they exist */}
                {type.badMatch &&
                  type.badMatch.map((badType) => (
                    <div key={badType} onClick={() => handleCharacterClick(badType)} className="block cursor-pointer">
                      <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-300 transition-all group">
                        <span className="text-xl">⚡</span>
                        <div className="flex-1">
                          <p className="font-medium text-xs text-orange-700 mb-0.5">悪い相性</p>
                          <p className="font-bold text-orange-900 text-sm">{typeData[badType].name}</p>
                        </div>
                        <div className="flex items-center gap-1 text-orange-700 group-hover:text-orange-900 transition-colors">
                          <span className="text-xs font-medium">詳細を見る</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}

                <div onClick={() => handleCharacterClick(type.worstMatch)} className="block cursor-pointer">
                  <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 transition-all group">
                    <span className="text-xl">💀</span>
                    <div className="flex-1">
                      <p className="font-medium text-xs text-red-700 mb-0.5">相性が悪い</p>
                      <p className="font-bold text-red-900 text-sm">{typeData[type.worstMatch].name}</p>
                    </div>
                    <div className="flex items-center gap-1 text-red-700 group-hover:text-red-900 transition-colors">
                      <span className="text-xs font-medium">詳細を見る</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div onClick={() => handleCharacterClick(typeNumber)} className="block cursor-pointer">
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    診断結果の詳細を見る
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-2">
            <Button onClick={handleShare} className="button-sparkle w-full" variant="default">
              <Share2 className="w-4 h-4 mr-2" />
              シェア
            </Button>

            <Button onClick={onRestart} className="w-full bg-transparent" variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              もう一度診断する
            </Button>
          </div>

          <p className="text-center text-xs text-white">#REGIONLINKEXPO #KACHIKAN診断</p>
        </div>

        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          shareText={shareText}
          characterImage={characterImage}
          typeName={type.name}
        />
      </div>
    </>
  )
}
