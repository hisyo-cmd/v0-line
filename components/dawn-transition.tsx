"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface DawnTransitionProps {
  onComplete: () => void
  mainColor: string
  subColor: string
}

export function DawnTransition({ onComplete, mainColor, subColor }: DawnTransitionProps) {
  const [stage, setStage] = useState(0)
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (hasTriggered.current) return
    hasTriggered.current = true

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      onComplete()
      return
    }

    // Stage 1: Fade to gradient (0-500ms)
    setStage(1)

    // Stage 2: Show logo and first text "あなたの価値観を診断しています" (500-3250ms = 2750ms)
    const timer2 = setTimeout(() => {
      setStage(2)
    }, 500)

    // Stage 3: Switch to second text "数億通りの価値観から9つのタイプに厳選中..." (3250-6000ms = 2750ms)
    const timer3 = setTimeout(() => {
      setStage(3)
    }, 3250)

    // Complete transition (6000ms total)
    const timer4 = setTimeout(() => {
      setStage(4)
    }, 6000)

    const timer5 = setTimeout(() => {
      onComplete()
    }, 6200)

    return () => {
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [onComplete])

  if (stage === 0) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-opacity duration-500"
      style={{
        zIndex: 9999,
        opacity: stage === 4 ? 0 : 1,
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#FF3B8F] via-[#7DD3FC] to-[#3B82F6] transition-opacity duration-500 animate-gradient"
        style={{
          opacity: stage >= 1 ? 1 : 0,
          backgroundSize: "200% 200%",
        }}
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 transition-opacity duration-700"
        style={{
          opacity: stage >= 2 && stage < 4 ? 1 : 0,
        }}
      >
        <div className="animate-in fade-in zoom-in duration-700">
          <Image
            src="/kachikan-logo.webp"
            alt="KACHIKAN"
            width={280}
            height={60}
            className="w-auto h-12 sm:h-14 md:h-16 drop-shadow-2xl"
            priority
          />
        </div>

        {stage === 2 && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-white text-lg sm:text-xl font-medium tracking-wide">あなたの価値観を診断しています</p>
          </div>
        )}

        {stage === 3 && (
          <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4">
            <p className="text-white text-lg sm:text-xl font-medium tracking-wide text-center">
              数億通りの価値観から9つのタイプに厳選中
            </p>
            <p className="text-white/80 text-xs sm:text-sm text-center">
              ※正式リリースの本診断では診断結果は9つ以上を予定
            </p>
          </div>
        )}

        <div className="animate-in fade-in zoom-in duration-700 delay-300">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin" />
            <div
              className="absolute inset-2 border-4 border-transparent border-t-white/60 rounded-full animate-spin"
              style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
