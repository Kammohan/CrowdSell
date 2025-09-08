"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, DollarSign, MessageSquare, MapPin, Target, ArrowUp, ArrowDown } from "lucide-react"

// Mock analytics data
const mockAnalytics = {
  realTimeMetrics: {
    activeVisitors: 127,
    pageViews: 2847,
    conversions: 89,
    revenue: 12450,
    smsEngagement: 67.3,
    referralClicks: 234,
  },
  revenueData: [
    { date: "Jan 1", revenue: 8500, forecast: 8200 },
    { date: "Jan 2", revenue: 9200, forecast: 9100 },
    { date: "Jan 3", revenue: 11800, forecast: 10500 },
    { date: "Jan 4", revenue: 12450, forecast: 11200 },
    { date: "Jan 5", revenue: 0, forecast: 13800 },
    { date: "Jan 6", revenue: 0, forecast: 15200 },
    { date: "Jan 7", revenue: 0, forecast: 16500 },
  ],
  conversionFunnel: [
    { name: "Page Views", value: 2847, fill: "#10b981" },
    { name: "Add to Cart", value: 456, fill: "#059669" },
    { name: "Checkout Started", value: 234, fill: "#047857" },
    { name: "Payment Completed", value: 89, fill: "#065f46" },
  ],
  trafficSources: [
    { name: "Referrals", value: 45, fill: "#10b981" },
    { name: "Direct", value: 28, fill: "#059669" },
    { name: "Social Media", value: 18, fill: "#047857" },
    { name: "SMS", value: 9, fill: "#065f46" },
  ],
  geographicData: [
    { region: "California", visitors: 456, revenue: 5200 },
    { region: "New York", visitors: 234, revenue: 3100 },
    { region: "Texas", visitors: 189, revenue: 2400 },
    { region: "Florida", visitors: 167, revenue: 1750 },
  ],
  cohortData: [
    { week: "Week 1", retention: 100, revenue: 2500 },
    { week: "Week 2", retention: 78, revenue: 1950 },
    { week: "Week 3", retention: 65, revenue: 1625 },
    { week: "Week 4", retention: 54, revenue: 1350 },
  ],
}

export function AnalyticsDashboard() {
  const { realTimeMetrics, revenueData, conversionFunnel, trafficSources, geographicData, cohortData } = mockAnalytics

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Active Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeMetrics.activeVisitors}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +12% vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Page Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeMetrics.pageViews.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +8% vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeMetrics.conversions}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +15% vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${realTimeMetrics.revenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +22% vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              SMS Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeMetrics.smsEngagement}%</div>
            <div className="flex items-center text-xs text-red-600">
              <ArrowDown className="h-3 w-3 mr-1" />
              -3% vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Referral Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeMetrics.referralClicks}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +18% vs yesterday
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Forecast</CardTitle>
                <CardDescription>Actual revenue compared to ML predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Actual Revenue" />
                    <Line type="monotone" dataKey="forecast" stroke="#6b7280" strokeDasharray="5 5" name="Forecast" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Track user journey from page view to purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnel.map((step, index) => {
                  const conversionRate =
                    index > 0 ? ((step.value / conversionFunnel[index - 1].value) * 100).toFixed(1) : 100
                  return (
                    <div key={step.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{step.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{step.value.toLocaleString()}</span>
                          {index > 0 && <Badge variant="outline">{conversionRate}%</Badge>}
                        </div>
                      </div>
                      <Progress value={(step.value / conversionFunnel[0].value) * 100} className="h-3" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Analysis</CardTitle>
              <CardDescription>User retention and revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cohortData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="retention" fill="#10b981" name="Retention %" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#059669" name="Revenue $" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Performance</CardTitle>
              <CardDescription>Visitors and revenue by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((region, index) => (
                  <div key={region.region} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">{region.region}</div>
                        <div className="text-sm text-muted-foreground">{region.visitors} visitors</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${region.revenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Forecasting Accuracy</CardTitle>
              <CardDescription>ML model performance and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">82.3%</div>
                  <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">17.7%</div>
                  <div className="text-sm text-muted-foreground">MAPE</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+18.7%</div>
                  <div className="text-sm text-muted-foreground">Avg Revenue Uplift</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
