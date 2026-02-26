"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Search, Mail, Phone, Edit, Eye, Send, CheckCircle2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const clients = [
  {
    id: "1",
    name: "Acme Corp",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, New York, NY 10001",
    company: "Acme Corporation",
    totalInvoices: 12,
    totalAmount: 25000,
    status: "active",
    notes: "Premium client, always pays on time",
  },
  {
    id: "2",
    name: "Tech Solutions",
    email: "hello@techsolutions.com",
    phone: "+1 (555) 987-6543",
    address: "456 Tech Ave, San Francisco, CA 94102",
    company: "Tech Solutions Inc",
    totalInvoices: 8,
    totalAmount: 18500,
    status: "active",
    notes: "Prefers monthly billing",
  },
  {
    id: "3",
    name: "Design Studio",
    email: "info@designstudio.com",
    phone: "+1 (555) 456-7890",
    address: "789 Creative Blvd, Los Angeles, CA 90001",
    company: "Design Studio LLC",
    totalInvoices: 15,
    totalAmount: 32000,
    status: "inactive",
    notes: "On hold - pending contract renewal",
  },
]

export function ClientList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewClient, setViewClient] = useState<typeof clients[0] | null>(null)
  const [editClient, setEditClient] = useState<typeof clients[0] | null>(null)
  const [emailClient, setEmailClient] = useState<typeof clients[0] | null>(null)
  const [emailData, setEmailData] = useState({ subject: "", message: "" })
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    status: "",
    notes: "",
  })
  const [saveSuccess, setSaveSuccess] = useState(false)

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEdit = (client: typeof clients[0]) => {
    setEditClient(client)
    setEditData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      company: client.company,
      status: client.status,
      notes: client.notes,
    })
  }

  const handleSaveEdit = () => {
    console.log("Saving client:", editData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
    setEditClient(null)
  }

  const handleSendEmail = () => {
    console.log("Sending email to:", emailClient?.email, emailData)
    setEmailClient(null)
    setEmailData({ subject: "", message: "" })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search clients..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Invoices</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.totalInvoices}</TableCell>
                  <TableCell>${client.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === "active" ? "default" : "secondary"}>{client.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(client)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Client
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setViewClient(client)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setEmailClient(client)
                          setEmailData({
                            subject: "Message from Your Company",
                            message: `Dear ${client.name},\n\nWe hope this message finds you well.\n\nBest regards,\nYour Company`
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

      {/* View Client Modal */}
      <Dialog open={!!viewClient} onOpenChange={() => setViewClient(null)}>
        <DialogContent className="max-w-2xl scale-in">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
            <DialogDescription>Complete client information and history</DialogDescription>
          </DialogHeader>
          {viewClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Client Name</Label>
                  <p className="font-semibold">{viewClient.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Company</Label>
                  <p className="font-semibold">{viewClient.company}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-semibold">{viewClient.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-semibold">{viewClient.phone}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Address</Label>
                  <p className="font-semibold">{viewClient.address}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge variant={viewClient.status === "active" ? "default" : "secondary"}>
                    {viewClient.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Total Invoices</Label>
                  <p className="font-semibold">{viewClient.totalInvoices}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Total Amount</Label>
                  <p className="font-bold text-2xl">${viewClient.totalAmount.toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Notes</Label>
                  <p className="text-sm">{viewClient.notes}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Client Modal */}
      <Dialog open={!!editClient} onOpenChange={() => setEditClient(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scale-in">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>Update client information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Client Name</Label>
                <Input
                  id="edit-name"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  value={editData.company}
                  onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={editData.status} onValueChange={(value) => setEditData({ ...editData, status: value })}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  rows={3}
                  value={editData.notes}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditClient(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Email Modal */}
      <Dialog open={!!emailClient} onOpenChange={() => setEmailClient(null)}>
        <DialogContent className="scale-in">
          <DialogHeader>
            <DialogTitle>Send Email to Client</DialogTitle>
            <DialogDescription>
              Sending to {emailClient?.name} ({emailClient?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
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
                rows={8}
                value={emailData.message}
                onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEmailClient(null)}>
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

      {/* Save Success Toast */}
      {saveSuccess && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 scale-in glow">
          <CheckCircle2 className="h-5 w-5" />
          <span>Client updated successfully!</span>
        </div>
      )}
    </>
  )
}
