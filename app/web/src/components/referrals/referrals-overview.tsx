"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatePromoterDialog } from "./create-promoter-dialog"
import { FlashSaleManager } from "./flash-sale-manager"
import { ReferralLeaderboard } from "./referral-leaderboard"
import { ReferralAnalytics } from "./referral-analytics"
import { Plus, Users, TrendingUp, Share, Award } from "lucide-react"

// Mock data - in real app this would come from API
const mockReferralStats = {
  totalPromoters: 12,
  activePromoters: 8,
  totalReferrals: 156,
  conversionRate: 23.5,
  totalRevenue: 3675,
  avgRevenuePerReferral: 23.56,
}

export function ReferralsOverview() {
  const [showCreatePromoter, setShowCreatePromoter] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Referrals & Promoters</h1>
          <p className="text-muted-foreground">Manage your referral program and track performance</p>
        </div>
        <Button onClick={() => setShowCreatePromoter(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Promoter
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Promoters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReferralStats.totalPromoters}</div>
            <p className="text-xs text-muted-foreground">{mockReferralStats.activePromoters} active this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Share className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReferralStats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">+12% from last event</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReferralStats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Above industry average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Revenue</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockReferralStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">${mockReferralStats.avgRevenuePerReferral} avg per referral</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="flash-sales">Flash Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="space-y-4">
          <ReferralLeaderboard />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <ReferralAnalytics />
        </TabsContent>

        <TabsContent value="flash-sales" className="space-y-4">
          <FlashSaleManager />
        </TabsContent>
      </Tabs>

      <CreatePromoterDialog open={showCreatePromoter} onOpenChange={setShowCreatePromoter} />
    </div>
  )
}
