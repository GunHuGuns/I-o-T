"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Hand,
  Volume2,
  ChevronRight,
  Search,
  Download,
  Check,
  Headphones,
  Radio,
  Eye,
  Waves
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// 手势操作选项
const gestureOptions = [
  { id: "next", label: "下一曲" },
  { id: "prev", label: "上一曲" },
  { id: "play-pause", label: "播放/暂停" },
  { id: "call", label: "接电话/挂断" },
  { id: "assistant", label: "语音助手" },
  { id: "translate", label: "同传翻译" },
  { id: "summary", label: "会议总结" },
  { id: "none", label: "无操作" },
]

export default function EarbudsSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const deviceId = params.id as string

  const [activeTab, setActiveTab] = useState<"gesture" | "audio">("gesture")
  
  // 手势设置状态
  const [gestures, setGestures] = useState({
    leftDouble: "next",
    leftTriple: "prev",
    rightDouble: "prev",
    rightTriple: "next",
  })
  
  // 音频设置状态
  const [wearDetection, setWearDetection] = useState(true)
  const [spatialAudio, setSpatialAudio] = useState(true)
  const [lhdc, setLhdc] = useState(true)
  
  // 固件信息
  const currentFirmware = "v1.8.2"
  const latestFirmware = "v1.8.3"
  const hasUpdate = currentFirmware !== latestFirmware

  // 手势选择弹窗
  const [showGestureDialog, setShowGestureDialog] = useState(false)
  const [editingGesture, setEditingGesture] = useState<keyof typeof gestures | null>(null)

  // 查找耳机弹窗
  const [showFindDialog, setShowFindDialog] = useState(false)
  const [findingEarbud, setFindingEarbud] = useState<"left" | "right" | null>(null)

  const gestureLabels = {
    leftDouble: "左耳双击",
    leftTriple: "左耳三击",
    rightDouble: "右耳双击",
    rightTriple: "右耳三击",
  }

  const openGestureDialog = (gesture: keyof typeof gestures) => {
    setEditingGesture(gesture)
    setShowGestureDialog(true)
  }

  const selectGestureOption = (optionId: string) => {
    if (editingGesture) {
      setGestures({ ...gestures, [editingGesture]: optionId })
      setShowGestureDialog(false)
    }
  }

  const getGestureLabel = (gestureId: string) => {
    return gestureOptions.find(o => o.id === gestureId)?.label || "未设置"
  }

  const startFindEarbud = (side: "left" | "right") => {
    setFindingEarbud(side)
    // 模拟3秒后停止
    setTimeout(() => setFindingEarbud(null), 3000)
  }

  return (
    <div className="min-h-screen bg-background pb-6">
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
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
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
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
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

      <main className="px-4 py-4 space-y-6">
        {/* Gesture Tab */}
        {activeTab === "gesture" && (
          <>
            <section>
              <h3 className="font-semibold text-foreground mb-3">左耳手势</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0 divide-y divide-border">
                  <button
                    onClick={() => openGestureDialog("leftDouble")}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-500/10">
                        <Hand className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-card-foreground">双击</p>
                        <p className="text-xs text-muted-foreground">轻触两次</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-primary font-medium">{getGestureLabel(gestures.leftDouble)}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </button>
                  <button
                    onClick={() => openGestureDialog("leftTriple")}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-500/10">
                        <Hand className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-card-foreground">三击</p>
                        <p className="text-xs text-muted-foreground">轻触三次</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-primary font-medium">{getGestureLabel(gestures.leftTriple)}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </button>
                </CardContent>
              </Card>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-3">右耳手势</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0 divide-y divide-border">
                  <button
                    onClick={() => openGestureDialog("rightDouble")}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-500/10">
                        <Hand className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-card-foreground">双击</p>
                        <p className="text-xs text-muted-foreground">轻触两次</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-primary font-medium">{getGestureLabel(gestures.rightDouble)}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </button>
                  <button
                    onClick={() => openGestureDialog("rightTriple")}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-500/10">
                        <Hand className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-card-foreground">三击</p>
                        <p className="text-xs text-muted-foreground">轻触三次</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-primary font-medium">{getGestureLabel(gestures.rightTriple)}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </button>
                </CardContent>
              </Card>
            </section>

            <Card className="border-0 shadow-sm bg-muted/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  提示：长按手势默认用于切换降噪模式，无法自定义。
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {/* Audio Tab */}
        {activeTab === "audio" && (
          <>
            <section>
              <h3 className="font-semibold text-foreground mb-3">音频设置</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0 divide-y divide-border">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-green-500/10">
                        <Eye className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">佩戴检测</p>
                        <p className="text-xs text-muted-foreground">摘下耳机自动暂停</p>
                      </div>
                    </div>
                    <Switch checked={wearDetection} onCheckedChange={setWearDetection} />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-500/10">
                        <Waves className="h-4 w-4 text-blue-600" />
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
                      <div className="p-2 rounded-xl bg-purple-500/10">
                        <Radio className="h-4 w-4 text-purple-600" />
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

            <section>
              <h3 className="font-semibold text-foreground mb-3">更多功能</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0 divide-y divide-border">
                  <button
                    onClick={() => setShowFindDialog(true)}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-orange-500/10">
                        <Search className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-card-foreground">查找耳机</p>
                        <p className="text-xs text-muted-foreground">播放声音定位耳机</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-teal-500/10">
                        <Download className="h-4 w-4 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">固件更新</p>
                        <p className="text-xs text-muted-foreground">
                          当前版本：{currentFirmware}
                        </p>
                      </div>
                    </div>
                    {hasUpdate ? (
                      <Button size="sm" className="h-8">
                        更新至 {latestFirmware}
                      </Button>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="h-4 w-4" />
                        已是最新
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </main>

      {/* Gesture Selection Dialog */}
      <Dialog open={showGestureDialog} onOpenChange={setShowGestureDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {editingGesture ? gestureLabels[editingGesture] : "选择操作"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-1">
            {gestureOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => selectGestureOption(option.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                  editingGesture && gestures[editingGesture] === option.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-secondary"
                }`}
              >
                <span className="font-medium">{option.label}</span>
                {editingGesture && gestures[editingGesture] === option.id && (
                  <Check className="h-5 w-5" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Find Earbuds Dialog */}
      <Dialog open={showFindDialog} onOpenChange={setShowFindDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>查找耳机</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              点击下方按钮，耳机将播放声音帮助您定位
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => startFindEarbud("left")}
                disabled={findingEarbud !== null}
                className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all ${
                  findingEarbud === "left"
                    ? "bg-primary text-primary-foreground animate-pulse"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                <Headphones className="h-8 w-8" />
                <span className="font-medium">左耳</span>
                {findingEarbud === "left" && (
                  <span className="text-xs">播放中...</span>
                )}
              </button>
              <button
                onClick={() => startFindEarbud("right")}
                disabled={findingEarbud !== null}
                className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all ${
                  findingEarbud === "right"
                    ? "bg-primary text-primary-foreground animate-pulse"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                <Headphones className="h-8 w-8" />
                <span className="font-medium">右耳</span>
                {findingEarbud === "right" && (
                  <span className="text-xs">播放中...</span>
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
