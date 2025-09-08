import { EventLandingPage } from "@/components/events/event-landing-page"
import { notFound } from "next/navigation"

// Mock event data - in real app this would come from database
const mockEvents: Record<string, any> = {
  "spring-dance-showcase": {
    id: "evt_1",
    name: "Spring Dance Showcase",
    description:
      "Join us for an evening of spectacular dance performances featuring student groups from across campus. Experience contemporary, hip-hop, classical, and cultural dances in this unforgettable showcase.",
    date: "2025-04-15T19:00:00Z",
    venue: "UTD Student Union Ballroom",
    capacity: 300,
    ticketsSold: 247,
    basePrice: 25,
    promoText: "Early bird special - save 20%!",
    bannerImage: "/dance-showcase-stage-with-colorful-lights.jpg",
    organizer: {
      name: "UTD Dance Coalition",
      email: "dance@utd.edu",
    },
  },
  "tech-talk-ai-education": {
    id: "evt_2",
    name: "Tech Talk: AI in Education",
    description:
      "Explore the future of education with artificial intelligence. Leading experts will discuss how AI is transforming learning experiences and educational outcomes.",
    date: "2025-03-20T18:30:00Z",
    venue: "Engineering Building Auditorium",
    capacity: 150,
    ticketsSold: 89,
    basePrice: 15,
    promoText: "Free for students with valid ID!",
    bannerImage: "/modern-tech-conference-with-ai-graphics.jpg",
    organizer: {
      name: "UTD Tech Society",
      email: "tech@utd.edu",
    },
  },
}

interface EventPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EventPage({ params, searchParams }: EventPageProps) {
  const { slug } = await params
  const search = await searchParams

  const event = mockEvents[slug]
  if (!event) {
    notFound()
  }

  // Extract referral code and promo code from URL params
  const referralCode = typeof search.ref === "string" ? search.ref : undefined
  const promoCode = typeof search.promo === "string" ? search.promo : undefined

  return <EventLandingPage event={event} referralCode={referralCode} promoCode={promoCode} />
}
