import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"
import { AddProductDialog } from "@/components/products/add-product-dialog"

const products = [
  { id: 1, name: "Web Design", category: "Service", price: 1500, stock: "N/A", status: "active" },
  { id: 2, name: "Logo Design", category: "Service", price: 500, stock: "N/A", status: "active" },
  { id: 3, name: "SEO Optimization", category: "Service", price: 800, stock: "N/A", status: "active" },
  { id: 4, name: "Content Writing", category: "Service", price: 200, stock: "N/A", status: "active" },
  { id: 5, name: "Hosting Plan", category: "Product", price: 99, stock: "50", status: "active" },
  { id: 6, name: "Domain Registration", category: "Product", price: 15, stock: "100", status: "active" },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Products
          </h1>
          <p className="text-muted-foreground">Manage your products and services</p>
        </div>
        <AddProductDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Card key={product.id} className={`card-hover glow-hover stagger-item`} style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </div>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <CardDescription>Stock: {product.stock}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {product.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
