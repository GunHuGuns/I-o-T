"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, 
  Battery, 
  Bluetooth, 
  Bell, 
  Watch,
  Headphones,
  Scale,
  Settings,
  RefreshCw,
  Power,
  Music,
  Phone,
  Heart,
  Moon,
  Vibrate,
  ChevronRight,
  Activity,
  Footprints,
  Flame,
  Droplets,
  TrendingUp,
  Gamepad2,
  Languages,
  MessageSquare,
  Mic,
  FileText,
  Sliders,
  Clock,
  Grid3X3,
  Wallet,
  CreditCard,
  Timer,
  X,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { BottomNav } from "@/components/bottom-nav"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const deviceData: Record<string, {
  name: string
  model: string
  battery: number
  connected: boolean
  type: "watch" | "earbuds" | "scale"
  firmware: string
  lastSync: string
}> = {
  "1": {
    name: "智能手表",
    model: "Watch GT 5 Pro",
    battery: 78,
    connected: true,
    type: "watch",
    firmware: "v2.1.3",
    lastSync: "刚刚",
  },
  "2": {
    name: "无线耳机",
    model: "FreeBuds Pro 3",
    battery: 45,
    connected: true,
    type: "earbuds",
    firmware: "v1.8.2",
    lastSync: "5分钟前",
  },
}

const icons = {
  watch: Watch,
  earbuds: Headphones,
  scale: Scale,
}

// 运动类型数据
const sportTypes = [
  { id: "outdoor-run", name: "户外跑步", icon: Activity, color: "bg-green-500" },
  { id: "indoor-run", name: "室内跑步", icon: Activity, color: "bg-blue-500" },
  { id: "outdoor-walk", name: "户外步行", icon: Footprints, color: "bg-teal-500" },
  { id: "outdoor-cycle", name: "户外骑行", icon: Activity, color: "bg-orange-500" },
  { id: "swimming", name: "泳池游泳", icon: Droplets, color: "bg-cyan-500" },
  { id: "hiit", name: "HIIT", icon: Flame, color: "bg-red-500" },
]

// 今日健康数据
const healthData = {
  steps: { value: 8432, goal: 10000, unit: "步" },
  calories: { value: 420, goal: 500, unit: "千卡" },
  heartRate: { value: 72, unit: "bpm", status: "正常" },
  sleep: { value: 7.5, unit: "小时", quality: "良好" },
}

// 运动记录
const recentWorkouts = [
  { id: "1", type: "户外跑步", duration: "32分钟", distance: "5.2km", calories: 320, time: "今天 07:30" },
  { id: "2", type: "室内骑行", duration: "45分钟", distance: "15km", calories: 280, time: "昨天 18:00" },
  { id: "3", type: "户外步行", duration: "28分钟", distance: "2.1km", calories: 120, time: "昨天 12:30" },
]

// 均衡器预设
const eqPresets = [
  { id: "standard", name: "标准", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "bass", name: "低音增强", values: [6, 5, 4, 2, 0, 0, 0, 0, 0, 0] },
  { id: "vocal", name: "人声增强", values: [0, 0, 2, 4, 5, 5, 4, 2, 0, 0] },
  { id: "treble", name: "高音增强", values: [0, 0, 0, 0, 0, 2, 4, 5, 6, 6] },
]

const eqFrequencies = ["31", "62", "125", "250", "500", "1K", "2K", "4K", "8K", "16K"]

