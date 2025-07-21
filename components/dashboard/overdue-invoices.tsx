import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

const overdueInvoices = [
  {
    id: "INV-003",
    client: "Design Studio",
    amount: "$3,200.00",
    daysOverdue: 5,
  },
  {
    id: "INV-005",
    client: "Marketing Agency",
    amount: "$1,500.00",
    daysOverdue: 12,
  },
]

export function OverdueInvoices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          Overdue Invoices
        </CardTitle>
        <CardDescription>Invoices that need your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {overdueInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{invoice.id}</p>
                <p className="text-sm text-muted-foreground">
                  {invoice.client} • {invoice.daysOverdue} days overdue
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium">{invoice.amount}</p>
                <Button size="sm" variant="outline">
                  Send Reminder
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
