"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Plus,
  Wallet,
  CreditCard,
  QrCode,
  Smartphone,
  ChevronRight,
  Shield,
  Eye,
  EyeOff,
  MoreVertical,
  Trash2
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

const paymentMethods = [
  {
    id: "1",
    type: "alipay",
    name: "支付宝",
    icon: Wallet,
    color: "bg-blue-500",
    isDefault: true,
    lastUsed: "今天"
  },
  {
    id: "2",
    type: "wechat",
    name: "微信支付",
    icon: Smartphone,
    color: "bg-green-500",
    isDefault: false,
    lastUsed: "昨天"
  },
]

export default function PaymentPage() {
  const router = useRouter()
  const [showQR, setShowQR] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<typeof paymentMethods[0] | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">钱包支付</h1>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Quick Pay */}
        <section>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-primary/20 mb-4">
                  <QrCode className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">手表支付</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  抬腕即可完成支付，无需掏出手机
                </p>
                <Button onClick={() => setShowQR(true)}>
                  显示付款码
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Payment Methods */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">支付方式</h3>
            <Button variant="ghost" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              添加
            </Button>
          </div>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <Card key={method.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${method.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{method.name}</p>
                          {method.isDefault && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              默认
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">最近使用: {method.lastUsed}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>设为默认</DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => {
                              setSelectedPayment(method)
                              setShowDeleteDialog(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            移除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Security Tips */}
        <section>
          <h3 className="font-semibold text-foreground mb-3">安全提示</h3>
          <Card className="border-0 shadow-sm bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• 手表支付已启用密码保护</p>
                  <p>• 单笔支付限额 1000 元</p>
                  <p>• 每日累计限额 3000 元</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Settings */}
        <section>
          <h3 className="font-semibold text-foreground mb-3">支付设置</h3>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0 divide-y divide-border">
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <span className="text-foreground">支付密码</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <span className="text-foreground">支付限额</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <span className="text-foreground">交易记录</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>付款码</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="w-48 h-48 bg-muted rounded-xl flex items-center justify-center mb-4">
              <QrCode className="h-32 w-32 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              将此二维码对准扫描器完成支付
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>移除支付方式</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            确定要移除"{selectedPayment?.name}"吗？移除后需要重新绑定。
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(false)}>
              移除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  )
}
