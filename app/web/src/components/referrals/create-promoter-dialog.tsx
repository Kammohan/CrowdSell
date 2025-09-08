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
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Hash } from "lucide-react"

interface CreatePromoterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePromoterDialog({ open, onOpenChange }: CreatePromoterDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventId: "",
    customSlug: "",
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock events - in real app this would come from API
  const mockEvents = [
    { id: "evt_1", name: "Spring Dance Showcase" },
    { id: "evt_2", name: "Tech Talk: AI in Education" },
    { id: "evt_3", name: "Summer Music Festival" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Generate referral code
      const slug = formData.customSlug || formData.name.toLowerCase().replace(/[^a-z0-9]/g, "")
      const referralCode = `${formData.eventId}-${slug}`

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Fraud checks would happen here:
      // - Check for duplicate emails/phones
      // - Rate limit new code creation
      // - Validate contact information

      const shareUrl = `${window.location.origin}/event/spring-dance-showcase?ref=${referralCode}`

      toast({
        title: "Promoter added successfully!",
        description: `Referral code: ${referralCode}`,
      })

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventId: "",
        customSlug: "",
        notes: "",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create promoter. Please try again.",
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Promoter</DialogTitle>
          <DialogDescription>
            Create a new promoter with a unique referral code for tracking sales and commissions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Sarah Chen"
                className="pl-10"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="sarah@utd.edu"
                className="pl-10"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
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
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customSlug">Custom Code Slug (Optional)</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="customSlug"
                placeholder="sarah (will create evt_1-sarah)"
                className="pl-10"
                value={formData.customSlug}
                onChange={(e) =>
                  handleInputChange("customSlug", e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))
                }
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Leave blank to auto-generate from name. Only letters and numbers allowed.
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about this promoter..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Promoter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
