"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  ChevronDown,
  ArrowRightLeft,
  Volume2,
  VolumeX,
  Check
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
  { code: "zh", name: "中文", flag: "CN" },
  { code: "en", name: "英语", flag: "US" },
  { code: "ja", name: "日语", flag: "JP" },
  { code: "ko", name: "韩语", flag: "KR" },
  { code: "fr", name: "法语", flag: "FR" },
  { code: "de", name: "德语", flag: "DE" },
]

export default function CallTranslatePage() {
  const router = useRouter()
  
  const [myLang, setMyLang] = useState(languages[0])
  const [otherLang, setOtherLang] = useState(languages[1])
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "active" | "ended">("idle")
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)
  const [showLangDialog, setShowLangDialog] = useState<"my" | "other" | null>(null)
  const [callDuration, setCallDuration] = useState(0)
  
  const [transcripts, setTranscripts] = useState<{
    id: number
    speaker: "me" | "other"
    original: string
    translated: string
    timestamp: number
  }[]>([])

  // 模拟通话
  const startCall = () => {
    setCallStatus("connecting")
    setTimeout(() => {
      setCallStatus("active")
      // 模拟对话
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
      
      // 模拟添加转写
      setTimeout(() => {
        setTranscripts(prev => [...prev, {
          id: Date.now(),
          speaker: "other",
          original: "Hello, can you hear me?",
          translated: "你好，你能听到我吗？",
          timestamp: 5
        }])
      }, 2000)
      
      setTimeout(() => {
        setTranscripts(prev => [...prev, {
          id: Date.now(),
          speaker: "me",
          original: "是的，我能听到你，通话翻译已开启。",
          translated: "Yes, I can hear you. Call translation is enabled.",
          timestamp: 8
        }])
      }, 4000)
      
      return () => clearInterval(interval)
    }, 2000)
  }

  const endCall = () => {
    setCallStatus("ended")
    setTimeout(() => {
      setCallStatus("idle")
      setCallDuration(0)
      setTranscripts([])
    }, 2000)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const swapLanguages = () => {
    const temp = myLang
    setMyLang(otherLang)
    setOtherLang(temp)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">通话翻译</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 flex flex-col">
        {callStatus === "idle" && (
          <>
            {/* Language Setup */}
            <section className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">语言设置</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setShowLangDialog("my")}
                      className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <span className="text-xs text-muted-foreground">我说</span>
                      <span className="font-medium">{myLang.name}</span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                    
                    <button 
                      onClick={swapLanguages}
                      className="mx-4 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <ArrowRightLeft className="h-5 w-5 text-primary" />
                    </button>
                    
                    <button 
                      onClick={() => setShowLangDialog("other")}
                      className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <span className="text-xs text-muted-foreground">对方说</span>
                      <span className="font-medium">{otherLang.name}</span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Instructions */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <div className="p-6 rounded-full bg-green-500/10 mb-6">
                <Phone className="h-16 w-16 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">准备开始通话翻译</h2>
              <p className="text-muted-foreground mb-6">
                开启后，您的通话将被实时翻译。
                对方听到的是翻译后的内容。
              </p>
              
              <Card className="border-0 shadow-sm bg-muted/50 w-full">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground mb-2">使用说明</p>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left">
                    <li>• 确保耳机已连接且佩戴正确</li>
                    <li>• 通话时请尽量保持语速平稳</li>
                    <li>• 翻译会有约1-2秒延迟</li>
                    <li>• 支持多种语言互译</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Start Call Button */}
            <div className="pt-4 pb-8">
              <Button 
                className="w-full h-14 text-lg gap-2" 
                onClick={startCall}
              >
                <PhoneCall className="h-6 w-6" />
                开始通话翻译
              </Button>
            </div>
          </>
        )}

        {callStatus === "connecting" && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="p-8 rounded-full bg-green-500/10 mb-6 animate-pulse">
              <Phone className="h-20 w-20 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">正在连接...</h2>
            <p className="text-muted-foreground">准备翻译服务</p>
          </div>
        )}

        {callStatus === "active" && (
          <>
            {/* Call Info */}
            <div className="text-center py-4 border-b border-border">
              <p className="text-sm text-muted-foreground">通话中</p>
              <p className="text-2xl font-bold text-foreground">{formatDuration(callDuration)}</p>
              <p className="text-sm text-accent mt-1">{myLang.name} ↔ {otherLang.name}</p>
            </div>

            {/* Live Transcripts */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {transcripts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">等待对话...</p>
                </div>
              ) : (
                transcripts.map((t) => (
                  <div 
                    key={t.id}
                    className={`flex ${t.speaker === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <Card className={`max-w-[85%] border-0 shadow-sm ${
                      t.speaker === "me" ? "bg-primary text-primary-foreground" : "bg-card"
                    }`}>
                      <CardContent className="p-3">
                        <p className={`text-xs mb-1 ${
                          t.speaker === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}>
                          {t.speaker === "me" ? "我" : "对方"}
                        </p>
                        <p className={t.speaker === "me" ? "text-primary-foreground" : "text-foreground"}>
                          {t.original}
                        </p>
                        <p className={`text-sm mt-2 pt-2 border-t ${
                          t.speaker === "me" 
                            ? "border-primary-foreground/20 text-primary-foreground/80" 
                            : "border-border text-muted-foreground"
                        }`}>
                          {t.translated}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))
              )}
            </div>

            {/* Call Controls */}
            <div className="py-6 border-t border-border">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-full transition-colors ${
                    isMuted ? "bg-destructive/10 text-destructive" : "bg-secondary text-foreground"
                  }`}
                >
                  {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>
                
                <button
                  onClick={endCall}
                  className="p-6 rounded-full bg-destructive text-destructive-foreground"
                >
                  <PhoneOff className="h-8 w-8" />
                </button>
                
                <button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`p-4 rounded-full transition-colors ${
                    isSpeakerOn ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"
                  }`}
                >
                  {isSpeakerOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </>
        )}

        {callStatus === "ended" && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="p-6 rounded-full bg-muted mb-6">
              <PhoneOff className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">通话已结束</h2>
            <p className="text-muted-foreground">通话时长 {formatDuration(callDuration)}</p>
          </div>
        )}
      </main>

      {/* Language Selection Dialog */}
      <Dialog open={!!showLangDialog} onOpenChange={() => setShowLangDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              选择{showLangDialog === "my" ? "我说的" : "对方说的"}语言
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 max-h-[60vh] overflow-y-auto">
            <div className="space-y-1">
              {languages.map((lang) => {
                const isSelected = showLangDialog === "my" 
                  ? myLang.code === lang.code 
                  : otherLang.code === lang.code
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      if (showLangDialog === "my") {
                        setMyLang(lang)
                      } else {
                        setOtherLang(lang)
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
