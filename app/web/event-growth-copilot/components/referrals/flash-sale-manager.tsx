"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Clock, DollarSign, Users, Zap } from "lucide-react"

// Mock flash sale data
const mockFlashSales = [
  {
    id: "fs_1",
    name: "Early Bird Special",
    eventId: "evt_1",
    eventName: "Spring Dance Showcase",
    salePrice: 20,
    originalPrice: 25,
    startTime: "2025-03-15T19:00:00Z",
    endTime: "2025-03-15T20:00:00Z",
    maxTickets: 50,
    ticketsSold: 23,
    limitPerUser: 2,
    isActive: false,
    isScheduled: true,
  },
  {
    id: "fs_2",
    name: "Last Minute Rush",
    eventId: "evt_1",
    eventName: "Spring Dance Showcase",
    salePrice: 22,
    originalPrice: 25,
    startTime: "2025-04-14T18:00:00Z",
    endTime: "2025-04-14T19:00:00Z",
    maxTickets: 30,
    ticketsSold: 0,
    limitPerUser: 1,
    isActive: false,
    isScheduled: true,
  },
]

export function FlashSaleManager() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newSale, setNewSale] = useState({
    name: "",
    salePrice: "",
    startDate: "",
    startTime: "",
    duration: "60", // minutes
    maxTickets: "",
    limitPerUser: "2",
  })
  const { toast } = useToast()

  const handleCreateSale = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Flash sale scheduled!",
        description: `${newSale.name} will start at ${newSale.startTime} on ${newSale.startDate}`,
      })

      // Reset form
      setNewSale({
        name: "",
        salePrice: "",
        startDate: "",
        startTime: "",
        duration: "60",
        maxTickets: "",
        limitPerUser: "2",
      })
      setShowCreateForm(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule flash sale",
        variant: "destructive",
      })
    }
  }

  const toggleSale = (saleId: string, isActive: boolean) => {
    toast({
      title: isActive ? "Flash sale started!" : "Flash sale stopped",
      description: isActive ? "Customers can now see the discounted price" : "Sale has been deactivated",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Flash Sale Management</h3>
          <p className="text-sm text-muted-foreground">Create time-limited promotions to boost sales</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)} className="gap-2">
          <Zap className="h-4 w-4" />
          {showCreateForm ? "Cancel" : "Schedule Flash Sale"}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Flash Sale</CardTitle>
            <CardDescription>Create a time-limited discount to drive urgency and sales</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateSale} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="saleName">Sale Name</Label>
                  <Input
                    id="saleName"
                    placeholder="Early Bird Special"
                    value={newSale.name}
                    onChange={(e) => setNewSale({ ...newSale, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Sale Price ($)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    placeholder="20"
                    value={newSale.salePrice}
                    onChange={(e) => setNewSale({ ...newSale, salePrice: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newSale.startDate}
                    onChange={(e) => setNewSale({ ...newSale, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newSale.startTime}
                    onChange={(e) => setNewSale({ ...newSale, startTime: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="60"
                    value={newSale.duration}
                    onChange={(e) => setNewSale({ ...newSale, duration: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxTickets">Max Discounted Tickets</Label>
                  <Input
                    id="maxTickets"
                    type="number"
                    placeholder="50"
                    value={newSale.maxTickets}
                    onChange={(e) => setNewSale({ ...newSale, maxTickets: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limitPerUser">Limit Per User</Label>
                  <Input
                    id="limitPerUser"
                    type="number"
                    placeholder="2"
                    value={newSale.limitPerUser}
                    onChange={(e) => setNewSale({ ...newSale, limitPerUser: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Schedule Flash Sale
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Active/Scheduled Flash Sales */}
      <div className="space-y-4">
        {mockFlashSales.map((sale) => (
          <Card key={sale.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    {sale.name}
                  </CardTitle>
                  <CardDescription>{sale.eventName}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={sale.isActive ? "default" : sale.isScheduled ? "secondary" : "outline"}>
                    {sale.isActive ? "Active" : sale.isScheduled ? "Scheduled" : "Ended"}
                  </Badge>
                  <Switch
                    checked={sale.isActive}
                    onCheckedChange={(checked) => toggleSale(sale.id, checked)}
                    disabled={!sale.isScheduled}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">${sale.salePrice}</div>
                    <div className="text-sm text-muted-foreground">
                      <span className="line-through">${sale.originalPrice}</span> (
                      {Math.round(((sale.originalPrice - sale.salePrice) / sale.originalPrice) * 100)}% off)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{formatDateTime(sale.startTime)}</div>
                    <div className="text-sm text-muted-foreground">to {formatDateTime(sale.endTime)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">
                      {sale.ticketsSold} / {sale.maxTickets}
                    </div>
                    <div className="text-sm text-muted-foreground">tickets sold</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium">{sale.limitPerUser} per user</div>
                    <div className="text-sm text-muted-foreground">purchase limit</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${(sale.ticketsSold / sale.maxTickets) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
