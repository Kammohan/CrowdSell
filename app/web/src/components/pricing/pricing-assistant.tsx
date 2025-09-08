"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ForecastingDashboard } from "./forecasting-dashboard"
import { PricingRecommendations } from "./pricing-recommendations"
import { MLModelPerformance } from "./ml-model-performance"
import { PricingHistory } from "./pricing-history"
import { TrendingUp, Brain, Target, Zap } from "lucide-react"

// Mock ML insights data
const mockMLInsights = {
  currentForecast: {
    predictedSales: 287,
    confidenceInterval: [265, 309],
    targetSales: 300,
    probabilityOfSellout: 0.78,
    daysToEvent: 7,
    lastUpdated: "2025-01-08T15:30:00Z",
  },
  pricingRecommendation: {
    action: "flash_sale",
    confidence: 0.85,
    expectedUplift: 18.5,
    riskLevel: "low",
    reasoning: "Traffic spike detected from referrals. Flash sale recommended to capitalize on momentum.",
  },
  modelPerformance: {
    forecastAccuracy: 82.3,
    pricingUplift: 23.7,
    optOutImpact: 0.3,
    lastCalibration: "2025-01-08T06:00:00Z",
  },
}

export function PricingAssistant() {
  const [selectedEvent, setSelectedEvent] = useState("evt_1")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">ML Pricing Assistant</h1>
          <p className="text-muted-foreground">AI-powered forecasting and dynamic pricing recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="gap-1">
            <Brain className="h-3 w-3" />
            Model Active
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Target className="h-3 w-3" />
            {mockMLInsights.modelPerformance.forecastAccuracy}% Accuracy
          </Badge>
        </div>
      </div>

      {/* AI Insights Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forecast</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMLInsights.currentForecast.predictedSales}</div>
            <p className="text-xs text-muted-foreground">
              Target: {mockMLInsights.currentForecast.targetSales} tickets
            </p>
            <div className="text-xs text-muted-foreground mt-1">
              CI: {mockMLInsights.currentForecast.confidenceInterval[0]}-
              {mockMLInsights.currentForecast.confidenceInterval[1]}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sellout Probability</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockMLInsights.currentForecast.probabilityOfSellout * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">{mockMLInsights.currentForecast.daysToEvent} days to event</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pricing Uplift</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{mockMLInsights.modelPerformance.pricingUplift}%</div>
            <p className="text-xs text-muted-foreground">vs flat pricing baseline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMLInsights.modelPerformance.forecastAccuracy}%</div>
            <p className="text-xs text-muted-foreground">MAPE on recent events</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Recommendation Alert */}
      {mockMLInsights.pricingRecommendation.action !== "no_action" && (
        <Card className="border-accent bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">AI Recommendation</h3>
                  <Badge variant="secondary">
                    {Math.round(mockMLInsights.pricingRecommendation.confidence * 100)}% confidence
                  </Badge>
                  <Badge variant="outline">{mockMLInsights.pricingRecommendation.riskLevel} risk</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{mockMLInsights.pricingRecommendation.reasoning}</p>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="gap-1">
                    <Zap className="h-3 w-3" />
                    Apply Recommendation (+{mockMLInsights.pricingRecommendation.expectedUplift}% expected)
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="performance">Model Performance</TabsTrigger>
          <TabsTrigger value="history">Pricing History</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <PricingRecommendations />
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <ForecastingDashboard />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <MLModelPerformance />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <PricingHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
