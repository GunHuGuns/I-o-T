"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  ChevronRight,
  Hand,
  Volume2,
  Ear,
  Globe,
  Search,
  Download,
  ChevronDown,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { BottomNav } from "@/components/bottom-nav"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 手势操作选项
const gestureOptions = [
  { id: "next", label: "下一曲" },
  { id: "prev", label: "上一曲" },
  { id: "play_pause", label: "播放/暂停" },
  { id: "call", label: "接电话/挂断" },
  { id: "voice_assistant", label: "语音助手" },
  { id: "translate", label: "同传翻译" },
  { id: "meeting_summary", label: "会议总结" },
  { id: "none", label: "无操作" },
]

// 默认手势设置
const defaultGestures = {
  leftDouble: "next",
  leftTriple: "prev",
  rightDouble: "prev",
  rightTriple: "next",
}

export default function DeviceSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const deviceId = params.id as string
  
  const [activeTab, setActiveTab] = useState<"gesture" | "audio">("gesture")
  
  // 手势设置状态
  const [gestures, setGestures] = useState(defaultGestures)
  const [editingGesture, setEditingGesture] = useState<string | null>(null)
  
  // 音频设置状态
  const [wearDetection, setWearDetection] = useState(true)
  const [spatialAudio, setSpatialAudio] = useState(true)
  const [lhdc, setLhdc] = useState(true)
  
  // 固件信息
  const currentFirmware = "v1.8.2"
  const latestFirmware = "v1.8.3"
  const hasUpdate = currentFirmware !== latestFirmware
  
  // 查找耳机状态
  const [isFinding, setIsFinding] = useState(false)

  const handleFindEarbuds = () => {
    setIsFinding(true)
    // 模拟查找过程
    setTimeout(() => {
      setIsFinding(false)
    }, 3000)
  }

  const getGestureLabel = (gestureId: string) => {
    return gestureOptions.find(opt => opt.id === gestureId)?.label || "未设置"
  }

  const gestureItems = [
    { key: "leftDouble", label: "左耳双击", description: "轻敲两下左耳机" },
    { key: "leftTriple", label: "左耳三击", description: "轻敲三下左耳机" },
    { key: "rightDouble", label: "右耳双击", description: "轻敲两下右耳机" },
    { key: "rightTriple", label: "右耳三击", description: "轻敲三下右耳机" },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">高级设置</h1>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex gap-1 px-4 pb-3">
          <button
            onClick={() => setActiveTab("gesture")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === "gesture" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Hand className="h-4 w-4" />
            手势
          </button>
          <button
            onClick={() => setActiveTab("audio")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === "audio" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Volume2 className="h-4 w-4" />
            音频
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-6">
        {/* Gesture Tab */}
        {activeTab === "gesture" && (
          <>
            <section>
              <p className="text-sm text-muted-foreground mb-4">
                自定义耳机触控手势，实现快捷操作
              </p>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0 divide-y divide-border">
                  {gestureItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setEditingGesture(item.key)}
                      className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="text-left">
                        <p className="font-medium text-card-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-primary font-medium">
                          {getGestureLabel(gestures[item.key as keyof typeof gestures])}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Gesture Tips */}
            <section>
              <Card className="border-0 shadow-sm bg-muted/50">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-foreground mb-2">使用技巧</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 轻敲耳机外侧触控区域</li>
                    <li>• 每次敲击间隔不超过0.5秒</li>
                    <li>• 同传翻译需要联网使用</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </>
        )}

        {/* Audio Tab */}
        {activeTab === "audio" && (
          <>
            {/* Audio Settings */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">音频设置</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0 divide-y divide-border">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-500/10">
                        <Ear className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">佩戴检测</p>
                        <p className="text-xs text-muted-foreground">摘下耳机自动暂停播放</p>
                      </div>
                    </div>
                    <Switch checked={wearDetection} onCheckedChange={setWearDetection} />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-500/10">
                        <Globe className="h-4 w-4 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">空间音频</p>
                        <p className="text-xs text-muted-foreground">沉浸式3D音效体验</p>
                      </div>
                    </div>
                    <Switch checked={spatialAudio} onCheckedChange={setSpatialAudio} />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-orange-500/10">
                        <Volume2 className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">LHDC 5.0</p>
                        <p className="text-xs text-muted-foreground">高清无损音频传输</p>
                      </div>
                    </div>
                    <Switch checked={lhdc} onCheckedChange={setLhdc} />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Find Earbuds */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">查找耳机</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${isFinding ? "bg-primary/20" : "bg-secondary"}`}>
                        <Search className={`h-5 w-5 ${isFinding ? "text-primary animate-pulse" : "text-secondary-foreground"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">
                          {isFinding ? "正在播放声音..." : "查找我的耳机"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isFinding ? "耳机将播放提示音" : "让耳机播放声音帮助定位"}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={isFinding ? "destructive" : "default"}
                      size="sm"
                      onClick={() => isFinding ? setIsFinding(false) : handleFindEarbuds()}
                    >
                      {isFinding ? "停止" : "开始查找"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Firmware Update */}
            <section>
              <h3 className="font-semibold text-foreground mb-3">固件更新</h3>
              <Card className={`border-0 shadow-sm ${hasUpdate ? "bg-gradient-to-r from-primary/10 to-accent/10" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${hasUpdate ? "bg-primary/20" : "bg-secondary"}`}>
                        <Download className={`h-5 w-5 ${hasUpdate ? "text-primary" : "text-secondary-foreground"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">
                          {hasUpdate ? "发现新版本" : "已是最新版本"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          当前版本: {currentFirmware}
                          {hasUpdate && ` → 最新版本: ${latestFirmware}`}
                        </p>
                      </div>
                    </div>
                    {hasUpdate && (
                      <Button size="sm">
                        立即更新
                      </Button>
                    )}
                  </div>
                  {hasUpdate && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium text-foreground mb-2">更新内容</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 优化蓝牙连接稳定性</li>
                        <li>• 提升降噪效果</li>
                        <li>• 修复已知问题</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </main>

      {/* Gesture Selection Dialog */}
      <Dialog open={!!editingGesture} onOpenChange={() => setEditingGesture(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              选择{gestureItems.find(g => g.key === editingGesture)?.label}操作
            </DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <div className="space-y-1">
              {gestureOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    if (editingGesture) {
                      setGestures({
                        ...gestures,
                        [editingGesture]: option.id
                      })
                      setEditingGesture(null)
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    gestures[editingGesture as keyof typeof gestures] === option.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-secondary"
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  {gestures[editingGesture as keyof typeof gestures] === option.id && (
                    <Check className="h-5 w-5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  )
}
