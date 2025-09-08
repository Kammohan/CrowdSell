"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, TrendingUp, DollarSign, MessageSquare, Users, AlertTriangle, X, ArrowRight } from "lucide-react"

// Mock nudges data
const mockNudges = [
  {
    id: 1,
    type: "pricing",
    priority: "high",
    title: "Pricing Opportunity Detected",
    message:
      "Your 'Summer Dance Showcase' is selling 23% faster than predicted. Consider raising price by $5 to maximize revenue.",
    action: "Adjust Pricing",
    impact: "+$340 estimated revenue",
    timestamp: "2 minutes ago",
    icon: DollarSign,
  },
  {
    id: 2,
    type: "sms",
    priority: "medium",
    title: "SMS Campaign Reminder",
    message:
      "It's been 3 days since your last SMS blast. Your audience engagement is optimal for a follow-up campaign.",
    action: "Send SMS",
    impact: "67% avg engagement rate",
    timestamp: "1 hour ago",
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "referral",
    priority: "medium",
    title: "Referral Momentum Building",
    message:
      "Your top promoter 'sarah_dance' has generated 12 referrals today. Consider featuring them in your next campaign.",
    action: "Feature Promoter",
    impact: "+15% referral boost",
    timestamp: "3 hours ago",
    icon: Users,
  },
  {
    id: 4,
    type: "performance",
    priority: "low",
    title: "Event Performance Update",
    message: "Your 'Tech Conference 2025' is tracking 8% above forecast. Great job on the marketing execution!",
    action: "View Details",
    impact: "On track for sellout",
    timestamp: "6 hours ago",
    icon: TrendingUp,
  },
  {
    id: 5,
    type: "compliance",
    priority: "high",
    title: "SMS Compliance Alert",
    message:
      "Opt-out rate increased to 4.2% in your last campaign. Review message content and frequency to maintain compliance.",
    action: "Review Campaign",
    impact: "Compliance risk",
    timestamp: "1 day ago",
    icon: AlertTriangle,
  },
]

const priorityColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const

const typeIcons = {
  pricing: DollarSign,
  sms: MessageSquare,
  referral: Users,
  performance: TrendingUp,
  compliance: AlertTriangle,
}

export function NudgesSystem() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Smart Nudges
          <Badge variant="outline">{mockNudges.length}</Badge>
        </CardTitle>
        <CardDescription>AI-powered recommendations to optimize your event performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockNudges.map((nudge) => {
          const IconComponent = nudge.icon
          return (
            <div
              key={nudge.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{nudge.title}</h4>
                  <Badge variant={priorityColors[nudge.priority as keyof typeof priorityColors]}>
                    {nudge.priority}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">{nudge.message}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-primary">{nudge.impact}</span>
                    <span className="text-xs text-muted-foreground">{nudge.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <X className="h-3 w-3 mr-1" />
                      Dismiss
                    </Button>
                    <Button size="sm">
                      {nudge.action}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <div className="text-center pt-4">
          <Button variant="outline">View All Recommendations</Button>
        </div>
      </CardContent>
    </Card>
  )
}
