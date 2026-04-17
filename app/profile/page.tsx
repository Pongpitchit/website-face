import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Anchor, User, Package, ShoppingBag } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

async function getUserOrders(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        quantity,
        price,
        products (
          name
        )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
  return data || []
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const orders = await getUserOrders(user.id)

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                  {user.user_metadata?.full_name || "Adventurer"}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <LogoutButton />
            </div>
          </CardContent>
        </Card>

        {/* Orders Section */}
        <div className="mb-6">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Package className="h-6 w-6" />
            Your Orders
          </h2>
        </div>

        {orders.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-muted-foreground mb-2">
                No orders yet
              </h3>
              <p className="text-muted-foreground">
                Start your adventure by exploring our treasures!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-[family-name:var(--font-heading)] text-lg">
                      Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <Badge variant="secondary">
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {order.order_items?.slice(0, 3).map((item: {
                      id: string
                      quantity: number
                      price: number
                      products: { name: string } | null
                    }) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.products?.name} x {item.quantity}
                        </span>
                        <span className="text-foreground">
                          ${(Number(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {order.order_items && order.order_items.length > 3 && (
                      <p className="text-sm text-muted-foreground">
                        + {order.order_items.length - 3} more items
                      </p>
                    )}
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-primary">
                      ${Number(order.total).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
