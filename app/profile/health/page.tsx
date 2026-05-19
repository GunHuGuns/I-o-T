"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  User,
  Ruler,
  Scale,
  Heart,
  Droplets,
  Activity,
  Calendar,
  ChevronRight,
  AlertCircle,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function HealthProfilePage() {
  const router = useRouter()
  const [healthData, setHealthData] = useState({
    height: 175,
    weight: 70,
    bloodType: "A型",
    heartRateResting: 68,
    birthday: "1990-05-15",
    allergies: "无",
    medications: "无",
    conditions: "无",
  })

  const bmi = (healthData.weight / Math.pow(healthData.height / 100, 2)).toFixed(1)
  const bmiStatus = Number(bmi) < 18.5 ? "偏瘦" : Number(bmi) < 24 ? "正常" : Number(bmi) < 28 ? "偏胖" : "肥胖"

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">健康档案</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* BMI Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">BMI 指数</p>
                <p className="text-3xl font-bold text-foreground mt-1">{bmi}</p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  bmiStatus === "正常" 
                    ? "bg-green-500/10 text-green-600" 
                    : "bg-amber-500/10 text-amber-600"
                }`}>
                  {bmiStatus}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">身高 / 体重</p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {healthData.height}cm / {healthData.weight}kg
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">基本信息</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0 divide-y divide-border">
              <HealthField 
                icon={Ruler} 
                label="身高" 
                value={`${healthData.height} cm`}
                onEdit={() => {}}
              />
              <HealthField 
                icon={Scale} 
                label="体重" 
                value={`${healthData.weight} kg`}
                onEdit={() => {}}
              />
              <HealthField 
                icon={Droplets} 
                label="血型" 
                value={healthData.bloodType}
                onEdit={() => {}}
              />
              <HealthField 
                icon={Heart} 
                label="静息心率" 
                value={`${healthData.heartRateResting} bpm`}
                onEdit={() => {}}
              />
              <HealthField 
                icon={Calendar} 
                label="出生日期" 
                value={healthData.birthday}
                onEdit={() => {}}
              />
            </CardContent>
          </Card>
        </section>

        {/* Medical History */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">健康状况</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0 divide-y divide-border">
              <HealthField 
                icon={AlertCircle} 
                label="过敏史" 
                value={healthData.allergies}
                onEdit={() => {}}
              />
              <HealthField 
                icon={Activity} 
                label="用药情况" 
                value={healthData.medications}
                onEdit={() => {}}
              />
              <HealthField 
                icon={Heart} 
                label="既往病史" 
                value={healthData.conditions}
                onEdit={() => {}}
              />
            </CardContent>
          </Card>
        </section>

        {/* Emergency Contact */}
        <section>
          <h2 className="font-semibold text-foreground mb-3">紧急联系人</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">张大明</p>
                  <p className="text-sm text-muted-foreground">父亲 · 138****9999</p>
                </div>
                <Button variant="outline" size="sm">编辑</Button>
              </div>
            </CardContent>
          </Card>
          <Button variant="outline" className="w-full mt-2">
            添加紧急联系人
          </Button>
        </section>

        {/* Data Privacy Notice */}
        <Card className="border-0 shadow-sm bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">数据隐私说明</p>
                <p className="text-xs text-muted-foreground mt-1">
                  您的健康数据仅存储在本地和您授权的云端，我们不会未经同意分享给第三方。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function HealthField({
  icon: Icon,
  label,
  value,
  onEdit
}: {
  icon: typeof User
  label: string
  value: string
  onEdit: () => void
}) {
  return (
    <button 
      onClick={onEdit}
      className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-secondary">
          <Icon className="h-4 w-4 text-secondary-foreground" />
        </div>
        <span className="text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{value}</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </button>
  )
}
