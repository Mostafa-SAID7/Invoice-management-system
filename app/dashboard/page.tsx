import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RecentInvoices } from "@/components/dashboard/recent-invoices"
import { OverdueInvoices } from "@/components/dashboard/overdue-invoices"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
      </div>

      <div className="fade-in-delay-1">
        <DashboardStats />
      </div>

      <div className="fade-in-delay-2">
        <RevenueChart />
      </div>

      <div className="grid gap-6 md:grid-cols-2 fade-in-delay-3">
        <RecentInvoices />
        <OverdueInvoices />
      </div>
    </div>
  )
}
