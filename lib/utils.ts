import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(dateObj)
}

export function calculateInvoiceTotal(
  subtotal: number,
  discountRate = 0,
  taxRate = 0,
): {
  discountAmount: number
  taxableAmount: number
  taxAmount: number
  total: number
} {
  const discountAmount = (subtotal * discountRate) / 100
  const taxableAmount = subtotal - discountAmount
  const taxAmount = (taxableAmount * taxRate) / 100
  const total = taxableAmount + taxAmount

  return {
    discountAmount,
    taxableAmount,
    taxAmount,
    total,
  }
}

export function generateInvoiceNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")

  return `INV-${year}${month}-${random}`
}

export function getInvoiceStatus(invoice: {
  status: string
  dueDate: Date | string
  paidDate?: Date | string
}): "paid" | "overdue" | "pending" | "draft" {
  if (invoice.status === "paid" || invoice.paidDate) return "paid"
  if (invoice.status === "draft") return "draft"

  const dueDate = typeof invoice.dueDate === "string" ? new Date(invoice.dueDate) : invoice.dueDate
  const today = new Date()

  if (dueDate < today) return "overdue"
  return "pending"
}

export function calculateDaysOverdue(dueDate: Date | string): number {
  const due = typeof dueDate === "string" ? new Date(dueDate) : dueDate
  const today = new Date()
  const diffTime = today.getTime() - due.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.max(0, diffDays)
}
