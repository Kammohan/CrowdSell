import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReferralsOverview } from "@/components/referrals/referrals-overview"

export default function ReferralsPage() {
  return (
    <DashboardLayout>
      <ReferralsOverview />
    </DashboardLayout>
  )
}
