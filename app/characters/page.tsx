"use client"

import Link from "next/link"
import Image from "next/image"
import { typeData } from "@/lib/type-data"
import { ChevronRight, Info, X } from "lucide-react"
import { useState } from "react"

export default function CharactersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const bestCompatibilityPairs = [
    { type1: 1, type2: 9, description: "努力と誠実が信頼で結ばれる" },
    { type1: 2, type2: 5, description: "冷静と安定がチームバランスを生む" },
    { type1: 3, type2: 6, description: "理想と自由が未来を創る" },
    { type1: 4, type2: 2, description: "職人と実行者が堅実に成果を出す" },
    { type1: 5, type2: 2, description: "秩序と実行が調和を作る" },
    { type1: 7, type2: 4, description: "分析と職人が精密な結果を導く" },
    { type1: 8, type2: 6, description: "表現と創造が場所を動かす" },
    { type1: 9, type2: 1, description: "誠実さが挑戦を支える" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF3B8F] via-[#7DD3FC] to-[#67E8F9] animate-gradient bg-[length:200%_200%]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-center">
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

      <div className="max-w-6xl mx-auto p-4 py-8 pt-20">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center drop-shadow-lg">KACHIKANタイプ一覧</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 border-2 border-white/40 hover:border-white/60"
              aria-label="相性の見方"
            >
              <Info className="w-5 h-5 text-white drop-shadow-lg" />
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white bg-black/70 px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                相性の見方
              </span>
            </button>
          </div>
          <p className="text-white/90 text-center text-balance drop-shadow-md">9つのKACHIKANタイプを見てみよう</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(typeData).map(([key, type], index) => {
            const bestMatchType = typeData[type.bestMatch]
            const goodMatchTypes = type.goodMatch?.map((id) => typeData[id]) || []
            const badMatchTypes = type.badMatch?.map((id) => typeData[id]) || []
            const worstMatchType = typeData[type.worstMatch]

            return (
              <Link key={key} href={`/characters/${key}/result`} className="block group">
                <div className="relative overflow-hidden rounded-2xl border-2 border-white/30 bg-white/95 backdrop-blur hover:border-white/60 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
                  {/* Character Image */}
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={type.image || "/placeholder.svg"}
                      alt={type.name}
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
                        color: type.subColor,
                        opacity: 0.4,
                        textShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(255,255,255,0.2)",
                      }}
                    >
                      {key}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 z-30">
                      <p className="text-xl font-bold text-white leading-tight drop-shadow-lg">{type.name}</p>
                      <p className="text-sm text-white/95 line-clamp-2 leading-relaxed drop-shadow-md">
                        {type.catchphrase}
                      </p>
                    </div>
                  </div>

                  <div
                    className="p-4 backdrop-blur-sm"
                    style={{
                      backgroundColor: type.color,
                    }}
                  >
                    <div className="mb-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-white/95 text-xs">
                        <span className="font-semibold">❤️ 最高:</span>
                        <span>{bestMatchType?.name}</span>
                      </div>
                      {goodMatchTypes.length > 0 && (
                        <div className="flex items-center gap-1.5 text-white/90 text-xs">
                          <span className="font-semibold">🤝 良い:</span>
                          <span>{goodMatchTypes.map((t) => t.name).join("、")}</span>
                        </div>
                      )}
                      {badMatchTypes.length > 0 && (
                        <div className="flex items-center gap-1.5 text-white/90 text-xs">
                          <span className="font-semibold">⚡ 悪い:</span>
                          <span>{badMatchTypes.map((t) => t.name).join("、")}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-white/95 text-xs">
                        <span className="font-semibold">💀 最悪:</span>
                        <span>{worstMatchType?.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/30">
                      <div className="flex flex-wrap gap-1.5">
                        {type.keywords.slice(0, 2).map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs font-medium border-2 border-white text-white bg-white/20"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-white transition-opacity hover:opacity-80">
                        <span className="text-xs font-medium">詳細</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-blue-500 p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">KACHIKAN相性一覧</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="閉じる"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* 最高の相性 - Visual Cards with Images */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">❤️</span>
                  <span>最高の相性（共鳴ペア）</span>
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  価値観が共鳴し、互いを高め合える最高のパートナーシップ。
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bestCompatibilityPairs.map((pair, index) => {
                    const type1Data = typeData[pair.type1]
                    const type2Data = typeData[pair.type2]

                    return (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-3 border border-pink-200"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          {/* Type 1 Mini Card */}
                          <div className="flex-1 rounded-lg overflow-hidden relative min-h-[70px] isolate">
                            <img
                              src={type1Data.image || "/placeholder.svg"}
                              alt={type1Data.name}
                              className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
                            />

                            {/* Color Overlay */}
                            <div
                              className="absolute inset-0 z-[1]"
                              style={{
                                backgroundColor: type1Data.color,
                                opacity: 0.75,
                              }}
                            />

                            {/* Content */}
                            <div className="relative z-[2] p-2 flex flex-col items-center justify-center h-full">
                              <div className="text-white font-black text-2xl drop-shadow-lg">{pair.type1}</div>
                              <div className="text-white text-xs font-bold text-center leading-tight drop-shadow-md">
                                {type1Data.name}
                              </div>
                            </div>
                          </div>

                          {/* Heart Icon */}
                          <div className="text-pink-500 text-xl flex-shrink-0">❤️</div>

                          {/* Type 2 Mini Card */}
                          <div className="flex-1 rounded-lg overflow-hidden relative min-h-[70px] isolate">
                            <img
                              src={type2Data.image || "/placeholder.svg"}
                              alt={type2Data.name}
                              className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
                            />

                            {/* Color Overlay */}
                            <div
                              className="absolute inset-0 z-[1]"
                              style={{
                                backgroundColor: type2Data.color,
                                opacity: 0.75,
                              }}
                            />

                            {/* Content */}
                            <div className="relative z-[2] p-2 flex flex-col items-center justify-center h-full">
                              <div className="text-white font-black text-2xl drop-shadow-lg">{pair.type2}</div>
                              <div className="text-white text-xs font-bold text-center leading-tight drop-shadow-md">
                                {type2Data.name}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-gray-700 text-center leading-relaxed">{pair.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 良い相性 */}
              <div className="space-y-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
                <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🤝</span>
                  <span>良い相性（補完ペア）</span>
                </h4>
                <p className="text-gray-700 leading-relaxed">反対軸を優しく補うタイプ同士。</p>
                <p className="text-gray-600 text-sm leading-relaxed">例：挑戦↔慎重、冷静↔創造、理想↔感情 など。</p>
              </div>

              {/* 悪い相性 */}
              <div className="space-y-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border-2 border-amber-200">
                <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span>悪い相性（摩擦ペア）</span>
                </h4>
                <p className="text-gray-700 leading-relaxed">似て非なる価値観で衝突する関係。</p>
                <p className="text-gray-600 text-sm leading-relaxed">例：理想系 vs 現実系、自由人 vs 職人。</p>
              </div>

              {/* 最悪の相性 */}
              <div className="space-y-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-5 border-2 border-gray-300">
                <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">💀</span>
                  <span>最悪の相性（反発ペア）</span>
                </h4>
                <p className="text-gray-700 leading-relaxed">軸が真逆、互いを理解しづらい。</p>
                <p className="text-gray-600 text-sm leading-relaxed">例：ブレイブルーザー vs フリースピリット。</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
