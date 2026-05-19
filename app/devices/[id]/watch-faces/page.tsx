"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { 
  ArrowLeft, 
  Clock,
  Download,
  Check,
  Star,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const watchFaces = [
  { id: "1", name: "经典数字", category: "简约", preview: "bg-gradient-to-br from-slate-800 to-slate-900", installed: true, popular: true },
  { id: "2", name: "动态天气", category: "实用", preview: "bg-gradient-to-br from-blue-500 to-cyan-500", installed: true, popular: false },
  { id: "3", name: "运动数据", category: "运动", preview: "bg-gradient-to-br from-green-500 to-emerald-500", installed: false, popular: true },
  { id: "4", name: "商务精英", category: "商务", preview: "bg-gradient-to-br from-gray-700 to-gray-900", installed: false, popular: false },
  { id: "5", name: "星空夜景", category: "艺术", preview: "bg-gradient-to-br from-indigo-900 to-purple-900", installed: false, popular: true },
  { id: "6", name: "极简指针", category: "简约", preview: "bg-gradient-to-br from-white to-gray-100", installed: false, popular: false },
  { id: "7", name: "健康监测", category: "健康", preview: "bg-gradient-to-br from-rose-500 to-pink-500", installed: false, popular: true },
  { id: "8", name: "复古怀旧", category: "艺术", preview: "bg-gradient-to-br from-amber-700 to-orange-800", installed: false, popular: false },
  { id: "9", name: "科技感", category: "科技", preview: "bg-gradient-to-br from-cyan-500 to-blue-600", installed: false, popular: true },
]

const categories = ["全部", "简约", "运动", "商务", "艺术", "健康", "实用", "科技"]

export default function WatchFacesPage() {
  const router = useRouter()
  const params = useParams()
  const deviceId = params.id
  
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")
  const [installedFaces, setInstalledFaces] = useState(
    watchFaces.filter(f => f.installed).map(f => f.id)
  )

  const filteredFaces = watchFaces.filter(face => {
    const matchesCategory = selectedCategory === "全部" || face.category === selectedCategory
    const matchesSearch = face.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleInstall = (faceId: string) => {
    if (installedFaces.includes(faceId)) {
      setInstalledFaces(installedFaces.filter(id => id !== faceId))
    } else {
      setInstalledFaces([...installedFaces, faceId])
    }
  }

  return (
    <div className="min-h-screen bg-background pb-6">
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
            <Input
              placeholder="搜索表盘..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
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

      <main className="px-4 py-4">
        {/* Installed Section */}
        {selectedCategory === "全部" && (
          <section className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">已安装</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {watchFaces.filter(f => installedFaces.includes(f.id)).map((face) => (
                <div key={face.id} className="flex-shrink-0 w-28">
                  <div className={`w-28 h-28 rounded-2xl ${face.preview} mb-2 flex items-center justify-center relative`}>
                    <Clock className="h-10 w-10 text-white/80" />
                    <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-foreground text-center truncate">{face.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Faces Grid */}
        <section>
          <h3 className="font-semibold text-foreground mb-3">
            {selectedCategory === "全部" ? "发现更多" : selectedCategory}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {filteredFaces.map((face) => (
              <Card key={face.id} className="border-0 shadow-sm overflow-hidden">
                <div className={`h-36 ${face.preview} flex items-center justify-center relative`}>
                  <Clock className="h-12 w-12 text-white/80" />
                  {face.popular && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-xs">
                      <Star className="h-3 w-3" />
                      热门
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-card-foreground">{face.name}</p>
                      <p className="text-xs text-muted-foreground">{face.category}</p>
                    </div>
                    <Button
                      size="sm"
                      variant={installedFaces.includes(face.id) ? "outline" : "default"}
                      className="h-8"
                      onClick={() => toggleInstall(face.id)}
                    >
                      {installedFaces.includes(face.id) ? (
                        <>
                          <Check className="h-3.5 w-3.5 mr-1" />
                          已安装
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5 mr-1" />
                          安装
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
