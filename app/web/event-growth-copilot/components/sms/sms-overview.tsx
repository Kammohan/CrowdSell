"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreateCampaignDialog } from "./create-campaign-dialog"
import { ContactManager } from "./contact-manager"
import { SMSAnalytics } from "./sms-analytics"
import { ComplianceCenter } from "./compliance-center"
import { Plus, MessageSquare, Users, AlertTriangle, CheckCircle } from "lucide-react"

// Mock SMS stats
const mockSMSStats = {
  totalContacts: 1247,
  optedInContacts: 1189,
  optOutRate: 1.2,
  campaignsSent: 8,
  totalMessagesSent: 9512,
  deliveryRate: 98.7,
  replyRate: 4.3,
}

// Mock recent campaigns
const mockCampaigns = [
  {
    id: "sms_1",
    name: "Spring Dance Reminder",
    eventName: "Spring Dance Showcase",
    status: "delivered",
    sentAt: "2025-01-08T14:30:00Z",
    recipients: 1189,
    delivered: 1174,
    failed: 15,
    replies: 23,
    optOuts: 2,
    template:
      "Hey {{first_name}}! Don't miss {{event_name}} tomorrow at 7 PM. Get tickets: {{short_link}} Reply STOP to opt out.",
  },
  {
    id: "sms_2",
    name: "Last Chance Tickets",
    eventName: "Spring Dance Showcase",
    status: "scheduled",
    scheduledFor: "2025-01-10T16:00:00Z",
    recipients: 1187,
    template:
      "{{first_name}}, only 20 tickets left for {{event_name}}! Secure yours now: {{short_link}} Text STOP to unsubscribe.",
  },
]

export function SMSOverview() {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">SMS Campaigns</h1>
          <p className="text-muted-foreground">Send compliant SMS blasts to your opted-in contacts</p>
        </div>
        <Button onClick={() => setShowCreateCampaign(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Compliance Status Banner */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-medium text-green-800 dark:text-green-200">CTIA/TCPA Compliant</div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Opt-out rate: {mockSMSStats.optOutRate}% (Target: &lt;2%) • All STOP/HELP keywords handled automatically
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSMSStats.totalContacts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{mockSMSStats.optedInContacts} opted in</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opt-out Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSMSStats.optOutRate}%</div>
            <p className="text-xs text-green-600">Well below 2% target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSMSStats.deliveryRate}%</div>
            <p className="text-xs text-muted-foreground">{mockSMSStats.totalMessagesSent.toLocaleString()} sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reply Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSMSStats.replyRate}%</div>
            <p className="text-xs text-muted-foreground">Engagement metric</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="space-y-4">
            {mockCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{campaign.eventName}</p>
                    </div>
                    <Badge variant={campaign.status === "delivered" ? "default" : "secondary"}>{campaign.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-mono">{campaign.template}</p>
                    </div>

                    {campaign.status === "delivered" && (
                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{campaign.delivered}</div>
                          <div className="text-xs text-muted-foreground">Delivered</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{campaign.failed}</div>
                          <div className="text-xs text-muted-foreground">Failed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{campaign.replies}</div>
                          <div className="text-xs text-muted-foreground">Replies</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{campaign.optOuts}</div>
                          <div className="text-xs text-muted-foreground">Opt-outs</div>
                        </div>
                      </div>
                    )}

                    {campaign.status === "scheduled" && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        Scheduled for {new Date(campaign.scheduledFor!).toLocaleString()} to {campaign.recipients}{" "}
                        contacts
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <ContactManager />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <SMSAnalytics />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <ComplianceCenter />
        </TabsContent>
      </Tabs>

      <CreateCampaignDialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign} />
    </div>
  )
}
