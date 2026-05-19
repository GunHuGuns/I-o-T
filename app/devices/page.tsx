"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Bluetooth, BluetoothOff, Search, RefreshCw, Settings, AlertCircle, Wifi, WifiOff, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { DeviceList, AddDeviceButton } from "@/components/device-cards"
import Link from "next/link"

type ScenarioType = "normal" | "bluetooth-off" | "no-devices" | "reconnecting"

export default function DevicesPage() {
  const [scenario, setScenario] = useState<ScenarioType>("normal")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">设备管理</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索设备..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Bluetooth Off State */}
        {scenario === "bluetooth-off" && (
          <BluetoothOffState onEnable={() => setScenario("normal")} />
        )}

        {/* No Devices State */}
        {scenario === "no-devices" && (
          <NoDevicesState />
        )}

        {/* Reconnecting State */}
        {scenario === "reconnecting" && (
          <ReconnectingState onCancel={() => setScenario("normal")} />
        )}

        {/* Normal State */}
        {scenario === "normal" && (
          <>
            {/* Connected Status */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/10">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent font-medium">蓝牙已开启，正在扫描设备</span>
            </div>

            {/* Device Categories */}
            <section>
              <h2 className="font-semibold text-foreground mb-3">设备分类</h2>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: "⌚", label: "手表", count: 1 },
                  { icon: "🎧", label: "耳机", count: 1 },
                  { icon: "⚖️", label: "体脂秤", count: 0 },
                  { icon: "📱", label: "手环", count: 0 },
                ].map((category) => (
                  <button
                    key={category.label}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card hover:bg-secondary transition-colors relative"
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-xs text-card-foreground">{category.label}</span>
                    {category.count > 0 && (
                      <span className="absolute top-2 right-2 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {category.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* My Devices */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-foreground">我的设备</h2>
                <span className="text-sm text-muted-foreground">2 台设备</span>
              </div>
              <DeviceList />
            </section>

            {/* Add Device */}
            <section className="pt-2">
              <AddDeviceButton />
            </section>
          </>
        )}

        {/* Test Panel */}
        <TestPanel currentScenario={scenario} onScenarioChange={setScenario} />
      </main>

      <BottomNav />
    </div>
  )
}

// 蓝牙关闭状态组件
function BluetoothOffState({ onEnable }: { onEnable: () => void }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="p-4 rounded-full bg-destructive/10 mb-4">
          <BluetoothOff className="h-12 w-12 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">蓝牙已关闭</h3>
        <p className="text-sm text-muted-foreground mb-6">
          请开启蓝牙以连接和管理您的智能设备
        </p>
        <Button onClick={onEnable} className="w-full max-w-xs">
          <Bluetooth className="h-4 w-4 mr-2" />
          开启蓝牙
        </Button>
        <button className="mt-3 text-sm text-primary">如何开启蓝牙？</button>
      </CardContent>
    </Card>
  )
}

// 没有设备状态组件
function NoDevicesState() {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Search className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">暂无已连接设备</h3>
        <p className="text-sm text-muted-foreground mb-6">
          添加您的第一台智能设备，开启健康管理之旅
        </p>
        <Link href="/add-device" className="w-full max-w-xs">
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            添加设备
          </Button>
        </Link>
        <div className="mt-6 w-full">
          <p className="text-sm text-muted-foreground mb-3">支持的设备类型</p>
          <div className="flex justify-center gap-4">
            {["⌚ 手表", "🎧 耳机", "⚖️ 体脂秤", "💪 手环"].map((item) => (
              <span key={item} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                {item}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 重新连接状态组件
function ReconnectingState({ onCancel }: { onCancel: () => void }) {
  return (
    <>
      {/* 连接中提示 */}
      <Card className="border-0 shadow-sm border-l-4 border-l-amber-500">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-amber-500/10">
              <RefreshCw className="h-5 w-5 text-amber-500 animate-spin" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">正在重新连接设备...</p>
              <p className="text-sm text-muted-foreground">请确保设备在附近并已开启</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              取消
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 离线设备列表 */}
      <section>
        <h2 className="font-semibold text-foreground mb-3">离线设备</h2>
        <div className="space-y-2">
          {[
            { name: "Watch GT 5 Pro", type: "智能手表", lastSeen: "30分钟前" },
            { name: "FreeBuds Pro 3", type: "无线耳机", lastSeen: "2小时前" },
          ].map((device) => (
            <Card key={device.name} className="border-0 shadow-sm opacity-70">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-muted">
                      <WifiOff className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{device.name}</p>
                      <p className="text-xs text-muted-foreground">{device.type} · 最后在线: {device.lastSeen}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    重连
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 故障排除提示 */}
      <Card className="border-0 shadow-sm bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">无法连接？</p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• 确保设备电量充足并已开机</li>
                <li>• 检查设备是否在蓝牙范围内（10米以内）</li>
                <li>• 尝试重启设备后再连接</li>
              </ul>
              <button className="text-sm text-primary mt-2">查看更多帮助</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

// 测试面板组件
function TestPanel({ 
  currentScenario, 
  onScenarioChange 
}: { 
  currentScenario: ScenarioType
  onScenarioChange: (scenario: ScenarioType) => void 
}) {
  const scenarios = [
    { id: "normal", label: "正常状态", description: "设备已连接，蓝牙开启" },
    { id: "bluetooth-off", label: "蓝牙关闭", description: "引导用户开启蓝牙" },
    { id: "no-devices", label: "无设备连接", description: "首次使用或设备全部移除" },
    { id: "reconnecting", label: "重新连接", description: "设备离线尝试重连" },
  ] as const

  return (
    <section className="mt-8 pt-6 border-t border-dashed border-border">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">测试面板</h3>
      </div>
      <Card className="border border-dashed border-border bg-muted/30">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-3">切换场景以测试不同状态</p>
          <div className="space-y-2">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => onScenarioChange(s.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  currentScenario === s.id 
                    ? "bg-primary/10 border border-primary/30" 
                    : "bg-card hover:bg-secondary border border-transparent"
                }`}
              >
                <div className="text-left">
                  <p className={`text-sm font-medium ${
                    currentScenario === s.id ? "text-primary" : "text-foreground"
                  }`}>
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
                {currentScenario === s.id && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
