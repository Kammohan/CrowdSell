"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, MapPinIcon, UsersIcon, ShareIcon, CreditCardIcon } from "lucide-react"
import Image from "next/image"

interface EventLandingPageProps {
  event: {
    id: string
    name: string
    description: string
    date: string
    venue: string
    capacity: number
    ticketsSold: number
    basePrice: number
    promoText?: string
    bannerImage: string
    organizer: {
      name: string
      email: string
    }
  }
  referralCode?: string
  promoCode?: string
}

export function EventLandingPage({ event, referralCode, promoCode }: EventLandingPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [appliedPromo, setAppliedPromo] = useState(promoCode || "")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const remainingTickets = event.capacity - event.ticketsSold
  const isNearSoldOut = remainingTickets <= 20
  const isSoldOut = remainingTickets <= 0

  // Calculate pricing with promo
  const hasPromo = appliedPromo === "EARLY20"
  const discountedPrice = hasPromo ? event.basePrice * 0.8 : event.basePrice
  const totalPrice = discountedPrice * quantity

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

  const handlePurchase = async () => {
    setIsLoading(true)

    try {
      // Simulate Stripe checkout creation
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In real app, this would create a Stripe checkout session
      const checkoutData = {
        eventId: event.id,
        quantity,
        referralCode,
        promoCode: appliedPromo,
        totalAmount: totalPrice * 100, // Stripe expects cents
      }

      toast({
        title: "Redirecting to checkout...",
        description: "You'll be redirected to Stripe to complete your purchase",
      })

      // Simulate redirect to Stripe
      console.log("Would redirect to Stripe with:", checkoutData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/event/${event.id}?ref=share`
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Link copied!",
      description: "Event link copied to clipboard",
    })
  }

  // Track page view (in real app, this would send to analytics)
  useEffect(() => {
    console.log("Page view tracked:", {
      eventId: event.id,
      referralCode,
      timestamp: new Date().toISOString(),
    })
  }, [event.id, referralCode])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="aspect-[2/1] md:aspect-[3/1] relative overflow-hidden">
          <Image
            src={event.bannerImage || "/placeholder.svg"}
            alt={event.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-4">{event.name}</h1>
              <p className="text-lg md:text-xl text-white/90 text-pretty">{event.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            {referralCode && (
              <Card className="border-accent bg-accent/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <p className="text-sm">
                      You're supporting <strong>{referralCode}</strong> with your purchase!
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Date & Time</div>
                      <div className="text-sm text-muted-foreground">{formatDate(event.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Venue</div>
                      <div className="text-sm text-muted-foreground">{event.venue}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Availability</div>
                    <div className="text-sm text-muted-foreground">
                      {remainingTickets} of {event.capacity} tickets remaining
                    </div>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm">
                    <div className="font-medium">Organized by</div>
                    <div className="text-muted-foreground">{event.organizer.name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Purchase */}
          <div className="space-y-4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Get Tickets
                  {isNearSoldOut && !isSoldOut && <Badge variant="destructive">Almost Sold Out!</Badge>}
                  {isSoldOut && <Badge variant="destructive">Sold Out</Badge>}
                </CardTitle>
                {event.promoText && (
                  <CardDescription className="text-accent font-medium">{event.promoText}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={Math.min(10, remainingTickets)}
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    disabled={isSoldOut}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promo">Promo Code</Label>
                  <Input
                    id="promo"
                    placeholder="Enter promo code"
                    value={appliedPromo}
                    onChange={(e) => setAppliedPromo(e.target.value)}
                    disabled={isSoldOut}
                  />
                  {hasPromo && <div className="text-sm text-accent">20% discount applied!</div>}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Price per ticket:</span>
                    <span className="flex items-center gap-2">
                      {hasPromo && (
                        <span className="text-sm text-muted-foreground line-through">${event.basePrice}</span>
                      )}
                      <span>${discountedPrice}</span>
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <Button className="w-full gap-2" size="lg" onClick={handlePurchase} disabled={isSoldOut || isLoading}>
                  <CreditCardIcon className="h-4 w-4" />
                  {isLoading ? "Processing..." : isSoldOut ? "Sold Out" : "Buy Tickets"}
                </Button>

                <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={handleShare}>
                  <ShareIcon className="h-4 w-4" />
                  Share Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
