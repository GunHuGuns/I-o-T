"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Settings,
  Watch,
  Headphones,
  Bell,
  Heart,
  Battery,
  Download,
  CheckCircle2,
  AlertCircle,
  Info,
  Trash2,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// 通知数据
const notifications = [
  {
    id: "1",
    type: "device",
    title: "手表同步完成",
    message: "Watch GT 5 Pro 数据已同步完成，共更新 1,234 条健康数据",
    time: "5分钟前",
    read: false,
    icon: Watch,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    id: "2",
    type: "update",
    title: "固件更新可用",
    message: "FreeBuds Pro 3 有新固件版本 2.0.0.168 可供更新",
    time: "1小时前",
    read: false,
    icon: Download,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
  },
  {
    id: "3",
    type: "health",
    title: "心率异常提醒",
    message: "检测到您的静息心率偏高，建议注意休息并持续监测",
    time: "3小时前",
    read: false,
    icon: Heart,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600",
  },
  {
    id: "4",
    type: "battery",
    title: "设备电量低",
    message: "FreeBuds Pro 3 电量仅剩 15%，请及时充电",
    time: "昨天 18:30",
    read: true,
    icon: Battery,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    id: "5",
    type: "system",
    title: "系统通知",
    message: "健康助手已更新至最新版本 3.2.0，新增睡眠呼吸分析功能",
    time: "昨天 10:00",
    read: true,
    icon: Info,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "6",
    type: "device",
    title: "设备连接成功",
    message: "Watch GT 5 Pro 已成功连接到您的手机",
    time: "2天前",
    read: true,
    icon: CheckCircle2,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600",
  },
  {
    id: "7",
    type: "health",
    title: "运动目标达成",
    message: "恭喜！您今天已完成 10,000 步的运动目标",
    time: "2天前",
    read: true,
    icon: CheckCircle2,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600",
  },
]

type FilterType = "all" | "unread" | "device" | "health" | "system"

export default function NotificationsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<FilterType>("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const filters = [
    { id: "all", label: "全部" },
    { id: "unread", label: "未读" },
    { id: "device", label: "设备" },
    { id: "health", label: "健康" },
    { id: "system", label: "系统" },
  ]

  const filteredNotifications = notificationList.filter(n => {
    if (filter === "all") return true
    if (filter === "unread") return !n.read
    return n.type === filter || (filter === "system" && ["update", "battery", "system"].includes(n.type))
  })

  const unreadCount = notificationList.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotificationList(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">消息通知</h1>
              {unreadCount > 0 && (
                <p className="text-xs text-muted-foreground">{unreadCount} 条未读</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                全部已读
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {filters.map((f) => (
            <Button
              key={f.id}
              variant={filter === f.id ? "default" : "secondary"}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter(f.id as FilterType)}
            >
              {f.label}
              {f.id === "unread" && unreadCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-xs">
                  {unreadCount}
                </span>
              )}
            </Button>
          ))}
        </div>
      </header>

      <main className="px-4 py-4">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">暂无通知</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon
              return (
                <Card 
                  key={notification.id} 
                  className={cn(
                    "border-0 shadow-sm transition-all",
                    !notification.read && "bg-primary/5"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className={`p-2.5 rounded-2xl ${notification.iconBg} flex-shrink-0`}>
                        <Icon className={`h-5 w-5 ${notification.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={cn(
                            "font-medium text-foreground",
                            !notification.read && "font-semibold"
                          )}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
