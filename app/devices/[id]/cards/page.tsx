"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Plus,
  CreditCard,
  Bus,
  Building2,
  Key,
  ChevronRight,
  MoreVertical,
  Trash2,
  Star,
  Nfc
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const cards = [
  {
    id: "1",
    type: "transit",
    name: "北京一卡通",
    icon: Bus,
    color: "bg-red-500",
    balance: 128.50,
    isDefault: true,
    cardNo: "****8821"
  },
  {
    id: "2",
    type: "transit",
    name: "上海交通卡",
    icon: Bus,
    color: "bg-blue-600",
    balance: 56.00,
    isDefault: false,
    cardNo: "****3345"
  },
  {
    id: "3",
    type: "access",
    name: "公司门禁卡",
    icon: Building2,
    color: "bg-slate-600",
    isDefault: false,
    cardNo: "****9912"
  },
  {
    id: "4",
    type: "access",
    name: "家庭门禁卡",
    icon: Key,
    color: "bg-amber-600",
    isDefault: false,
    cardNo: "****6678"
  },
]

const supportedCards = [
  { name: "北京一卡通", cities: "北京" },
  { name: "上海交通卡", cities: "上海" },
  { name: "深圳通", cities: "深圳" },
  { name: "广州羊城通", cities: "广州" },
  { name: "岭南通", cities: "广东省" },
  { name: "京津冀互联互通卡", cities: "全国300+城市" },
]

export default function CardsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"transit" | "access">("transit")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState<typeof cards[0] | null>(null)

  const transitCards = cards.filter(c => c.type === "transit")
  const accessCards = cards.filter(c => c.type === "access")
  const displayCards = activeTab === "transit" ? transitCards : accessCards

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">卡片管理</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-3">
          <button
            onClick={() => setActiveTab("transit")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === "transit"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Bus className="h-4 w-4" />
            交通卡
          </button>
          <button
            onClick={() => setActiveTab("access")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === "access"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Key className="h-4 w-4" />
            门禁卡
          </button>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* NFC Hint */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Nfc className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">NFC刷卡</p>
                <p className="text-xs text-muted-foreground">靠近读卡器即可自动识别</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards List */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">
              我的{activeTab === "transit" ? "交通卡" : "门禁卡"}
            </h3>
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4" />
              添加
            </Button>
          </div>
          
          {displayCards.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <CreditCard className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground mb-2">
                  暂无{activeTab === "transit" ? "交通卡" : "门禁卡"}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  添加卡片后即可使用手表刷卡
                </p>
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  添加卡片
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {displayCards.map((card) => {
                const Icon = card.icon
                return (
                  <Card key={card.id} className={`border-0 shadow-md overflow-hidden`}>
                    <div className={`${card.color} p-4`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-8 w-8 text-white" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-white">{card.name}</p>
                              {card.isDefault && (
                                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                              )}
                            </div>
                            <p className="text-white/70 text-sm">{card.cardNo}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>设为默认</DropdownMenuItem>
                            {card.type === "transit" && (
                              <DropdownMenuItem>充值</DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => {
                                setSelectedCard(card)
                                setShowDeleteDialog(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {card.type === "transit" && card.balance !== undefined && (
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <p className="text-white/70 text-xs">余额</p>
                          <p className="text-2xl font-bold text-white">¥{card.balance.toFixed(2)}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </section>

        {/* Supported Cards (only for transit) */}
        {activeTab === "transit" && (
          <section>
            <h3 className="font-semibold text-foreground mb-3">支持的交通卡</h3>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0 divide-y divide-border">
                {supportedCards.map((card) => (
                  <div key={card.name} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-foreground">{card.name}</p>
                      <p className="text-xs text-muted-foreground">{card.cities}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      开通
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      {/* Add Card Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加{activeTab === "transit" ? "交通卡" : "门禁卡"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {activeTab === "transit" ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  选择要开通的交通卡类型
                </p>
                {supportedCards.slice(0, 4).map((card) => (
                  <button
                    key={card.name}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
                  >
                    <span className="font-medium">{card.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  将手表靠近门禁卡，读取卡片信息
                </p>
                <div className="flex flex-col items-center py-8">
                  <div className="p-6 rounded-full bg-primary/10 mb-4 animate-pulse">
                    <Nfc className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">等待读取...</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              取消
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>删除卡片</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            确定要删除"{selectedCard?.name}"吗？删除后需要重新添加。
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  )
}
