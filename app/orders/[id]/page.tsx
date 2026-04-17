import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Anchor, ArrowLeft, Package } from "lucide-react"

async function getOrder(orderId: string, userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products (
          id,
          name,
          price,
          image_url,
          emoji
        )
      )
    `)
    .eq("id", orderId)
    .eq("user_id", userId)
    .single()
  return data
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const order = await getOrder(id, user.id)

  if (!order) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your order. Your adventure awaits!
          </p>
        </div>

        {/* Order Details */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-[family-name:var(--font-heading)]">
                Order #{order.id.slice(0, 8)}
              </CardTitle>
              <Badge variant="secondary">
                {order.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.order_items?.map((item: {
                id: string
                quantity: number
                price: number
                products: {
                  id: number
                  name: string
                  price: number
                  image_url: string | null
                  emoji: string | null
                } | null
              }) => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-border last:border-0">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center">
                      <span className="text-3xl">{item.products?.emoji || "📦"}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">
                      {item.products?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} x ฿{Number(item.price).toLocaleString()}
                    </p>
                  </div>
                  <p className="font-bold text-foreground">
                    ฿{(Number(item.price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">฿{Number(order.total).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Info */}
        <Card className="bg-muted/50 border-border mb-8">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-card-foreground">
                  Shipping via Bubbie Express
                </p>
                <p className="text-sm text-muted-foreground">
                  Your order will be delivered faster than you can say &quot;Adventure!&quot;
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/profile">
            <Button className="w-full sm:w-auto">
              View All Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
