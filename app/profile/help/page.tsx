"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  HelpCircle,
  MessageSquare,
  FileText,
  Phone,
  Mail,
  ChevronRight,
  Search,
  ExternalLink,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const faqCategories = [
  {
    title: "设备连接",
    items: [
      { q: "如何连接我的智能手表？", a: "打开手表蓝牙，在App首页点击+号，按提示完成配对。" },
      { q: "为什么设备经常断连？", a: "请检查设备电量和蓝牙距离，保持在10米范围内。" },
      { q: "如何重置设备配对？", a: "进入设备详情页，点击断开连接，然后重新配对。" },
    ]
  },
  {
    title: "健康数据",
    items: [
      { q: "步数数据不准确怎么办？", a: "检查佩戴位置是否正确，手表应紧贴手腕。" },
      { q: "心率监测如何开启？", a: "进入设备设置，开启心率监测开关。" },
      { q: "睡眠数据没有记录？", a: "确保睡眠时佩戴设备，并开启睡眠追踪功能。" },
    ]
  },
  {
    title: "账号问题",
    items: [
      { q: "如何修改密码？", a: "进入我的-账号安全-修改密码。" },
      { q: "如何注销账号？", a: "请联系客服处理账号注销请求。" },
    ]
  },
]

export default function HelpPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [expandedQ, setExpandedQ] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">帮助与反馈</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索问题..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setShowFeedback(true)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 rounded-2xl bg-primary/10 mb-2">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-foreground">意见反馈</p>
              <p className="text-xs text-muted-foreground mt-1">提交建议或问题</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 rounded-2xl bg-green-500/10 mb-2">
                <Phone className="h-6 w-6 text-green-500" />
              </div>
              <p className="font-medium text-foreground">在线客服</p>
              <p className="text-xs text-muted-foreground mt-1">工作日 9:00-18:00</p>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Form */}
        {showFeedback && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">提交反馈</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFeedback(false)}>
                  取消
                </Button>
              </div>
              <Textarea
                placeholder="请描述您遇到的问题或建议..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  添加截图
                </Button>
              </div>
              <Button className="w-full" disabled={!feedback.trim()}>
                提交反馈
              </Button>
            </CardContent>
          </Card>
        )}

        {/* FAQ */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">常见问题</h2>
          {faqCategories.map((category) => (
            <div key={category.title} className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{category.title}</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0 divide-y divide-border">
                  {category.items.map((item) => (
                    <div key={item.q}>
                      <button
                        onClick={() => setExpandedQ(expandedQ === item.q ? null : item.q)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                      >
                        <span className="font-medium text-foreground pr-4">{item.q}</span>
                        <ChevronRight className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${
                          expandedQ === item.q ? "rotate-90" : ""
                        }`} />
                      </button>
                      {expandedQ === item.q && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            {item.a}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-xs text-muted-foreground">这个回答有帮助吗？</span>
                            <button className="p-1.5 rounded-full hover:bg-green-500/10 text-muted-foreground hover:text-green-500 transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 rounded-full hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
                              <ThumbsDown className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">联系我们</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">support@healthapp.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">400-123-4567</span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
