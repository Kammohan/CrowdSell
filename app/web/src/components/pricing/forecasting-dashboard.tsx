"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Calendar, Users, Activity } from "lucide-react"

// Mock forecasting data
const mockForecastData = {
  currentEvent: {
    name: "Spring Dance Showcase",
    daysToEvent: 7,
    currentSales: 247,
    capacity: 300,
    target: 300,
  },
  forecast: {
    predictedSales: 287,
    confidenceInterval: [265, 309],
    probabilityOfSellout: 0.78,
    lastUpdated: "2025-01-08T15:30:00Z",
    mape: 18.2, // Mean Absolute Percentage Error
  },
  features: {
    pageViews24h: 1247,
    ctrToCheckout: 4.2,
    addToCartRate: 12.8,
    referralVelocity: 23,
    activePromoters: 8,
    trafficSpike: true,
  },
  historicalComparison: [
    { event: "Winter Gala", predicted: 245, actual: 238, error: 2.9 },
    { event: "Fall Concert", predicted: 189, actual: 201, error: 6.3 },
    { event: "Summer Festival", predicted: 456, actual: 442, error: 3.1 },
  ],
  dailyForecast: [
    { day: "Today", sales: 247, predicted: 252, confidence: 0.92 },
    { day: "Tomorrow", sales: null, predicted: 261, confidence: 0.89 },
    { day: "Day 3", sales: null, predicted: 269, confidence: 0.85 },
    { day: "Day 4", sales: null, predicted: 276, confidence: 0.81 },
    { day: "Day 5", sales: null, predicted: 282, confidence: 0.78 },
    { day: "Day 6", sales: null, predicted: 286, confidence: 0.75 },
    { day: "Event Day", sales: null, predicted: 287, confidence: 0.72 },
  ],
}

export function ForecastingDashboard() {
  const selloutProbability = Math.round(mockForecastData.forecast.probabilityOfSellout * 100)
  const forecastAccuracy = 100 - mockForecastData.forecast.mape

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">ML Forecasting Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Real-time predictions using gradient boosting with confidence intervals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="gap-1">
            <Activity className="h-3 w-3" />
            Live Model
          </Badge>
          <Badge variant="secondary">{forecastAccuracy.toFixed(1)}% Accurate</Badge>
        </div>
      </div>

      {/* Current Forecast Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Predicted Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockForecastData.forecast.predictedSales}</div>
            <div className="text-xs text-muted-foreground">
              CI: {mockForecastData.forecast.confidenceInterval[0]}-{mockForecastData.forecast.confidenceInterval[1]}
            </div>
            <Progress
              value={(mockForecastData.forecast.predictedSales / mockForecastData.currentEvent.capacity) * 100}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Sellout Probability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selloutProbability}%</div>
            <div className="text-xs text-muted-foreground">Based on current trends</div>
            <Progress value={selloutProbability} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Days to Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockForecastData.currentEvent.daysToEvent}</div>
            <div className="text-xs text-muted-foreground">Time remaining</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Current Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockForecastData.currentEvent.currentSales}</div>
            <div className="text-xs text-muted-foreground">
              {Math.round((mockForecastData.currentEvent.currentSales / mockForecastData.currentEvent.capacity) * 100)}%
              of capacity
            </div>
            <Progress
              value={(mockForecastData.currentEvent.currentSales / mockForecastData.currentEvent.capacity) * 100}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Feature Signals */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Feature Signals</CardTitle>
          <CardDescription>Key metrics feeding into the forecasting model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-medium">Traffic Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Page Views (24h)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{mockForecastData.features.pageViews24h.toLocaleString()}</span>
                    {mockForecastData.features.trafficSpike && (
                      <Badge variant="destructive" className="text-xs">
                        Spike
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">CTR to Checkout</span>
                  <span className="font-medium">{mockForecastData.features.ctrToCheckout}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Add to Cart Rate</span>
                  <span className="font-medium">{mockForecastData.features.addToCartRate}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Referral Signals</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Referral Velocity</span>
                  <span className="font-medium">{mockForecastData.features.referralVelocity}/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Promoters</span>
                  <span className="font-medium">{mockForecastData.features.activePromoters}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Model Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">MAPE</span>
                  <span className="font-medium">{mockForecastData.forecast.mape}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Updated</span>
                  <span className="font-medium text-xs">
                    {new Date(mockForecastData.forecast.lastUpdated).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Forecast Progression */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Forecast Progression</CardTitle>
          <CardDescription>Predicted sales trajectory with confidence intervals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockForecastData.dailyForecast.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{day.day}</div>
                    <div className="text-sm text-muted-foreground">{Math.round(day.confidence * 100)}% confidence</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {day.sales ? `${day.sales} actual` : `${day.predicted} predicted`}
                  </div>
                  <Progress value={day.confidence * 100} className="h-1 w-20 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Accuracy */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Model Performance</CardTitle>
          <CardDescription>Accuracy on recent events for model validation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockForecastData.historicalComparison.map((event) => (
              <div key={event.event} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{event.event}</div>
                  <div className="text-sm text-muted-foreground">
                    Predicted: {event.predicted} | Actual: {event.actual}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={event.error < 5 ? "default" : event.error < 10 ? "secondary" : "destructive"}>
                    {event.error}% error
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
