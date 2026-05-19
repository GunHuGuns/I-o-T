"use client"

import { 
  ArrowLeft, 
  ChevronRight, 
  User,
  Heart,
  Target,
  Bell,
  Shield,
  HelpCircle,
  Star,
  LogOut,
  Moon,
  Smartphone,
  FileText,
  Award,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import Link from "next/link"

const userProfile = {
  name: "张小明",
  avatar: null,
  level: "健康达人 Lv.8",
  memberSince: "2023年3月",
  stats: {
    totalDays: 365,
    totalSteps: 2456000,
    achievements: 28,
  },
}

const healthGoals = [
  { label: "每日步数", value: "10,000", unit: "步" },
  { label: "每日睡眠", value: "8", unit: "小时" },
  { label: "每周运动", value: "5", unit: "次" },
]

const menuItems = [
  {
    title: "账号与安全",
    items: [
      { icon: User, label: "个人资料", href: "/profile/info" },
      { icon: Heart, label: "健康档案", href: "/profile/health" },
      { icon: Target, label: "健康目标", href: "/profile/goals" },
    ],
  },
  {
    title: "通用设置",
    items: [
      { icon: Bell, label: "通知设置", href: "/profile/notifications" },
      { icon: Smartphone, label: "设备管理", href: "/devices" },
      { icon: Moon, label: "深色模式", href: "#", toggle: true },
    ],
  },
  {
    title: "更多",
    items: [
      { icon: Award, label: "我的成就", href: "/profile/achievements" },
      { icon: FileText, label: "数据报告", href: "/profile/reports" },
      { icon: Star, label: "给我们评分", href: "#" },
      { icon: HelpCircle, label: "帮助与反馈", href: "/profile/help" },
      { icon: Shield, label: "隐私政策", href: "/profile/privacy" },
    ],
  },
]

export default function ProfilePage() {
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
            <h1 className="text-xl font-bold text-foreground">我的</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-card-foreground">{userProfile.name}</h2>
                <p className="text-sm text-primary font-medium">{userProfile.level}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  加入于 {userProfile.memberSince}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-xl font-bold text-card-foreground">
                  {userProfile.stats.totalDays}
                </p>
                <p className="text-xs text-muted-foreground">累计天数</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-card-foreground">
                  {(userProfile.stats.totalSteps / 10000).toFixed(0)}万
                </p>
                <p className="text-xs text-muted-foreground">累计步数</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-card-foreground">
                  {userProfile.stats.achievements}
                </p>
                <p className="text-xs text-muted-foreground">获得成就</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Goals */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">健康目标</h2>
            <button className="text-sm text-primary font-medium flex items-center gap-1">
              编辑 <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4">
                {healthGoals.map((goal) => (
                  <div key={goal.label} className="text-center p-3 rounded-xl bg-secondary/50">
                    <p className="text-lg font-bold text-card-foreground">
                      {goal.value}
                      <span className="text-xs font-normal text-muted-foreground ml-1">
                        {goal.unit}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{goal.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Stats */}
        <section>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-accent/10 to-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-accent/20">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">健康趋势良好</p>
                  <p className="text-sm text-muted-foreground">本周运动达标率 85%</p>
                </div>
                <Button variant="outline" size="sm">
                  查看报告
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Menu Sections */}
        {menuItems.map((section) => (
          <section key={section.title}>
            <h2 className="font-semibold text-foreground mb-3">{section.title}</h2>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0 divide-y divide-border">
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-secondary">
                        <item.icon className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <span className="font-medium text-card-foreground">{item.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          </section>
        ))}

        {/* Logout */}
        <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10">
          <LogOut className="h-4 w-4 mr-2" />
          退出登录
        </Button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground py-4">
          健康助手 v2.1.0
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
