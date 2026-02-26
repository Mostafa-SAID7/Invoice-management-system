import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign } from "lucide-react"

const payments = [
  { id: 1, invoice: "INV-001", client: "Acme Corp", amount: 2500, date: "2024-02-20", status: "completed", method: "Bank Transfer" },
  { id: 2, invoice: "INV-002", client: "TechStart Inc", amount: 1800, date: "2024-02-18", status: "completed", method: "Credit Card" },
  { id: 3, invoice: "INV-003", client: "Design Studio", amount: 3200, date: "2024-02-15", status: "pending", method: "PayPal" },
  { id: 4, invoice: "INV-004", client: "Global Solutions", amount: 4500, date: "2024-02-12", status: "completed", method: "Bank Transfer" },
  { id: 5, invoice: "INV-005", client: "StartUp Labs", amount: 1200, date: "2024-02-10", status: "failed", method: "Credit Card" },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">Track and manage payment transactions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,800</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,200</div>
            <p className="text-xs text-muted-foreground">1 transaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200</div>
            <p className="text-xs text-muted-foreground">1 transaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$13,200</div>
            <p className="text-xs text-muted-foreground">5 transactions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Latest payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="space-y-1">
                  <p className="font-medium">{payment.client}</p>
                  <p className="text-sm text-muted-foreground">
                    {payment.invoice} • {payment.method}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">${payment.amount.toLocaleString()}</p>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        payment.status === "completed" ? "default" : 
                        payment.status === "pending" ? "secondary" : 
                        "destructive"
                      }
                    >
                      {payment.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{payment.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
