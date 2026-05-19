"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { 
  Watch, 
  Headphones, 
  Scale, 
  Smartphone,
  Battery,
  Volume2,
  VolumeX,
  Heart,
  Moon,
  Footprints,
  Thermometer,
  Droplets,
  Lightbulb,
  Tv,
  Speaker,
  Camera,
  Home,
  Dumbbell,
  Activity,
  ChevronRight,
  Bluetooth,
  Signal,
  Play,
  Pause,
  SkipForward,
  Music
} from "lucide-react"
import Link from "next/link"

// 已连接设备数据
const connectedDevices = [
  {
    id: "1",
    name: "Watch GT 5 Pro",
    type: "watch",
    status: "已连接",
    battery: 78,
    icon: Watch,
    quickInfo: { label: "心率", value: "72", unit: "bpm" },
    color: "from-blue-500/10 to-cyan-500/10",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    id: "2",
    name: "FreeBuds Pro 3",
    type: "earbuds",
    status: "播放中",
    battery: 45,
    icon: Headphones,
    quickInfo: { label: "降噪", value: "开启", unit: "" },
    color: "from-orange-500/10 to-amber-500/10",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
    isPlaying: true,
  },
]

// 设备分类数据
const deviceCategories = [
  {
    id: "wearable",
    name: "穿戴设备",
    icon: Watch,
    count: 5,
    color: "bg-blue-500/10",
    iconColor: "text-blue-600",
    items: ["智能手表", "智能手环", "智能眼镜", "智能戒指"],
  },
  {
    id: "audio",
    name: "音频设备",
    icon: Headphones,
    count: 8,
    color: "bg-orange-500/10",
    iconColor: "text-orange-600",
    items: ["无线耳机", "颈挂耳机", "智能音箱"],
  },
  {
    id: "health",
    name: "健康设备",
    icon: Heart,
    count: 6,
    color: "bg-rose-500/10",
    iconColor: "text-rose-600",
    items: ["体脂秤", "血压计", "血糖仪", "体温计"],
  },
  {
    id: "sports",
    name: "运动设备",
    icon: Dumbbell,
    count: 4,
    color: "bg-purple-500/10",
    iconColor: "text-purple-600",
    items: ["跑步机", "动感单车", "划船机"],
  },
  {
    id: "home",
    name: "智能家居",
    icon: Home,
    count: 12,
    color: "bg-teal-500/10",
    iconColor: "text-teal-600",
    items: ["智能灯泡", "智能插座", "智能门锁"],
  },
  {
    id: "display",
    name: "显示设备",
    icon: Tv,
    count: 3,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-600",
    items: ["智能电视", "智能显示器"],
  },
]

export function ConnectedDeviceGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {connectedDevices.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  )
}

function DeviceCard({ device }: { device: typeof connectedDevices[0] }) {
  const [isOn, setIsOn] = useState(true)
  const Icon = device.icon

  return (
    <Link href={`/devices/${device.id}`}>
      <Card className={`border-0 shadow-sm hover:shadow-md transition-all bg-gradient-to-br ${device.color} min-h-[160px]`}>
        <CardContent className="p-4 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-2xl ${device.iconBg}`}>
              <Icon className={`h-6 w-6 ${device.iconColor}`} />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Battery className="h-3 w-3" />
              <span>{device.battery}%</span>
            </div>
          </div>

          {/* Device Info */}
          <div className="flex-1">
            <h3 className="font-medium text-foreground text-sm leading-tight">{device.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Signal className="h-3 w-3 text-accent" />
              <span className="text-xs text-accent">{device.status}</span>
            </div>
          </div>

          {/* Quick Info / Control */}
          <div className="mt-3 pt-3 border-t border-border/50">
            {device.type === "earbuds" && device.isPlaying ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Music className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate max-w-[60px]">正在播放</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-foreground/5 rounded" onClick={(e) => e.preventDefault()}>
                    <SkipForward className="h-4 w-4 text-foreground rotate-180" />
                  </button>
                  <button className="p-1 hover:bg-foreground/5 rounded" onClick={(e) => e.preventDefault()}>
                    <Pause className="h-4 w-4 text-foreground" />
                  </button>
                  <button className="p-1 hover:bg-foreground/5 rounded" onClick={(e) => e.preventDefault()}>
                    <SkipForward className="h-4 w-4 text-foreground" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{device.quickInfo.label}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {device.quickInfo.value}
                    <span className="text-xs font-normal text-muted-foreground ml-0.5">
                      {device.quickInfo.unit}
                    </span>
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function AddDeviceCard() {
  return (
    <Link href="/devices">
      <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors min-h-[160px]">
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <div className="p-3 rounded-2xl bg-muted mb-2">
            <Bluetooth className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">添加设备</p>
          <p className="text-xs text-muted-foreground mt-1">搜索附近设备</p>
        </CardContent>
      </Card>
    </Link>
  )
}

export function DeviceCategoryList() {
  return (
    <div className="space-y-2">
      {deviceCategories.map((category) => {
        const Icon = category.icon
        return (
          <Link key={category.id} href={`/devices/category/${category.id}`}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${category.color}`}>
                    <Icon className={`h-6 w-6 ${category.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {category.items.slice(0, 3).join("、")}
                      {category.items.length > 3 && "..."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{category.count}款</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

// 设备快捷控制卡片 - 大卡片版本（用于更复杂的控制）
export function DeviceControlCard({ device }: { device: typeof connectedDevices[0] }) {
  const [isOn, setIsOn] = useState(true)
  const Icon = device.icon

  return (
    <Card className={`border-0 shadow-sm bg-gradient-to-br ${device.color}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${device.iconBg}`}>
              <Icon className={`h-7 w-7 ${device.iconColor}`} />
            </div>
            <div>
              <h3 className="font-medium text-foreground">{device.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Signal className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">{device.status}</span>
                <span className="text-xs text-muted-foreground">|</span>
                <Battery className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{device.battery}%</span>
              </div>
            </div>
          </div>
          <Switch checked={isOn} onCheckedChange={setIsOn} />
        </div>

        {/* Device specific quick controls */}
        {device.type === "watch" && (
          <div className="grid grid-cols-4 gap-2">
            <QuickControlButton icon={Heart} label="心率" active />
            <QuickControlButton icon={Footprints} label="步数" />
            <QuickControlButton icon={Moon} label="睡眠" />
            <QuickControlButton icon={Activity} label="运动" />
          </div>
        )}

        {device.type === "earbuds" && (
          <div className="grid grid-cols-4 gap-2">
            <QuickControlButton icon={VolumeX} label="降噪" active />
            <QuickControlButton icon={Volume2} label="通透" />
            <QuickControlButton icon={Music} label="均衡" />
            <QuickControlButton icon={Smartphone} label="设备" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function QuickControlButton({ 
  icon: Icon, 
  label, 
  active = false 
}: { 
  icon: typeof Heart
  label: string
  active?: boolean 
}) {
  return (
    <button className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
      active ? "bg-primary/10" : "bg-foreground/5 hover:bg-foreground/10"
    }`}>
      <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
      <span className={`text-xs ${active ? "text-primary font-medium" : "text-muted-foreground"}`}>
        {label}
      </span>
    </button>
  )
}