export default function DeviceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const deviceId = params.id as string
  const device = deviceData[deviceId] || deviceData["1"]
  const DeviceIcon = icons[device.type]

  const [notifications, setNotifications] = useState(true)
  const [heartMonitor, setHeartMonitor] = useState(true)
  const [sleepTracking, setSleepTracking] = useState(true)
  const [vibration, setVibration] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "sports" | "health">("overview")
  
  // 耳机相关状态
  const [gameMode, setGameMode] = useState(false)
  const [selectedEqPreset, setSelectedEqPreset] = useState("standard")
  const [customEqValues, setCustomEqValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [customPresets, setCustomPresets] = useState<{id: string, name: string, values: number[]}[]>([])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [newPresetName, setNewPresetName] = useState("")

  // 定时停止播放状态
  const [showSleepTimerDialog, setShowSleepTimerDialog] = useState(false)
  const [sleepTimerMode, setSleepTimerMode] = useState<"countdown" | "clock">("countdown")
  const [countdownMinutes, setCountdownMinutes] = useState(30)
  const [clockTime, setClockTime] = useState("")
  const [sleepTimerActive, setSleepTimerActive] = useState(false)
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState(0) // seconds
  const sleepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 快捷倒计时选项（分钟）
  const countdownOptions = [15, 20, 30, 45, 60, 90]

  // 激活定时停止
  const activateSleepTimer = () => {
    if (sleepTimerRef.current) clearInterval(sleepTimerRef.current)
    let seconds = 0
    if (sleepTimerMode === "countdown") {
      seconds = countdownMinutes * 60
    } else {
      const [h, m] = clockTime.split(":").map(Number)
      const now = new Date()
      const target = new Date()
      target.setHours(h, m, 0, 0)
      if (target <= now) target.setDate(target.getDate() + 1)
      seconds = Math.floor((target.getTime() - now.getTime()) / 1000)
    }
    setSleepTimerRemaining(seconds)
    setSleepTimerActive(true)
    setShowSleepTimerDialog(false)
    sleepTimerRef.current = setInterval(() => {
      setSleepTimerRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(sleepTimerRef.current!)
          setSleepTimerActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const cancelSleepTimer = () => {
    if (sleepTimerRef.current) clearInterval(sleepTimerRef.current)
    setSleepTimerActive(false)
    setSleepTimerRemaining(0)
  }

  // 格式化剩余时间
  const formatRemaining = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
  }

  useEffect(() => {
    return () => {
      if (sleepTimerRef.current) clearInterval(sleepTimerRef.current)
    }
  }, [])

  // 获取当前EQ值
  const getCurrentEqValues = () => {
    if (selectedEqPreset === "custom") {
      return customEqValues
    }
    const preset = [...eqPresets, ...customPresets].find(p => p.id === selectedEqPreset)
    return preset?.values || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }

  // 保存自定义预设
  const saveCustomPreset = () => {
    if (newPresetName.trim()) {
      const newPreset = {
        id: `custom-${Date.now()}`,
        name: newPresetName.trim(),
        values: [...customEqValues]
      }
      setCustomPresets([...customPresets, newPreset])
      setSelectedEqPreset(newPreset.id)
      setNewPresetName("")
      setShowSaveDialog(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">{device.name}</h1>
          </div>
        </div>
        
        {/* Tab Switcher for Watch */}
        {device.type === "watch" && (
          <div className="flex gap-1 px-4 pb-3">
            {[
              { id: "overview", label: "概览" },
              { id: "sports", label: "运动" },
              { id: "health", label: "健康" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-6">
        {/* Overview Tab */}
        {(activeTab === "overview" || device.type !== "watch") && (
          <>
            {/* Device Hero */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-6 rounded-3xl mb-4 ${
                    device.connected ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <DeviceIcon className={`h-16 w-16 ${
                      device.connected ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <h2 className="text-xl font-bold text-card-foreground">{device.model}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    {device.connected ? (
                      <>
                        <Bluetooth className="h-4 w-4 text-accent" />
                        <span className="text-accent font-medium">已连接</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">未连接</span>
                    )}
                  </div>
                  
                  {/* Battery */}
                  <div className="flex items-center gap-3 mt-4 px-4 py-2 rounded-full bg-secondary">
                    <Battery className={`h-5 w-5 ${
                      device.battery > 20 ? "text-accent" : "text-destructive"
                    }`} />
                    <span className="font-semibold text-secondary-foreground">
                      {device.battery}%
                    </span>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          device.battery > 20 ? "bg-accent" : "bg-destructive"
                        }`}
                        style={{ width: `${device.battery}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Controls for Watch */}
            {device.type === "watch" && (
              <>
                <section>
                  <h3 className="font-semibold text-foreground mb-3">快捷控制</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: Bell, label: "查找手机", active: false },
                      { icon: Music, label: "音乐控制", active: true },
                      { icon: Phone, label: "来电提醒", active: true },
                      { icon: Vibrate, label: "勿扰模式", active: false },
                    ].map((control) => (
                      <button
                        key={control.label}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-colors ${
                          control.active 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-card text-card-foreground hover:bg-secondary"
                        }`}
                      >
                        <control.icon className="h-5 w-5" />
                        <span className="text-xs">{control.label}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Watch Features */}
                <section>
                  <h3 className="font-semibold text-foreground mb-3">手表功能</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={`/devices/${deviceId}/watch-faces`}>
                      <Card className="border-0 shadow-sm hover:shadow-md transition-all h-full">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-blue-500/10">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">表盘市场</p>
                            <p className="text-xs text-muted-foreground">个性化表盘</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href={`/devices/${deviceId}/apps`}>
                      <Card className="border-0 shadow-sm hover:shadow-md transition-all h-full">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-purple-500/10">
                            <Grid3X3 className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">应用管理</p>
                            <p className="text-xs text-muted-foreground">安装与卸载</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href={`/devices/${deviceId}/payment`}>
                      <Card className="border-0 shadow-sm hover:shadow-md transition-all h-full">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-green-500/10">
                            <Wallet className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">钱包支付</p>
                            <p className="text-xs text-muted-foreground">NFC支付</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href={`/devices/${deviceId}/cards`}>
                      <Card className="border-0 shadow-sm hover:shadow-md transition-all h-full">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-orange-500/10">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">卡片管理</p>
                            <p className="text-xs text-muted-foreground">门禁/交通卡</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </section>
              </>
            )}

            {/* Earbuds Controls */}
            {device.type === "earbuds" && (
              <>
                {/* Sleep Timer */}
                <section>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${sleepTimerActive ? "bg-primary/20" : "bg-secondary"}`}>
                            <Timer className={`h-5 w-5 ${sleepTimerActive ? "text-primary" : "text-secondary-foreground"}`} />
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">定时停止播放</p>
                            {sleepTimerActive ? (
                              <p className="text-xs text-primary font-medium">{formatRemaining(sleepTimerRemaining)} 后停止</p>
                            ) : (
                              <p className="text-xs text-muted-foreground">到时间自动停止音乐</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {sleepTimerActive ? (
                            <button
                              onClick={cancelSleepTimer}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium"
                            >
                              <X className="h-3.5 w-3.5" />
                              取消
                            </button>
                          ) : (
                            <button
                              onClick={() => setShowSleepTimerDialog(true)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                            >
                              设置
                            </button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Game Mode */}
                <section>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${gameMode ? "bg-primary/20" : "bg-secondary"}`}>
                            <Gamepad2 className={`h-5 w-5 ${gameMode ? "text-primary" : "text-secondary-foreground"}`} />
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">游戏模式</p>
                            <p className="text-xs text-muted-foreground">低延迟音频，提升游戏体验</p>
                          </div>
                        </div>
                        <Switch checked={gameMode} onCheckedChange={setGameMode} />
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Equalizer */}
                <section>
                  <h3 className="font-semibold text-foreground mb-3">均衡器</h3>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 space-y-4">
                      {/* Presets */}
                      <div className="flex flex-wrap gap-2">
                        {[...eqPresets, ...customPresets].map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => setSelectedEqPreset(preset.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                              selectedEqPreset === preset.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                          >
                            {preset.name}
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            setSelectedEqPreset("custom")
                            setCustomEqValues([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedEqPreset === "custom"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          自定义
                        </button>
                      </div>

                      {/* EQ Sliders */}
                      <div className="pt-4">
                        <div className="flex justify-between items-end gap-1 h-40">
                          {eqFrequencies.map((freq, index) => {
                            const values = getCurrentEqValues()
                            const isCustom = selectedEqPreset === "custom"
                            return (
                              <div key={freq} className="flex flex-col items-center flex-1">
                                <div className="relative h-28 w-full flex justify-center">
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-1 h-full bg-muted rounded-full overflow-hidden relative">
                                      <div 
                                        className={`absolute bottom-1/2 w-full rounded-full transition-all ${
                                          isCustom ? "bg-primary" : "bg-primary/60"
                                        }`}
                                        style={{ 
                                          height: `${Math.abs(values[index]) * 4}%`,
                                          transform: values[index] >= 0 ? "translateY(0)" : "translateY(100%)",
                                          bottom: values[index] >= 0 ? "50%" : "auto",
                                          top: values[index] < 0 ? "50%" : "auto"
                                        }}
                                      />
                                    </div>
                                  </div>
                                  {isCustom && (
                                    <input
                                      type="range"
                                      min="-12"
                                      max="12"
                                      value={values[index]}
                                      onChange={(e) => {
                                        const newValues = [...customEqValues]
                                        newValues[index] = parseInt(e.target.value)
                                        setCustomEqValues(newValues)
                                      }}
                                      className="absolute w-full h-full opacity-0 cursor-pointer"
                                      style={{ writingMode: "vertical-lr", direction: "rtl" }}
                                    />
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground mt-2">{freq}</span>
                              </div>
                            )
                          })}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
                          <span>+12dB</span>
                          <span>0dB</span>
                          <span>-12dB</span>
                        </div>
                      </div>

                      {/* Save Custom Preset */}
                      {selectedEqPreset === "custom" && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setShowSaveDialog(true)}
                        >
                          保存为预设
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </section>

                {/* Translation & Summary Module */}
                <section>
                  <h3 className="font-semibold text-foreground mb-3">翻译 & 总结</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={`/devices/${deviceId}/translate/face-to-face`}>
                      <Card className="border-0 shadow-sm hover:shadow-md transition-all h-full">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="p-3 rounded-2xl bg-blue-500/10 mb-2">
                            <Languages className="h-6 w-6 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-foreground">面对面翻译</span>
                          <span className="text-xs text-muted-foreground mt-1">实时对话翻译</span>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href={`/devices/${deviceId}/translate/call`}>
                      <Card className="border-0 shadow-sm hover:shadow-md transition-all h-full">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="p-3 rounded-2xl bg-green-500/10 mb-2">
                            <Phone className="h-6 w-6 text-green-600" />
                          </div>
                          <span className="text-sm font-medium text-foreground">通话翻译</span>
                          <span className="text-xs text-muted-foreground mt-1">电话实时翻译</span>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href={`/devices/${deviceId}/translate/simultaneous`}>
                      <Card className="border-0 shadow-sm hover:shadow-md transition-all h-full">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="p-3 rounded-2xl bg-purple-500/10 mb-2">
                            <Mic className="h-6 w-6 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium text-foreground">同声传译</span>
                          <span className="text-xs text-muted-foreground mt-1">会议同步翻译</span>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href={`/devices/${deviceId}/translate/summary`}>
                      <Card className="border-0 shadow-sm hover:shadow-md transition-all h-full">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="p-3 rounded-2xl bg-orange-500/10 mb-2">
                            <FileText className="h-6 w-6 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-foreground">AI总结</span>
                          <span className="text-xs text-muted-foreground mt-1">会议智能总结</span>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </section>

                {/* Advanced Settings */}
                <section>
                  <Link href={`/devices/${deviceId}/settings`}>
                    <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-secondary">
                              <Settings className="h-5 w-5 text-secondary-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-card-foreground">高级设置</p>
                              <p className="text-xs text-muted-foreground">手势、音频设置等</p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </section>
              </>
            )}

            {/* Settings for Watch */}
            {device.type === "watch" && (
              <section>
                <h3 className="font-semibold text-foreground mb-3">设备设置</h3>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-0 divide-y divide-border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">消息通知</p>
                          <p className="text-xs text-muted-foreground">接收手机通知推送</p>
                        </div>
                      </div>
                      <Switch checked={notifications} onCheckedChange={setNotifications} />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-destructive/10">
                          <Heart className="h-4 w-4 text-destructive" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">心率监测</p>
                          <p className="text-xs text-muted-foreground">自动监测心率变化</p>
                        </div>
                      </div>
                      <Switch checked={heartMonitor} onCheckedChange={setHeartMonitor} />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-chart-4/10">
                          <Moon className="h-4 w-4 text-chart-4" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">睡眠追踪</p>
                          <p className="text-xs text-muted-foreground">记录睡眠质量和时长</p>
                        </div>
                      </div>
                      <Switch checked={sleepTracking} onCheckedChange={setSleepTracking} />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-secondary">
                          <Vibrate className="h-4 w-4 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">振动反馈</p>
                          <p className="text-xs text-muted-foreground">通知时振动提醒</p>
                        </div>
                      </div>
                      <Switch checked={vibration} onCheckedChange={setVibration} />
                    </div>
                    <Link 
                      href={`/devices/${deviceId}/settings`}
                      className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-secondary">
                          <Settings className="h-4 w-4 text-secondary-foreground" />
                        </div>
                        <p className="font-medium text-card-foreground">高级设置</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Device Info */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">设备信息</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">型号</span>
                    <span className="font-medium text-card-foreground">{device.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">固件版本</span>
                    <span className="font-medium text-card-foreground">{device.firmware}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">上次同步</span>
                    <span className="font-medium text-card-foreground">{device.lastSync}</span>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Disconnect */}
            <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10">
              <Power className="h-4 w-4 mr-2" />
              断开连接
            </Button>
          </>
        )}

        {/* Sports Tab - Only for Watch */}
        {activeTab === "sports" && device.type === "watch" && (
          <>
            {/* Start Workout */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">开始运动</h3>
                <Link href="/devices/1/sports" className="text-sm text-primary font-medium flex items-center gap-1">
                  全部 <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {sportTypes.slice(0, 6).map((sport) => (
                  <Link key={sport.id} href={`/devices/1/sports/${sport.id}`}>
                    <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className={`p-3 rounded-2xl ${sport.color}/10 mb-2`}>
                          <sport.icon className={`h-6 w-6 ${sport.color.replace("bg-", "text-")}`} />
                        </div>
                        <span className="text-xs font-medium text-foreground text-center">{sport.name}</span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* Today's Stats */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">今日数据</h3>
              <div className="grid grid-cols-2 gap-3">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-green-500/10">
                        <Footprints className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-sm text-muted-foreground">步数</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{healthData.steps.value.toLocaleString()}</p>
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${Math.min((healthData.steps.value / healthData.steps.goal) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">目标 {healthData.steps.goal.toLocaleString()} 步</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-orange-500/10">
                        <Flame className="h-5 w-5 text-orange-600" />
                      </div>
                      <span className="text-sm text-muted-foreground">卡路里</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{healthData.calories.value}</p>
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${Math.min((healthData.calories.value / healthData.calories.goal) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">目标 {healthData.calories.goal} 千卡</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Recent Workouts */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">运动记录</h3>
                <Link href="/devices/1/sports/history" className="text-sm text-primary font-medium flex items-center gap-1">
                  全部 <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-2">
                {recentWorkouts.map((workout) => (
                  <Card key={workout.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-primary/10">
                            <Activity className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{workout.type}</p>
                            <p className="text-xs text-muted-foreground">{workout.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{workout.distance}</p>
                          <p className="text-xs text-muted-foreground">{workout.duration} · {workout.calories} 千卡</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Training Plans */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">训练计划</h3>
              <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/10 to-accent/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-primary/20">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">5公里跑步训练</p>
                        <p className="text-sm text-muted-foreground">8周入门计划 · 第3周</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}

        {/* Health Tab - Only for Watch */}
        {activeTab === "health" && device.type === "watch" && (
          <>
            {/* Health Overview */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">健康概览</h3>
              <div className="grid grid-cols-2 gap-3">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="h-5 w-5 text-rose-500" />
                      <span className="text-sm text-muted-foreground">心率</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{healthData.heartRate.value}</p>
                    <p className="text-sm text-muted-foreground">{healthData.heartRate.unit}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                      {healthData.heartRate.status}
                    </span>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Moon className="h-5 w-5 text-indigo-500" />
                      <span className="text-sm text-muted-foreground">睡眠</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{healthData.sleep.value}</p>
                    <p className="text-sm text-muted-foreground">{healthData.sleep.unit}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-medium">
                      {healthData.sleep.quality}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Health Metrics List */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">健康指标</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0 divide-y divide-border">
                  {[
                    { icon: Heart, label: "心率", value: "72 bpm", sublabel: "静息心率", color: "text-rose-500", bg: "bg-rose-500/10" },
                    { icon: Activity, label: "血氧", value: "98%", sublabel: "正常范围", color: "text-blue-500", bg: "bg-blue-500/10" },
                    { icon: TrendingUp, label: "压力", value: "42", sublabel: "放松状态", color: "text-amber-500", bg: "bg-amber-500/10" },
                    { icon: Moon, label: "睡眠", value: "7.5小时", sublabel: "深睡2.1小时", color: "text-indigo-500", bg: "bg-indigo-500/10" },
                    { icon: Footprints, label: "步数", value: "8,432", sublabel: "目标 10,000", color: "text-green-500", bg: "bg-green-500/10" },
                    { icon: Flame, label: "卡路里", value: "420 千卡", sublabel: "活动消耗", color: "text-orange-500", bg: "bg-orange-500/10" },
                  ].map((metric) => (
                    <Link 
                      key={metric.label} 
                      href={`/devices/1/health/${metric.label.toLowerCase()}`}
                      className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${metric.bg}`}>
                          <metric.icon className={`h-5 w-5 ${metric.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{metric.label}</p>
                          <p className="text-xs text-muted-foreground">{metric.sublabel}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{metric.value}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Health Insights */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">健康洞察</h3>
              <Card className="border-0 shadow-sm bg-gradient-to-r from-rose-500/10 to-orange-500/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-rose-500/20">
                      <Heart className="h-5 w-5 text-rose-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">心率趋势分析</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        本周您的静息心率平均为 68 bpm，比上周下降 3 bpm，保持良好的运动习惯！
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </main>

      {/* Save Preset Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>保存自定义预设</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="请输入预设名称"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              取消
            </Button>
            <Button onClick={saveCustomPreset}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sleep Timer Dialog */}
      <Dialog open={showSleepTimerDialog} onOpenChange={setShowSleepTimerDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>定时停止播放</DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-5">
            {/* Mode Toggle */}
            <div className="flex rounded-xl bg-secondary p-1 gap-1">
              <button
                onClick={() => setSleepTimerMode("countdown")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sleepTimerMode === "countdown"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                倒计时
              </button>
              <button
                onClick={() => setSleepTimerMode("clock")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sleepTimerMode === "clock"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                指定时间点
              </button>
            </div>

            {/* Countdown Mode */}
            {sleepTimerMode === "countdown" && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {countdownOptions.map((min) => (
                    <button
                      key={min}
                      onClick={() => setCountdownMinutes(min)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        countdownMinutes === min
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {min >= 60 ? `${min / 60}小时` : `${min}分钟`}
                    </button>
                  ))}
                </div>
                {/* Custom input */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2 bg-secondary rounded-xl px-4 py-3">
                    <button
                      onClick={() => setCountdownMinutes(Math.max(1, countdownMinutes - 5))}
                      className="w-7 h-7 rounded-full bg-background flex items-center justify-center text-foreground font-bold shadow-sm"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-lg font-bold text-foreground">
                      {countdownMinutes} 分钟
                    </span>
                    <button
                      onClick={() => setCountdownMinutes(Math.min(180, countdownMinutes + 5))}
                      className="w-7 h-7 rounded-full bg-background flex items-center justify-center text-foreground font-bold shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  将在 <span className="text-foreground font-medium">{countdownMinutes} 分钟</span>后停止播放
                </p>
              </div>
            )}

            {/* Clock Mode */}
            {sleepTimerMode === "clock" && (
              <div className="space-y-3">
                <div className="flex flex-col items-center gap-3">
                  <Input
                    type="time"
                    value={clockTime}
                    onChange={(e) => setClockTime(e.target.value)}
                    className="text-center text-2xl font-bold h-14 rounded-xl"
                  />
                  {clockTime && (
                    <p className="text-xs text-muted-foreground text-center">
                      将在 <span className="text-foreground font-medium">{clockTime}</span> 停止播放
                    </p>
                  )}
                </div>
                {/* Quick time options */}
                <div className="grid grid-cols-3 gap-2">
                  {["22:00", "22:30", "23:00", "23:30", "00:00", "00:30"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setClockTime(t)}
                      className={`py-2 rounded-xl text-sm font-medium transition-colors ${
                        clockTime === t
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowSleepTimerDialog(false)}>
              取消
            </Button>
            <Button
              className="flex-1"
              onClick={activateSleepTimer}
              disabled={sleepTimerMode === "clock" && !clockTime}
            >
              <Check className="h-4 w-4 mr-1.5" />
              开始计时
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  )
}
