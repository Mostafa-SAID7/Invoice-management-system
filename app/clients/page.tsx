import { ClientList } from "@/components/clients/client-list"
import { AddClientDialog } from "@/components/clients/add-client-dialog"

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Clients
          </h1>
          <p className="text-muted-foreground">Manage your client information and contacts</p>
        </div>
        <AddClientDialog />
      </div>

      <div className="fade-in-delay-1">
        <ClientList />
      </div>
    </div>
  )
}
