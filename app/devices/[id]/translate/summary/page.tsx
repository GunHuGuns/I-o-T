"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Mic,
  MicOff,
  FileText,
  Clock,
  Users,
  ChevronRight,
  Play,
  Pause,
  Square,
  Share2,
  Download,
  Trash2,
  MoreVertical,
  Sparkles,
  ListChecks,
  MessageSquare,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 历史记录数据
const summaryHistory = [
  {
    id: "1",
    title: "产品周会",
    date: "2024-01-15",
    duration: "45分钟",
    participants: 8,
    summary: "讨论了Q1产品路线图，确定了三个核心功能的开发优先级...",
    keyPoints: ["确定Q1核心功能", "资源分配调整", "下周截止日期"],
    status: "completed"
  },
  {
    id: "2", 
    title: "客户需求讨论",
    date: "2024-01-14",
    duration: "32分钟",
    participants: 4,
    summary: "与客户确认了新功能需求，包括数据导出和自定义报表...",
    keyPoints: ["数据导出功能", "自定义报表", "API集成需求"],
    status: "completed"
  },
  {
    id: "3",
    title: "技术方案评审",
    date: "2024-01-13",
    duration: "1小时12分钟",
    participants: 6,
    summary: "评审了新架构方案，讨论了微服务拆分策略...",
    keyPoints: ["微服务架构", "数据库优化", "性能指标"],
    status: "completed"
  }
]

export default function AISummaryPage() {
  const router = useRouter()
  
  const [view, setView] = useState<"list" | "recording" | "detail">("list")
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [selectedSummary, setSelectedSummary] = useState<typeof summaryHistory[0] | null>(null)
  const [showTitleDialog, setShowTitleDialog] = useState(false)
  const [meetingTitle, setMeetingTitle] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startRecording = () => {
    setShowTitleDialog(true)
  }

  const confirmStartRecording = () => {
    setShowTitleDialog(false)
    setView("recording")
    setIsRecording(true)
    // 模拟录音计时
    const interval = setInterval(() => {
      if (!isPaused) {
        setRecordingDuration(prev => prev + 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    setRecordingDuration(0)
    setView("list")
    // 这里会生成总结
  }

  const viewSummaryDetail = (summary: typeof summaryHistory[0]) => {
    setSelectedSummary(summary)
    setView("detail")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={() => {
              if (view === "detail") {
                setView("list")
                setSelectedSummary(null)
              } else if (view === "recording") {
                // 确认退出录音
                setView("list")
                setIsRecording(false)
              } else {
                router.back()
              }
            }}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">
            {view === "recording" ? (meetingTitle || "录音中") : view === "detail" ? selectedSummary?.title : "AI总结"}
          </h1>
        </div>
      </header>

      {/* List View */}
      {view === "list" && (
        <main className="px-4 py-4 space-y-6">
          {/* New Recording Button */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-500/10 to-amber-500/10">
            <CardContent className="p-4">
              <button 
                onClick={startRecording}
                className="w-full flex items-center gap-4"
              >
                <div className="p-4 rounded-2xl bg-orange-500/20">
                  <Mic className="h-8 w-8 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">开始新会议</p>
                  <p className="text-sm text-muted-foreground">录制会议并生成AI总结</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>

          {/* Features */}
          <section>
            <h3 className="font-semibold text-foreground mb-3">AI总结功能</h3>
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className="p-2 rounded-xl bg-purple-500/10 mb-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-xs font-medium">智能摘要</span>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className="p-2 rounded-xl bg-blue-500/10 mb-2">
                    <ListChecks className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium">要点提取</span>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className="p-2 rounded-xl bg-green-500/10 mb-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs font-medium">全文转写</span>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* History */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">历史记录</h3>
              <span className="text-sm text-muted-foreground">{summaryHistory.length} 条</span>
            </div>
            <div className="space-y-2">
              {summaryHistory.map((item) => (
                <Card 
                  key={item.id} 
                  className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => viewSummaryDetail(item)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.title}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {item.participants}人
                          </span>
                          <span>{item.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {item.summary}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            分享
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            导出
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={(e) => {
                            e.stopPropagation()
                            setShowDeleteDialog(true)
                          }}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* Recording View */}
      {view === "recording" && (
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          {/* Recording Animation */}
          <div className="relative mb-8">
            <div className={`absolute inset-0 rounded-full ${isRecording && !isPaused ? "animate-ping" : ""} bg-destructive/20`} />
            <div className={`relative p-8 rounded-full ${isRecording && !isPaused ? "bg-destructive" : "bg-muted"} transition-colors`}>
              {isRecording && !isPaused ? (
                <Mic className="h-16 w-16 text-destructive-foreground" />
              ) : (
                <MicOff className="h-16 w-16 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Duration */}
          <p className="text-4xl font-bold text-foreground mb-2">
            {formatDuration(recordingDuration)}
          </p>
          <p className="text-muted-foreground mb-8">
            {isPaused ? "已暂停" : "正在录音..."}
          </p>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <Button
              variant="outline"
              size="lg"
              className="h-14 w-14 rounded-full"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? <Play className="h-6 w-6" /> : <Pause className="h-6 w-6" />}
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="h-16 w-16 rounded-full"
              onClick={stopRecording}
            >
              <Square className="h-6 w-6" />
            </Button>
          </div>

          {/* Tips */}
          <Card className="border-0 shadow-sm bg-muted/50 mt-8 max-w-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">录音提示</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    请确保周围环境安静，说话清晰。AI将在录音结束后自动生成总结。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      )}

      {/* Detail View */}
      {view === "detail" && selectedSummary && (
        <main className="px-4 py-4 space-y-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {selectedSummary.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {selectedSummary.participants}人参与
            </span>
            <span>{selectedSummary.date}</span>
          </div>

          {/* AI Summary */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-foreground">AI摘要</h3>
            </div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-foreground leading-relaxed">
                  {selectedSummary.summary}
                  本次会议主要围绕产品开发进度、资源分配和下一阶段目标展开讨论。
                  团队成员就关键问题达成一致，并确定了后续行动计划。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Key Points */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ListChecks className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-foreground">关键要点</h3>
            </div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                {selectedSummary.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-foreground">{point}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Action Items */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-foreground">待办事项</h3>
            </div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                {["完成功能设计文档", "更新项目进度表", "安排下周评审会议"].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-muted-foreground/30" />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2">
              <Share2 className="h-4 w-4" />
              分享
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              导出
            </Button>
          </div>
        </main>
      )}

      {/* Title Dialog */}
      <Dialog open={showTitleDialog} onOpenChange={setShowTitleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>会议名称</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="请输入会议名称"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTitleDialog(false)}>
              取消
            </Button>
            <Button onClick={confirmStartRecording}>
              开始录音
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            确定要删除这条会议记录吗？此操作无法撤销。
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  )
}
