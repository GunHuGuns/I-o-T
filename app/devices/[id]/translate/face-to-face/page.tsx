"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Mic,
  MicOff,
  ArrowRightLeft,
  Volume2,
  Settings,
  ChevronDown,
  Copy,
  Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const languages = [
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
]

export default function FaceToFaceTranslatePage() {
  const router = useRouter()
  
  const [sourceLang, setSourceLang] = useState(languages[0])
  const [targetLang, setTargetLang] = useState(languages[1])
  const [isRecording, setIsRecording] = useState(false)
  const [activeSide, setActiveSide] = useState<"source" | "target" | null>(null)
  const [showLangDialog, setShowLangDialog] = useState(false)
  const [selectingFor, setSelectingFor] = useState<"source" | "target">("source")

  // 模拟对话记录
  const [conversations, setConversations] = useState([
    { id: 1, side: "source", original: "你好，请问这个多少钱？", translated: "Hello, how much is this?", lang: "zh" },
    { id: 2, side: "target", original: "This is 50 dollars.", translated: "这个50美元。", lang: "en" },
    { id: 3, side: "source", original: "可以便宜一点吗？", translated: "Can you give me a discount?", lang: "zh" },
  ])

  const swapLanguages = () => {
    const temp = sourceLang
    setSourceLang(targetLang)
    setTargetLang(temp)
  }

  const openLangSelector = (side: "source" | "target") => {
    setSelectingFor(side)
    setShowLangDialog(true)
  }

  const selectLanguage = (lang: typeof languages[0]) => {
    if (selectingFor === "source") {
      setSourceLang(lang)
    } else {
      setTargetLang(lang)
    }
    setShowLangDialog(false)
  }

  const startRecording = (side: "source" | "target") => {
    setActiveSide(side)
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setActiveSide(null)
    // 模拟添加新对话
    if (activeSide === "source") {
      setConversations([...conversations, {
        id: conversations.length + 1,
        side: "source",
        original: "谢谢，我买了",
        translated: "Thank you, I will buy it",
        lang: "zh"
      }])
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">面对面翻译</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-3 px-4 pb-4">
          <button
            onClick={() => openLangSelector("source")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <span className="text-lg">{sourceLang.flag}</span>
            <span className="font-medium text-foreground">{sourceLang.name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            onClick={swapLanguages}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <ArrowRightLeft className="h-5 w-5 text-primary" />
          </button>
          <button
            onClick={() => openLangSelector("target")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <span className="text-lg">{targetLang.flag}</span>
            <span className="font-medium text-foreground">{targetLang.name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`flex ${conv.side === "source" ? "justify-start" : "justify-end"}`}
          >
            <Card className={`max-w-[85%] border-0 shadow-sm ${
              conv.side === "source" ? "bg-blue-500/10" : "bg-green-500/10"
            }`}>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  {conv.side === "source" ? sourceLang.flag : targetLang.flag} 原文
                </p>
                <p className="text-foreground font-medium mb-3">{conv.original}</p>
                <p className="text-sm text-muted-foreground mb-1">
                  {conv.side === "source" ? targetLang.flag : sourceLang.flag} 翻译
                </p>
                <p className="text-foreground">{conv.translated}</p>
                <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Volume2 className="h-3.5 w-3.5" />
                    播放
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Copy className="h-3.5 w-3.5" />
                    复制
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {isRecording && (
          <div className={`flex ${activeSide === "source" ? "justify-start" : "justify-end"}`}>
            <Card className={`max-w-[85%] border-0 shadow-sm ${
              activeSide === "source" ? "bg-blue-500/10" : "bg-green-500/10"
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                  <span className="text-foreground">正在聆听...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Recording Controls */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <div className="flex items-center justify-center gap-6">
          {/* Source Language Button */}
          <div className="flex flex-col items-center gap-2">
            <button
              onTouchStart={() => startRecording("source")}
              onTouchEnd={stopRecording}
              onMouseDown={() => startRecording("source")}
              onMouseUp={stopRecording}
              onMouseLeave={() => isRecording && activeSide === "source" && stopRecording()}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isRecording && activeSide === "source"
                  ? "bg-blue-500 scale-110"
                  : "bg-blue-500/20 hover:bg-blue-500/30"
              }`}
            >
              {isRecording && activeSide === "source" ? (
                <MicOff className="h-8 w-8 text-white" />
              ) : (
                <Mic className="h-8 w-8 text-blue-600" />
              )}
            </button>
            <span className="text-sm font-medium text-foreground">{sourceLang.name}</span>
          </div>

          {/* Target Language Button */}
          <div className="flex flex-col items-center gap-2">
            <button
              onTouchStart={() => startRecording("target")}
              onTouchEnd={stopRecording}
              onMouseDown={() => startRecording("target")}
              onMouseUp={stopRecording}
              onMouseLeave={() => isRecording && activeSide === "target" && stopRecording()}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isRecording && activeSide === "target"
                  ? "bg-green-500 scale-110"
                  : "bg-green-500/20 hover:bg-green-500/30"
              }`}
            >
              {isRecording && activeSide === "target" ? (
                <MicOff className="h-8 w-8 text-white" />
              ) : (
                <Mic className="h-8 w-8 text-green-600" />
              )}
            </button>
            <span className="text-sm font-medium text-foreground">{targetLang.name}</span>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3">
          按住按钮开始说话，松开结束
        </p>
      </div>

      {/* Language Selection Dialog */}
      <Dialog open={showLangDialog} onOpenChange={setShowLangDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>选择语言</DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-1 max-h-80 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors ${
                  (selectingFor === "source" ? sourceLang : targetLang).code === lang.code
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-secondary"
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
