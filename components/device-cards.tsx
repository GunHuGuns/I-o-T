"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Watch, 
  Headphones, 
  Scale, 
  Smartphone,
  Battery,
  Bluetooth,
  ChevronRight,
  Signal,
  Plus
} from "lucide-react"
import Link from "next/link"

interface Device {
  id: string
  name: string
  type: "watch" | "earbuds" | "scale" | "band"
  model: string
  battery: number
  connected: boolean
  lastSync?: string
  icon: typeof Watch
}

const devices: Device[] = [
  {
    id: "1",
    name: "智能手表",
    type: "watch",
    model: "Watch GT 5 Pro",
    battery: 78,
    connected: true,
    icon: Watch,
  },
  {
    id: "2",
    name: "无线耳机",
    type: "earbuds",
    model: "FreeBuds Pro 3",
    battery: 45,
    connected: true,
    icon: Headphones,
  },
  {
    id: "3",
    name: "智能体脂秤",
    type: "scale",
    model: "Body Scale 3",
    battery: 92,
    connected: false,
    lastSync: "2小时前",
    icon: Scale,
  },
]

export function ConnectedDevices() {
  const connectedCount = devices.filter(d => d.connected).length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">我的设备</h3>
        <Link href="/devices" className="text-sm text-primary font-medium flex items-center gap-1">
          全部 <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {devices.slice(0, 3).map((device) => (
          <Link
            key={device.id}
            href={`/devices/${device.id}`}
            className="flex-shrink-0"
          >
            <Card className={`w-32 border-0 shadow-sm hover:shadow-md transition-all ${
              device.connected ? "bg-card" : "bg-muted/50"
            }`}>
              <CardContent className="p-3">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-2xl mb-2 ${
                    device.connected ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <device.icon className={`h-6 w-6 ${
                      device.connected ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <p className="text-xs font-medium text-card-foreground truncate w-full">
                    {device.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {device.connected ? (
                      <>
                        <Signal className="h-3 w-3 text-accent" />
                        <span className="text-xs text-accent">已连接</span>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {device.lastSync}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Battery className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {device.battery}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        <Card className="w-32 border-dashed border-2 border-border flex-shrink-0 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="p-3 h-full flex flex-col items-center justify-center">
            <div className="p-3 rounded-2xl bg-muted mb-2">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">添加设备</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function DeviceList() {
  return (
    <div className="space-y-3">
      {devices.map((device) => (
        <Link key={device.id} href={`/devices/${device.id}`}>
          <Card className="border-0 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${
                  device.connected ? "bg-primary/10" : "bg-muted"
                }`}>
                  <device.icon className={`h-7 w-7 ${
                    device.connected ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-card-foreground">{device.name}</p>
                    {device.connected && (
                      <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
                        已连接
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{device.model}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1">
                    <Battery className={`h-4 w-4 ${
                      device.battery > 20 ? "text-accent" : "text-destructive"
                    }`} />
                    <span className="text-sm font-medium text-card-foreground">
                      {device.battery}%
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export function AddDeviceButton() {
  return (
    <Button className="w-full gap-2" variant="outline">
      <Plus className="h-4 w-4" />
      添加新设备
    </Button>
  )
}
