"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface ShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shareText: string
  characterImage: string
  typeName: string
}

export function ShareModal({ open, onOpenChange, shareText, characterImage, typeName }: ShareModalProps) {
  const [liffAvailable, setLiffAvailable] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).liff) {
      setLiffAvailable(true)
    }
  }, [])

  const shareUrl = "https://miniapp.line.me/2008251472-xW29mrlJ"

  const handleLineShare = async () => {
    if (liffAvailable && (window as any).liff) {
      try {
        const liff = (window as any).liff

        // Initialize LIFF if not already initialized
        if (!liff.isLoggedIn()) {
          await liff.init({ liffId: "2008251472-xW29mrlJ" })
        }

        // Try to share with image using shareTargetPicker
        await liff.shareTargetPicker([
          {
            type: "text",
            text: `${shareText}\n${shareUrl}`,
          },
          {
            type: "image",
            originalContentUrl: characterImage,
            previewImageUrl: characterImage,
          },
        ])

        onOpenChange(false)
        return
      } catch (error) {
        console.log("[v0] LIFF share failed, falling back to URL scheme:", error)
      }
    }

    const text = `${shareText}\n${shareUrl}`
    const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(text)}`
    window.open(lineUrl, "_blank")
    onOpenChange(false)
  }

  const handleXShare = () => {
    const tweetText = `${shareText}\n\n診断結果: ${typeName}`
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}&hashtags=REGIONLINKEXPO,KACHIKAN診断`
    window.open(xUrl, "_blank")
    onOpenChange(false)
  }

  const handleInstagramShare = async () => {
    setIsSharing(true)
    try {
      // Fetch the image and convert to blob
      const response = await fetch(characterImage)
      const blob = await response.blob()

      // Create a file from the blob
      const file = new File([blob], `${typeName}.png`, { type: "image/png" })

      // Check if Web Share API is available
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: typeName,
          text: shareText,
        })
        onOpenChange(false)
      } else {
        // Fallback: Download the image
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${typeName}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        // Show instruction message
        alert("画像をダウンロードしました。Instagramアプリを開いてストーリーズに投稿してください。")
        onOpenChange(false)
      }
    } catch (error) {
      console.error("[v0] Instagram share failed:", error)
      alert("シェアに失敗しました。もう一度お試しください。")
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">シェアする</DialogTitle>
          <DialogDescription className="text-center pt-2 text-base">
            あなたの周りはどんなKACHIKANか診断を送ってみよう
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleLineShare}
            className="w-full h-12 text-base font-bold"
            style={{
              backgroundColor: "#06C755",
              color: "white",
            }}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .628.285.628.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINEで友だちにシェア
          </Button>
          <Button
            onClick={handleXShare}
            className="w-full h-12 text-base font-bold"
            style={{
              backgroundColor: "#000000",
              color: "white",
            }}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Xでシェア
          </Button>
          <div className="space-y-1.5">
            <Button
              onClick={handleInstagramShare}
              disabled={isSharing}
              className="w-full h-12 text-base font-bold"
              style={{
                background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                color: "white",
              }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.948.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              {isSharing ? "処理中..." : "Instagramでシェア"}
            </Button>
            <p className="text-xs text-gray-500 text-center px-2">
              ※インスタグラムシェアはシェアするアプリの中からinstagramのアイコンを選択して投稿形式を選んでください。
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
