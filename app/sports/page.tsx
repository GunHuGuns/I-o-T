"use client"

import { useState } from "react"
import { ArrowLeft, Play, MapPin, Clock, Flame, TrendingUp, ChevronRight, Calendar, Footprints } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import Link from "next/link"

const sportTypes = [
  { icon: "🏃", label: "跑步", color: "bg-chart-1" },
  { icon: "🚴", label: "骑行", color: "bg-accent" },
  { icon: "🏊", label: "游泳", color: "bg-primary" },
  { icon: "🚶", label: "健走", color: "bg-chart-3" },
  { icon: "🧘", label: "瑜伽", color: "bg-chart-4" },
  { icon: "🏋️", label: "力量", color: "bg-chart-5" },
  { icon: "⛷️", label: "滑雪", color: "bg-secondary" },
  { icon: "➕", label: "更多", color: "bg-muted" },
]

const recentActivities = [
  {
    id: 1,
    type: "跑步",
    icon: "🏃",
    date: "今天 07:30",
    duration: "32分钟",
    distance: "5.2公里",
    calories: 386,
    pace: "6'15\"",
  },
  {
    id: 2,
    type: "健走",
    icon: "🚶",
    date: "昨天 19:20",
    duration: "45分钟",
    distance: "3.8公里",
    calories: 198,
    pace: "11'50\"",
  },
  {
    id: 3,
    type: "骑行",
    icon: "🚴",
    date: "5月12日",
    duration: "1小时12分",
    distance: "22.5公里",
    calories: 542,
    pace: "18.7km/h",
  },
]

const weeklyStats = {
  totalTime: "4小时32分",
  totalDistance: "38.6公里",
  totalCalories: 1856,
  activities: 8,
}

export default function SportsPage() {
  const [activeTab, setActiveTab] = useState<"records" | "plans">("records")

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
            <h1 className="text-xl font-bold text-foreground">运动</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Calendar className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-6">
        {/* Start Workout Button */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-1">开始运动</h2>
                <p className="text-sm opacity-90">今天还没有运动记录哦</p>
              </div>
              <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 h-14 w-14">
                <Play className="h-6 w-6 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sport Types */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">运动类型</h2>
          <div className="grid grid-cols-4 gap-3">
            {sportTypes.map((sport) => (
              <button
                key={sport.label}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card hover:bg-secondary transition-colors"
              >
                <span className="text-2xl">{sport.icon}</span>
                <span className="text-xs text-card-foreground">{sport.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Weekly Stats */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">本周统计</h2>
            <button className="text-sm text-primary font-medium flex items-center gap-1">
              详情 <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">运动时长</span>
                  </div>
                  <p className="text-lg font-bold text-card-foreground">{weeklyStats.totalTime}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-xs text-muted-foreground">总距离</span>
                  </div>
                  <p className="text-lg font-bold text-card-foreground">{weeklyStats.totalDistance}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-chart-3" />
                    <span className="text-xs text-muted-foreground">消耗热量</span>
                  </div>
                  <p className="text-lg font-bold text-card-foreground">{weeklyStats.totalCalories} 千卡</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-chart-4" />
                    <span className="text-xs text-muted-foreground">运动次数</span>
                  </div>
                  <p className="text-lg font-bold text-card-foreground">{weeklyStats.activities} 次</p>
                </div>
              </div>
              {/* Weekly Chart */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-end justify-between h-20 gap-2">
                  {["一", "二", "三", "四", "五", "六", "日"].map((day, index) => {
                    const heights = [40, 60, 30, 80, 50, 90, 20]
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className="w-full bg-primary/20 rounded-t-sm"
                          style={{ height: `${heights[index]}%` }}
                        >
                          <div 
                            className="w-full bg-primary rounded-t-sm"
                            style={{ height: `${Math.min(heights[index], 70)}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{day}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          <button
            onClick={() => setActiveTab("records")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "records"
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            运动记录
          </button>
          <button
            onClick={() => setActiveTab("plans")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "plans"
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            训练计划
          </button>
        </div>

        {/* Recent Activities */}
        {activeTab === "records" && (
          <section>
            <h2 className="font-semibold text-foreground mb-3">最近记录</h2>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <Card key={activity.id} className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-primary/10">
                        <span className="text-2xl">{activity.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-card-foreground">{activity.type}</p>
                          <span className="text-xs text-muted-foreground">{activity.date}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activity.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {activity.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            {activity.calories}千卡
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Training Plans */}
        {activeTab === "plans" && (
          <section>
            <h2 className="font-semibold text-foreground mb-3">推荐计划</h2>
            <div className="space-y-3">
              {[
                { title: "新手跑步入门", duration: "4周", level: "初级", icon: "🏃" },
                { title: "燃脂塑形训练", duration: "6周", level: "中级", icon: "🔥" },
                { title: "马拉松备战", duration: "12周", level: "高级", icon: "🏆" },
              ].map((plan) => (
                <Card key={plan.title} className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-accent/10">
                        <span className="text-2xl">{plan.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-card-foreground">{plan.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">
                            {plan.duration}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
                            {plan.level}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
