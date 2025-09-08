import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { EventsOverview } from "@/components/events/events-overview"

export default function EventsPage() {
  return (
    <DashboardLayout>
      <EventsOverview />
    </DashboardLayout>
  )
}
