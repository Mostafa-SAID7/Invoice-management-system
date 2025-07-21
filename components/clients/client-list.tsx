import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search, Mail, Phone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const clients = [
  {
    id: "1",
    name: "Acme Corp",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    totalInvoices: 12,
    totalAmount: 25000,
    status: "active",
  },
  {
    id: "2",
    name: "Tech Solutions",
    email: "hello@techsolutions.com",
    phone: "+1 (555) 987-6543",
    totalInvoices: 8,
    totalAmount: 18500,
    status: "active",
  },
  {
    id: "3",
    name: "Design Studio",
    email: "info@designstudio.com",
    phone: "+1 (555) 456-7890",
    totalInvoices: 15,
    totalAmount: 32000,
    status: "inactive",
  },
]

export function ClientList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Clients</CardTitle>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-10" />
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
            {clients.map((client) => (
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
                      <DropdownMenuItem>Edit Client</DropdownMenuItem>
                      <DropdownMenuItem>View Invoices</DropdownMenuItem>
                      <DropdownMenuItem>Send Email</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
