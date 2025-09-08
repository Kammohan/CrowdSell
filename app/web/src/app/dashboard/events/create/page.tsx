import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CreateEventForm } from "@/components/events/create-event-form"

export default function CreateEventPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-balance">Create New Event</h1>
          <p className="text-muted-foreground">Set up your event and start selling tickets</p>
        </div>
        <CreateEventForm />
      </div>
    </DashboardLayout>
  )
}
