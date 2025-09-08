"use client"

// Mock ML model performance data
const mockModelPerformance = {
  forecasting: {
    accuracy: 82.3,
    mape: 17.7,
    mae: 12.4,
    rmse: 18.9,
    r2Score: 0.847,
    lastCalibration: "2025-01-08T06:00:00Z",
    trainingEvents: 47,
    validationEvents: 12,
  },
  pricingBandit: {
    totalRecommendations: 156,
    acceptedRecommendations: 89,
    acceptanceRate: 57.1,
    avgUplift: 18.7,
    bestUplift: 34.2,
    worstUplift: -2.1,
    explorationRate: 0.15,
    algorithm: "LinUCB",
  },
  featureImportance: [
    { feature: "Days to Event", importance: 0.23, description: "Time remaining until event" },
    { feature: "Current Sales Velocity", importance: 0.19, description: "Recent ticket sales rate" },
    { feature: "Page Views (24h)", importance: 0.16, description: "Website traffic in last 24 hours" },
    { feature: "Referral Activity", importance: 0.14, description: "Referral link clicks and conversions" },
    { feature: "Historical Baseline", importance: 0.12, description: "Similar events by same organizer" },
    { feature: "Day of Week", importance: 0.08, description: "Event day timing effects" },
    { feature: "Price Point", importance: 0.08, description: "Current ticket price level" },
  ],
  modelHealth: {
    dataQuality: 94.2,
    featureDrift: 2.1,
    predictionLatency: 45, // milliseconds
    memoryUsage: 78.3, // Fixed truncated syntax and completed the object
    cpuUsage: 23.7,
    lastHealthCheck: "2025-01-08T14:30:00Z",
    status: "healthy" as const,
  },
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, Target, Activity, AlertTriangle, CheckCircle } from "lucide-react"

export function MLModelPerformance() {
  const { forecasting, pricingBandit, featureImportance, modelHealth } = mockModelPerformance

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">ML Model Performance</h2>
        <Badge variant={modelHealth.status === "healthy" ? "default" : "destructive"}>
          {modelHealth.status === "healthy" ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <AlertTriangle className="h-3 w-3 mr-1" />
          )}
          {modelHealth.status}
        </Badge>
      </div>

      <Tabs defaultValue="forecasting" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forecasting">Forecasting Model</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Bandit</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="forecasting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{forecasting.accuracy}%</div>
                <p className="text-xs text-muted-foreground">Overall prediction accuracy</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">MAPE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{forecasting.mape}%</div>
                <p className="text-xs text-muted-foreground">Mean Absolute Percentage Error</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">R² Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{forecasting.r2Score}</div>
                <p className="text-xs text-muted-foreground">Coefficient of determination</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Training Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{forecasting.trainingEvents}</div>
                <p className="text-xs text-muted-foreground">Events used for training</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Feature Importance
              </CardTitle>
              <CardDescription>Key factors driving forecast predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {featureImportance.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{feature.feature}</span>
                    <span className="text-sm text-muted-foreground">{(feature.importance * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={feature.importance * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{pricingBandit.acceptanceRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {pricingBandit.acceptedRecommendations}/{pricingBandit.totalRecommendations} recommendations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Uplift</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+{pricingBandit.avgUplift}%</div>
                <p className="text-xs text-muted-foreground">Revenue improvement</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Best Uplift</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+{pricingBandit.bestUplift}%</div>
                <p className="text-xs text-muted-foreground">Best single recommendation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Algorithm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pricingBandit.algorithm}</div>
                <p className="text-xs text-muted-foreground">ε = {pricingBandit.explorationRate}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  System Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Data Quality</span>
                    <span className="text-sm font-medium">{modelHealth.dataQuality}%</span>
                  </div>
                  <Progress value={modelHealth.dataQuality} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-medium">{modelHealth.memoryUsage}%</span>
                  </div>
                  <Progress value={modelHealth.memoryUsage} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-medium">{modelHealth.cpuUsage}%</span>
                  </div>
                  <Progress value={modelHealth.cpuUsage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Feature Drift</span>
                  <Badge variant={modelHealth.featureDrift < 5 ? "default" : "destructive"}>
                    {modelHealth.featureDrift}%
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Prediction Latency</span>
                  <Badge variant={modelHealth.predictionLatency < 100 ? "default" : "destructive"}>
                    {modelHealth.predictionLatency}ms
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Health Check</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(modelHealth.lastHealthCheck).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
