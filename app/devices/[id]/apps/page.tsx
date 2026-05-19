"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Search,
  Download,
  Trash2,
  ChevronRight,
  Clock,
  Map,
  Wallet,
  Heart,
  Calculator,
  Moon,
  Compass,
  Timer,
  Alarm,
  Calendar,
  CloudSun,
  Music,
  Phone,
  MessageSquare,
  Camera,
  Flashlight,
  Settings
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

const installedApps = [
  { id: "1", name: "心率", icon: Heart, color: "bg-rose-500", size: "2.1MB", category: "健康" },
  { id: "2", name: "天气", icon: CloudSun, color: "bg-blue-500", size: "3.2MB", category: "工具" },
  { id: "3", name: "闹钟", icon: Alarm, color: "bg-orange-500", size: "1.5MB", category: "工具" },
  { id: "4", name: "计时器", icon: Timer, color: "bg-green-500", size: "1.2MB", category: "工具" },
  { id: "5", name: "音乐", icon: Music, color: "bg-purple-500", size: "4.5MB", category: "娱乐" },
  { id: "6", name: "指南针", icon: Compass, color: "bg-teal-500", size: "1.8MB", category: "工具" },
  { id: "7", name: "钱包", icon: Wallet, color: "bg-amber-500", size: "5.2MB", category: "支付" },
  { id: "8", name: "日历", icon: Calendar, color: "bg-indigo-500", size: "2.8MB", category: "工具" },
]

const availableApps = [
  { id: "9", name: "地图", icon: Map, color: "bg-emerald-500", size: "8.5MB", category: "导航", downloads: 15000 },
  { id: "10", name: "计算器", icon: Calculator, color: "bg-gray-500", size: "1.1MB", category: "工具", downloads: 22000 },
  { id: "11", name: "睡眠", icon: Moon, color: "bg-indigo-600", size: "3.8MB", category: "健康", downloads: 18000 },
  { id: "12", name: "手电筒", icon: Flashlight, color: "bg-yellow-500", size: "0.8MB", category: "工具", downloads: 35000 },
  { id: "13", name: "相机控制", icon: Camera, color: "bg-pink-500", size: "2.2MB", category: "工具", downloads: 12000 },
  { id: "14", name: "通讯录", icon: Phone, color: "bg-green-600", size: "2.5MB", category: "通讯", downloads: 9800 },
  { id: "15", name: "短信", icon: MessageSquare, color: "bg-blue-600", size: "3.1MB", category: "通讯", downloads: 11000 },
  { id: "16", name: "设置", icon: Settings, color: "bg-slate-500", size: "1.9MB", category: "系统", downloads: 8500 },
]

export default function WatchAppsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"installed" | "store">("installed")
  const [searchQuery, setSearchQuery] = useState("")
  const [showUninstallDialog, setShowUninstallDialog] = useState(false)
  const [selectedApp, setSelectedApp] = useState<typeof installedApps[0] | null>(null)

  const filteredInstalled = installedApps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredAvailable = availableApps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUninstall = (app: typeof installedApps[0]) => {
    setSelectedApp(app)
    setShowUninstallDialog(true)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">应用管理</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-3">
          <button
            onClick={() => setActiveTab("installed")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "installed"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            已安装 ({installedApps.length})
          </button>
          <button
            onClick={() => setActiveTab("store")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "store"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            应用商店
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索应用..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Installed Apps */}
        {activeTab === "installed" && (
          <>
            <p className="text-sm text-muted-foreground">
              已安装 {installedApps.length} 个应用，占用 {installedApps.reduce((acc, app) => acc + parseFloat(app.size), 0).toFixed(1)}MB
            </p>
            <div className="space-y-2">
              {filteredInstalled.map((app) => {
                const Icon = app.icon
                return (
                  <Card key={app.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${app.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{app.name}</p>
                          <p className="text-xs text-muted-foreground">{app.category} · {app.size}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleUninstall(app)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {/* App Store */}
        {activeTab === "store" && (
          <>
            <p className="text-sm text-muted-foreground">
              发现更多实用应用
            </p>
            <div className="space-y-2">
              {filteredAvailable.map((app) => {
                const Icon = app.icon
                return (
                  <Card key={app.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${app.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{app.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {app.category} · {app.size} · {(app.downloads / 1000).toFixed(1)}k 下载
                          </p>
                        </div>
                        <Button size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          安装
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </main>

      {/* Uninstall Dialog */}
      <Dialog open={showUninstallDialog} onOpenChange={setShowUninstallDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>卸载应用</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            确定要从手表卸载"{selectedApp?.name}"应用吗？
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUninstallDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={() => setShowUninstallDialog(false)}>
              卸载
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  )
}
