"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Mic,
  MicOff,
  Settings,
  ChevronDown,
  Volume2,
  Pause,
  Play,
  Square
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
]

export default function SimultaneousTranslatePage() {
  const router = useRouter()
  
  const [sourceLang, setSourceLang] = useState(languages[1]) // 默认听英文
  const [targetLang, setTargetLang] = useState(languages[0]) // 翻译成中文
  const [isTranslating, setIsTranslating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [duration, setDuration] = useState(0)
  const [showLangDialog, setShowLangDialog] = useState(false)
  const [selectingFor, setSelectingFor] = useState<"source" | "target">("source")

  // 模拟实时翻译内容
  const [transcripts, setTranscripts] = useState<{id: number, original: string, translated: string, time: string}[]>([])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isTranslating && !isPaused) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTranslating, isPaused])

  const startTranslation = () => {
    setIsTranslating(true)
    setDuration(0)
    setTranscripts([])
    
    // 模拟实时翻译
    setTimeout(() => {
      setTranscripts([
        { id: 1, original: "Good morning everyone, let's start today's meeting.", translated: "大家早上好，让我们开始今天的会议。", time: "00:03" },
      ])
    }, 3000)
    
    setTimeout(() => {
      setTranscripts(prev => [...prev,
        { id: 2, original: "Today we will discuss the Q4 sales report.", translated: "今天我们将讨论第四季度销售报告。", time: "00:08" },
      ])
    }, 8000)

    setTimeout(() => {
      setTranscripts(prev => [...prev,
        { id: 3, original: "The overall revenue increased by 15% compared to last year.", translated: "与去年相比，整体收入增长了15%。", time: "00:15" },
      ])
    }, 15000)
  }

  const stopTranslation = () => {
    setIsTranslating(false)
    setIsPaused(false)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">同声传译</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Language Settings */}
        <div className="px-4 pb-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">听</p>
              <button
                onClick={() => openLangSelector("source")}
                disabled={isTranslating}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{sourceLang.flag}</span>
                  <span className="text-sm font-medium text-foreground">{sourceLang.name}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">译</p>
              <button
                onClick={() => openLangSelector("target")}
                disabled={isTranslating}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{targetLang.flag}</span>
                  <span className="text-sm font-medium text-foreground">{targetLang.name}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 flex flex-col">
        {!isTranslating ? (
          /* Pre-translation View */
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <div className="w-32 h-32 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Mic className="h-16 w-16 text-purple-600" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">同声传译</h2>
              <p className="text-muted-foreground max-w-xs">
                实时将演讲、会议内容翻译成您的语言，通过耳机收听
              </p>
            </div>
            <Button size="lg" className="w-48 h-14 rounded-full gap-2" onClick={startTranslation}>
              <Mic className="h-5 w-5" />
              开始翻译
            </Button>
            <Card className="w-full max-w-sm border-0 shadow-sm bg-muted/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  提示：请确保周围环境安静，将手机靠近发言者以获得最佳翻译效果。
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Translating View */
          <>
            {/* Status Bar */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-purple-500/10 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isPaused ? "bg-amber-500" : "bg-purple-500 animate-pulse"}`} />
                <span className="font-medium text-foreground">
                  {isPaused ? "已暂停" : "翻译中"}
                </span>
              </div>
              <span className="text-lg font-bold text-purple-600">{formatDuration(duration)}</span>
            </div>

            {/* Transcripts */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {transcripts.length === 0 ? (
                <div className="flex-1 flex items-center justify-center h-48">
                  <p className="text-muted-foreground">正在聆听...</p>
                </div>
              ) : (
                transcripts.map((item) => (
                  <Card key={item.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                        <button className="text-muted-foreground hover:text-foreground">
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{sourceLang.flag} {item.original}</p>
                      <p className="text-foreground font-medium">{targetLang.flag} {item.translated}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Controls */}
            <div className="py-6">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={togglePause}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                    isPaused ? "bg-purple-500/20" : "bg-secondary"
                  }`}
                >
                  {isPaused ? (
                    <Play className="h-6 w-6 text-purple-600" />
                  ) : (
                    <Pause className="h-6 w-6 text-foreground" />
                  )}
                </button>
                <button
                  onClick={stopTranslation}
                  className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center"
                >
                  <Square className="h-7 w-7 text-white" />
                </button>
              </div>
            </div>
          </>
        )}
      </main>

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
