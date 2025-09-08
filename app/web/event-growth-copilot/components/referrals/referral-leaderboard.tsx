"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Trophy, Medal, Award, Copy, ExternalLink } from "lucide-react"

// Mock promoter data
const mockPromoters = [
  {
    id: "prm_1",
    name: "Sarah Chen",
    email: "sarah@utd.edu",
    referralCode: "evt_1-sarah",
    clicks: 89,
    conversions: 23,
    revenue: 575,
    conversionRate: 25.8,
    rank: 1,
    avatar: "/placeholder.svg?height=40&width=40",
    shareUrl: "https://events.growthcopilot.com/spring-dance-showcase?ref=evt_1-sarah",
  },
  {
    id: "prm_2",
    name: "Alex Rodriguez",
    email: "alex@utd.edu",
    referralCode: "evt_1-alex",
    clicks: 76,
    conversions: 18,
    revenue: 450,
    conversionRate: 23.7,
    rank: 2,
    avatar: "/placeholder.svg?height=40&width=40",
    shareUrl: "https://events.growthcopilot.com/spring-dance-showcase?ref=evt_1-alex",
  },
  {
    id: "prm_3",
    name: "Maya Patel",
    email: "maya@utd.edu",
    referralCode: "evt_1-maya",
    clicks: 64,
    conversions: 15,
    revenue: 375,
    conversionRate: 23.4,
    rank: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    shareUrl: "https://events.growthcopilot.com/spring-dance-showcase?ref=evt_1-maya",
  },
  {
    id: "prm_4",
    name: "Jordan Kim",
    email: "jordan@utd.edu",
    referralCode: "evt_1-jordan",
    clicks: 52,
    conversions: 12,
    revenue: 300,
    conversionRate: 23.1,
    rank: 4,
    avatar: "/placeholder.svg?height=40&width=40",
    shareUrl: "https://events.growthcopilot.com/spring-dance-showcase?ref=evt_1-jordan",
  },
  {
    id: "prm_5",
    name: "Taylor Johnson",
    email: "taylor@utd.edu",
    referralCode: "evt_1-taylor",
    clicks: 43,
    conversions: 9,
    revenue: 225,
    conversionRate: 20.9,
    rank: 5,
    avatar: "/placeholder.svg?height=40&width=40",
    shareUrl: "https://events.growthcopilot.com/spring-dance-showcase?ref=evt_1-taylor",
  },
]

export function ReferralLeaderboard() {
  const { toast } = useToast()

  const copyShareUrl = (url: string, name: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Share link copied!",
      description: `${name}'s referral link copied to clipboard`,
    })
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return (
          <div className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">
            #{rank}
          </div>
        )
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 text-yellow-50">🏆 Champion</Badge>
      case 2:
        return <Badge className="bg-gray-400 text-gray-50">🥈 Runner-up</Badge>
      case 3:
        return <Badge className="bg-amber-600 text-amber-50">🥉 Third Place</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Top Promoters - Spring Dance Showcase</CardTitle>
          <CardDescription>Ranked by total conversions and revenue generated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPromoters.map((promoter) => (
              <div
                key={promoter.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(promoter.rank)}
                    {getRankBadge(promoter.rank)}
                  </div>

                  <Avatar className="h-10 w-10">
                    <AvatarImage src={promoter.avatar || "/placeholder.svg"} alt={promoter.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {promoter.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="font-medium">{promoter.name}</div>
                    <div className="text-sm text-muted-foreground">{promoter.email}</div>
                    <div className="text-xs text-muted-foreground">Code: {promoter.referralCode}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm font-medium">{promoter.clicks}</div>
                    <div className="text-xs text-muted-foreground">Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{promoter.conversions}</div>
                    <div className="text-xs text-muted-foreground">Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">${promoter.revenue}</div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{promoter.conversionRate}%</div>
                    <div className="text-xs text-muted-foreground">Conv. Rate</div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyShareUrl(promoter.shareUrl, promoter.name)}
                      className="gap-1 bg-transparent"
                    >
                      <Copy className="h-3 w-3" />
                      Copy Link
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(promoter.shareUrl, "_blank")}
                      className="gap-1 bg-transparent"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Information */}
      <Card>
        <CardHeader>
          <CardTitle>Reward Tiers</CardTitle>
          <CardDescription>Incentives for top-performing promoters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="font-medium">Champion (1st Place)</div>
              <div className="text-sm text-muted-foreground">$100 cash prize + VIP event access</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Medal className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <div className="font-medium">Runner-up (2nd Place)</div>
              <div className="text-sm text-muted-foreground">$50 cash prize + event merchandise</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="font-medium">Third Place</div>
              <div className="text-sm text-muted-foreground">$25 cash prize + recognition</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
