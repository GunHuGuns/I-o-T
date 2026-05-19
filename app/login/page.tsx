"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Phone, 
  Mail, 
  Lock,
  ChevronRight,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type LoginMethod = "phone" | "email" | "password"

export default function LoginPage() {
  const router = useRouter()
  const [method, setMethod] = useState<LoginMethod>("phone")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifyCode, setVerifyCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const handleLogin = () => {
    if (!agreed) return
    setIsLoading(true)
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            跳过
          </Button>
        </div>
      </header>

      <main className="px-6 py-8">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl text-white font-bold">H</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">健康助手</h1>
          <p className="text-muted-foreground mt-2">登录以同步您的健康数据</p>
        </div>

        {/* Login Method Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-muted rounded-xl">
          {[
            { id: "phone", label: "手机号", icon: Phone },
            { id: "email", label: "邮箱", icon: Mail },
            { id: "password", label: "密码登录", icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMethod(tab.id as LoginMethod)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                method === tab.id 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Phone Login */}
        {method === "phone" && (
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
        )}

        {/* Email Login */}
        {method === "email" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">邮箱地址</label>
              <Input
                type="email"
                placeholder="请输入邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
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
                  disabled={countdown > 0 || !email.includes("@")}
                >
                  {countdown > 0 ? `${countdown}s` : "获取验证码"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Password Login */}
        {method === "password" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">账号</label>
              <Input
                type="text"
                placeholder="手机号/邮箱"
                value={phone || email}
                onChange={(e) => {
                  if (e.target.value.includes("@")) {
                    setEmail(e.target.value)
                    setPhone("")
                  } else {
                    setPhone(e.target.value)
                    setEmail("")
                  }
                }}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">密码</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
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
            <div className="flex justify-end">
              <button className="text-sm text-primary">忘记密码？</button>
            </div>
          </div>
        )}

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

        {/* Login Button */}
        <Button 
          className="w-full h-12 mt-6" 
          disabled={!agreed || isLoading}
          onClick={handleLogin}
        >
          {isLoading ? "登录中..." : "登录"}
        </Button>

        {/* Third Party Login */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">
                其他登录方式
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-6">
            {[
              { name: "微信", icon: "💬", bg: "bg-green-500/10" },
              { name: "QQ", icon: "🐧", bg: "bg-blue-500/10" },
              { name: "Apple", icon: "🍎", bg: "bg-foreground/5" },
            ].map((provider) => (
              <button
                key={provider.name}
                className={`w-14 h-14 rounded-full ${provider.bg} flex items-center justify-center text-2xl hover:opacity-80 transition-opacity`}
              >
                {provider.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Register Link */}
        <p className="text-center mt-8 text-sm text-muted-foreground">
          还没有账号？
          <button className="text-primary ml-1 font-medium">立即注册</button>
        </p>
      </main>
    </div>
  )
}
