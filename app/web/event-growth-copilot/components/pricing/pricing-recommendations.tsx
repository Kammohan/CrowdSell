"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { TrendingUp, TrendingDown, Zap, Clock, AlertTriangle, CheckCircle, Brain } from "lucide-react"

// Mock pricing recommendations from contextual bandit
const mockRecommendations = [
  {
    id: "rec_1",
    action: "flash_sale",
    title: "1-Hour Flash Sale",
    description: "Run $20 flash sale for 60 minutes starting at 7:00 PM",
    confidence: 0.87,
    expectedUplift: 22.3,
    riskLevel: "low",
    context: {
      currentVelocity: "high",
      trafficSpike: true,
      referralMomentum: "strong",
      timeToEvent: 7,
      optOutTrend: "stable",
    },
    parameters: {
      salePrice: 20,
      originalPrice: 25,
      duration: 60,
      maxTickets: 50,
      startTime: "19:00",
    },
    reasoning: [
      "Traffic spike detected from referral sharing (+45% in last 2 hours)",
      "Strong referral momentum with 8 active promoters",
      "Optimal timing: 7 PM shows highest conversion rates historically",
      "Low risk: Opt-out rate stable at 1.1%",
    ],
    safetyChecks: {
      cooldownPeriod: true,
      maxDiscountsToday: true,
      optOutThreshold: true,
      revenueImpact: true,
    },
  },
  {
    id: "rec_2",
    action: "price_increase",
    title: "Moderate Price Increase",
    description: "Increase base price to $28 (from $25)",
    confidence: 0.72,
    expectedUplift: 8.5,
    riskLevel: "medium",
    context: {
      currentVelocity: "high",
      demandSignal: "strong",
      competitorPricing: "higher",
      timeToEvent: 7,
      capacityRemaining: "low",
    },
    parameters: {
      newPrice: 28,
      currentPrice: 25,
      increase: 3,
      increasePercent: 12,
    },
    reasoning: [
      "High demand signals: 89% of capacity sold",
      "Strong sales velocity: 23 tickets sold in last 24h",
      "Competitor events priced 15-20% higher",
      "Limited capacity remaining creates urgency",
    ],
    safetyChecks: {
      cooldownPeriod: true,
      maxIncreaseToday: true,
      demandThreshold: true,
      competitorAnalysis: true,
    },
  },
  {
    id: "rec_3",
    action: "no_action",
    title: "Maintain Current Strategy",
    description: "Keep current pricing and monitor for 6 hours",
    confidence: 0.65,
    expectedUplift: 0,
    riskLevel: "low",
    context: {
      currentVelocity: "steady",
      recentAction: "flash_sale_2h_ago",
      optOutTrend: "stable",
      forecastOnTrack: true,
    },
    reasoning: [
      "Recent flash sale still showing effects",
      "Forecast on track to meet 95% of target",
      "Stable opt-out rate at 1.2%",
      "No significant demand signals detected",
    ],
    safetyChecks: {
      recentActionCooldown: false,
      stabilityPeriod: true,
      forecastAlignment: true,
    },
  },
]

export function PricingRecommendations() {
  const [selectedRec, setSelectedRec] = useState<string | null>(null)
  const { toast } = useToast()

  const handleApplyRecommendation = async (rec: any) => {
    try {
      // Simulate API call to apply pricing recommendation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Recommendation applied!",
        description: `${rec.title} has been implemented. Expected uplift: +${rec.expectedUplift}%`,
      })

      setSelectedRec(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply recommendation. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "flash_sale":
        return <Zap className="h-5 w-5 text-accent" />
      case "price_increase":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case "price_decrease":
        return <TrendingDown className="h-5 w-5 text-red-600" />
      case "no_action":
        return <Clock className="h-5 w-5 text-muted-foreground" />
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">AI-Powered Pricing Recommendations</h3>
          <p className="text-sm text-muted-foreground">
            Contextual bandit algorithm analyzing real-time signals for optimal pricing decisions
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Brain className="h-3 w-3" />
          LinUCB Algorithm
        </Badge>
      </div>

      <div className="space-y-4">
        {mockRecommendations.map((rec, index) => (
          <Card key={rec.id} className={index === 0 ? "border-accent bg-accent/5" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getActionIcon(rec.action)}
                  <div>
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <CardDescription>{rec.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {index === 0 && <Badge variant="default">Recommended</Badge>}
                  <Badge variant="outline" className={getRiskColor(rec.riskLevel)}>
                    {rec.riskLevel} risk
                  </Badge>
                  <Badge variant="secondary">{Math.round(rec.confidence * 100)}% confidence</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Expected Impact */}
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">Expected Revenue Impact</span>
                  <span className="text-lg font-bold text-green-600">
                    {rec.expectedUplift > 0 ? "+" : ""}
                    {rec.expectedUplift}%
                  </span>
                </div>

                {/* Confidence Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Model Confidence</span>
                    <span className="text-sm text-muted-foreground">{Math.round(rec.confidence * 100)}%</span>
                  </div>
                  <Progress value={rec.confidence * 100} className="h-2" />
                </div>

                {/* Reasoning */}
                <div className="space-y-2">
                  <h4 className="font-medium">AI Reasoning</h4>
                  <ul className="space-y-1">
                    {rec.reasoning.map((reason, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety Checks */}
                <div className="space-y-2">
                  <h4 className="font-medium">Safety Checks</h4>
                  <div className="grid gap-2 md:grid-cols-2">
                    {Object.entries(rec.safetyChecks).map(([check, passed]) => (
                      <div key={check} className="flex items-center gap-2 text-sm">
                        {passed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className={passed ? "text-green-700" : "text-yellow-700"}>
                          {check.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Parameters */}
                {rec.parameters && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Parameters</h4>
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                      {Object.entries(rec.parameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{key.replace(/([A-Z])/g, " $1").toLowerCase()}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {rec.action !== "no_action" && (
                    <Button
                      onClick={() => handleApplyRecommendation(rec)}
                      className="gap-2"
                      disabled={!Object.values(rec.safetyChecks).every(Boolean)}
                    >
                      {getActionIcon(rec.action)}
                      Apply Recommendation
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRec(selectedRec === rec.id ? null : rec.id)}
                    className="bg-transparent"
                  >
                    {selectedRec === rec.id ? "Hide Details" : "View Details"}
                  </Button>
                </div>

                {/* Detailed Context (Expandable) */}
                {selectedRec === rec.id && (
                  <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-3">Contextual Signals</h4>
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                      {Object.entries(rec.context).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{key.replace(/([A-Z])/g, " $1").toLowerCase()}:</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
