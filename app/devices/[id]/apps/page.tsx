"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { 
  ArrowLeft, 
  Download,
  Trash2,
  Search,
  Grid3X3,
  Activity,
  Heart,
  Moon,
  Music,
  Map,
  Phone,
  MessageSquare,
  Camera,
  Calculator,
  Compass,
  Timer,
  Bell,
  Calendar,
  Cloud
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const installedApps = [
  { id: "1", name: "运动", icon: Activity, color: "bg-green-500", size: "12MB" },
  { id: "2", name: "心率", icon: Heart, color: "bg-rose-500", size: "8MB" },
  { id: "3", name: "睡眠", icon: Moon, color: "bg-indigo-500", size: "10MB" },
  { id: "4", name: "音乐", icon: Music, color: "bg-pink-500", size: "15MB" },
  { id: "5", name: "导航", icon: Map, color: "bg-blue-500", size: "25MB" },
  { id: "6", name: "电话", icon: Phone, color: "bg-emerald-500", size: "5MB" },
]

const availableApps = [
  { id: "7", name: "微信", icon: MessageSquare, color: "bg-green-600", size: "18MB", downloads: "100万+" },
  { id: "8", name: "相机", icon: Camera, color: "bg-gray-700", size: "12MB", downloads: "50万+" },
  { id: "9", name: "计算器", icon: Calculator, color: "bg-orange-500", size: "3MB", downloads: "30万+" },
  { id: "10", name: "指南针", icon: Compass, color: "bg-red-500", size: "4MB", downloads: "20万+" },
  { id: "11", name: "计时器", icon: Timer, color: "bg-amber-500", size: "5MB", downloads: "80万+" },
  { id: "12", name: "提醒", icon: Bell, color: "bg-purple-500", size: "6MB", downloads: "60万+" },
  { id: "13", name: "日历", icon: Calendar, color: "bg-red-600", size: "8MB", downloads: "40万+" },
  { id: "14", name: "天气", icon: Cloud, color: "bg-cyan-500", size: "10MB", downloads: "90万+" },
]

export default function WatchAppsPage() {
  const router = useRouter()
  const params = useParams()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [installed, setInstalled] = useState(installedApps.map(a => a.id))
  const [activeTab, setActiveTab] = useState<"installed" | "store">("installed")

  const allApps = [...installedApps, ...availableApps]

  const filteredInstalledApps = installedApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredAvailableApps = availableApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) && !installed.includes(app.id)
  )

  const installApp = (appId: string) => {
    setInstalled([...installed, appId])
  }

  const uninstallApp = (appId: string) => {
    setInstalled(installed.filter(id => id !== appId))
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">应用管理</h1>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索应用..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-3">
          <button
            onClick={() => setActiveTab("installed")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "installed" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            已安装 ({installed.length})
          </button>
          <button
            onClick={() => setActiveTab("store")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "store" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            应用商店
          </button>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {activeTab === "installed" ? (
          /* Installed Apps */
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                已使用 128MB / 512MB
              </p>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-primary rounded-full" />
              </div>
            </div>
            <div className="space-y-2">
              {filteredInstalledApps.map((app) => (
                <Card key={app.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${app.color}`}>
                          <app.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">{app.name}</p>
                          <p className="text-xs text-muted-foreground">{app.size}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => uninstallApp(app.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* App Store */
          <div className="space-y-2">
            {filteredAvailableApps.map((app) => (
              <Card key={app.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${app.color}`}>
                        <app.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.size} · {app.downloads}下载</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => installApp(app.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      安装
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
