"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Search,
  Watch, 
  Headphones, 
  Scale,
  Heart,
  Dumbbell,
  Home,
  Tv,
  ChevronRight,
  Smartphone,
  Glasses,
  Activity
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// 设备品类和型号数据
const deviceCategories = [
  {
    id: "wearable",
    name: "穿戴设备",
    icon: Watch,
    color: "bg-blue-500/10",
    iconColor: "text-blue-600",
    brands: [
      {
        name: "华为",
        models: [
          { id: "hw-watch-gt5-pro", name: "Watch GT 5 Pro", image: Watch },
          { id: "hw-watch-gt5", name: "Watch GT 5", image: Watch },
          { id: "hw-watch-fit3", name: "Watch Fit 3", image: Watch },
          { id: "hw-band-9", name: "华为手环 9", image: Activity },
        ]
      },
      {
        name: "小米",
        models: [
          { id: "mi-watch-s3", name: "小米手表 S3", image: Watch },
          { id: "mi-band-9", name: "小米手环 9", image: Activity },
          { id: "mi-band-9-pro", name: "小米手环 9 Pro", image: Activity },
        ]
      },
      {
        name: "OPPO",
        models: [
          { id: "oppo-watch-4-pro", name: "OPPO Watch 4 Pro", image: Watch },
          { id: "oppo-band-2", name: "OPPO 手环 2", image: Activity },
        ]
      },
    ]
  },
  {
    id: "audio",
    name: "音频设备",
    icon: Headphones,
    color: "bg-orange-500/10",
    iconColor: "text-orange-600",
    brands: [
      {
        name: "华为",
        models: [
          { id: "hw-freebuds-pro3", name: "FreeBuds Pro 3", image: Headphones },
          { id: "hw-freebuds-5i", name: "FreeBuds 5i", image: Headphones },
          { id: "hw-freeclip", name: "FreeClip", image: Headphones },
        ]
      },
      {
        name: "小米",
        models: [
          { id: "mi-buds-5-pro", name: "小米 Buds 5 Pro", image: Headphones },
          { id: "mi-buds-5", name: "小米 Buds 5", image: Headphones },
        ]
      },
      {
        name: "OPPO",
        models: [
          { id: "oppo-enco-x3", name: "OPPO Enco X3", image: Headphones },
          { id: "oppo-enco-air3", name: "OPPO Enco Air3", image: Headphones },
        ]
      },
    ]
  },
  {
    id: "health",
    name: "健康设备",
    icon: Heart,
    color: "bg-rose-500/10",
    iconColor: "text-rose-600",
    brands: [
      {
        name: "华为",
        models: [
          { id: "hw-scale-3-pro", name: "华为智能体脂秤 3 Pro", image: Scale },
          { id: "hw-scale-3", name: "华为智能体脂秤 3", image: Scale },
        ]
      },
      {
        name: "小米",
        models: [
          { id: "mi-scale-s400", name: "小米体脂秤 S400", image: Scale },
          { id: "mi-bp-monitor", name: "小米血压计", image: Heart },
        ]
      },
      {
        name: "有品",
        models: [
          { id: "yp-scale", name: "云康宝体脂秤", image: Scale },
          { id: "yp-thermometer", name: "秒秒测体温计", image: Heart },
        ]
      },
    ]
  },
  {
    id: "sports",
    name: "运动设备",
    icon: Dumbbell,
    color: "bg-purple-500/10",
    iconColor: "text-purple-600",
    brands: [
      {
        name: "Keep",
        models: [
          { id: "keep-c1", name: "Keep 智能动感单车 C1", image: Dumbbell },
          { id: "keep-k1", name: "Keep 跑步机 K1", image: Dumbbell },
        ]
      },
      {
        name: "野小兽",
        models: [
          { id: "yx-row", name: "野小兽划船机 R30", image: Dumbbell },
          { id: "yx-bike", name: "野小兽动感单车 M1", image: Dumbbell },
        ]
      },
    ]
  },
  {
    id: "home",
    name: "智能家居",
    icon: Home,
    color: "bg-teal-500/10",
    iconColor: "text-teal-600",
    brands: [
      {
        name: "小米",
        models: [
          { id: "mi-lamp", name: "米家台灯 Pro", image: Home },
          { id: "mi-plug", name: "米家智能插座 3", image: Home },
          { id: "mi-purifier", name: "米家空气净化器 4", image: Home },
        ]
      },
      {
        name: "华为",
        models: [
          { id: "hw-router", name: "华为路由器 AX3 Pro", image: Home },
          { id: "hw-sound", name: "华为 Sound X", image: Home },
        ]
      },
    ]
  },
]

export default function ManualAddDevicePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const currentCategory = deviceCategories.find(c => c.id === selectedCategory)
  const currentBrand = currentCategory?.brands.find(b => b.name === selectedBrand)

  // 搜索过滤
  const filteredCategories = searchQuery 
    ? deviceCategories.filter(cat => 
        cat.name.includes(searchQuery) ||
        cat.brands.some(brand => 
          brand.name.includes(searchQuery) ||
          brand.models.some(model => model.name.includes(searchQuery))
        )
      )
    : deviceCategories

  const handleSelectModel = (modelId: string) => {
    // 跳转到蓝牙配对页面
    router.push(`/add-device?model=${modelId}`)
  }

  const handleBack = () => {
    if (selectedBrand) {
      setSelectedBrand(null)
    } else if (selectedCategory) {
      setSelectedCategory(null)
    } else {
      router.back()
    }
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">
            {selectedBrand || selectedCategory 
              ? (currentBrand?.name || currentCategory?.name) 
              : "手动添加设备"
            }
          </h1>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Search Bar */}
        {!selectedCategory && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索品牌或设备型号"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11"
            />
          </div>
        )}

        {/* Category List */}
        {!selectedCategory && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">选择设备类型</h2>
            <div className="space-y-2">
              {filteredCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Card 
                    key={category.id} 
                    className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${category.color}`}>
                          <Icon className={`h-6 w-6 ${category.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{category.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {category.brands.map(b => b.name).join("、")}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        )}

        {/* Brand List */}
        {selectedCategory && !selectedBrand && currentCategory && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">选择品牌</h2>
            <div className="space-y-2">
              {currentCategory.brands.map((brand) => (
                <Card 
                  key={brand.name} 
                  className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setSelectedBrand(brand.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{brand.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {brand.models.length} 款设备
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Model List */}
        {selectedBrand && currentBrand && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">选择型号</h2>
            <div className="space-y-2">
              {currentBrand.models.map((model) => {
                const Icon = model.image
                return (
                  <Card 
                    key={model.id} 
                    className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all"
                    onClick={() => handleSelectModel(model.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-muted">
                          <Icon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{model.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            点击开始配对
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
