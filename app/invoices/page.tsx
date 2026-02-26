import { InvoiceList } from "@/components/invoices/invoice-list"
import { AddInvoiceDialog } from "@/components/invoices/add-invoice-dialog"

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Invoices
          </h1>
          <p className="text-muted-foreground">Manage and track all your invoices</p>
        </div>
        <AddInvoiceDialog />
      </div>

      <div className="fade-in-delay-1">
        <InvoiceList />
      </div>
    </div>
  )
}
