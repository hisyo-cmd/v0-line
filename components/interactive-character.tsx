"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import type { CharacterPart } from "@/lib/character-parts-data"
import { X } from "lucide-react"

interface InteractiveCharacterProps {
  characterImage: string
  characterName: string
  parts: CharacterPart[]
  typeColor: string
}

export function InteractiveCharacter({ characterImage, characterName, parts, typeColor }: InteractiveCharacterProps) {
  const [selectedPart, setSelectedPart] = useState<CharacterPart | null>(null)
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedPart && !(event.target as Element).closest(".popup-card")) {
        setSelectedPart(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [selectedPart])

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Character Image Container */}
      <div className="relative w-full aspect-[3/4] max-h-[65vh] mx-auto">
        <Image
          src={characterImage || "/placeholder.svg"}
          alt={characterName}
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />

        {/* Hotspot Buttons */}
        {parts.map((part) => (
          <button
            key={part.id}
            className={`absolute cursor-pointer transition-all duration-300 ${
              hoveredPart === part.id ? "hotspot-hover" : ""
            }`}
            style={{
              top: part.position.top,
              left: part.position.left,
              width: part.position.width,
              height: part.position.height,
            }}
            onMouseEnter={() => setHoveredPart(part.id)}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => setSelectedPart(part)}
            aria-label={`${part.partName}の詳細を見る`}
          >
            {/* Pulse Ring Effect */}
            <div className="absolute inset-0 rounded-full border-2 border-white/40 pulse-ring" />
            {hoveredPart === part.id && (
              <div className="absolute inset-0 rounded-full bg-white/30 backdrop-blur-sm glow-effect" />
            )}
          </button>
        ))}
      </div>

      {/* Popup Card */}
      {selectedPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-md popup-overlay">
          <div
            className="popup-card relative max-w-xl w-full rounded-3xl p-8 space-y-6 shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at top right, ${typeColor}40 0%, transparent 70%)`,
              }}
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedPart(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/25 hover:bg-white/40 transition-all duration-200 backdrop-blur-sm z-10 shadow-lg"
              aria-label="閉じる"
            >
              <X className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>

            <div className="space-y-6 text-white relative z-10">
              {/* Header Section */}
              <div className="space-y-3 pb-4 border-b border-white/20">
                <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-wide uppercase opacity-90">{selectedPart.dimension}</p>
                </div>
                <h3
                  className="text-3xl font-bold text-balance leading-tight"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
                >
                  {selectedPart.type}
                </h3>
              </div>

              {/* Part Description Section */}
              <div className="space-y-3 pb-4 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <p className="text-sm font-semibold tracking-wide opacity-90">{selectedPart.partName}</p>
                </div>
                <p
                  className="text-sm leading-relaxed pl-3.5 opacity-95"
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
                >
                  {selectedPart.description}
                </p>
              </div>

              {/* Feedback Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <p className="text-sm font-semibold tracking-wide opacity-90">あなたの価値観</p>
                </div>
                <p
                  className="text-base leading-relaxed pl-3.5 opacity-95"
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
                >
                  {selectedPart.feedback}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .pulse-ring {
          animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.08);
          }
        }

        .hotspot-hover {
          transform: scale(1.1);
        }

        .glow-effect {
          animation: glow 0.3s ease-out forwards;
        }

        @keyframes glow {
          from {
            opacity: 0;
            box-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }
          to {
            opacity: 1;
            box-shadow: 0 0 24px rgba(255, 255, 255, 0.7), 0 0 12px rgba(255, 255, 255, 0.5);
          }
        }

        .popup-overlay {
          animation: fadeIn 0.25s ease-out;
        }

        .popup-card {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pulse-ring,
          .glow-effect,
          .popup-overlay,
          .popup-card {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
