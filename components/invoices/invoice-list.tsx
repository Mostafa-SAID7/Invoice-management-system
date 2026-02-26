"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, Search, Download, Send, Eye, CheckCircle2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const invoices = [
  {
    id: "INV-001",
    client: "Acme Corp",
    amount: 2500.0,
    status: "paid",
    date: "2024-01-15",
    dueDate: "2024-02-15",
    items: [
      { description: "Web Development", quantity: 40, rate: 50 },
      { description: "Design Services", quantity: 10, rate: 50 },
    ],
  },
  {
    id: "INV-002",
    client: "Tech Solutions",
    amount: 1800.0,
    status: "pending",
    date: "2024-01-14",
    dueDate: "2024-02-14",
    items: [
      { description: "Consulting Services", quantity: 20, rate: 90 },
    ],
  },
  {
    id: "INV-003",
    client: "Design Studio",
    amount: 3200.0,
    status: "overdue",
    date: "2024-01-10",
    dueDate: "2024-02-10",
    items: [
      { description: "UI/UX Design", quantity: 32, rate: 100 },
    ],
  },
  {
    id: "INV-004",
    client: "StartupXYZ",
    amount: 950.0,
    status: "draft",
    date: "2024-01-12",
    dueDate: "2024-02-12",
    items: [
      { description: "Logo Design", quantity: 10, rate: 95 },
    ],
  },
]

export function InvoiceList() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewInvoice, setViewInvoice] = useState<typeof invoices[0] | null>(null)
  const [emailInvoice, setEmailInvoice] = useState<typeof invoices[0] | null>(null)
  const [emailData, setEmailData] = useState({ to: "", subject: "", message: "" })
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleDownloadPDF = (invoice: typeof invoices[0]) => {
    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 2000)
    console.log("Downloading PDF for:", invoice.id)
  }

  const handleSendEmail = () => {
    console.log("Sending email:", emailData, "for invoice:", emailInvoice?.id)
    setEmailInvoice(null)
    setEmailData({ to: "", subject: "", message: "" })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search invoices..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "paid"
                          ? "default"
                          : invoice.status === "overdue"
                            ? "destructive"
                            : invoice.status === "draft"
                              ? "outline"
                              : "secondary"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewInvoice(invoice)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownloadPDF(invoice)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setEmailInvoice(invoice)
                          setEmailData({
                            to: "",
                            subject: `Invoice ${invoice.id} from Your Company`,
                            message: `Dear ${invoice.client},\n\nPlease find attached invoice ${invoice.id} for $${invoice.amount.toFixed(2)}.\n\nThank you for your business!`
                          })
                        }}>
                          <Send className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Invoice Modal */}
      <Dialog open={!!viewInvoice} onOpenChange={() => setViewInvoice(null)}>
        <DialogContent className="max-w-2xl scale-in">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>View complete invoice information</DialogDescription>
          </DialogHeader>
          {viewInvoice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Invoice Number</Label>
                  <p className="font-semibold">{viewInvoice.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Client</Label>
                  <p className="font-semibold">{viewInvoice.client}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Issue Date</Label>
                  <p className="font-semibold">{viewInvoice.date}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Due Date</Label>
                  <p className="font-semibold">{viewInvoice.dueDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge
                    variant={
                      viewInvoice.status === "paid"
                        ? "default"
                        : viewInvoice.status === "overdue"
                          ? "destructive"
                          : viewInvoice.status === "draft"
                            ? "outline"
                            : "secondary"
                    }
                  >
                    {viewInvoice.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Total Amount</Label>
                  <p className="font-bold text-xl">${viewInvoice.amount.toFixed(2)}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground mb-2 block">Items</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewInvoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.rate}</TableCell>
                        <TableCell className="text-right">${(item.quantity * item.rate).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Send Email Modal */}
      <Dialog open={!!emailInvoice} onOpenChange={() => setEmailInvoice(null)}>
        <DialogContent className="scale-in">
          <DialogHeader>
            <DialogTitle>Send Invoice via Email</DialogTitle>
            <DialogDescription>Send {emailInvoice?.id} to your client</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-to">To</Label>
              <Input
                id="email-to"
                type="email"
                placeholder="client@example.com"
                value={emailData.to}
                onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailData.subject}
                onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                rows={6}
                value={emailData.message}
                onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEmailInvoice(null)}>
                Cancel
              </Button>
              <Button onClick={handleSendEmail}>
                <Send className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Download Success Toast */}
      {downloadSuccess && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 scale-in glow">
          <CheckCircle2 className="h-5 w-5" />
          <span>PDF downloaded successfully!</span>
        </div>
      )}
    </>
  )
}
