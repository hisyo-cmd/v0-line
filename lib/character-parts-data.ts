export interface CharacterPart {
  id: string
  dimension: string // マトリクス名
  type: string // タイプ
  feedback: string // フィードバック
  partName: string // パーツ名
  description: string // パーツ説明
  position: {
    // Hotspot position (percentage from top-left)
    top: string
    left: string
    width: string
    height: string
  }
}

export const characterPartsData: Record<number, CharacterPart[]> = {
  1: [
    // ブレイブルーザー
    {
      id: "head",
      dimension: "目的と見返りの価値観",
      type: "信念追求型クリエイター",
      feedback:
        "あなたは、自分の内なる価値観に従って行動し、意味のある仕事にこだわるタイプ。他者から軸に動くため、創造性や深い専門性を追求する分野で力を発揮します。",
      partName: "頭／表情",
      description: "孤高でも信念を守り抜く姿勢を燃え上がる炎とキッとした視線で表現",
      position: { top: "8%", left: "35%", width: "30%", height: "20%" },
    },
    {
      id: "torso",
      dimension: "向き合い方と関わり方の価値観",
      type: "先導型チャレンジャー",
      feedback:
        "変化や未知を前向きに受け止め、目標に向かって自ら旗を掲げて突き進むタイプ。リスクを恐れず行動に移す実行力があり、周囲を鼓舞する推進力にも優れています。革新や新規プロジェクトにおいて先陣を切る場面で力を発揮する存在です。",
      partName: "胴体",
      description: "スポーティなアウターで挑戦者感を出しつつ、皆を導く先導型な部分を矢印の柄であしらう",
      position: { top: "28%", left: "30%", width: "40%", height: "25%" },
    },
    {
      id: "right-hand",
      dimension: "発想と進め方の価値観",
      type: "自由奔放クリエイター",
      feedback:
        "あなたには、発想が豊かで、固定観念に縛られない柔軟な挑戦者。型にとらわれず自分の裁量で動き、創造性を最も大切にします。新しい切り口を生み出すことに強みを持ち、周囲に創意の刺激が生まれることも、自由と創造を武器に変革を促します。",
      partName: "右手アイテム",
      description: "創造＋自由なイメージをスプレー缶で表現",
      position: { top: "40%", left: "60%", width: "25%", height: "20%" },
    },
    {
      id: "head-accessory",
      dimension: "判断の軸と視点の価値観",
      type: "共感力ある柔軟派",
      feedback:
        "あなたは人の気持ちや空気感を感じ取りながら判断する力を持ちつつ、顧客視点か組織視点かには偏らず、場に応じて柔軟な対応ができるタイプです。周囲との信頼関係を築きながら、程やかに物事を進められる安心感があります。",
      partName: "頭アクセサリー",
      description: "人の話に傾聴・共感する＆柔軟に動ける部分をインカムで表現。",
      position: { top: "12%", left: "20%", width: "15%", height: "12%" },
    },
    {
      id: "left-hand",
      dimension: "見せ方と中身の価値観",
      type: "ストイックパフォーマー",
      feedback:
        "あなたは、結果を出すことに強いこだわりを持ちつつ、自らの信念や倫理に基づいて正攻法で攻める強みがあるタイプ。周囲に流されず地道に成果を積み上げる姿勢が信頼を生みます。数字だけでなく、その裏にある価値も働き方が評価される人物です。",
      partName: "左手アイテム",
      description: "ストイックさ、誠実さを愚直にトレーニングに取り組む格闘家の腕（包帯を巻いた手）で表現",
      position: { top: "40%", left: "15%", width: "20%", height: "20%" },
    },
    {
      id: "shoes",
      dimension: "スピードと裁量の価値観",
      type: "即断即決ファイター",
      feedback:
        "あなたは、スピード判断を武器に、素早く物事を進めるタイプ。状況を瞬時に捉え、細かい説明がなくても動けるため、変化の激しい現場や緊急対応で力を発揮します。指示待ちを好まず、自分の判断に責任をもつスタイルです。",
      partName: "靴",
      description: "スピード感をローラーブレードで表現",
      position: { top: "75%", left: "30%", width: "40%", height: "20%" },
    },
    {
      id: "effect",
      dimension: "組織との関わり方の価値観",
      type: "自律的ジャスティスプレイヤー",
      feedback:
        "あなたは自分の考えやスタイルを尊重しながらも、公正さを重視して行動するタイプです。組織や人間関係に過度に依存せず、自律的に物事を進めつつ、判断や評価は公平であることを大切にします。結果や役割分担において「平等さ」と「透明性」を守ろうとする姿勢が、周囲からの信頼と安心感をもたらします。",
      partName: "エフェクト",
      description: "自分の意思で歩むが、公正な判断を大事にするものを、光の羅針盤的エフェクトで表現",
      position: { top: "60%", left: "25%", width: "50%", height: "15%" },
    },
    {
      id: "back",
      dimension: "自立と協働の価値観",
      type: "頼れるチームリーダー",
      feedback:
        "あなたは、自分の意思で判断・行動し、自分の成果に対して強い責任感を持つ、自己課題を見出し、指示がなくても主体的に動ける独立性と成果志向のバランスが取れており、リーダー層や先導的なポジションで力を発揮します。",
      partName: "背中",
      description: "仲間と協力しながら、全体を導くところから妖精をイメージ",
      position: { top: "35%", left: "25%", width: "20%", height: "20%" },
    },
    {
      id: "badge",
      dimension: "表現と伝え方の価値観",
      type: "共感的コミュニケーター",
      feedback:
        "あなたは自分の考えや感情を率直に表現しながらも、相手の気持ちや状況にしっかりと配慮できるタイプです。発信力と気遣いの両立に優れ、対話を通じて信頼関係を築く力があります。自己主張を押しつけるのではなく、共感を伴った伝え方で周囲に安心感を与え、場の雰囲気を前向きにする存在です。",
      partName: "バッジ",
      description: "自己表現を音楽のビート、共鳴する心をハートで表現",
      position: { top: "32%", left: "42%", width: "16%", height: "12%" },
    },
  ],
}
