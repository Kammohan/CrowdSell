"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Shield, AlertTriangle, CheckCircle, Download, MessageSquare } from "lucide-react"

// Mock compliance data
const mockComplianceData = {
  keywordHandling: {
    stopReplies: 15,
    helpReplies: 8,
    unknownReplies: 23,
    avgResponseTime: 2.3, // seconds
  },
  suppressionList: {
    globalOptOuts: 15,
    eventOptOuts: 8,
    totalSuppressed: 23,
  },
  auditLog: [
    {
      id: "audit_1",
      timestamp: "2025-01-08T15:30:00Z",
      action: "STOP_PROCESSED",
      phone: "+1 (555) 123-4567",
      campaignId: "sms_1",
      responseTime: 1.8,
    },
    {
      id: "audit_2",
      timestamp: "2025-01-08T14:15:00Z",
      action: "HELP_PROCESSED",
      phone: "+1 (555) 234-5678",
      campaignId: "sms_1",
      responseTime: 2.1,
    },
    {
      id: "audit_3",
      timestamp: "2025-01-08T13:45:00Z",
      action: "CAMPAIGN_SENT",
      campaignId: "sms_1",
      recipients: 1189,
      suppressedCount: 23,
    },
  ],
}

export function ComplianceCenter() {
  const { toast } = useToast()

  const exportAuditLog = () => {
    const csvContent = [
      "Timestamp,Action,Phone,Campaign ID,Response Time,Recipients,Suppressed Count",
      ...mockComplianceData.auditLog.map((log) =>
        [
          log.timestamp,
          log.action,
          log.phone || "",
          log.campaignId,
          log.responseTime || "",
          (log as any).recipients || "",
          (log as any).suppressedCount || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sms-compliance-audit.csv"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Audit log exported",
      description: "Compliance audit log downloaded successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Compliance Center</h3>
          <p className="text-sm text-muted-foreground">CTIA/TCPA compliance monitoring and audit logs</p>
        </div>
        <Button onClick={exportAuditLog} variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Audit Log
        </Button>
      </div>

      {/* Compliance Status */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              CTIA Compliant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-700 dark:text-green-300">
              All keyword handling, opt-out processing, and suppression lists are fully compliant with CTIA guidelines.
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              TCPA Compliant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-700 dark:text-green-300">
              Explicit consent tracking, proper opt-out mechanisms, and audit trails meet TCPA requirements.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{mockComplianceData.keywordHandling.avgResponseTime}s</div>
            <div className="text-xs text-muted-foreground">Avg STOP/HELP response (Target: &lt;5s)</div>
          </CardContent>
        </Card>
      </div>

      {/* Keyword Handling Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Handling Performance</CardTitle>
          <CardDescription>Automatic processing of STOP, HELP, and other keywords</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">{mockComplianceData.keywordHandling.stopReplies}</div>
              <div className="text-sm text-muted-foreground">STOP Replies</div>
              <div className="text-xs text-muted-foreground mt-1">Auto-processed & confirmed</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{mockComplianceData.keywordHandling.helpReplies}</div>
              <div className="text-sm text-muted-foreground">HELP Replies</div>
              <div className="text-xs text-muted-foreground mt-1">Contact info provided</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {mockComplianceData.keywordHandling.unknownReplies}
              </div>
              <div className="text-sm text-muted-foreground">Unknown Replies</div>
              <div className="text-xs text-muted-foreground mt-1">Help URL sent</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {mockComplianceData.keywordHandling.avgResponseTime}s
              </div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
              <div className="text-xs text-muted-foreground mt-1">Well under 5s target</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppression List */}
      <Card>
        <CardHeader>
          <CardTitle>Suppression List Management</CardTitle>
          <CardDescription>Contacts who have opted out and are automatically excluded from campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{mockComplianceData.suppressionList.globalOptOuts}</div>
              <div className="text-sm text-muted-foreground">Global Opt-outs</div>
              <div className="text-xs text-muted-foreground mt-1">All events excluded</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{mockComplianceData.suppressionList.eventOptOuts}</div>
              <div className="text-sm text-muted-foreground">Event-specific</div>
              <div className="text-xs text-muted-foreground mt-1">Single event excluded</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{mockComplianceData.suppressionList.totalSuppressed}</div>
              <div className="text-sm text-muted-foreground">Total Suppressed</div>
              <div className="text-xs text-muted-foreground mt-1">Auto-excluded from sends</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Compliance Activity</CardTitle>
          <CardDescription>Real-time audit log of compliance-related actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockComplianceData.auditLog.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {log.action === "STOP_PROCESSED" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    {log.action === "HELP_PROCESSED" && <MessageSquare className="h-4 w-4 text-blue-500" />}
                    {log.action === "CAMPAIGN_SENT" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                  <div>
                    <div className="font-medium">
                      {log.action === "STOP_PROCESSED" && "STOP Reply Processed"}
                      {log.action === "HELP_PROCESSED" && "HELP Reply Processed"}
                      {log.action === "CAMPAIGN_SENT" && "Campaign Sent"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {log.phone && `Phone: ${log.phone} • `}
                      Campaign: {log.campaignId}
                      {log.responseTime && ` • Response: ${log.responseTime}s`}
                      {(log as any).recipients && ` • Recipients: ${(log as any).recipients}`}
                      {(log as any).suppressedCount && ` • Suppressed: ${(log as any).suppressedCount}`}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
