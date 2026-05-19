"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Footprints, Moon, Flame, Droplets, TrendingUp } from "lucide-react"

const healthData = [
  {
    icon: Footprints,
    label: "步数",
    value: "8,542",
    unit: "步",
    target: "10,000",
    progress: 85,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Heart,
    label: "心率",
    value: "72",
    unit: "bpm",
    status: "正常",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Moon,
    label: "睡眠",
    value: "7.5",
    unit: "小时",
    quality: "良好",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: Flame,
    label: "卡路里",
    value: "486",
    unit: "千卡",
    target: "600",
    progress: 81,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
]

export function HealthCards() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {healthData.map((item) => (
        <Card
          key={item.label}
          className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-xl ${item.bgColor}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              {item.progress && (
                <span className="text-xs text-muted-foreground">
                  {item.progress}%
                </span>
              )}
              {item.status && (
                <span className="text-xs text-accent font-medium">
                  {item.status}
                </span>
              )}
              {item.quality && (
                <span className="text-xs text-chart-4 font-medium">
                  {item.quality}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-card-foreground">
                  {item.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.unit}
                </span>
              </div>
              {item.target && (
                <div className="mt-2">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.bgColor.replace('/10', '')}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    目标: {item.target} {item.unit}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function StepsRing() {
  const steps = 8542
  const target = 10000
  const percentage = Math.min((steps / target) * 100, 100)
  const circumference = 2 * Math.PI * 80
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-card-foreground">今日步数</h3>
          <TrendingUp className="h-4 w-4 text-accent" />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg width="180" height="180" className="-rotate-90">
              <circle
                cx="90"
                cy="90"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-muted"
              />
              <circle
                cx="90"
                cy="90"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="text-primary transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Footprints className="h-6 w-6 text-primary mb-1" />
              <span className="text-3xl font-bold text-card-foreground">
                {steps.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">
                / {target.toLocaleString()} 步
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-semibold text-card-foreground">5.2</p>
            <p className="text-xs text-muted-foreground">公里</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-card-foreground">486</p>
            <p className="text-xs text-muted-foreground">千卡</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-card-foreground">68</p>
            <p className="text-xs text-muted-foreground">分钟</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function HeartRateCard() {
  const heartRateData = [72, 75, 68, 71, 78, 74, 70, 73, 76, 72, 69, 74]

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-destructive/10">
              <Heart className="h-4 w-4 text-destructive" />
            </div>
            <span className="font-medium text-card-foreground">心率</span>
          </div>
          <span className="text-xs text-muted-foreground">实时</span>
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-bold text-card-foreground">72</span>
          <span className="text-sm text-muted-foreground">bpm</span>
          <span className="text-xs text-accent ml-auto">正常范围</span>
        </div>
        <div className="h-16 flex items-end gap-1">
          {heartRateData.map((value, index) => (
            <div
              key={index}
              className="flex-1 bg-destructive/20 rounded-t-sm transition-all hover:bg-destructive/40"
              style={{ height: `${((value - 60) / 30) * 100}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>60-100 bpm 正常</span>
          <span>今日最高: 98 bpm</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function SleepCard() {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-chart-4/10">
              <Moon className="h-4 w-4 text-chart-4" />
            </div>
            <span className="font-medium text-card-foreground">睡眠</span>
          </div>
          <span className="text-xs text-muted-foreground">昨晚</span>
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-card-foreground">7h 32m</span>
          <span className="text-xs text-chart-4 ml-auto">良好</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 rounded-full bg-chart-4/80 flex-[3]" />
            <div className="h-2 rounded-full bg-chart-4/50 flex-[2]" />
            <div className="h-2 rounded-full bg-chart-4/30 flex-[1.5]" />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>深睡 3h</span>
            <span>浅睡 3h</span>
            <span>REM 1.5h</span>
          </div>
        </div>
        <div className="flex justify-between mt-4 pt-3 border-t border-border text-xs">
          <div>
            <p className="text-muted-foreground">入睡</p>
            <p className="font-medium text-card-foreground">23:15</p>
          </div>
          <div>
            <p className="text-muted-foreground">醒来</p>
            <p className="font-medium text-card-foreground">06:47</p>
          </div>
          <div>
            <p className="text-muted-foreground">睡眠评分</p>
            <p className="font-medium text-chart-4">85分</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function WaterIntakeCard() {
  const glasses = 6
  const target = 8

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10">
              <Droplets className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-card-foreground">饮水</span>
          </div>
          <button className="text-xs text-primary font-medium">+记录</button>
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-card-foreground">{glasses}</span>
          <span className="text-sm text-muted-foreground">/ {target} 杯</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: target }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-8 rounded-lg transition-colors ${
                i < glasses ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
