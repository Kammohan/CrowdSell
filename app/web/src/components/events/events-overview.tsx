"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, MapPin, Users, ExternalLink, Copy } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock data - in real app this would come from API
const mockEvents = [
  {
    id: "evt_1",
    name: "Spring Dance Showcase",
    date: "2025-04-15T19:00:00Z",
    venue: "UTD Student Union Ballroom",
    capacity: 300,
    ticketsSold: 247,
    basePrice: 25,
    status: "published",
    landingUrl: "https://events.growthcopilot.com/spring-dance-showcase",
  },
  {
    id: "evt_2",
    name: "Tech Talk: AI in Education",
    date: "2025-03-20T18:30:00Z",
    venue: "Engineering Building Auditorium",
    capacity: 150,
    ticketsSold: 89,
    basePrice: 15,
    status: "published",
    landingUrl: "https://events.growthcopilot.com/tech-talk-ai-education",
  },
  {
    id: "evt_3",
    name: "Summer Music Festival",
    date: "2025-06-10T16:00:00Z",
    venue: "Campus Green",
    capacity: 500,
    ticketsSold: 0,
    basePrice: 35,
    status: "draft",
    landingUrl: null,
  },
]

export function EventsOverview() {
  const { toast } = useToast()

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copied!",
      description: "Event landing page URL copied to clipboard",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Events</h1>
          <p className="text-muted-foreground">Manage your events and track performance</p>
        </div>
        <Link href="/dashboard/events/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {mockEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {event.venue}
                    </span>
                  </CardDescription>
                </div>
                <Badge variant={event.status === "published" ? "default" : "secondary"}>{event.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Tickets Sold</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {event.ticketsSold} / {event.capacity}
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Revenue</div>
                  <div className="text-2xl font-bold">${(event.ticketsSold * event.basePrice).toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Base price: ${event.basePrice}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Landing Page</div>
                  {event.landingUrl ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                        onClick={() => window.open(event.landingUrl!, "_blank")}
                      >
                        <ExternalLink className="h-3 w-3" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                        onClick={() => copyToClipboard(event.landingUrl!)}
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">Publish event to generate link</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
