export interface QuizOption {
  text: string
  type: number
}

export interface Question {
  text: string
  options: QuizOption[]
}

export const questions: Question[] = [
  {
    text: "あなたが一番ワクワクする瞬間は？",
    options: [
      { text: "限界を超える挑戦をしているとき", type: 1 },
      { text: "静かにコツコツ積み重ねているとき", type: 2 },
      { text: "理想を語り、それが共感された瞬間", type: 3 },
      { text: "細部まで完璧に仕上げたとき", type: 4 },
      { text: "チーム全体がひとつになった瞬間", type: 5 },
      { text: "ルールを超えて新しい発想が浮かんだとき", type: 6 },
      { text: "複雑な問題をロジカルに整理できたとき", type: 7 },
      { text: "周りが笑顔になってくれた瞬間", type: 8 },
      { text: "誰かから「あなたを信頼してる」と言われたとき", type: 9 },
    ],
  },
  {
    text: 'あなたが大事にしている"行動スタイル"に一番近いのは？',
    options: [
      { text: "とにかく動く！考える前に手を出す", type: 1 },
      { text: "無駄を省いて、静かに結果を出す", type: 2 },
      { text: "理想を描き、そこに人を巻き込む", type: 3 },
      { text: "丁寧に、確実に積み上げる", type: 4 },
      { text: "周りを見て、空気を整える", type: 5 },
      { text: "思いついたら、すぐ試す自由人", type: 6 },
      { text: "まずはデータとロジックから考える", type: 7 },
      { text: "感情で場を動かすタイプ", type: 8 },
      { text: "誠実に、人としての筋を通す", type: 9 },
    ],
  },
  {
    text: "仲間との関わり方で一番しっくりくるのは？",
    options: [
      { text: "背中で引っ張る", type: 1 },
      { text: "黙って支える", type: 2 },
      { text: "想いで引き寄せる", type: 3 },
      { text: "丁寧に信頼を積む", type: 4 },
      { text: "バランスを取りながら全体を整える", type: 5 },
      { text: "自分のリズムで貢献する", type: 6 },
      { text: "戦略的に方向を示す", type: 7 },
      { text: "雰囲気を明るくする", type: 8 },
      { text: "困っている人を放っておけない", type: 9 },
    ],
  },
  {
    text: 'あなたの"決断の基準"に一番近いのは？',
    options: [
      { text: "熱意と根性", type: 1 },
      { text: "冷静な判断", type: 2 },
      { text: "理念とビジョン", type: 3 },
      { text: "経験と積み重ね", type: 4 },
      { text: "公平さと調和", type: 5 },
      { text: "自由な発想", type: 6 },
      { text: "論理と構造", type: 7 },
      { text: "感情とフィーリング", type: 8 },
      { text: "信頼と誠実さ", type: 9 },
    ],
  },
  {
    text: "褒められて一番嬉しい言葉は？",
    options: [
      { text: "「よく頑張ったな！」", type: 1 },
      { text: "「君は安定してるね」", type: 2 },
      { text: "「その考え方、熱いね！」", type: 3 },
      { text: "「丁寧でミスがないね」", type: 4 },
      { text: "「雰囲気がいいチームだね」", type: 5 },
      { text: "「その発想、面白いね！」", type: 6 },
      { text: "「よく考えられてるね」", type: 7 },
      { text: "「みんなを明るくしてくれるね」", type: 8 },
      { text: "「あなたは信頼できるね」", type: 9 },
    ],
  },
  {
    text: "ストレスを感じる瞬間は？",
    options: [
      { text: "結果が出ないとき", type: 1 },
      { text: "ペースを乱されるとき", type: 2 },
      { text: "理想が理解されないとき", type: 3 },
      { text: "雑な仕事を見たとき", type: 4 },
      { text: "雰囲気がギスギスしてるとき", type: 5 },
      { text: "縛られる・制限されるとき", type: 6 },
      { text: "理屈が通らないとき", type: 7 },
      { text: "空気が重い・盛り上がらないとき", type: 8 },
      { text: "嘘や裏切りを感じたとき", type: 9 },
    ],
  },
  {
    text: 'あなたが未来に"残したいもの"は？',
    options: [
      { text: "努力と挑戦の証", type: 1 },
      { text: "積み上げた成果と信頼", type: 2 },
      { text: "想いを繋ぐ理想", type: 3 },
      { text: "形として残る完成品", type: 4 },
      { text: "調和と安定したチーム", type: 5 },
      { text: "新しい価値観と自由な文化", type: 6 },
      { text: "ロジックと仕組み", type: 7 },
      { text: "感動と笑顔", type: 8 },
      { text: "信頼と人の絆", type: 9 },
    ],
  },
]
