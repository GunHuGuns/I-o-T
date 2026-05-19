"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Search,
  ChevronRight,
  Activity,
  Footprints,
  Bike,
  Dumbbell,
  Heart,
  Droplets,
  Mountain,
  Waves,
  Timer,
  Flame,
  Wind,
  Snowflake,
  Sun,
  Moon,
  Zap,
  Target
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"

const sportCategories = [
  {
    id: "outdoor",
    name: "户外运动",
    icon: Sun,
    color: "bg-green-500",
    sports: [
      { id: "outdoor-run", name: "户外跑步", icon: Activity },
      { id: "outdoor-walk", name: "户外步行", icon: Footprints },
      { id: "outdoor-cycle", name: "户外骑行", icon: Bike },
      { id: "hiking", name: "徒步", icon: Mountain },
      { id: "trail-run", name: "越野跑", icon: Mountain },
      { id: "climbing", name: "登山", icon: Mountain },
    ]
  },
  {
    id: "indoor",
    name: "室内运动",
    icon: Dumbbell,
    color: "bg-blue-500",
    sports: [
      { id: "indoor-run", name: "室内跑步", icon: Activity },
      { id: "indoor-walk", name: "室内步行", icon: Footprints },
      { id: "indoor-cycle", name: "室内骑行", icon: Bike },
      { id: "elliptical", name: "椭圆机", icon: Activity },
      { id: "rowing", name: "划船机", icon: Waves },
      { id: "stair-climber", name: "爬楼机", icon: Activity },
    ]
  },
  {
    id: "fitness",
    name: "健身训练",
    icon: Zap,
    color: "bg-orange-500",
    sports: [
      { id: "strength", name: "力量训练", icon: Dumbbell },
      { id: "hiit", name: "HIIT", icon: Flame },
      { id: "core", name: "核心训练", icon: Target },
      { id: "flexibility", name: "柔韧训练", icon: Activity },
      { id: "yoga", name: "瑜伽", icon: Heart },
      { id: "pilates", name: "普拉提", icon: Activity },
    ]
  },
  {
    id: "water",
    name: "水上运动",
    icon: Droplets,
    color: "bg-cyan-500",
    sports: [
      { id: "pool-swim", name: "泳池游泳", icon: Waves },
      { id: "open-water", name: "开放水域游泳", icon: Waves },
      { id: "surfing", name: "冲浪", icon: Waves },
      { id: "rowing-water", name: "划船", icon: Waves },
      { id: "kayak", name: "皮划艇", icon: Waves },
      { id: "diving", name: "潜水", icon: Droplets },
    ]
  },
  {
    id: "winter",
    name: "冬季运动",
    icon: Snowflake,
    color: "bg-indigo-500",
    sports: [
      { id: "skiing", name: "滑雪", icon: Mountain },
      { id: "snowboard", name: "单板滑雪", icon: Mountain },
      { id: "cross-country", name: "越野滑雪", icon: Activity },
      { id: "ice-skating", name: "滑冰", icon: Wind },
    ]
  },
  {
    id: "ball",
    name: "球类运动",
    icon: Target,
    color: "bg-purple-500",
    sports: [
      { id: "basketball", name: "篮球", icon: Target },
      { id: "football", name: "足球", icon: Target },
      { id: "tennis", name: "网球", icon: Target },
      { id: "badminton", name: "羽毛球", icon: Target },
      { id: "table-tennis", name: "乒乓球", icon: Target },
      { id: "golf", name: "高尔夫", icon: Target },
      { id: "volleyball", name: "排球", icon: Target },
    ]
  },
  {
    id: "dance",
    name: "舞蹈健身",
    icon: Activity,
    color: "bg-pink-500",
    sports: [
      { id: "dance", name: "自由舞蹈", icon: Activity },
      { id: "belly-dance", name: "肚皮舞", icon: Activity },
      { id: "square-dance", name: "广场舞", icon: Activity },
      { id: "aerobics", name: "健美操", icon: Activity },
      { id: "zumba", name: "尊巴", icon: Activity },
    ]
  },
  {
    id: "martial",
    name: "格斗武术",
    icon: Zap,
    color: "bg-red-500",
    sports: [
      { id: "boxing", name: "拳击", icon: Zap },
      { id: "taekwondo", name: "跆拳道", icon: Zap },
      { id: "karate", name: "空手道", icon: Zap },
      { id: "judo", name: "柔道", icon: Zap },
      { id: "fencing", name: "击剑", icon: Zap },
    ]
  },
]

export default function AllSportsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const totalSports = sportCategories.reduce((acc, cat) => acc + cat.sports.length, 0)

  const filteredCategories = sportCategories.map(cat => ({
    ...cat,
    sports: cat.sports.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.sports.length > 0)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">运动模式</h1>
            <p className="text-xs text-muted-foreground">支持 {totalSports}+ 种运动</p>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索运动类型..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-3">
        {filteredCategories.map((category) => {
          const Icon = category.icon
          const isExpanded = expandedCategory === category.id

          return (
            <Card key={category.id} className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className={`p-3 rounded-2xl ${category.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.sports.length} 种运动</p>
                  </div>
                  <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </button>

                {/* Sports List */}
                {isExpanded && (
                  <div className="border-t border-border">
                    {category.sports.map((sport, index) => {
                      const SportIcon = sport.icon
                      return (
                        <button
                          key={sport.id}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors ${
                            index !== category.sports.length - 1 ? "border-b border-border" : ""
                          }`}
                        >
                          <div className="p-2 rounded-xl bg-secondary">
                            <SportIcon className="h-5 w-5 text-secondary-foreground" />
                          </div>
                          <span className="font-medium text-foreground">{sport.name}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </main>

      <BottomNav />
    </div>
  )
}
