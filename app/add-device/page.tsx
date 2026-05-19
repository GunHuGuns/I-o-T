"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Bluetooth, 
  BluetoothOff,
  RefreshCw, 
  Watch, 
  Headphones, 
  Scale,
  Smartphone,
  ChevronRight,
  Loader2,
  CheckCircle2,
  XCircle,
  Signal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

// 模拟扫描到的设备
const mockScannedDevices = [
  { id: "scan-1", name: "Watch GT 5", type: "watch", signal: -45, icon: Watch },
  { id: "scan-2", name: "FreeBuds 5i", type: "earbuds", signal: -52, icon: Headphones },
  { id: "scan-3", name: "未知设备", type: "unknown", signal: -68, icon: Bluetooth },
]

export default function AddDevicePage() {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(true)
  const [scannedDevices, setScannedDevices] = useState<typeof mockScannedDevices>([])
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const [connectedId, setConnectedId] = useState<string | null>(null)

  // 模拟蓝牙扫描
  useEffect(() => {
    if (isScanning) {
      setScannedDevices([])
      const timer1 = setTimeout(() => {
        setScannedDevices([mockScannedDevices[0]])
      }, 1000)
      const timer2 = setTimeout(() => {
        setScannedDevices([mockScannedDevices[0], mockScannedDevices[1]])
      }, 1800)
      const timer3 = setTimeout(() => {
        setScannedDevices(mockScannedDevices)
        setIsScanning(false)
      }, 2500)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [isScanning])

  const handleConnect = (deviceId: string) => {
    setConnectingId(deviceId)
    setTimeout(() => {
      setConnectingId(null)
      setConnectedId(deviceId)
      setTimeout(() => {
        router.push(`/devices/${deviceId}`)
      }, 1000)
    }, 2000)
  }

  const handleRescan = () => {
    setIsScanning(true)
    setConnectedId(null)
  }

  const getSignalStrength = (signal: number) => {
    if (signal > -50) return "强"
    if (signal > -60) return "中"
    return "弱"
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">添加设备</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleRescan}
            disabled={isScanning}
          >
            <RefreshCw className={`h-5 w-5 ${isScanning ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Scanning Animation */}
        <div className="flex flex-col items-center py-8">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full bg-primary/20 ${isScanning ? "animate-ping" : ""}`} 
                 style={{ animationDuration: "2s" }} />
            <div className={`absolute inset-2 rounded-full bg-primary/30 ${isScanning ? "animate-ping" : ""}`} 
                 style={{ animationDuration: "2s", animationDelay: "0.3s" }} />
            <div className={`absolute inset-4 rounded-full bg-primary/40 ${isScanning ? "animate-ping" : ""}`} 
                 style={{ animationDuration: "2s", animationDelay: "0.6s" }} />
            <div className="relative w-24 h-24 rounded-full bg-primary flex items-center justify-center">
              <Bluetooth className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <p className="mt-6 text-lg font-medium text-foreground">
            {isScanning ? "正在搜索附近设备..." : "搜索完成"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {isScanning 
              ? "请确保设备已开启并处于配对模式" 
              : `发现 ${scannedDevices.length} 个设备`
            }
          </p>
        </div>

        {/* Scanned Devices */}
        {scannedDevices.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">发现的设备</h2>
            <div className="space-y-2">
              {scannedDevices.map((device) => {
                const Icon = device.icon
                const isConnecting = connectingId === device.id
                const isConnected = connectedId === device.id
                
                return (
                  <Card key={device.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{device.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Signal className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              信号{getSignalStrength(device.signal)}
                            </span>
                          </div>
                        </div>
                        {isConnected ? (
                          <div className="flex items-center gap-2 text-accent">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="text-sm font-medium">已连接</span>
                          </div>
                        ) : isConnecting ? (
                          <div className="flex items-center gap-2 text-primary">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm">连接中</span>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => handleConnect(device.id)}
                            disabled={connectingId !== null}
                          >
                            连接
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        )}

        {/* Tips */}
        <section className="mt-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">配对提示</h2>
          <Card className="border-0 shadow-sm bg-muted/50">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">1</span>
                <p className="text-sm text-muted-foreground">确保设备电量充足并已开启</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">2</span>
                <p className="text-sm text-muted-foreground">将设备置于配对模式（通常长按电源键）</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">3</span>
                <p className="text-sm text-muted-foreground">保持手机与设备距离在1米以内</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Bottom - Manual Add Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-border max-w-md mx-auto">
        <Link href="/add-device/manual">
          <Button variant="outline" className="w-full h-12">
            <Smartphone className="h-5 w-5 mr-2" />
            手动添加设备
          </Button>
        </Link>
      </div>
    </div>
  )
}
