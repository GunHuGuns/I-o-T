"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { 
  ArrowLeft, 
  CreditCard,
  Plus,
  Train,
  Building2,
  KeyRound,
  ChevronRight,
  Trash2,
  Nfc
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const cardTypes = [
  { id: "transit", name: "交通卡", icon: Train, color: "bg-blue-500" },
  { id: "access", name: "门禁卡", icon: Building2, color: "bg-purple-500" },
  { id: "key", name: "钥匙卡", icon: KeyRound, color: "bg-amber-500" },
]

const myCards = [
  { id: "1", name: "北京一卡通", type: "transit", balance: "¥56.50", number: "**** 8832" },
  { id: "2", name: "上海交通卡", type: "transit", balance: "¥120.00", number: "**** 6621" },
  { id: "3", name: "公司门禁", type: "access", number: "已激活" },
  { id: "4", name: "小区门禁", type: "access", number: "已激活" },
]

export default function CardsPage() {
  const router = useRouter()
  const params = useParams()
  
  const [cards, setCards] = useState(myCards)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null)
  const [newCardName, setNewCardName] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [cardToDelete, setCardToDelete] = useState<string | null>(null)

  const getCardIcon = (type: string) => {
    const cardType = cardTypes.find(t => t.id === type)
    return cardType?.icon || CreditCard
  }

  const getCardColor = (type: string) => {
    const cardType = cardTypes.find(t => t.id === type)
    return cardType?.color || "bg-gray-500"
  }

  const addCard = () => {
    if (selectedCardType && newCardName) {
      setCards([...cards, {
        id: String(Date.now()),
        name: newCardName,
        type: selectedCardType,
        number: "已激活"
      }])
      setShowAddDialog(false)
      setSelectedCardType(null)
      setNewCardName("")
    }
  }

  const deleteCard = () => {
    if (cardToDelete) {
      setCards(cards.filter(c => c.id !== cardToDelete))
      setShowDeleteConfirm(false)
      setCardToDelete(null)
    }
  }

  const confirmDelete = (cardId: string) => {
    setCardToDelete(cardId)
    setShowDeleteConfirm(true)
  }

  const transitCards = cards.filter(c => c.type === "transit")
  const accessCards = cards.filter(c => c.type === "access" || c.type === "key")

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">卡片管理</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* NFC Hint */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20">
                <Nfc className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-foreground">NFC 模拟卡片</p>
                <p className="text-sm text-muted-foreground">手表靠近读卡器即可使用</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transit Cards */}
        {transitCards.length > 0 && (
          <section>
            <h3 className="font-semibold text-foreground mb-3">交通卡</h3>
            <div className="space-y-2">
              {transitCards.map((card) => {
                const Icon = getCardIcon(card.type)
                return (
                  <Card key={card.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${getCardColor(card.type)}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">{card.name}</p>
                            <p className="text-xs text-muted-foreground">{card.number}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {card.balance && (
                            <span className="font-medium text-foreground">{card.balance}</span>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => confirmDelete(card.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        )}

        {/* Access Cards */}
        {accessCards.length > 0 && (
          <section>
            <h3 className="font-semibold text-foreground mb-3">门禁/钥匙卡</h3>
            <div className="space-y-2">
              {accessCards.map((card) => {
                const Icon = getCardIcon(card.type)
                return (
                  <Card key={card.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${getCardColor(card.type)}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">{card.name}</p>
                            <p className="text-xs text-muted-foreground">{card.number}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => confirmDelete(card.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        )}

        {/* Add Card Button */}
        <Button variant="outline" className="w-full gap-2" onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4" />
          添加卡片
        </Button>
      </main>

      {/* Add Card Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>添加卡片</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">选择卡片类型</p>
              <div className="grid grid-cols-3 gap-2">
                {cardTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedCardType(type.id)}
                    className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                      selectedCardType === type.id
                        ? "bg-primary/10 ring-2 ring-primary"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${type.color}`}>
                      <type.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-medium">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
            {selectedCardType && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">卡片名称</p>
                <Input
                  placeholder="例如：公司门禁"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              取消
            </Button>
            <Button onClick={addCard} disabled={!selectedCardType || !newCardName}>
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            确定要删除这张卡片吗？删除后需要重新添加。
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={deleteCard}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
