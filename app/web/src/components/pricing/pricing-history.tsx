"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, DollarSign, Calendar, Target, ArrowUp, ArrowDown } from "lucide-react"

// Mock pricing history data
const mockPricingHistory = {
  priceChanges: [
    {
      date: "2024-12-15",
      price: 45,
      reason: "Initial pricing",
      impact: 0,
      salesVelocity: 12,
      totalSales: 0,
    },
    {
      date: "2024-12-22",
      price: 50,
      reason: "Holiday demand surge",
      impact: 8.5,
      salesVelocity: 18,
      totalSales: 84,
    },
    {
      date: "2025-01-02",
      price: 47,
      reason: "Post-holiday adjustment",
      impact: -2.1,
      salesVelocity: 15,
      totalSales: 210,
    },
    {
      date: "2025-01-05",
      price: 52,
      reason: "Flash sale ended",
      impact: 12.3,
      salesVelocity: 22,
      totalSales: 255,
    },
    {
      date: "2025-01-08",
      price: 55,
      reason: "Final week premium",
      impact: 15.7,
      salesVelocity: 28,
      totalSales: 287,
    },
  ],
  performanceMetrics: {
    totalRevenue: 15785,
    avgTicketPrice: 51.2,
    priceOptimizationUplift: 23.4,
    bestPerformingPrice: 55,
    worstPerformingPrice: 47,
  },
  competitorData: [
    { event: "Similar Dance Event A", price: 48, attendance: 180 },
    { event: "Similar Dance Event B", price: 42, attendance: 220 },
    { event: "Similar Dance Event C", price: 58, attendance: 150 },
  ],
}

export function PricingHistory() {
  const { priceChanges, performanceMetrics, competitorData } = mockPricingHistory

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Pricing History & Analysis</h2>
          <p className="text-muted-foreground">Track pricing decisions and their impact on sales performance</p>
        </div>
        <Button variant="outline">Export Report</Button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${performanceMetrics.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />+{performanceMetrics.priceOptimizationUplift}% vs flat pricing
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Ticket Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${performanceMetrics.avgTicketPrice}</div>
            <div className="text-xs text-muted-foreground">Across all price changes</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Best Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${performanceMetrics.bestPerformingPrice}</div>
            <div className="text-xs text-green-600">Highest conversion rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Worst Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${performanceMetrics.worstPerformingPrice}</div>
            <div className="text-xs text-red-600">Lowest conversion rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Price Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{priceChanges.length}</div>
            <div className="text-xs text-muted-foreground">Total adjustments made</div>
          </CardContent>
        </Card>
      </div>

      {/* Price & Sales Velocity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Price Changes & Sales Impact
          </CardTitle>
          <CardDescription>Track how pricing decisions affected sales velocity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceChanges}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === "price" ? `$${value}` : value,
                  name === "price" ? "Price" : "Sales Velocity",
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line yAxisId="left" type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} name="price" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="salesVelocity"
                stroke="#059669"
                strokeWidth={2}
                name="salesVelocity"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pricing Decision Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Pricing Decision Timeline
          </CardTitle>
          <CardDescription>Detailed history of all pricing changes and their reasoning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {priceChanges.map((change, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">${change.price}</span>
                    {change.impact > 0 ? (
                      <Badge variant="default" className="gap-1">
                        <ArrowUp className="h-3 w-3" />+{change.impact}%
                      </Badge>
                    ) : change.impact < 0 ? (
                      <Badge variant="destructive" className="gap-1">
                        <ArrowDown className="h-3 w-3" />
                        {change.impact}%
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Initial</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{change.reason}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Sales Velocity: {change.salesVelocity}/day</span>
                    <span>Total Sales: {change.totalSales}</span>
                    <span>{new Date(change.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Competitive Analysis
          </CardTitle>
          <CardDescription>Compare your pricing with similar events in the market</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={competitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="event" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="price" fill="#10b981" name="Price ($)" />
              <Bar yAxisId="right" dataKey="attendance" fill="#059669" name="Attendance" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
