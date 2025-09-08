"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

// Mock analytics data
const mockAnalytics = {
  campaignPerformance: [
    {
      id: "sms_1",
      name: "Spring Dance Reminder",
      sent: 1189,
      delivered: 1174,
      failed: 15,
      replies: 23,
      optOuts: 2,
      deliveryRate: 98.7,
      replyRate: 1.9,
      optOutRate: 0.17,
      sentAt: "2025-01-08T14:30:00Z",
    },
    {
      id: "sms_2",
      name: "Last Chance Tickets",
      sent: 1187,
      delivered: 1169,
      failed: 18,
      replies: 31,
      optOuts: 3,
      deliveryRate: 98.5,
      replyRate: 2.6,
      optOutRate: 0.25,
      sentAt: "2025-01-06T16:00:00Z",
    },
    {
      id: "sms_3",
      name: "Event Reminder",
      sent: 1184,
      delivered: 1171,
      failed: 13,
      replies: 18,
      optOuts: 1,
      deliveryRate: 98.9,
      replyRate: 1.5,
      optOutRate: 0.08,
      sentAt: "2025-01-04T12:00:00Z",
    },
  ],
  trends: {
    deliveryRate: { current: 98.7, previous: 98.2, trend: "up" },
    optOutRate: { current: 1.2, previous: 1.8, trend: "down" },
    replyRate: { current: 4.3, previous: 3.9, trend: "up" },
  },
  timeAnalysis: {
    bestSendTimes: [
      { hour: "2:00 PM", deliveryRate: 99.1, replyRate: 5.2 },
      { hour: "6:00 PM", deliveryRate: 98.8, replyRate: 4.8 },
      { hour: "12:00 PM", deliveryRate: 98.5, replyRate: 4.1 },
    ],
    worstSendTimes: [
      { hour: "8:00 AM", deliveryRate: 97.2, replyRate: 2.1 },
      { hour: "11:00 PM", deliveryRate: 96.8, replyRate: 1.8 },
    ],
  },
}

export function SMSAnalytics() {
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  const getTrendColor = (trend: string, isOptOut = false) => {
    if (isOptOut) {
      return trend === "down" ? "text-green-600" : "text-red-600"
    }
    return trend === "up" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Trends */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Delivery Rate
              {getTrendIcon(mockAnalytics.trends.deliveryRate.trend)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.trends.deliveryRate.current}%</div>
            <div className={`text-xs ${getTrendColor(mockAnalytics.trends.deliveryRate.trend)}`}>
              {mockAnalytics.trends.deliveryRate.trend === "up" ? "+" : ""}
              {(mockAnalytics.trends.deliveryRate.current - mockAnalytics.trends.deliveryRate.previous).toFixed(1)}%
              from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Opt-out Rate
              {getTrendIcon(mockAnalytics.trends.optOutRate.trend)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.trends.optOutRate.current}%</div>
            <div className={`text-xs ${getTrendColor(mockAnalytics.trends.optOutRate.trend, true)}`}>
              {mockAnalytics.trends.optOutRate.trend === "up" ? "+" : ""}
              {(mockAnalytics.trends.optOutRate.current - mockAnalytics.trends.optOutRate.previous).toFixed(1)}% from
              last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Reply Rate
              {getTrendIcon(mockAnalytics.trends.replyRate.trend)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.trends.replyRate.current}%</div>
            <div className={`text-xs ${getTrendColor(mockAnalytics.trends.replyRate.trend)}`}>
              {mockAnalytics.trends.replyRate.trend === "up" ? "+" : ""}
              {(mockAnalytics.trends.replyRate.current - mockAnalytics.trends.replyRate.previous).toFixed(1)}% from last
              period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance History</CardTitle>
          <CardDescription>Detailed metrics for recent SMS campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.campaignPerformance.map((campaign) => (
              <div key={campaign.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">{campaign.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(campaign.sentAt).toLocaleDateString()} • {campaign.sent.toLocaleString()} sent
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={campaign.deliveryRate > 98 ? "default" : "secondary"}>
                      {campaign.deliveryRate}% delivered
                    </Badge>
                    <Badge variant={campaign.optOutRate < 0.2 ? "default" : "destructive"}>
                      {campaign.optOutRate}% opt-out
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{campaign.delivered}</div>
                    <div className="text-xs text-muted-foreground">Delivered</div>
                    <Progress value={campaign.deliveryRate} className="h-1 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{campaign.failed}</div>
                    <div className="text-xs text-muted-foreground">Failed</div>
                    <Progress value={(campaign.failed / campaign.sent) * 100} className="h-1 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{campaign.replies}</div>
                    <div className="text-xs text-muted-foreground">Replies ({campaign.replyRate}%)</div>
                    <Progress value={campaign.replyRate} className="h-1 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{campaign.optOuts}</div>
                    <div className="text-xs text-muted-foreground">Opt-outs ({campaign.optOutRate}%)</div>
                    <Progress value={campaign.optOutRate} className="h-1 mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Send Time Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Best Send Times
            </CardTitle>
            <CardDescription>Times with highest delivery and engagement rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnalytics.timeAnalysis.bestSendTimes.map((time, index) => (
                <div key={time.hour} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-xs font-bold text-green-700 dark:text-green-300">
                      {index + 1}
                    </div>
                    <div className="font-medium">{time.hour}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{time.deliveryRate}% delivered</div>
                    <div className="text-xs text-muted-foreground">{time.replyRate}% reply rate</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Avoid These Times
            </CardTitle>
            <CardDescription>Times with lower delivery and engagement rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnalytics.timeAnalysis.worstSendTimes.map((time, index) => (
                <div key={time.hour} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center text-xs font-bold text-red-700 dark:text-red-300">
                      !
                    </div>
                    <div className="font-medium">{time.hour}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{time.deliveryRate}% delivered</div>
                    <div className="text-xs text-muted-foreground">{time.replyRate}% reply rate</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
