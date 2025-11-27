export interface TypeData {
  name: string
  catchphrase: string
  description: string
  keywords: string[]
  quote: string
  bestMatch: number
  goodMatch?: number[]
  badMatch?: number[]
  worstMatch: number
  color: string
  subColor: string
  textColor: string
  image: string
  detailUrl: string
}

export const typeData: Record<number, TypeData> = {
  1: {
    name: "ブレイブルーザー",
    catchphrase: "倒れても、立ち上がる。それが、俺の流儀。",
    description:
      "愚直でまっすぐ。努力と誠実さで勝負するストイックファイター。どんな壁にも挑み続け、結果で語るタイプ。鍛錬そのものが生き方。",
    keywords: ["努力", "挑戦", "信頼", "根性", "誠実"],
    quote: "努力は、嘘をつかない。だから俺も、逃げない。",
    bestMatch: 9,
    goodMatch: [5],
    badMatch: [7], // Added bad compatibility with TYPE 7
    worstMatch: 6,
    color: "#FF4C33",
    subColor: "#FAD961",
    textColor: "#FFFFFF",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kachikan_KV1027_1%E4%BA%BA_1.png-ZjhaFo5U6p5wbPEd5RMRDQZNQ9MBCR.jpeg",
    detailUrl:
      "https://liff.line.me/2008019957-rqqVkko1/landing?follow=%40224iqaue&lp=CSIRUl&liff_id=2008019957-rqqVkko1",
  },
  2: {
    name: "クールアチーバー",
    catchphrase: "静かに、でも確実に。理想を、形に。",
    description:
      "冷静沈着な実行者。感情に流されず、淡々と結果を出す。無駄を嫌い、静かな情熱でチームを支える裏リーダー。",
    keywords: ["冷静", "誠実", "安定", "信頼", "バランス"],
    quote: "焦らなくていい。静けさの中で、結果は育つ。",
    bestMatch: 5,
    goodMatch: [4], // Changed from undefined to [4]
    badMatch: [8], // Changed from [3, 8] to [8]
    worstMatch: 3,
    color: "#6BC5D8",
    subColor: "#A0E8F5",
    textColor: "#FFFFFF",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kachikan_KV1027_1%E4%BA%BA_2.png-V7PZIPHYG8nQRqHF39nY0LZFJdItK7.jpeg",
    detailUrl:
      "https://liff.line.me/2008019957-rqqVkko1/landing?follow=%40224iqaue&lp=NwPX6o&liff_id=2008019957-rqqVkko1",
  },
  3: {
    name: "ビジョナリードリーマー",
    catchphrase: "意義を信じて、未来を動かす。",
    description:
      "社会や人のために「意味のあること」を追い求める信念型。目先の成果よりも意義や貢献を重んじ、仲間の心を動かすインスピレーションリーダー。",
    keywords: ["意義", "信念", "情熱", "貢献", "挑戦"],
    quote: "意義は形になる。信じて動けば、世界は変わる。",
    bestMatch: 9,
    goodMatch: [6],
    badMatch: [2],
    worstMatch: 4,
    color: "#38C46C",
    subColor: "#A4FFCC",
    textColor: "#FFFFFF",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kachikan_KV1027_1%E4%BA%BA_3.png-fPdDyh8IVHZExy0GbaBYwrU2lKRdhc.jpeg",
    detailUrl:
      "https://liff.line.me/2008019957-rqqVkko1/landing?follow=%40224iqaue&lp=a3HoSb&liff_id=2008019957-rqqVkko1",
  },
  4: {
    name: "クラフトマスター",
    catchphrase: "時間をかけて、確かなものを。",
    description: "緻密で丁寧。細部に魂を込める「職人肌」タイプ。派手さよりも、確実さと信頼感を重視する実務派。",
    keywords: ["誠実", "慎重", "継続", "完成度", "信頼"],
    quote: "急がば回れ。丁寧さが、結果を変える。",
    bestMatch: 2,
    goodMatch: [5],
    badMatch: [6],
    worstMatch: 8,
    color: "#2476E3",
    subColor: "#8EC9FF",
    textColor: "#FFFFFF",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kachikan_KV1027_1%E4%BA%BA_4.png-FFLXylz9iOksj6SEx0V6s9wAbxzFTE.jpeg",
    detailUrl:
      "https://liff.line.me/2008019957-rqqVkko1/landing?follow=%40224iqaue&lp=rY8r1U&liff_id=2008019957-rqqVkko1",
  },
  5: {
    name: "バランサー",
    catchphrase: "調和は、最強の武器だ。",
    description:
      "バランス感覚抜群の安定型。チームの空気を読み、全体を整える。誰かが暴走しても、冷静に舵を取る平和の設計者。",
    keywords: ["調和", "秩序", "安定", "冷静", "支援"],
    quote: "みんなが違うから、世界はまわる。",
    bestMatch: 2,
    goodMatch: [1],
    badMatch: [6],
    worstMatch: 3,
    color: "#4B45C7",
    subColor: "#C1A9FF",
    textColor: "#FFFFFF",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kachikan_KV1027_1%E4%BA%BA_5.png-azOVpSQcafkCqcFVpMhaoN2YoPd6BU.jpeg",
    detailUrl:
      "https://liff.line.me/2008019957-rqqVkko1/landing?follow=%40224iqaue&lp=XpQXLi&liff_id=2008019957-rqqVkko1",
  },
  6: {
    name: "フリースピリット",
    catchphrase: "枠を越えて、つながりを描く。",
    description:
      "自由と発想を大切にしながらも、仲間との化学反応を楽しむ共創的クリエイター。自分の感性を信じ、周囲に新しい風を吹き込む存在。",
    keywords: ["自由", "創造", "柔軟", "共創", "革新"],
    quote: "自由な発想で、まだない景色を描こう。",
    bestMatch: 4,
    goodMatch: [3],
    badMatch: [5],
    worstMatch: 1,
    color: "#FF8A3D",
    subColor: "#FFD58C",
    textColor: "#FFFFFF",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kachikan_KV1027_1%E4%BA%BA_6.png-XEhWGBNdbvXAO3Cb18RwZiHtzi3Jxq.jpeg",
    detailUrl:
      "https://liff.line.me/2008019957-rqqVkko1/landing?follow=%40224iqaue&lp=LZX8ql&liff_id=2008019957-rqqVkko1",
  },
  7: {
    name: "ロジカルプランナー",
    catchphrase: "感情ではなく、構造で動かす。",
    description: "冷静で合理的な戦略家。物事を分析し、全体最適を導くリーダー的参謀。",
    keywords: ["分析", "戦略", "合理", "計画", "整合性"],
    quote: "感情を抑えることが、時に最強の判断になる。",
    bestMatch: 4,
    goodMatch: [2], // Added good compatibility with TYPE 2
    badMatch: [8], // Added bad compatibility with TYPE 8
    worstMatch: 5, // Changed from 8 to 5
    color: "#F9B733",
    subColor: "#FFF8A0",
    textColor: "#FFFFFF",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kachikan_KV1027_1%E4%BA%BA_7.png-93qjSDHugNF1pcR86DBfcbGnwXBg4D.jpeg",
    detailUrl:
      "https://liff.line.me/2008019957-rqqVkko1/landing?follow=%40224iqaue&lp=0SoAHg&liff_id=2008019957-rqqVkko1",
  },
  8: {
    name: "ショーマン",
    catchphrase: "想いを形に、場を輝かせる。",
    description:
      "人の心を動かす表現力と、伝える技を併せ持つムードメーカー。自分らしさを発信しながら、チームの雰囲気をポジティブに変える存在。",
    keywords: ["表現", "発信", "影響力", "共感", "創意"],
    quote: "伝わる瞬間が、世界を変える。",
    bestMatch: 5,
    goodMatch: [3],
    badMatch: [2],
    worstMatch: 7,
    color: "#F47BA0",
    subColor: "#FFD6E5",
    textColor: "#FFFFFF",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kachikan_KV1027_1%E4%BA%BA_8.png-gi0lsdgP3Aq1X0HWeuwOA6mQHtj9zd.jpeg",
    detailUrl:
      "https://liff.line.me/2008019957-rqqVkko1/landing?follow=%40224iqaue&lp=IiNJUE&liff_id=2008019957-rqqVkko1",
  },
  9: {
    name: "ピュアリーダー",
    catchphrase: "信頼は、積み重ねるもの。壊さないもの。",
    description: "誠実で人を裏切らないリーダータイプ。清らかな心と責任感で、仲間を導く信頼の象徴。",
    keywords: ["誠実", "信頼", "責任", "調和", "安定"],
    quote: "まっすぐに向き合う。それが一番、難しくて一番大事。",
    bestMatch: 1, // Changed from 3 to 1
    goodMatch: [5], // Added good compatibility with TYPE 5
    badMatch: [6], // Added bad compatibility with TYPE 6
    worstMatch: 3, // Changed from 1 to 3
    color: "#3C3C3C",
    subColor: "#CFCFCF",
    textColor: "#FFFFFF",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kachikan_KV1027_1%E4%BA%BA_9.png-lmib7eBF0cUkHY2QqNO3kmWxVLhwMK.jpeg",
    detailUrl:
      "https://liff.line.me/2008019957-rqqVkko1/landing?follow=%40224iqaue&lp=apQfw2&liff_id=2008019957-rqqVkko1",
  },
}
