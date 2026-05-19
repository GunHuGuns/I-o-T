"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Camera,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ChevronRight,
  Check,
  Image as ImageIcon,
  Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function PersonalInfoPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [showAvatarMenu, setShowAvatarMenu] = useState(false)
  const [profile, setProfile] = useState({
    nickname: "张小明",
    phone: "138****8888",
    email: "zhang***@example.com",
    birthday: "1990-05-15",
    gender: "男",
    region: "北京市",
    signature: "健康生活，快乐每一天",
  })

  return (
    <>
      <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">个人资料</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "完成" : "编辑"}
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <button
              onClick={() => setShowAvatarMenu(true)}
              className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">点击更换头像</p>
        </div>

        {/* Profile Fields */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0 divide-y divide-border">
            <ProfileField 
              label="昵称" 
              value={profile.nickname} 
              editable={isEditing}
              onChange={(v) => setProfile({...profile, nickname: v})}
            />
            <ProfileField 
              label="手机号" 
              value={profile.phone} 
              icon={Phone}
              href="/profile/phone"
            />
            <ProfileField 
              label="邮箱" 
              value={profile.email} 
              icon={Mail}
              href="/profile/email"
            />
            <ProfileField 
              label="生日" 
              value={profile.birthday} 
              icon={Calendar}
              editable={isEditing}
              onChange={(v) => setProfile({...profile, birthday: v})}
            />
            <ProfileField 
              label="性别" 
              value={profile.gender} 
              editable={isEditing}
              options={["男", "女", "保密"]}
              onChange={(v) => setProfile({...profile, gender: v})}
            />
            <ProfileField 
              label="地区" 
              value={profile.region} 
              icon={MapPin}
              href="/profile/region"
            />
            <ProfileField 
              label="个性签名" 
              value={profile.signature} 
              editable={isEditing}
              onChange={(v) => setProfile({...profile, signature: v})}
            />
          </CardContent>
        </Card>
      </main>
    </div>

      {/* Avatar Action Sheet */}
      <Dialog open={showAvatarMenu} onOpenChange={setShowAvatarMenu}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>更换头像</DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-2">
            <button
              onClick={() => setShowAvatarMenu(false)}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-secondary transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Camera className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">拍照</p>
                <p className="text-xs text-muted-foreground">使用相机拍摄新头像</p>
              </div>
            </button>
            <button
              onClick={() => setShowAvatarMenu(false)}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-secondary transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <ImageIcon className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">从相册选择</p>
                <p className="text-xs text-muted-foreground">从手机相册中选取图片</p>
              </div>
            </button>
            <button
              onClick={() => setShowAvatarMenu(false)}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-secondary transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-destructive/10">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              <div className="text-left">
                <p className="font-medium text-destructive">删除头像</p>
                <p className="text-xs text-muted-foreground">恢复为默认头像</p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function ProfileField({ 
  label, 
  value, 
  icon: Icon,
  href,
  editable,
  options,
  onChange
}: { 
  label: string
  value: string
  icon?: typeof User
  href?: string
  editable?: boolean
  options?: string[]
  onChange?: (value: string) => void
}) {
  const [showOptions, setShowOptions] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else if (options && editable) {
      setShowOptions(!showOptions)
    }
  }

  return (
    <div>
      <button 
        className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
        onClick={handleClick}
      >
        <span className="text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          {editable && !options ? (
            <Input
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-40 text-right border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="text-foreground">{value}</span>
          )}
          {(href || (options && editable)) && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>
      
      {/* Options Dropdown */}
      {showOptions && options && (
        <div className="px-4 pb-4">
          <div className="bg-muted rounded-lg p-2 space-y-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange?.(option)
                  setShowOptions(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                  value === option ? "bg-primary/10 text-primary" : "hover:bg-background"
                }`}
              >
                <span>{option}</span>
                {value === option && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
