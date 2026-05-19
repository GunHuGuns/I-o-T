"use client"

import { use } from "react"
import { ArrowLeft, Search, Bluetooth, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BottomNav } from "@/components/bottom-nav"
import Link from "next/link"

const categoryData: Record<string, {
  name: string
  description: string
  devices: Array<{
    id: string
    name: string
    model: string
    image: string
    features: string[]
  }>
}> = {
  wearable: {
    name: "穿戴设备",
    description: "智能手表、手环等可穿戴设备",
    devices: [
      {
        id: "watch-gt5",
        name: "智能手表 GT5 Pro",
        model: "高端旗舰款",
        image: "⌚",
        features: ["心率监测", "GPS定位", "血氧检测", "NFC支付"],
      },
      {
        id: "watch-gt4",
        name: "智能手表 GT4",
        model: "经典款",
        image: "⌚",
        features: ["心率监测", "睡眠追踪", "运动模式"],
      },
      {
        id: "band-8",
        name: "智能手环 8",
        model: "轻量款",
        image: "⌚",
        features: ["心率监测", "步数统计", "消息提醒"],
      },
      {
        id: "watch-fit",
        name: "智能手表 FIT",
        model: "运动款",
        image: "⌚",
        features: ["运动模式", "心率监测", "GPS"],
      },
      {
        id: "glasses",
        name: "智能眼镜",
        model: "AR增强款",
        image: "👓",
        features: ["AR显示", "语音助手", "拍照"],
      },
    ],
  },
  audio: {
    name: "音频设备",
    description: "无线耳机、智能音箱等音频设备",
    devices: [
      {
        id: "freebuds-pro3",
        name: "FreeBuds Pro 3",
        model: "旗舰降噪",
        image: "🎧",
        features: ["主动降噪", "空间音频", "无线充电"],
      },
      {
        id: "freebuds-5i",
        name: "FreeBuds 5i",
        model: "入门降噪",
        image: "🎧",
        features: ["主动降噪", "长续航", "快充"],
      },
      {
        id: "freelace",
        name: "FreeLace Pro",
        model: "颈挂式",
        image: "🎧",
        features: ["主动降噪", "磁吸充电", "运动防水"],
      },
      {
        id: "sound-x",
        name: "Sound X",
        model: "智能音箱",
        image: "🔊",
        features: ["Hi-Res音质", "语音助手", "智能家居控制"],
      },
    ],
  },
  health: {
    name: "健康设备",
    description: "体脂秤、血压计等健康监测设备",
    devices: [
      {
        id: "scale-3",
        name: "智能体脂秤 3",
        model: "旗舰款",
        image: "⚖️",
        features: ["14项身体指标", "心率检测", "WiFi同步"],
      },
      {
        id: "scale-2",
        name: "智能体脂秤 2",
        model: "标准款",
        image: "⚖️",
        features: ["11项身体指标", "蓝牙同步"],
      },
      {
        id: "bp-monitor",
        name: "智能血压计",
        model: "医疗级",
        image: "💓",
        features: ["高精度测量", "心律不齐检测", "云端记录"],
      },
      {
        id: "thermometer",
        name: "智能体温计",
        model: "额温枪",
        image: "🌡️",
        features: ["秒速测温", "历史记录", "发烧提醒"],
      },
    ],
  },
  sports: {
    name: "运动设备",
    description: "跑步机、动感单车等健身设备",
    devices: [
      {
        id: "treadmill-pro",
        name: "智能跑步机 Pro",
        model: "家用旗舰",
        image: "🏃",
        features: ["智能调速", "心率训练", "虚拟跑道"],
      },
      {
        id: "bike-s3",
        name: "动感单车 S3",
        model: "智能款",
        image: "🚴",
        features: ["智能阻力", "实时数据", "在线课程"],
      },
      {
        id: "rower",
        name: "智能划船机",
        model: "水阻款",
        image: "🚣",
        features: ["真实水阻", "全身训练", "折叠收纳"],
      },
    ],
  },
  home: {
    name: "智能家居",
    description: "智能灯泡、插座等家居设备",
    devices: [
      {
        id: "bulb-e27",
        name: "智能灯泡 E27",
        model: "彩光版",
        image: "💡",
        features: ["1600万色", "语音控制", "定时开关"],
      },
      {
        id: "plug",
        name: "智能插座",
        model: "WiFi版",
        image: "🔌",
        features: ["远程控制", "用电统计", "定时开关"],
      },
      {
        id: "lock",
        name: "智能门锁 Pro",
        model: "指纹版",
        image: "🔐",
        features: ["指纹识别", "密码开锁", "远程开门"],
      },
      {
        id: "camera",
        name: "智能摄像头",
        model: "室内版",
        image: "📷",
        features: ["1080P高清", "夜视", "双向语音"],
      },
    ],
  },
  display: {
    name: "显示设备",
    description: "智能电视、显示器等显示设备",
    devices: [
      {
        id: "tv-75",
        name: "智慧屏 75\"",
        model: "旗舰版",
        image: "📺",
        features: ["4K HDR", "AI画质", "鸿蒙系统"],
      },
      {
        id: "tv-55",
        name: "智慧屏 55\"",
        model: "标准版",
        image: "📺",
        features: ["4K", "AI语音", "投屏"],
      },
      {
        id: "monitor",
        name: "智能显示器",
        model: "27\" 4K",
        image: "🖥️",
        features: ["4K分辨率", "Type-C一线通", "护眼模式"],
      },
    ],
  },
}

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const category = categoryData[resolvedParams.id] || categoryData.wearable

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">{category.name}</h1>
            <p className="text-xs text-muted-foreground">{category.description}</p>
          </div>
        </div>
        {/* Search Bar */}
        <div className="px-4 pb-3 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="搜索设备..." 
              className="pl-10 bg-secondary border-0"
            />
          </div>
          <Button variant="secondary" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Device List */}
      <main className="px-4 py-4">
        <div className="space-y-3">
          {category.devices.map((device) => (
            <Card key={device.id} className="border-0 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl">
                    {device.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{device.name}</h3>
                    <p className="text-sm text-muted-foreground">{device.model}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {device.features.slice(0, 3).map((feature) => (
                        <span 
                          key={feature}
                          className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" className="self-center">
                    <Bluetooth className="h-4 w-4 mr-1" />
                    配对
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card className="mt-6 border-0 bg-primary/5">
          <CardContent className="p-4">
            <h4 className="font-medium text-foreground mb-2">配对提示</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>1. 确保设备已开机并处于配对模式</li>
              <li>2. 打开手机蓝牙并保持在设备附近</li>
              <li>3. 点击"配对"按钮开始搜索</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
