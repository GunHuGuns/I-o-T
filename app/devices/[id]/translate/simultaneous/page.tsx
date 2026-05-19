"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Mic,
  MicOff,
  Play,
  Pause,
  ChevronDown,
  ArrowRightLeft,
  Settings,
  Volume2,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const languages = [
  { code: "zh", name: "中文", flag: "CN" },
  { code: "en", name: "英语", flag: "US" },
  { code: "ja", name: "日语", flag: "JP" },
  { code: "ko", name: "韩语", flag: "KR" },
  { code: "fr", name: "法语", flag: "FR" },
  { code: "de", name: "德语", flag: "DE" },
  { code: "es", name: "西班牙语", flag: "ES" },
]

export default function SimultaneousTranslatePage() {
  const router = useRouter()
  
  const [sourceLang, setSourceLang] = useState(languages[1]) // 英语
  const [targetLang, setTargetLang] = useState(languages[0]) // 中文
  const [isListening, setIsListening] = useState(false)
  const [showLangDialog, setShowLangDialog] = useState<"source" | "target" | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  
  // 设置
  const [autoScroll, setAutoScroll] = useState(true)
  const [showOriginal, setShowOriginal] = useState(true)
  const [playAudio, setPlayAudio] = useState(true)
  
  const [transcripts, setTranscripts] = useState<{
    id: number
    original: string
    translated: string
    timestamp: Date
    isFinal: boolean
  }[]>([])

  const [currentTranscript, setCurrentTranscript] = useState<{
    original: string
    translated: string
  } | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)

  // 自动滚动
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [transcripts, currentTranscript, autoScroll])

  // 模拟同传
  useEffect(() => {
    if (!isListening) return

    const sentences = [
      { original: "Good morning everyone. Today we will discuss the quarterly results.", translated: "大家早上好。今天我们将讨论季度业绩。" },
      { original: "Our revenue has grown by 15% compared to last quarter.", translated: "与上季度相比，我们的收入增长了15%。" },
      { original: "This is mainly due to the success of our new product line.", translated: "这主要归功于我们新产品线的成功。" },
      { original: "We expect this trend to continue in the next quarter.", translated: "我们预计这一趋势将在下一季度继续。" },
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < sentences.length) {
        // 显示正在翻译的内容
        setCurrentTranscript(sentences[index])
        
        // 1.5秒后添加到历史记录
        setTimeout(() => {
          setTranscripts(prev => [...prev, {
            id: Date.now(),
            original: sentences[index].original,
            translated: sentences[index].translated,
            timestamp: new Date(),
            isFinal: true
          }])
          setCurrentTranscript(null)
          index++
        }, 1500)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isListening])

  const swapLanguages = () => {
    const temp = sourceLang
    setSourceLang(targetLang)
    setTargetLang(temp)
  }

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false)
      setCurrentTranscript(null)
    } else {
      setIsListening(true)
      setTranscripts([])
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
            <h1 className="text-xl font-bold text-foreground">同声传译</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowSettings(true)}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Language Selector */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between bg-card rounded-xl p-2">
            <button 
              onClick={() => setShowLangDialog("source")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <span className="font-medium text-sm">{sourceLang.name}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <button 
              onClick={swapLanguages}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <button 
              onClick={() => setShowLangDialog("target")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <span className="font-medium text-sm">{targetLang.name}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Transcript Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
      >
        {!isListening && transcripts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="p-6 rounded-full bg-purple-500/10 mb-6">
              <Mic className="h-16 w-16 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">同声传译</h2>
            <p className="text-muted-foreground mb-4 max-w-xs">
              实时翻译会议、演讲或任何音频内容
            </p>
            <Card className="border-0 shadow-sm bg-muted/50 max-w-sm">
              <CardContent className="p-4">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    实时语音识别与翻译
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    支持多种语言互译
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    可选原文/译文显示
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {transcripts.map((t) => (
              <Card key={t.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  {showOriginal && (
                    <p className="text-muted-foreground text-sm mb-2">{t.original}</p>
                  )}
                  <p className="text-foreground font-medium">{t.translated}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {t.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </p>
                </CardContent>
              </Card>
            ))}
            
            {/* Current transcribing */}
            {currentTranscript && (
              <Card className="border-0 shadow-sm border-l-4 border-l-primary animate-pulse">
                <CardContent className="p-4">
                  {showOriginal && (
                    <p className="text-muted-foreground text-sm mb-2">{currentTranscript.original}</p>
                  )}
                  <p className="text-foreground font-medium">{currentTranscript.translated}</p>
                  <p className="text-xs text-primary mt-2">正在翻译...</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Control Bar */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <div className="flex items-center justify-center">
          <button
            onClick={toggleListening}
            className={`p-6 rounded-full transition-all ${
              isListening 
                ? "bg-destructive text-destructive-foreground animate-pulse scale-110" 
                : "bg-purple-600 text-white hover:scale-105"
            }`}
          >
            {isListening ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </button>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-3">
          {isListening ? "点击停止传译" : "点击开始同声传译"}
        </p>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>传译设置</DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">自动滚动</p>
                <p className="text-sm text-muted-foreground">新内容出现时自动滚动到底部</p>
              </div>
              <Switch checked={autoScroll} onCheckedChange={setAutoScroll} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">显示原文</p>
                <p className="text-sm text-muted-foreground">同时显示原文和译文</p>
              </div>
              <Switch checked={showOriginal} onCheckedChange={setShowOriginal} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">语音播报</p>
                <p className="text-sm text-muted-foreground">自动播报翻译结果</p>
              </div>
              <Switch checked={playAudio} onCheckedChange={setPlayAudio} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Language Selection Dialog */}
      <Dialog open={!!showLangDialog} onOpenChange={() => setShowLangDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              选择{showLangDialog === "source" ? "源" : "目标"}语言
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 max-h-[60vh] overflow-y-auto">
            <div className="space-y-1">
              {languages.map((lang) => {
                const isSelected = showLangDialog === "source" 
                  ? sourceLang.code === lang.code 
                  : targetLang.code === lang.code
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      if (showLangDialog === "source") {
                        setSourceLang(lang)
                      } else {
                        setTargetLang(lang)
                      }
                      setShowLangDialog(null)
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      isSelected ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                    }`}
                  >
                    <span className="font-medium">{lang.name}</span>
                    {isSelected && <Check className="h-5 w-5" />}
                  </button>
                )
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
