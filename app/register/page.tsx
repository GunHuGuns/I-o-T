"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Phone, 
  Lock,
  Check,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [verifyCode, setVerifyCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)

  const sendVerifyCode = () => {
    if (countdown > 0) return
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleNext = () => {
    if (step === 1 && phone && verifyCode) {
      setStep(2)
    }
  }

  const handleRegister = () => {
    if (!agreed || password !== confirmPassword) return
    setIsLoading(true)
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => step === 1 ? router.back() : setStep(1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">注册账号</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
          <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
        </div>

        {/* Step 1: Phone Verification */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold text-foreground mb-2">验证手机号</h2>
            <p className="text-muted-foreground mb-6">我们将发送验证码到您的手机</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">手机号</label>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-20 shrink-0">
                    +86
                  </Button>
                  <Input
                    type="tel"
                    placeholder="请输入手机号"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">验证码</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="请输入验证码"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    className="h-11"
                    maxLength={6}
                  />
                  <Button 
                    variant="outline" 
                    className="w-28 shrink-0"
                    onClick={sendVerifyCode}
                    disabled={countdown > 0 || phone.length < 11}
                  >
                    {countdown > 0 ? `${countdown}s` : "获取验证码"}
                  </Button>
                </div>
              </div>
            </div>

            <Button 
              className="w-full h-12 mt-8" 
              disabled={!phone || !verifyCode}
              onClick={handleNext}
            >
              下一步
            </Button>
          </>
        )}

        {/* Step 2: Set Password & Info */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold text-foreground mb-2">设置密码</h2>
            <p className="text-muted-foreground mb-6">创建您的账号密码和昵称</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">昵称</label>
                <Input
                  type="text"
                  placeholder="给自己取个名字吧"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">密码</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="8-20位，包含字母和数字"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">确认密码</label>
                <Input
                  type="password"
                  placeholder="再次输入密码"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11"
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-destructive">两次密码输入不一致</p>
                )}
              </div>
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-3 mt-6">
              <button
                onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  agreed 
                    ? "bg-primary border-primary" 
                    : "border-border"
                }`}
              >
                {agreed && <Check className="h-3 w-3 text-primary-foreground" />}
              </button>
              <p className="text-sm text-muted-foreground">
                我已阅读并同意
                <button className="text-primary mx-1">《用户协议》</button>
                和
                <button className="text-primary mx-1">《隐私政策》</button>
              </p>
            </div>

            <Button 
              className="w-full h-12 mt-6" 
              disabled={!agreed || !password || !confirmPassword || password !== confirmPassword || isLoading}
              onClick={handleRegister}
            >
              {isLoading ? "注册中..." : "完成注册"}
            </Button>
          </>
        )}

        {/* Login Link */}
        <p className="text-center mt-8 text-sm text-muted-foreground">
          已有账号？
          <button 
            className="text-primary ml-1 font-medium"
            onClick={() => router.push("/login")}
          >
            立即登录
          </button>
        </p>
      </main>
    </div>
  )
}
