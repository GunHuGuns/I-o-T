"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Phone,
  PhoneOff,
  Settings,
  ChevronDown,
  Volume2,
  VolumeX,
  Mic,
  MicOff
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

export default function CallTranslatePage() {
  const router = useRouter()
  
  const [myLang, setMyLang] = useState(languages[0])
  const [otherLang, setOtherLang] = useState(languages[1])
  const [isInCall, setIsInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [showLangDialog, setShowLangDialog] = useState(false)
  const [selectingFor, setSelectingFor] = useState<"my" | "other">("my")

  // 模拟通话记录
  const [transcripts, setTranscripts] = useState<{id: number, speaker: string, original: string, translated: string}[]>([])

  const startCall = () => {
    setIsInCall(true)
    setCallDuration(0)
    // 模拟通话计时
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
    
    // 模拟接收翻译
    setTimeout(() => {
      setTranscripts([
        { id: 1, speaker: "对方", original: "Hello, can you hear me?", translated: "你好，能听到我吗？" },
      ])
    }, 2000)
    
    setTimeout(() => {
      setTranscripts(prev => [...prev,
        { id: 2, speaker: "我", original: "你好，我能听到。", translated: "Hello, I can hear you." },
      ])
    }, 4000)

    return () => clearInterval(interval)
  }

  const endCall = () => {
    setIsInCall(false)
    setCallDuration(0)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const openLangSelector = (side: "my" | "other") => {
    setSelectingFor(side)
    setShowLangDialog(true)
  }

  const selectLanguage = (lang: typeof languages[0]) => {
    if (selectingFor === "my") {
      setMyLang(lang)
    } else {
      setOtherLang(lang)
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
            <h1 className="text-xl font-bold text-foreground">通话翻译</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 flex flex-col">
        {!isInCall ? (
          /* Pre-call Setup */
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">通话翻译</h2>
              <p className="text-muted-foreground">拨打或接听电话时实时翻译</p>
            </div>

            {/* Language Settings */}
            <Card className="w-full max-w-sm border-0 shadow-sm">
              <CardContent className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">我说</p>
                  <button
                    onClick={() => openLangSelector("my")}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{myLang.flag}</span>
                      <span className="font-medium text-foreground">{myLang.name}</span>
                    </div>
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">对方说</p>
                  <button
                    onClick={() => openLangSelector("other")}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{otherLang.flag}</span>
                      <span className="font-medium text-foreground">{otherLang.name}</span>
                    </div>
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" className="w-48 h-14 rounded-full gap-2" onClick={startCall}>
              <Phone className="h-5 w-5" />
              开始通话
            </Button>

            <p className="text-sm text-muted-foreground text-center max-w-xs">
              开始通话后，您和对方的语音将被实时翻译并通过耳机播放
            </p>
          </div>
        ) : (
          /* In-call View */
          <>
            {/* Call Status */}
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Phone className="h-10 w-10 text-white" />
              </div>
              <p className="text-lg font-medium text-foreground">通话中</p>
              <p className="text-2xl font-bold text-green-600">{formatDuration(callDuration)}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">{myLang.flag} {myLang.name}</span>
                <span className="text-muted-foreground">⇄</span>
                <span className="text-sm text-muted-foreground">{otherLang.flag} {otherLang.name}</span>
              </div>
            </div>

            {/* Transcripts */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {transcripts.map((item) => (
                <Card key={item.id} className={`border-0 shadow-sm ${
                  item.speaker === "我" ? "bg-blue-500/10" : "bg-green-500/10"
                }`}>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground mb-1">{item.speaker}</p>
                    <p className="text-sm text-foreground mb-2">{item.original}</p>
                    <p className="text-xs text-muted-foreground mb-1">翻译</p>
                    <p className="text-sm text-foreground">{item.translated}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call Controls */}
            <div className="py-6">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                    isMuted ? "bg-destructive/20" : "bg-secondary"
                  }`}
                >
                  {isMuted ? (
                    <MicOff className="h-6 w-6 text-destructive" />
                  ) : (
                    <Mic className="h-6 w-6 text-foreground" />
                  )}
                </button>
                <button
                  onClick={endCall}
                  className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center"
                >
                  <PhoneOff className="h-7 w-7 text-white" />
                </button>
                <button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                    isSpeakerOn ? "bg-primary/20" : "bg-secondary"
                  }`}
                >
                  {isSpeakerOn ? (
                    <Volume2 className="h-6 w-6 text-primary" />
                  ) : (
                    <VolumeX className="h-6 w-6 text-foreground" />
                  )}
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
                  (selectingFor === "my" ? myLang : otherLang).code === lang.code
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
