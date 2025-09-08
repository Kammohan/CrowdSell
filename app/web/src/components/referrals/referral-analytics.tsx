"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle } from "lucide-react"

// Mock analytics data
const mockAnalytics = {
  fraudDetection: {
    totalChecks: 1247,
    flaggedAttempts: 23,
    blockedSelfPurchases: 8,
    suspiciousIPs: 5,
    rateLimit: 10,
  },
  attribution: {
    lastTouch24h: 156,
    multiTouch: 34,
    directConversions: 89,
    avgTouchesToConversion: 2.3,
  },
  performance: {
    topReferralSources: [
      { source: "Instagram Stories", clicks: 234, conversions: 45, rate: 19.2 },
      { source: "WhatsApp Groups", clicks: 189, conversions: 38, rate: 20.1 },
      { source: "Discord Servers", clicks: 156, conversions: 28, rate: 17.9 },
      { source: "Email Signatures", clicks: 98, conversions: 22, rate: 22.4 },
    ],
    deviceBreakdown: [
      { device: "Mobile", percentage: 68, conversions: 89 },
      { device: "Desktop", percentage: 28, conversions: 37 },
      { device: "Tablet", percentage: 4, conversions: 5 },
    ],
  },
}

export function ReferralAnalytics() {
  return (
    <div className="space-y-6">
      {/* Fraud Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-accent" />
            Fraud Detection & Security
          </CardTitle>
          <CardDescription>Real-time monitoring of referral program integrity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Security Checks</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold">{mockAnalytics.fraudDetection.totalChecks.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">All referrals screened</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Flagged Attempts</span>
                <Badge variant="destructive">{mockAnalytics.fraudDetection.flaggedAttempts}</Badge>
              </div>
              <div className="text-2xl font-bold">{mockAnalytics.fraudDetection.flaggedAttempts}</div>
              <div className="text-xs text-muted-foreground">
                {(
                  (mockAnalytics.fraudDetection.flaggedAttempts / mockAnalytics.fraudDetection.totalChecks) *
                  100
                ).toFixed(1)}
                % of total
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Self-Purchase Blocks</span>
                <Badge variant="outline">{mockAnalytics.fraudDetection.blockedSelfPurchases}</Badge>
              </div>
              <div className="text-2xl font-bold">{mockAnalytics.fraudDetection.blockedSelfPurchases}</div>
              <div className="text-xs text-muted-foreground">Max 1 per promoter enforced</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rate Limited</span>
                <Badge variant="secondary">{mockAnalytics.fraudDetection.rateLimit}</Badge>
              </div>
              <div className="text-2xl font-bold">{mockAnalytics.fraudDetection.rateLimit}</div>
              <div className="text-xs text-muted-foreground">Code creation attempts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attribution Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Attribution Model Performance</CardTitle>
          <CardDescription>24-hour last-touch attribution with multi-touch insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <span className="text-sm font-medium">Last Touch (24h)</span>
              <div className="text-2xl font-bold">{mockAnalytics.attribution.lastTouch24h}</div>
              <div className="text-xs text-muted-foreground">Primary attribution model</div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Multi-Touch</span>
              <div className="text-2xl font-bold">{mockAnalytics.attribution.multiTouch}</div>
              <div className="text-xs text-muted-foreground">Multiple referrer interactions</div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Direct Conversions</span>
              <div className="text-2xl font-bold">{mockAnalytics.attribution.directConversions}</div>
              <div className="text-xs text-muted-foreground">No referral code used</div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Avg Touches</span>
              <div className="text-2xl font-bold">{mockAnalytics.attribution.avgTouchesToConversion}</div>
              <div className="text-xs text-muted-foreground">Before conversion</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance by Source */}
      <Card>
        <CardHeader>
          <CardTitle>Top Referral Sources</CardTitle>
          <CardDescription>Where your promoters are sharing and driving conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.performance.topReferralSources.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{source.source}</div>
                    <div className="text-sm text-muted-foreground">
                      {source.clicks} clicks → {source.conversions} conversions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{source.rate}%</div>
                  <div className="text-xs text-muted-foreground">conversion rate</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Device & Platform Analytics</CardTitle>
          <CardDescription>How users are accessing your referral links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.performance.deviceBreakdown.map((device) => (
              <div key={device.device} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{device.device}</span>
                  <span className="text-sm text-muted-foreground">
                    {device.conversions} conversions ({device.percentage}%)
                  </span>
                </div>
                <Progress value={device.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
