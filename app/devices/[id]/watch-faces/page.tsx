"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Search,
  Download,
  Check,
  Star,
  Clock,
  TrendingUp,
  Heart,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"

const watchFaces = [
  {
    id: "1",
    name: "运动数据",
    category: "运动",
    downloads: 12500,
    rating: 4.8,
    preview: "bg-gradient-to-br from-green-500 to-emerald-600",
    installed: true,
    features: ["步数", "心率", "卡路里"]
  },
  {
    id: "2",
    name: "简约数字",
    category: "简约",
    downloads: 28000,
    rating: 4.9,
    preview: "bg-gradient-to-br from-slate-800 to-slate-900",
    installed: false,
    features: ["时间", "日期", "电量"]
  },
  {
    id: "3",
    name: "健康监测",
    category: "健康",
    downloads: 8500,
    rating: 4.7,
    preview: "bg-gradient-to-br from-rose-500 to-pink-600",
    installed: false,
    features: ["心率", "血氧", "压力"]
  },
  {
    id: "4",
    name: "商务经典",
    category: "商务",
    downloads: 15000,
    rating: 4.6,
    preview: "bg-gradient-to-br from-amber-600 to-orange-700",
    installed: false,
    features: ["时间", "日历", "天气"]
  },
  {
    id: "5",
    name: "科技感",
    category: "科技",
    downloads: 22000,
    rating: 4.8,
    preview: "bg-gradient-to-br from-blue-600 to-cyan-500",
    installed: true,
    features: ["时间", "步数", "天气"]
  },
  {
    id: "6",
    name: "自然风景",
    category: "自然",
    downloads: 9800,
    rating: 4.5,
    preview: "bg-gradient-to-br from-teal-500 to-green-600",
    installed: false,
    features: ["时间", "天气", "日出日落"]
  },
]

const categories = ["全部", "运动", "简约", "健康", "商务", "科技", "自然"]

export default function WatchFacesPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaces = watchFaces.filter(face => {
    const matchesCategory = selectedCategory === "全部" || face.category === selectedCategory
    const matchesSearch = face.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const installedFaces = watchFaces.filter(f => f.installed)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">表盘市场</h1>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索表盘..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Installed Section */}
        {selectedCategory === "全部" && (
          <section>
            <h3 className="font-semibold text-foreground mb-3">已安装 ({installedFaces.length})</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {installedFaces.map((face) => (
                <Card key={face.id} className="border-0 shadow-sm flex-shrink-0 w-32">
                  <CardContent className="p-3">
                    <div className={`aspect-square rounded-xl ${face.preview} mb-2 flex items-center justify-center`}>
                      <div className="text-white text-center">
                        <Clock className="h-8 w-8 mx-auto mb-1" />
                        <span className="text-xs">12:00</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">{face.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Check className="h-3 w-3 text-accent" />
                      <span className="text-xs text-accent">已安装</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Watch Faces */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">
              {selectedCategory === "全部" ? "推荐表盘" : selectedCategory}
            </h3>
            <span className="text-sm text-muted-foreground">{filteredFaces.length} 款</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filteredFaces.map((face) => (
              <Card key={face.id} className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className={`aspect-square ${face.preview} flex items-center justify-center relative`}>
                    <div className="text-white text-center">
                      <Clock className="h-12 w-12 mx-auto mb-2" />
                      <span className="text-lg font-bold">12:00</span>
                    </div>
                    {face.installed && (
                      <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                        已安装
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-foreground">{face.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        {face.rating}
                      </span>
                      <span>·</span>
                      <span>{(face.downloads / 1000).toFixed(1)}k 下载</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {face.features.map((f) => (
                        <span key={f} className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                          {f}
                        </span>
                      ))}
                    </div>
                    <Button 
                      className="w-full mt-3" 
                      size="sm"
                      variant={face.installed ? "outline" : "default"}
                    >
                      {face.installed ? "设为当前" : "下载"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
