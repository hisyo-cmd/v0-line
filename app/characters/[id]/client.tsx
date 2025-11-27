"use client"
import { notFound } from "next/navigation"
import { typeData } from "@/lib/type-data"
import { ResultSection } from "@/components/result-section"
import { SimpleDiagnosisView } from "@/components/simple-diagnosis-view"

interface CharacterDetailPageClientProps {
  typeNumber: number
  fromParam?: string
}

export default function CharacterDetailPageClient({ typeNumber, fromParam }: CharacterDetailPageClientProps) {
  const type = typeData[typeNumber]

  if (!type) {
    notFound()
  }

  if (fromParam) {
    return <ResultSection typeNumber={typeNumber} onRestart={() => {}} />
  }

  return <SimpleDiagnosisView typeNumber={typeNumber} />
}
