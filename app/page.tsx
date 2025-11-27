"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { QuizSection } from "@/components/quiz-section"
import { ResultSection } from "@/components/result-section"
import { DawnTransition } from "@/components/dawn-transition"
import Image from "next/image"

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

export default function Home() {
  const [stage, setStage] = useState<"initialLanding" | "start" | "startTransition" | "quiz" | "result" | "transition">(
    "initialLanding",
  )
  const [result, setResult] = useState<number | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (stage === "initialLanding") {
      const timer = setTimeout(() => {
        setStage("start")
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [stage])

  useEffect(() => {
    if (stage === "startTransition") {
      const timer = setTimeout(() => {
        setStage("quiz")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [stage])

  useEffect(() => {
    const resultParam = searchParams.get("result")
    if (resultParam) {
      const typeNumber = Number.parseInt(resultParam, 10)
      if (!isNaN(typeNumber) && typeNumber >= 1 && typeNumber <= 9) {
        setResult(typeNumber)
        setStage("result")
      }
    }
  }, [searchParams])

  const handleStart = () => {
    setStage("startTransition")
  }

  const handleStartTransitionComplete = () => {
    setStage("quiz")
  }

  const handleQuizComplete = (typeNumber: number) => {
    setResult(typeNumber)
    setStage("transition")
    localStorage.setItem("kachikan-result", typeNumber.toString())
    sessionStorage.setItem("fromQuiz", "true")
  }

  const handleTransitionComplete = useCallback(() => {
    if (result !== null) {
      router.push(`/characters/${result}`)
    }
  }, [result, router])

  const handleRestart = () => {
    setStage("start")
    setResult(null)
    localStorage.removeItem("kachikan-result")
    sessionStorage.removeItem("fromQuiz")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FF3B8F] via-[#7DD3FC] to-[#3B82F6] animate-gradient bg-[length:200%_200%]">
      {stage === "initialLanding" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#FF3B8F] via-[#7DD3FC] to-[#3B82F6] animate-gradient bg-[length:200%_200%]">
          <div className="animate-in fade-in zoom-in duration-700">
            <Image
              src="/kachikan-logo.webp"
              alt="KACHIKAN"
              width={200}
              height={43}
              className="w-auto h-10 sm:h-12 md:h-14 drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      )}

      {stage === "start" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
          <div className="w-full max-w-lg space-y-4 sm:space-y-6">
            {/* Logo */}
            <div className="flex justify-center animate-in fade-in duration-500">
              <Image
                src="/kachikan-logo.webp"
                alt="KACHIKAN"
                width={280}
                height={60}
                className="w-auto h-8 sm:h-10 md:h-12 drop-shadow-lg"
                priority
              />
            </div>

            {/* Title */}
            <div className="text-center space-y-2 sm:space-y-3 animate-in fade-in duration-500">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance leading-tight drop-shadow-lg">
                あなたの
                <br />
                KACHIKANタイプは？
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/95 font-medium drop-shadow-md">
                価値観フィーリング相性診断
              </p>
            </div>

            {/* Description */}
            <div className="text-center px-2 sm:px-4 animate-in fade-in duration-500">
              <p className="text-sm sm:text-base text-white/95 leading-relaxed drop-shadow-md">
                7つの質問を通じて、あなたのKACHIKANタイプをキャラクターで診断。
              </p>
            </div>

            {/* Main Image */}
            <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-500">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kachikan_KV1027.png-BHhWcyLrkCHbN8te4306eNtN6aRDcZ.jpeg"
                alt="KACHIKAN Characters"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4 space-y-2 sm:space-y-3 animate-in fade-in duration-500">
              <Button
                onClick={handleStart}
                size="lg"
                className="button-sparkle w-full bg-white hover:bg-white/90 text-[#FF3B8F] font-bold text-lg sm:text-xl h-14 sm:h-16 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                診断をはじめる
              </Button>
              <p className="text-xs sm:text-sm text-white/90 text-center drop-shadow-md">所要時間：約60秒</p>
            </div>
          </div>
        </div>
      )}

      {stage === "startTransition" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#FF3B8F] via-[#7DD3FC] to-[#3B82F6] animate-gradient bg-[length:200%_200%]">
          <div className="animate-in fade-in zoom-in duration-500">
            <Image
              src="/kachikan-logo.webp"
              alt="KACHIKAN"
              width={200}
              height={43}
              className="w-auto h-10 sm:h-12 md:h-14 drop-shadow-2xl animate-pulse-slow"
              priority
            />
          </div>
        </div>
      )}

      {stage === "quiz" && <QuizSection onComplete={handleQuizComplete} />}

      {stage === "transition" && result !== null && (
        <DawnTransition
          onComplete={handleTransitionComplete}
          mainColor={typeColors[result as keyof typeof typeColors].main}
          subColor={typeColors[result as keyof typeof typeColors].sub}
        />
      )}

      {stage === "result" && result !== null && <ResultSection typeNumber={result} onRestart={handleRestart} />}
    </main>
  )
}
