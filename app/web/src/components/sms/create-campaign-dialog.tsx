"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Clock, Users, AlertCircle } from "lucide-react"

interface CreateCampaignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCampaignDialog({ open, onOpenChange }: CreateCampaignDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    eventId: "",
    template: "",
    scheduleType: "now",
    scheduleDate: "",
    scheduleTime: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock events
  const mockEvents = [
    { id: "evt_1", name: "Spring Dance Showcase", contacts: 1189 },
    { id: "evt_2", name: "Tech Talk: AI in Education", contacts: 456 },
    { id: "evt_3", name: "Summer Music Festival", contacts: 0 },
  ]

  // Template suggestions
  const templateSuggestions = [
    "Hey {{first_name}}! Don't miss {{event_name}} tomorrow at 7 PM. Get tickets: {{short_link}} Reply STOP to opt out.",
    "{{first_name}}, only 20 tickets left for {{event_name}}! Secure yours now: {{short_link}} Text STOP to unsubscribe.",
    "Reminder: {{event_name}} starts in 2 hours! See you there. {{short_link}} Reply STOP to opt out.",
    "Flash sale! 20% off {{event_name}} tickets for the next hour: {{short_link}} Text STOP to unsubscribe.",
  ]

  const selectedEvent = mockEvents.find((e) => e.id === formData.eventId)
  const characterCount = formData.template.length
  const isOverLimit = characterCount > 160

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate template has required compliance text
      if (!formData.template.toLowerCase().includes("stop")) {
        throw new Error("Template must include STOP opt-out instructions")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const isScheduled = formData.scheduleType === "scheduled"
      const recipientCount = selectedEvent?.contacts || 0

      toast({
        title: isScheduled ? "Campaign scheduled!" : "Campaign sent!",
        description: `SMS ${isScheduled ? "scheduled for" : "sent to"} ${recipientCount} opted-in contacts`,
      })

      // Reset form
      setFormData({
        name: "",
        eventId: "",
        template: "",
        scheduleType: "now",
        scheduleDate: "",
        scheduleTime: "",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create campaign",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Create SMS Campaign
          </DialogTitle>
          <DialogDescription>
            Send compliant SMS messages to your opted-in contacts. All campaigns include automatic STOP/HELP handling.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                placeholder="Spring Dance Reminder"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventId">Event *</Label>
              <Select value={formData.eventId} onValueChange={(value) => handleInputChange("eventId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  {mockEvents.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name} ({event.contacts} contacts)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Message Template *</Label>
            <Textarea
              id="template"
              placeholder="Hey {{first_name}}! Don't miss {{event_name}} tomorrow..."
              value={formData.template}
              onChange={(e) => handleInputChange("template", e.target.value)}
              rows={4}
              required
            />
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={isOverLimit ? "text-red-600" : "text-muted-foreground"}>
                  {characterCount}/160 characters
                </span>
                {isOverLimit && (
                  <Badge variant="destructive" className="text-xs">
                    Over SMS limit
                  </Badge>
                )}
              </div>
              <div className="text-muted-foreground">Available: first_name, event_name, short_link</div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Quick Templates</Label>
            <div className="grid gap-2">
              {templateSuggestions.map((template, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  className="h-auto p-3 text-left justify-start bg-transparent"
                  onClick={() => handleInputChange("template", template)}
                >
                  <div className="text-xs text-muted-foreground truncate">{template}</div>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Delivery Schedule</Label>
            <div className="grid gap-3 md:grid-cols-2">
              <Button
                type="button"
                variant={formData.scheduleType === "now" ? "default" : "outline"}
                onClick={() => handleInputChange("scheduleType", "now")}
                className="justify-start gap-2 bg-transparent"
              >
                <MessageSquare className="h-4 w-4" />
                Send Now
              </Button>
              <Button
                type="button"
                variant={formData.scheduleType === "scheduled" ? "default" : "outline"}
                onClick={() => handleInputChange("scheduleType", "scheduled")}
                className="justify-start gap-2 bg-transparent"
              >
                <Clock className="h-4 w-4" />
                Schedule Later
              </Button>
            </div>

            {formData.scheduleType === "scheduled" && (
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate">Date</Label>
                  <Input
                    id="scheduleDate"
                    type="date"
                    value={formData.scheduleDate}
                    onChange={(e) => handleInputChange("scheduleDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduleTime">Time</Label>
                  <Input
                    id="scheduleTime"
                    type="time"
                    value={formData.scheduleTime}
                    onChange={(e) => handleInputChange("scheduleTime", e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {selectedEvent && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Campaign Summary</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Will send to <strong>{selectedEvent.contacts}</strong> opted-in contacts for{" "}
                <strong>{selectedEvent.name}</strong>
                {formData.scheduleType === "scheduled" && formData.scheduleDate && formData.scheduleTime && (
                  <span>
                    {" "}
                    on <strong>{formData.scheduleDate}</strong> at <strong>{formData.scheduleTime}</strong>
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-yellow-800 dark:text-yellow-200">Compliance Notice</div>
                <div className="text-yellow-700 dark:text-yellow-300">
                  All messages automatically include STOP/HELP handling. Only opted-in contacts will receive messages.
                  Suppression lists are enforced.
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isOverLimit || !selectedEvent}>
              {isLoading ? "Creating..." : formData.scheduleType === "now" ? "Send Campaign" : "Schedule Campaign"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
