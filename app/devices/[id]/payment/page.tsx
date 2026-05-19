"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { 
  ArrowLeft, 
  Wallet,
  Plus,
  CreditCard,
  QrCode,
  ChevronRight,
  Shield,
  Smartphone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const paymentMethods = [
  { id: "1", name: "支付宝", type: "alipay", icon: "A", color: "bg-blue-500", bound: true },
  { id: "2", name: "微信支付", type: "wechat", icon: "W", color: "bg-green-500", bound: true },
  { id: "3", name: "银联云闪付", type: "unionpay", icon: "U", color: "bg-red-500", bound: false },
]

export default function PaymentPage() {
  const router = useRouter()
  const params = useParams()
  
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [boundMethods, setBoundMethods] = useState(
    paymentMethods.filter(m => m.bound).map(m => m.id)
  )

  const bindMethod = (methodId: string) => {
    setBoundMethods([...boundMethods, methodId])
    setShowAddDialog(false)
  }

  return (
    <div className="min-h-screen bg-background pb-6">
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
        {/* NFC Status */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-green-500/20">
                <Smartphone className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">NFC 功能已开启</p>
                <p className="text-sm text-muted-foreground">支持手表碰一碰支付</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            </div>
          </CardContent>
        </Card>

        {/* Bound Payment Methods */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">已绑定支付方式</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-1" />
              添加
            </Button>
          </div>
          <div className="space-y-2">
            {paymentMethods.filter(m => boundMethods.includes(m.id)).map((method) => (
              <Card key={method.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">{method.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{method.name}</p>
                        <p className="text-xs text-muted-foreground">已绑定</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="font-semibold text-foreground mb-3">快捷功能</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="p-3 rounded-2xl bg-blue-500/10 mb-2">
                  <QrCode className="h-6 w-6 text-blue-600" />
                </div>
                <p className="font-medium text-card-foreground">付款码</p>
                <p className="text-xs text-muted-foreground">扫码支付</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="p-3 rounded-2xl bg-purple-500/10 mb-2">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <p className="font-medium text-card-foreground">银行卡</p>
                <p className="text-xs text-muted-foreground">管理银行卡</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Security Tips */}
        <Card className="border-0 shadow-sm bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm">安全提示</p>
                <p className="text-sm text-muted-foreground mt-1">
                  手表支付已开启密码保护，每次支付需要验证。建议开启手腕检测，摘下手表自动锁定支付功能。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Add Payment Method Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>添加支付方式</DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-2">
            {paymentMethods.filter(m => !boundMethods.includes(m.id)).map((method) => (
              <button
                key={method.id}
                onClick={() => bindMethod(method.id)}
                className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-secondary transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{method.icon}</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">{method.name}</p>
                  <p className="text-xs text-muted-foreground">点击绑定</p>
                </div>
              </button>
            ))}
            {paymentMethods.filter(m => !boundMethods.includes(m.id)).length === 0 && (
              <p className="text-center text-muted-foreground py-4">已绑定所有支付方式</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
