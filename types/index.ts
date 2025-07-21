export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  taxId?: string
  paymentTerms: string
  currency: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  unit: string
  category?: string
  createdAt: Date
  updatedAt: Date
}

export interface InvoiceItem {
  id: string
  productId?: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  clientId: string
  client: Client
  items: InvoiceItem[]
  subtotal: number
  discountRate: number
  discountAmount: number
  taxRate: number
  taxAmount: number
  total: number
  currency: string
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  issueDate: Date
  dueDate: Date
  paidDate?: Date
  notes?: string
  paymentTerms: string
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  invoiceId: string
  amount: number
  paymentDate: Date
  paymentMethod: string
  reference?: string
  notes?: string
  createdAt: Date
}

export interface DashboardStats {
  totalRevenue: number
  totalInvoices: number
  totalClients: number
  paidInvoices: number
  pendingInvoices: number
  overdueInvoices: number
  monthlyGrowth: number
}
