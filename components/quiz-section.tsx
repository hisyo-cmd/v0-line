"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { questions } from "@/lib/quiz-data"
import Image from "next/image"

interface QuizSectionProps {
  onComplete: (typeNumber: number) => void
}

export function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const handleAnswer = (typeNumber: number) => {
    const newAnswers = [...answers, typeNumber]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const typeCounts = new Array(10).fill(0)
      newAnswers.forEach((type) => {
        typeCounts[type]++
      })

      let maxCount = 0
      let resultType = 1
      for (let i = 1; i <= 9; i++) {
        if (typeCounts[i] > maxCount) {
          maxCount = typeCounts[i]
          resultType = i
        }
      }

      onComplete(resultType)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen">
      {/* Fixed logo header with glassmorphism effect */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-center">
          <Image
            src="/kachikan-logo.webp"
            alt="KACHIKAN"
            width={280}
            height={60}
            className="w-auto h-6 sm:h-7 md:h-8 drop-shadow-lg"
            priority
          />
        </div>
      </header>

      <div className="pt-14 sm:pt-16 px-2 sm:px-4 py-3 sm:py-8">
        <div className="max-w-2xl mx-auto space-y-3 sm:space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm text-white">
              <span>
                質問 {currentQuestion + 1} / {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-3 sm:p-6 bg-card/80 backdrop-blur">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-6 text-balance leading-relaxed">
              {question.text}
            </h2>

            <div className="space-y-1.5 sm:space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option.type)}
                  variant="outline"
                  className="w-full h-auto py-2 sm:py-4 px-2 sm:px-4 text-left justify-start hover:bg-primary/10 hover:border-primary transition-all"
                >
                  <span className="flex items-start gap-1.5 sm:gap-3 w-full">
                    <span className="font-bold text-primary shrink-0 text-sm sm:text-base">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-balance leading-relaxed flex-1 text-sm sm:text-base">{option.text}</span>
                    <span className="shrink-0 text-muted-foreground text-base sm:text-xl">→</span>
                  </span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
