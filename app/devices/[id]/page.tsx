"use client"

import { useState } from "react"
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
  Volume2,
  VolumeX,
  Music,
  Phone,
  Heart,
  Moon,
  Vibrate,
  MapPin,
  ChevronRight,
  Activity,
  Footprints,
  Flame,
  Droplets,
  Play,
  Timer,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { BottomNav } from "@/components/bottom-nav"

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
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
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

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      同步数据
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <MapPin className="h-4 w-4" />
                      查找设备
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Controls for Watch */}
            {device.type === "watch" && (
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
            )}

            {/* Quick Controls for Earbuds */}
            {device.type === "earbuds" && (
              <section>
                <h3 className="font-semibold text-foreground mb-3">快捷控制</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Volume2, label: "降噪", active: true },
                    { icon: VolumeX, label: "通透", active: false },
                    { icon: Music, label: "均衡器", active: false },
                  ].map((control) => (
                    <button
                      key={control.label}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-colors ${
                        control.active 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-card text-card-foreground hover:bg-secondary"
                      }`}
                    >
                      <control.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{control.label}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Settings */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">设备设置</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0 divide-y divide-border">
                  {device.type === "watch" && (
                    <>
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
                    </>
                  )}
                  
                  {/* Common Settings */}
                  <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-secondary">
                        <Settings className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <p className="font-medium text-card-foreground">高级设置</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </CardContent>
              </Card>
            </section>

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

      <BottomNav />
    </div>
  )
}
