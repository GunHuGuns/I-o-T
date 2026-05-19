"use client"

import { useState } from "react"
import { Bell, Plus, ChevronRight, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { ConnectedDeviceGrid, DeviceCategoryList } from "@/components/home-devices"
import Link from "next/link"

export default function HomePage() {
  const [isScanning, setIsScanning] = useState(false)
  const connectedCount = 2

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">我的设备</h1>
            <p className="text-sm text-muted-foreground">{connectedCount} 个设备已连接</p>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/add-device">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Plus className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-2 space-y-6">
        {/* Quick Status Bar */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-accent/10">
                  <Wifi className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">网络状态良好</p>
                  <p className="text-xs text-muted-foreground">所有设备运行正常</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setIsScanning(true)}
                disabled={isScanning}
              >
                {isScanning ? "扫描中..." : "扫描设备"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Connected Devices Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">已连接设备</h2>
            <Link href="/devices" className="text-sm text-primary font-medium flex items-center gap-1">
              管理 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <ConnectedDeviceGrid />
        </section>

        {/* Device Categories */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">添加设备</h2>
          </div>
          <DeviceCategoryList />
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">最近活动</h2>
            <button className="text-sm text-primary font-medium flex items-center gap-1">
              全部 <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {[
              { device: "智能手表", action: "完成同步", time: "5分钟前", icon: "⌚" },
              { device: "无线耳机", action: "固件已更新", time: "1小时前", icon: "🎧" },
            ].map((activity, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.device}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
