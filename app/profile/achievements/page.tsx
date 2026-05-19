"use client"

import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Trophy,
  Medal,
  Star,
  Target,
  Flame,
  Footprints,
  Heart,
  Moon,
  Calendar,
  Lock,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const achievements = [
  {
    category: "运动成就",
    items: [
      { id: 1, name: "首次运动", desc: "完成第一次运动记录", icon: Trophy, unlocked: true, date: "2024-01-15" },
      { id: 2, name: "连续7天", desc: "连续7天完成运动目标", icon: Flame, unlocked: true, date: "2024-02-20" },
      { id: 3, name: "万步达人", desc: "单日步数突破10000步", icon: Footprints, unlocked: true, date: "2024-03-10" },
      { id: 4, name: "月度冠军", desc: "单月运动超过20次", icon: Medal, unlocked: true, date: "2024-04-30" },
      { id: 5, name: "百公里俱乐部", desc: "累计跑步达到100公里", icon: Target, unlocked: false, progress: 68 },
    ]
  },
  {
    category: "健康成就",
    items: [
      { id: 6, name: "健康先锋", desc: "完成健康档案填写", icon: Heart, unlocked: true, date: "2024-01-10" },
      { id: 7, name: "早睡达人", desc: "连续30天22点前入睡", icon: Moon, unlocked: false, progress: 18 },
      { id: 8, name: "规律作息", desc: "连续14天睡眠超7小时", icon: Calendar, unlocked: true, date: "2024-05-01" },
    ]
  },
  {
    category: "里程碑",
    items: [
      { id: 9, name: "初来乍到", desc: "使用健康助手满1个月", icon: Star, unlocked: true, date: "2024-02-01" },
      { id: 10, name: "忠实用户", desc: "使用健康助手满1年", icon: Trophy, unlocked: true, date: "2025-01-01" },
      { id: 11, name: "数据专家", desc: "累计记录1000条健康数据", icon: Target, unlocked: false, progress: 756 },
    ]
  }
]

export default function AchievementsPage() {
  const router = useRouter()
  const totalUnlocked = achievements.flatMap(c => c.items).filter(a => a.unlocked).length
  const totalAchievements = achievements.flatMap(c => c.items).length

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">我的成就</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Summary */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-amber-500/10 to-orange-500/10">
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4">
              <Trophy className="h-8 w-8 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">{totalUnlocked}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              已解锁成就 / 共 {totalAchievements} 个
            </p>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${(totalUnlocked / totalAchievements) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Achievement Categories */}
        {achievements.map((category) => (
          <section key={category.category}>
            <h2 className="font-semibold text-foreground mb-3">{category.category}</h2>
            <div className="space-y-2">
              {category.items.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <Card 
                    key={achievement.id} 
                    className={`border-0 shadow-sm ${!achievement.unlocked && "opacity-60"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${
                          achievement.unlocked 
                            ? "bg-amber-500/10" 
                            : "bg-muted"
                        }`}>
                          {achievement.unlocked ? (
                            <Icon className="h-6 w-6 text-amber-500" />
                          ) : (
                            <Lock className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{achievement.name}</p>
                            {achievement.unlocked && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 text-xs">
                                已解锁
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{achievement.desc}</p>
                          {achievement.unlocked ? (
                            <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                          ) : (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                <span>进度</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${achievement.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
