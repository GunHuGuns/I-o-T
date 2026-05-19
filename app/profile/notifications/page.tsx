"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Bell,
  BellOff,
  Watch,
  Heart,
  Moon,
  Activity,
  Smartphone,
  Mail,
  MessageSquare,
  ChevronRight,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function NotificationSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    masterSwitch: true,
    deviceAlerts: true,
    healthReminders: true,
    sleepReminders: true,
    exerciseReminders: true,
    appUpdates: false,
    promotions: false,
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">通知设置</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Master Switch */}
        <Card className={`border-0 shadow-sm ${!settings.masterSwitch && "opacity-60"}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${settings.masterSwitch ? "bg-primary/10" : "bg-muted"}`}>
                  {settings.masterSwitch ? (
                    <Bell className="h-5 w-5 text-primary" />
                  ) : (
                    <BellOff className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">接收通知</p>
                  <p className="text-xs text-muted-foreground">开启后可接收各类消息提醒</p>
                </div>
              </div>
              <Switch 
                checked={settings.masterSwitch} 
                onCheckedChange={() => toggleSetting("masterSwitch")} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Types */}
        <section className={!settings.masterSwitch ? "opacity-50 pointer-events-none" : ""}>
          <h2 className="font-semibold text-foreground mb-3">通知类型</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0 divide-y divide-border">
              <NotificationItem
                icon={Watch}
                label="设备提醒"
                desc="设备连接、电量、更新等提醒"
                checked={settings.deviceAlerts}
                onToggle={() => toggleSetting("deviceAlerts")}
              />
              <NotificationItem
                icon={Heart}
                label="健康提醒"
                desc="心率异常、久坐提醒等"
                checked={settings.healthReminders}
                onToggle={() => toggleSetting("healthReminders")}
              />
              <NotificationItem
                icon={Moon}
                label="睡眠提醒"
                desc="就寝提醒和睡眠报告"
                checked={settings.sleepReminders}
                onToggle={() => toggleSetting("sleepReminders")}
              />
              <NotificationItem
                icon={Activity}
                label="运动提醒"
                desc="运动目标和训练提醒"
                checked={settings.exerciseReminders}
                onToggle={() => toggleSetting("exerciseReminders")}
              />
              <NotificationItem
                icon={Smartphone}
                label="应用更新"
                desc="新功能和版本更新通知"
                checked={settings.appUpdates}
                onToggle={() => toggleSetting("appUpdates")}
              />
              <NotificationItem
                icon={Mail}
                label="活动推广"
                desc="优惠活动和健康资讯"
                checked={settings.promotions}
                onToggle={() => toggleSetting("promotions")}
              />
            </CardContent>
          </Card>
        </section>

        {/* Quiet Hours */}
        <section className={!settings.masterSwitch ? "opacity-50 pointer-events-none" : ""}>
          <h2 className="font-semibold text-foreground mb-3">免打扰</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0 divide-y divide-border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10">
                    <Moon className="h-4 w-4 text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">免打扰模式</p>
                    <p className="text-xs text-muted-foreground">开启期间不接收通知</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.quietHours} 
                  onCheckedChange={() => toggleSetting("quietHours")} 
                />
              </div>
              {settings.quietHours && (
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">免打扰时段</span>
                    </div>
                    <button className="flex items-center gap-2 text-foreground">
                      <span>{settings.quietStart} - {settings.quietEnd}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

function NotificationItem({
  icon: Icon,
  label,
  desc,
  checked,
  onToggle
}: {
  icon: typeof Bell
  label: string
  desc: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-secondary">
          <Icon className="h-4 w-4 text-secondary-foreground" />
        </div>
        <div>
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  )
}
