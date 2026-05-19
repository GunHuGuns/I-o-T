"use client"

import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Shield,
  Eye,
  Database,
  Share2,
  Trash2,
  ChevronRight,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  const router = useRouter()

  const sections = [
    {
      title: "1. 信息收集",
      content: "我们收集您主动提供的信息（如注册信息、健康数据）以及设备自动收集的信息（如使用数据、设备信息）。"
    },
    {
      title: "2. 信息使用",
      content: "我们使用收集的信息来提供、维护和改进我们的服务，包括个性化健康建议、数据分析和用户支持。"
    },
    {
      title: "3. 信息共享",
      content: "除非获得您的明确同意或法律要求，我们不会与第三方共享您的个人健康数据。"
    },
    {
      title: "4. 数据安全",
      content: "我们采用行业标准的加密技术和安全措施来保护您的数据，包括传输加密和存储加密。"
    },
    {
      title: "5. 您的权利",
      content: "您有权访问、更正、删除您的个人数据，以及撤回同意。您可以随时在设置中管理这些权利。"
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">隐私政策</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Privacy Overview */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium text-foreground">您的隐私很重要</span>
            </div>
            <p className="text-sm text-muted-foreground">
              我们致力于保护您的个人信息和健康数据。请阅读以下政策了解我们如何收集、使用和保护您的数据。
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">隐私管理</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0 divide-y divide-border">
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10">
                    <Eye className="h-4 w-4 text-blue-500" />
                  </div>
                  <span className="text-foreground">查看我的数据</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-green-500/10">
                    <Database className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-foreground">导出我的数据</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/10">
                    <Share2 className="h-4 w-4 text-orange-500" />
                  </div>
                  <span className="text-foreground">第三方授权管理</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-500/10">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="text-foreground">删除我的数据</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </section>

        {/* Policy Content */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">隐私政策详情</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 space-y-4">
              {sections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-medium text-foreground mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Last Updated */}
        <p className="text-center text-xs text-muted-foreground">
          最后更新：2024年5月1日
        </p>

        {/* Full Policy Link */}
        <Button variant="outline" className="w-full">
          <ExternalLink className="h-4 w-4 mr-2" />
          查看完整隐私政策
        </Button>
      </main>
    </div>
  )
}
