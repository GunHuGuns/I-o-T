"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Mic,
  MicOff,
  Settings,
  FileText,
  Copy,
  Share2,
  Download,
  Trash2,
  Play,
  Pause,
  Square,
  ChevronRight,
  Clock,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// 模拟已保存的会议记录
const savedMeetings = [
  {
    id: "1",
    title: "产品需求评审会",
    date: "2024-01-15 14:30",
    duration: "45分钟",
    summary: "讨论了新功能的优先级排序，确定Q1发布计划包含3个核心功能...",
    keyPoints: ["确定Q1发布3个核心功能", "UI设计下周完成", "后端接口本周交付"],
    actionItems: ["张三负责UI设计", "李四负责后端开发", "王五负责测试用例"],
  },
  {
    id: "2", 
    title: "周报同步会议",
    date: "2024-01-12 10:00",
    duration: "30分钟",
    summary: "各部门汇报本周进展，整体项目进度符合预期...",
    keyPoints: ["开发进度95%", "测试覆盖率达到80%", "下周准备上线"],
    actionItems: ["准备上线文档", "安排值班人员"],
  },
]

export default function AISummaryPage() {
  const router = useRouter()
  
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [duration, setDuration] = useState(0)
  const [showSummaryDialog, setShowSummaryDialog] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<typeof savedMeetings[0] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSummary, setGeneratedSummary] = useState<typeof savedMeetings[0] | null>(null)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, isPaused])

  const startRecording = () => {
    setIsRecording(true)
    setDuration(0)
    setGeneratedSummary(null)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    // 模拟生成摘要
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedSummary({
        id: "new",
        title: "新会议记录",
        date: new Date().toLocaleString("zh-CN"),
        duration: formatDuration(duration),
        summary: "本次会议讨论了项目进度和下一步计划，确定了关键里程碑和责任分工。",
        keyPoints: ["项目整体进度良好", "需要加强跨部门协作", "下周完成第一阶段"],
        actionItems: ["整理会议纪要", "分发任务清单", "安排下次会议"],
      })
    }, 3000)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const openMeetingDetail = (meeting: typeof savedMeetings[0]) => {
    setSelectedMeeting(meeting)
    setShowSummaryDialog(true)
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">AI 总结</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Recording Section */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-6">
            {!isRecording && !isGenerating && !generatedSummary ? (
              /* Start Recording View */
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                  <FileText className="h-12 w-12 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">AI 会议总结</h2>
                <p className="text-muted-foreground mb-6 max-w-xs">
                  录制会议内容，AI 自动生成摘要、要点和待办事项
                </p>
                <Button size="lg" className="w-48 h-14 rounded-full gap-2" onClick={startRecording}>
                  <Mic className="h-5 w-5" />
                  开始录制
                </Button>
              </div>
            ) : isRecording ? (
              /* Recording View */
              <div className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                  isPaused ? "bg-amber-500/20" : "bg-orange-500 animate-pulse"
                }`}>
                  {isPaused ? (
                    <Pause className="h-12 w-12 text-amber-600" />
                  ) : (
                    <Mic className="h-12 w-12 text-white" />
                  )}
                </div>
                <p className="text-lg font-medium text-foreground mb-1">
                  {isPaused ? "已暂停" : "录制中"}
                </p>
                <p className="text-3xl font-bold text-orange-600 mb-6">{formatDuration(duration)}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePause}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                      isPaused ? "bg-orange-500/20" : "bg-secondary"
                    }`}
                  >
                    {isPaused ? (
                      <Play className="h-6 w-6 text-orange-600" />
                    ) : (
                      <Pause className="h-6 w-6 text-foreground" />
                    )}
                  </button>
                  <button
                    onClick={stopRecording}
                    className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center"
                  >
                    <Square className="h-7 w-7 text-white" />
                  </button>
                </div>
              </div>
            ) : isGenerating ? (
              /* Generating View */
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-pulse">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
                <p className="text-lg font-medium text-foreground mb-2">AI 正在分析...</p>
                <p className="text-muted-foreground">生成会议摘要和要点</p>
              </div>
            ) : generatedSummary ? (
              /* Generated Summary View */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">会议总结生成完成</h3>
                  <span className="text-sm text-muted-foreground">{generatedSummary.duration}</span>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-1">摘要</p>
                  <p className="text-foreground">{generatedSummary.summary}</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10">
                  <p className="text-sm text-muted-foreground mb-2">关键要点</p>
                  <ul className="space-y-1">
                    {generatedSummary.keyPoints.map((point, i) => (
                      <li key={i} className="text-foreground text-sm flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-orange-500/10">
                  <p className="text-sm text-muted-foreground mb-2">待办事项</p>
                  <ul className="space-y-1">
                    {generatedSummary.actionItems.map((item, i) => (
                      <li key={i} className="text-foreground text-sm flex items-start gap-2">
                        <span className="text-orange-600">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Copy className="h-4 w-4" />
                    复制
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Share2 className="h-4 w-4" />
                    分享
                  </Button>
                  <Button className="flex-1 gap-2" onClick={() => {
                    setGeneratedSummary(null)
                  }}>
                    <Mic className="h-4 w-4" />
                    新录制
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Saved Meetings */}
        {!isRecording && !isGenerating && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">历史记录</h3>
              <span className="text-sm text-muted-foreground">{savedMeetings.length} 条记录</span>
            </div>
            <div className="space-y-2">
              {savedMeetings.map((meeting) => (
                <Card 
                  key={meeting.id} 
                  className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => openMeetingDetail(meeting)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-orange-500/10">
                          <FileText className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{meeting.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{meeting.date}</span>
                            <span>·</span>
                            <span>{meeting.duration}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Meeting Detail Dialog */}
      <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMeeting?.title}</DialogTitle>
          </DialogHeader>
          {selectedMeeting && (
            <div className="py-2 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{selectedMeeting.date}</span>
                <span>·</span>
                <span>{selectedMeeting.duration}</span>
              </div>
              
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">摘要</p>
                <p className="text-foreground">{selectedMeeting.summary}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-blue-500/10">
                <p className="text-sm text-muted-foreground mb-2">关键要点</p>
                <ul className="space-y-1">
                  {selectedMeeting.keyPoints.map((point, i) => (
                    <li key={i} className="text-foreground text-sm flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 rounded-xl bg-orange-500/10">
                <p className="text-sm text-muted-foreground mb-2">待办事项</p>
                <ul className="space-y-1">
                  {selectedMeeting.actionItems.map((item, i) => (
                    <li key={i} className="text-foreground text-sm flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              复制
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              导出
            </Button>
            <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
