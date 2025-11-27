"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface CharacterTransitionProps {
  onComplete: () => void
  mainColor: string
  subColor: string
  typeNumber: number
}

export function CharacterTransition({ onComplete, mainColor, subColor, typeNumber }: CharacterTransitionProps) {
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

    setStage(1)

    const timer2 = setTimeout(() => {
      setStage(2)
    }, 400)

    const timer3 = setTimeout(() => {
      setStage(3)
    }, 1400)

    const timer4 = setTimeout(() => {
      onComplete()
    }, 1800)

    return () => {
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  if (stage === 0) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-opacity duration-300"
      style={{
        zIndex: 9999,
        opacity: stage === 3 ? 0 : 1,
      }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300 animate-gradient-fast"
        style={{
          opacity: stage >= 1 ? 1 : 0,
          backgroundImage: `linear-gradient(135deg, ${mainColor} 0%, ${subColor} 50%, ${mainColor} 100%)`,
          backgroundSize: "200% 200%",
        }}
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 transition-opacity duration-500"
        style={{
          opacity: stage >= 2 && stage < 3 ? 1 : 0,
        }}
      >
        <div className="animate-in fade-in zoom-in duration-500">
          <Image
            src="/kachikan-logo.webp"
            alt="KACHIKAN"
            width={200}
            height={43}
            className="w-auto h-10 sm:h-12 drop-shadow-2xl"
            priority
          />
        </div>

        <div
          className="text-white text-8xl sm:text-9xl font-black animate-in fade-in zoom-in duration-500 delay-100"
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          {typeNumber}
        </div>
      </div>
    </div>
  )
}
