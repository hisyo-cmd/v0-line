"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { typeData } from "@/lib/type-data"
import { detailedCharacterData } from "@/lib/detailed-character-data"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Share2, ChevronRight, Info, X } from "lucide-react"
import { CharacterTransition } from "@/components/character-transition"
import { ShareModal } from "@/components/share-modal"
import Link from "next/link"

interface DetailedResultClientProps {
  id: string
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

export default function CharacterResultClient({ id }: DetailedResultClientProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [showCharacterTransition, setShowCharacterTransition] = useState(false)
  const [targetCharacter, setTargetCharacter] = useState<number | null>(null)
  const [compatibilityModalOpen, setCompatibilityModalOpen] = useState(false)
  const router = useRouter()

  const currentType = typeData[Number.parseInt(id)]
  const colors = typeColors[Number.parseInt(id) as keyof typeof typeColors]
  const detailedCharacter = detailedCharacterData[Number.parseInt(id)]
  const bestMatchType = currentType ? typeData[currentType.bestMatch] : null
  const goodMatchTypes = currentType?.goodMatch?.map((id) => typeData[id]) || []
  const badMatchTypes = currentType?.badMatch?.map((id) => typeData[id]) || []
  const worstMatchType = currentType ? typeData[currentType.worstMatch] : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
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
      router.push(`/characters/${targetCharacter}/result`)
    }
  }, [targetCharacter, router])

  const shareText = `私のKACHIKANタイプは「${currentType?.name}」でした！\n${currentType?.catchphrase}`
  const characterImage = currentType?.image || "/placeholder.svg"

  if (!currentType) {
    return null
  }

  return (
    <>
      {showCharacterTransition && targetCharacter !== null && (
        <CharacterTransition
          onComplete={handleCharacterTransitionComplete}
          mainColor={typeColors[targetCharacter as keyof typeof typeColors].main}
          subColor={typeColors[targetCharacter as keyof typeof typeColors].sub}
          typeNumber={targetCharacter}
        />
      )}

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
              filter: "blur(1px)",
            }}
          >
            {id}
          </span>
        </div>

        <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-3 flex justify-center">
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

        <div className="pt-16 p-4 py-8 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <div
              className="space-y-4 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="text-center space-y-2 px-4">
                <p className="text-sm font-medium text-white/90">あなたのタイプは</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance leading-tight">
                  {currentType.name}
                </h1>
                <p className="text-sm text-white/90 font-medium">TYPE {id}</p>
              </div>

              <div
                className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 delay-200"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "scale(1)" : "scale(0.95)",
                }}
              >
                <div className="w-full aspect-square relative max-w-md mx-auto">
                  <img
                    src={currentType.image || "/placeholder.svg"}
                    alt={currentType.name}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent rounded-b-3xl">
                    <p
                      className="text-lg font-bold text-white text-balance leading-relaxed text-center"
                      style={{
                        textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.7)",
                      }}
                    >
                      {currentType.catchphrase}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="space-y-4 transition-all duration-700 delay-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <Card className="p-4 sm:p-6 space-y-4 border-0 shadow-xl bg-white">
                <div className="space-y-3">
                  <h3 className="font-bold text-lg sm:text-xl">タイプ概要</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
                    {currentType.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-lg sm:text-xl">キーワード</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentType.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                        style={{
                          backgroundColor: currentType.color,
                          color: currentType.textColor,
                        }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-lg sm:text-xl">あなたのセリフ</h3>
                  <div className="p-3 sm:p-4 rounded-xl relative" style={{ backgroundColor: `${currentType.color}20` }}>
                    <p className="font-medium break-words leading-relaxed text-base sm:text-lg">
                      「{currentType.quote}」
                    </p>
                  </div>
                </div>
              </Card>

              {detailedCharacter && (
                <Card className="p-4 sm:p-6 space-y-4 border-0 shadow-xl bg-white relative overflow-hidden isolate">
                  {/* Heading - not blurred */}
                  <div className="relative z-10">
                    <h3 className="font-bold text-xl sm:text-2xl mb-2">価値観の詳細分析</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      あなたの価値観を9つの軸で詳しく分析しました
                    </p>
                  </div>

                  {/* Blurred content - lighter blur and only show first 3 dimensions */}
                  <div className="blur-[3px] select-none pointer-events-none opacity-60 relative z-0">
                    <div className="space-y-6">
                      {detailedCharacter.dimensions.slice(0, 3).map((dimension, index) => (
                        <div
                          key={index}
                          className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 space-y-3"
                        >
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div
                              className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                              style={{ backgroundColor: colors.main }}
                            >
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                              <h4 className="font-bold text-sm sm:text-base text-gray-800 break-words">
                                {dimension.matrixName}
                              </h4>
                              <div
                                className="inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                                style={{
                                  backgroundColor: `${colors.main}15`,
                                  color: colors.main,
                                }}
                              >
                                {dimension.type}
                              </div>
                              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
                                {dimension.feedback}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Overlay card */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 bg-white/70 backdrop-blur-sm z-20 pointer-events-none">
                    <div className="w-full max-w-md text-center space-y-6 pointer-events-auto">
                      {/* Horizontal divider line */}
                      <div className="w-full border-t-2 border-gray-300"></div>

                      <div className="space-y-2">
                        <p className="text-base sm:text-lg font-bold text-gray-800 leading-relaxed">
                          詳細分析は本診断にてご確認いただけます。
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          （本診断は後日LINE公式アカウントにて告知予定）
                        </p>
                      </div>

                      {/* Bottom divider line */}
                      <div className="w-full border-t-2 border-gray-300"></div>
                    </div>
                  </div>
                </Card>
              )}

              <Card className="p-4 sm:p-6 space-y-4 border-0 shadow-xl bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl sm:text-2xl">相性診断</h3>
                  <button
                    onClick={() => setCompatibilityModalOpen(true)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group"
                    aria-label="相性の見方"
                  >
                    <Info className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                  </button>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  あなたと相性の良いタイプ・悪いタイプをチェック
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Best Match */}
                  {bestMatchType && (
                    <div
                      onClick={() => handleCharacterClick(currentType.bestMatch)}
                      className="block group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={bestMatchType.image || "/placeholder.svg"}
                            alt={bestMatchType.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

                          <div
                            className="absolute z-20 font-black leading-none pointer-events-none select-none"
                            style={{
                              fontSize: "clamp(12rem, 35vw, 18rem)",
                              left: "-10%",
                              bottom: "-5%",
                              transform: "rotate(15deg)",
                              color: bestMatchType.subColor,
                              opacity: 0.4,
                              textShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(255,255,255,0.2)",
                            }}
                          >
                            {currentType.bestMatch}
                          </div>

                          <div className="absolute top-3 right-3 z-30">
                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              最高の相性
                            </div>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 z-30">
                            <p className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                              {bestMatchType.name}
                            </p>
                            <p className="text-sm text-white/95 line-clamp-2 leading-relaxed drop-shadow-md">
                              {bestMatchType.catchphrase}
                            </p>
                          </div>
                        </div>

                        <div
                          className="p-4 backdrop-blur-sm"
                          style={{
                            backgroundColor: bestMatchType.color,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">❤️</span>
                              <span className="text-sm font-semibold text-white">相性抜群</span>
                            </div>
                            <div className="flex items-center gap-1 text-white transition-opacity hover:opacity-80">
                              <span className="text-xs font-medium">詳細</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Good Match */}
                  {goodMatchTypes.length > 0 &&
                    goodMatchTypes.map((goodType) => (
                      <div
                        key={goodType.id}
                        onClick={() => handleCharacterClick(goodType.id)}
                        className="block group cursor-pointer"
                      >
                        <div className="relative overflow-hidden rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                          <div className="aspect-square relative overflow-hidden">
                            <img
                              src={goodType.image || "/placeholder.svg"}
                              alt={goodType.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

                            <div
                              className="absolute z-20 font-black leading-none pointer-events-none select-none"
                              style={{
                                fontSize: "clamp(12rem, 35vw, 18rem)",
                                left: "-10%",
                                bottom: "-5%",
                                transform: "rotate(15deg)",
                                color: goodType.subColor,
                                opacity: 0.4,
                                textShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(255,255,255,0.2)",
                              }}
                            >
                              {goodType.id}
                            </div>

                            <div className="absolute top-3 right-3 z-30">
                              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                良い相性
                              </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 z-30">
                              <p className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                                {goodType.name}
                              </p>
                              <p className="text-sm text-white/95 line-clamp-2 leading-relaxed drop-shadow-md">
                                {goodType.catchphrase}
                              </p>
                            </div>
                          </div>

                          <div
                            className="p-4 backdrop-blur-sm"
                            style={{
                              backgroundColor: goodType.color,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">👍</span>
                                <span className="text-sm font-semibold text-white">相性良好</span>
                              </div>
                              <div className="flex items-center gap-1 text-white transition-opacity hover:opacity-80">
                                <span className="text-xs font-medium">詳細</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Bad Match */}
                  {badMatchTypes.length > 0 &&
                    badMatchTypes.map((badType) => (
                      <div
                        key={badType.id}
                        onClick={() => handleCharacterClick(badType.id)}
                        className="block group cursor-pointer"
                      >
                        <div className="relative overflow-hidden rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                          <div className="aspect-square relative overflow-hidden">
                            <img
                              src={badType.image || "/placeholder.svg"}
                              alt={badType.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

                            <div
                              className="absolute z-20 font-black leading-none pointer-events-none select-none"
                              style={{
                                fontSize: "clamp(12rem, 35vw, 18rem)",
                                left: "-10%",
                                bottom: "-5%",
                                transform: "rotate(15deg)",
                                color: badType.subColor,
                                opacity: 0.4,
                                textShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(255,255,255,0.2)",
                              }}
                            >
                              {badType.id}
                            </div>

                            <div className="absolute top-3 right-3 z-30">
                              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                悪い相性
                              </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 z-30">
                              <p className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                                {badType.name}
                              </p>
                              <p className="text-sm text-white/95 line-clamp-2 leading-relaxed drop-shadow-md">
                                {badType.catchphrase}
                              </p>
                            </div>
                          </div>

                          <div
                            className="p-4 backdrop-blur-sm"
                            style={{
                              backgroundColor: badType.color,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">⚡</span>
                                <span className="text-sm font-semibold text-white">相性注意</span>
                              </div>
                              <div className="flex items-center gap-1 text-white transition-opacity hover:opacity-80">
                                <span className="text-xs font-medium">詳細</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Worst Match */}
                  {worstMatchType && (
                    <div
                      onClick={() => handleCharacterClick(currentType.worstMatch)}
                      className="block group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-2xl border-2 border-white/30 hover:border-white/60 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={worstMatchType.image || "/placeholder.svg"}
                            alt={worstMatchType.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

                          <div
                            className="absolute z-20 font-black leading-none pointer-events-none select-none"
                            style={{
                              fontSize: "clamp(12rem, 35vw, 18rem)",
                              left: "-10%",
                              bottom: "-5%",
                              transform: "rotate(15deg)",
                              color: worstMatchType.subColor,
                              opacity: 0.4,
                              textShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(255,255,255,0.2)",
                            }}
                          >
                            {currentType.worstMatch}
                          </div>

                          <div className="absolute top-3 right-3 z-30">
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              要注意
                            </div>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 z-30">
                            <p className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                              {worstMatchType.name}
                            </p>
                            <p className="text-sm text-white/95 line-clamp-2 leading-relaxed drop-shadow-md">
                              {worstMatchType.catchphrase}
                            </p>
                          </div>
                        </div>

                        <div
                          className="p-4 backdrop-blur-sm"
                          style={{
                            backgroundColor: worstMatchType.color,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">⚠️</span>
                              <span className="text-sm font-semibold text-white">相性に注意</span>
                            </div>
                            <div className="flex items-center gap-1 text-white transition-opacity hover:opacity-80">
                              <span className="text-xs font-medium">詳細</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <div className="space-y-3">
                <Button
                  onClick={handleShare}
                  className="button-sparkle w-full h-12 text-base sm:text-lg font-bold shadow-xl relative z-50"
                  style={{
                    backgroundColor: "white",
                    color: colors.main,
                  }}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  診断結果をシェア
                </Button>

                <Link href="/characters" className="block">
                  <Button variant="outline" className="w-full h-12 text-base sm:text-lg font-bold bg-white">
                    他のタイプを見る
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {compatibilityModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setCompatibilityModalOpen(false)}
          >
            <div
              className="bg-gradient-to-br from-[#FF3B8F] via-[#7DD3FC] to-[#67E8F9] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{currentType.name}の相性</h2>
                  <button
                    onClick={() => setCompatibilityModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="閉じる"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 bg-white rounded-b-3xl">
                {/* Best Compatibility */}
                {bestMatchType && (
                  <div className="space-y-3 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-5 border-2 border-pink-200">
                    <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">❤️</span>
                      <span>最高の相性（共鳴ペア）</span>
                    </h4>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 rounded-lg overflow-hidden relative min-h-[80px] isolate">
                        <img
                          src={currentType.image || "/placeholder.svg"}
                          alt={currentType.name}
                          className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
                        />
                        <div
                          className="absolute inset-0 z-[1]"
                          style={{
                            backgroundColor: currentType.color,
                            opacity: 0.75,
                          }}
                        />
                        <div className="relative z-[2] p-3 flex flex-col items-center justify-center h-full">
                          <div className="text-white font-black text-3xl drop-shadow-lg">{id}</div>
                          <div className="text-white text-sm font-bold text-center leading-tight drop-shadow-md">
                            {currentType.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-pink-500 text-2xl flex-shrink-0">❤️</div>
                      <div className="flex-1 rounded-lg overflow-hidden relative min-h-[80px] isolate">
                        <img
                          src={bestMatchType.image || "/placeholder.svg"}
                          alt={bestMatchType.name}
                          className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
                        />
                        <div
                          className="absolute inset-0 z-[1]"
                          style={{
                            backgroundColor: bestMatchType.color,
                            opacity: 0.75,
                          }}
                        />
                        <div className="relative z-[2] p-3 flex flex-col items-center justify-center h-full">
                          <div className="text-white font-black text-3xl drop-shadow-lg">{currentType.bestMatch}</div>
                          <div className="text-white text-sm font-bold text-center leading-tight drop-shadow-md">
                            {bestMatchType.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      価値観が共鳴し、互いを高め合える最高のパートナーシップ。
                    </p>
                  </div>
                )}

                {/* Good Compatibility */}
                {goodMatchTypes.length > 0 && (
                  <div className="space-y-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
                    <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">🤝</span>
                      <span>良い相性（補完ペア）</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {goodMatchTypes.map((type, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                          style={{ backgroundColor: type.color, color: "#fff" }}
                        >
                          <span className="font-black">{currentType.goodMatch[index]}</span>
                          <span>{type.name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed">反対軸を優しく補うタイプ同士。</p>
                    <p className="text-gray-600 text-sm leading-relaxed">例：挑戦↔慎重、冷静↔創造、理想↔感情 など。</p>
                  </div>
                )}

                {/* Bad Compatibility */}
                {badMatchTypes.length > 0 && (
                  <div className="space-y-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border-2 border-amber-200">
                    <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">⚡</span>
                      <span>悪い相性（摩擦ペア）</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {badMatchTypes.map((type, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                          style={{ backgroundColor: type.color, color: "#fff" }}
                        >
                          <span className="font-black">{currentType.badMatch[index]}</span>
                          <span>{type.name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed">似て非なる価値観で衝突する関係。</p>
                    <p className="text-gray-600 text-sm leading-relaxed">例：理想系 vs 現実系、自由人 vs 職人。</p>
                  </div>
                )}

                {/* Worst Compatibility */}
                {worstMatchType && (
                  <div className="space-y-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-5 border-2 border-gray-300">
                    <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">💀</span>
                      <span>最悪の相性（反発ペア）</span>
                    </h4>
                    <div className="flex items-center gap-2">
                      <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                        style={{ backgroundColor: worstMatchType.color, color: "#fff" }}
                      >
                        <span className="font-black">{currentType.worstMatch}</span>
                        <span>{worstMatchType.name}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">軸が真逆、互いを理解しづらい。</p>
                    <p className="text-gray-600 text-sm leading-relaxed">例：ブレイブルーザー vs フリースピリット。</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          shareText={shareText}
          characterImage={characterImage}
          typeName={currentType.name}
        />
      </div>
    </>
  )
}
