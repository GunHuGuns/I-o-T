"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  FileText,
  Download,
  Share2,
  Calendar,
  TrendingUp,
  Activity,
  Heart,
  Moon,
  Footprints,
  ChevronRight,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const reports = [
  {
    id: "weekly-2024-w20",
    type: "weekly",
    title: "周报告",
    period: "2024年5月13日 - 5月19日",
    summary: {
      steps: 68432,
      exercise: 5,
      sleep: 7.2,
      heartRate: 68,
    },
    status: "good",
  },
  {
    id: "weekly-2024-w19",
    type: "weekly",
    title: "周报告",
    period: "2024年5月6日 - 5月12日",
    summary: {
      steps: 54320,
      exercise: 4,
      sleep: 6.8,
      heartRate: 72,
    },
    status: "normal",
  },
  {
    id: "monthly-2024-04",
    type: "monthly",
    title: "月报告",
    period: "2024年4月",
    summary: {
      steps: 298000,
      exercise: 18,
      sleep: 7.0,
      heartRate: 70,
    },
    status: "good",
  },
  {
    id: "monthly-2024-03",
    type: "monthly",
    title: "月报告",
    period: "2024年3月",
    summary: {
      steps: 256000,
      exercise: 15,
      sleep: 6.5,
      heartRate: 74,
    },
    status: "normal",
  },
]

export default function DataReportsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<"all" | "weekly" | "monthly">("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredReports = reports.filter(r => 
    filter === "all" || r.type === filter
  )

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">数据报告</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Filter Tabs */}
        <div className="flex gap-2">
          {[
            { id: "all", label: "全部" },
            { id: "weekly", label: "周报" },
            { id: "monthly", label: "月报" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={filter === tab.id ? "default" : "secondary"}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter(tab.id as typeof filter)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Latest Report Highlight */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">本周健康趋势</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                良好
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              本周运动表现出色，步数比上周增长 26%，继续保持！
            </p>
          </CardContent>
        </Card>

        {/* Reports List */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">历史报告</h2>
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <Card key={report.id} className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${
                        report.type === "weekly" ? "bg-blue-500/10" : "bg-purple-500/10"
                      }`}>
                        <FileText className={`h-5 w-5 ${
                          report.type === "weekly" ? "text-blue-500" : "text-purple-500"
                        }`} />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">{report.title}</p>
                        <p className="text-xs text-muted-foreground">{report.period}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        report.status === "good" 
                          ? "bg-green-500/10 text-green-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}>
                        {report.status === "good" ? "良好" : "一般"}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${
                        expandedId === report.id ? "rotate-180" : ""
                      }`} />
                    </div>
                  </button>
                  
                  {/* Expanded Content */}
                  {expandedId === report.id && (
                    <div className="px-4 pb-4 border-t border-border">
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="p-3 rounded-xl bg-green-500/5">
                          <div className="flex items-center gap-2 mb-1">
                            <Footprints className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-muted-foreground">总步数</span>
                          </div>
                          <p className="font-semibold text-foreground">
                            {report.summary.steps.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-orange-500/5">
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="h-4 w-4 text-orange-500" />
                            <span className="text-xs text-muted-foreground">运动次数</span>
                          </div>
                          <p className="font-semibold text-foreground">{report.summary.exercise} 次</p>
                        </div>
                        <div className="p-3 rounded-xl bg-indigo-500/5">
                          <div className="flex items-center gap-2 mb-1">
                            <Moon className="h-4 w-4 text-indigo-500" />
                            <span className="text-xs text-muted-foreground">平均睡眠</span>
                          </div>
                          <p className="font-semibold text-foreground">{report.summary.sleep} 小时</p>
                        </div>
                        <div className="p-3 rounded-xl bg-rose-500/5">
                          <div className="flex items-center gap-2 mb-1">
                            <Heart className="h-4 w-4 text-rose-500" />
                            <span className="text-xs text-muted-foreground">平均心率</span>
                          </div>
                          <p className="font-semibold text-foreground">{report.summary.heartRate} bpm</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          下载
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="h-4 w-4 mr-1" />
                          分享
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
