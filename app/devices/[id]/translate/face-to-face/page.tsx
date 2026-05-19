"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Languages,
  Mic,
  MicOff,
  ArrowRightLeft,
  ChevronDown,
  Volume2,
  Copy,
  Check,
  RotateCcw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
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
  { code: "ru", name: "俄语", flag: "RU" },
]

export default function FaceToFaceTranslatePage() {
  const router = useRouter()
  
  const [sourceLang, setSourceLang] = useState(languages[0])
  const [targetLang, setTargetLang] = useState(languages[1])
  const [isRecording, setIsRecording] = useState(false)
  const [activeRole, setActiveRole] = useState<"me" | "them">("me")
  const [showLangDialog, setShowLangDialog] = useState<"source" | "target" | null>(null)
  const [copied, setCopied] = useState(false)
  
  const [conversations, setConversations] = useState<{
    id: number
    role: "me" | "them"
    original: string
    translated: string
    timestamp: Date
  }[]>([
    {
      id: 1,
      role: "me",
      original: "你好，请问这个多少钱？",
      translated: "Hello, how much is this?",
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: 2,
      role: "them",
      original: "This is 50 dollars.",
      translated: "这个50美元。",
      timestamp: new Date(Date.now() - 30000)
    }
  ])

  const swapLanguages = () => {
    const temp = sourceLang
    setSourceLang(targetLang)
    setTargetLang(temp)
  }

  const handleRecord = () => {
    if (isRecording) {
      // 停止录音，模拟添加新对话
      setIsRecording(false)
      const newConversation = {
        id: Date.now(),
        role: activeRole,
        original: activeRole === "me" ? "这是模拟的语音输入" : "This is simulated voice input",
        translated: activeRole === "me" ? "This is simulated voice input" : "这是模拟的语音输入",
        timestamp: new Date()
      }
      setConversations([...conversations, newConversation])
    } else {
      setIsRecording(true)
    }
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearHistory = () => {
    setConversations([])
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
          <Button variant="ghost" size="icon" className="rounded-full" onClick={clearHistory}>
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Language Selector */}
      <div className="px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setShowLangDialog("source")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <span className="font-medium">{sourceLang.name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <button 
            onClick={swapLanguages}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <ArrowRightLeft className="h-5 w-5 text-primary" />
          </button>
          
          <button 
            onClick={() => setShowLangDialog("target")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <span className="font-medium">{targetLang.name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <Languages className="h-12 w-12 text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground">开始对话</p>
            <p className="text-sm text-muted-foreground mt-2">
              点击下方麦克风按钮开始录音翻译
            </p>
          </div>
        ) : (
          conversations.map((conv) => (
            <div 
              key={conv.id} 
              className={`flex ${conv.role === "me" ? "justify-end" : "justify-start"}`}
            >
              <Card className={`max-w-[85%] border-0 shadow-sm ${
                conv.role === "me" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card"
              }`}>
                <CardContent className="p-3">
                  <p className={`text-sm font-medium mb-2 ${
                    conv.role === "me" ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    {conv.role === "me" ? sourceLang.name : targetLang.name}
                  </p>
                  <p className={conv.role === "me" ? "text-primary-foreground" : "text-foreground"}>
                    {conv.original}
                  </p>
                  <div className={`mt-3 pt-3 border-t ${
                    conv.role === "me" ? "border-primary-foreground/20" : "border-border"
                  }`}>
                    <p className={`text-sm ${
                      conv.role === "me" ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>
                      {conv.role === "me" ? targetLang.name : sourceLang.name}
                    </p>
                    <p className={`mt-1 ${conv.role === "me" ? "text-primary-foreground" : "text-foreground"}`}>
                      {conv.translated}
                    </p>
                  </div>
                  <div className={`flex items-center justify-between mt-2 pt-2 border-t ${
                    conv.role === "me" ? "border-primary-foreground/20" : "border-border"
                  }`}>
                    <span className={`text-xs ${
                      conv.role === "me" ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}>
                      {conv.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-7 w-7 ${conv.role === "me" ? "hover:bg-primary-foreground/10" : ""}`}
                        onClick={() => copyText(conv.translated)}
                      >
                        {copied ? (
                          <Check className={`h-4 w-4 ${conv.role === "me" ? "text-primary-foreground" : ""}`} />
                        ) : (
                          <Copy className={`h-4 w-4 ${conv.role === "me" ? "text-primary-foreground" : ""}`} />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-7 w-7 ${conv.role === "me" ? "hover:bg-primary-foreground/10" : ""}`}
                      >
                        <Volume2 className={`h-4 w-4 ${conv.role === "me" ? "text-primary-foreground" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Recording Controls */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4 pb-24">
        <div className="flex items-center justify-center gap-6">
          {/* Role Selector - Me */}
          <button
            onClick={() => setActiveRole("me")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
              activeRole === "me" ? "bg-primary/10" : "hover:bg-secondary"
            }`}
          >
            <span className={`text-sm font-medium ${activeRole === "me" ? "text-primary" : "text-muted-foreground"}`}>
              我说
            </span>
            <span className={`text-xs ${activeRole === "me" ? "text-primary" : "text-muted-foreground"}`}>
              {sourceLang.name}
            </span>
          </button>

          {/* Record Button */}
          <button
            onClick={handleRecord}
            className={`p-6 rounded-full transition-all ${
              isRecording 
                ? "bg-destructive text-destructive-foreground animate-pulse scale-110" 
                : "bg-primary text-primary-foreground hover:scale-105"
            }`}
          >
            {isRecording ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </button>

          {/* Role Selector - Them */}
          <button
            onClick={() => setActiveRole("them")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
              activeRole === "them" ? "bg-primary/10" : "hover:bg-secondary"
            }`}
          >
            <span className={`text-sm font-medium ${activeRole === "them" ? "text-primary" : "text-muted-foreground"}`}>
              对方说
            </span>
            <span className={`text-xs ${activeRole === "them" ? "text-primary" : "text-muted-foreground"}`}>
              {targetLang.name}
            </span>
          </button>
        </div>
        
        {isRecording && (
          <p className="text-center text-sm text-muted-foreground mt-3">
            正在录音，请说话...
          </p>
        )}
      </div>

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
