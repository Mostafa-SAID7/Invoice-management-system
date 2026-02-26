import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FileText, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Invoices",
    value: "156",
    change: "+12 from last month",
    icon: FileText,
  },
  {
    title: "Clients",
    value: "23",
    change: "+3 new this month",
    icon: Users,
  },
  {
    title: "Growth",
    value: "+12.5%",
    change: "Monthly growth rate",
    icon: TrendingUp,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title} className={`card-hover hover-lift glow-hover stagger-item overflow-hidden relative`} style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">{stat.change}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
