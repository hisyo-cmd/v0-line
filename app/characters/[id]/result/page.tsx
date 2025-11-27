import { typeData } from "@/lib/type-data"
import { notFound } from "next/navigation"
import DetailedResultClient from "./client"
import type { Metadata } from "next"

export function generateStaticParams() {
  return Object.keys(typeData).map((id) => ({
    id: id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const typeNumber = Number(params.id)
  const type = typeData[typeNumber]

  if (!type) {
    return {}
  }

  const characterImage = type.image || "/kachikan-logo.webp"
  const title = `${type.name} | KACHIKANタイプ診断`
  const description = `${type.catchphrase} - ${type.description}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: characterImage,
          width: 1200,
          height: 1200,
          alt: type.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [characterImage],
    },
  }
}

export default async function DetailedResultPage({
  params,
}: {
  params: { id: string }
}) {
  const typeNumber = Number(params.id)
  const type = typeData[typeNumber]

  if (!type) {
    notFound()
  }

  return <DetailedResultClient typeNumber={typeNumber} />
}
