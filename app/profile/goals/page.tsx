"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Footprints,
  Flame,
  Moon,
  Droplets,
  Activity,
  Heart,
  ChevronRight,
  Check,
  Plus,
  Minus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export default function HealthGoalsPage() {
  const router = useRouter()
  const [goals, setGoals] = useState({
    steps: 10000,
    calories: 500,
    sleep: 8,
    water: 8,
    exercise: 5,
    heartRateAlert: 120,
  })

  const goalItems = [
    { 
      id: "steps", 
      icon: Footprints, 
      label: "每日步数", 
      value: goals.steps, 
      unit: "步",
      min: 5000,
      max: 20000,
      step: 1000,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    { 
      id: "calories", 
      icon: Flame, 
      label: "消耗卡路里", 
      value: goals.calories, 
      unit: "千卡",
      min: 200,
      max: 1000,
      step: 50,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    { 
      id: "sleep", 
      icon: Moon, 
      label: "睡眠时长", 
      value: goals.sleep, 
      unit: "小时",
      min: 5,
      max: 10,
      step: 0.5,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    },
    { 
      id: "water", 
      icon: Droplets, 
      label: "每日饮水", 
      value: goals.water, 
      unit: "杯",
      min: 4,
      max: 12,
      step: 1,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10"
    },
    { 
      id: "exercise", 
      icon: Activity, 
      label: "每周运动", 
      value: goals.exercise, 
      unit: "次",
      min: 1,
      max: 7,
      step: 1,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    { 
      id: "heartRateAlert", 
      icon: Heart, 
      label: "心率预警", 
      value: goals.heartRateAlert, 
      unit: "bpm",
      min: 100,
      max: 180,
      step: 5,
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
  ]

  const updateGoal = (id: string, value: number) => {
    setGoals(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">健康目标</h1>
          </div>
          <Button size="sm">保存</Button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          设定适合自己的健康目标，系统将根据目标为您提供个性化建议
        </p>

        {goalItems.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${item.bg}`}>
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateGoal(item.id, Math.max(item.min, item.value - item.step))}
                      className="p-1.5 rounded-full bg-muted hover:bg-secondary transition-colors"
                    >
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <span className="w-24 text-center font-bold text-lg text-foreground">
                      {item.value} {item.unit}
                    </span>
                    <button 
                      onClick={() => updateGoal(item.id, Math.min(item.max, item.value + item.step))}
                      className="p-1.5 rounded-full bg-muted hover:bg-secondary transition-colors"
                    >
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <Slider
                  value={[item.value]}
                  onValueChange={([v]) => updateGoal(item.id, v)}
                  min={item.min}
                  max={item.max}
                  step={item.step}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{item.min}</span>
                  <span className="text-xs text-muted-foreground">{item.max}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Preset Goals */}
        <section className="mt-6">
          <h2 className="font-semibold text-foreground mb-3">推荐目标方案</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "健康入门", desc: "适合刚开始运动" },
              { name: "日常健康", desc: "维持健康状态" },
              { name: "减脂塑形", desc: "燃烧更多卡路里" },
              { name: "运动达人", desc: "挑战高强度目标" },
            ].map((preset) => (
              <Card key={preset.name} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <p className="font-medium text-foreground">{preset.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{preset.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
