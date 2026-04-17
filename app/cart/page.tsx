import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Anchor, ShoppingBag, ArrowRight } from "lucide-react"
import { CartItemRow } from "@/components/cart-item-row"
import { CheckoutButton } from "@/components/checkout-button"

async function getCartItems(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("cart_items")
    .select(`
      *,
      products (
        id,
        name,
        description,
        price,
        image_url,
        stock,
        emoji
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
  return data || []
}

export default async function CartPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/cart")
  }

  const cartItems = await getCartItems(user.id)
  
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (Number(item.products?.price || 0) * item.quantity)
  }, 0)
  
  const shipping = subtotal >= 1500 ? 0 : 100
  const total = subtotal + shipping

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-foreground mb-8">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-16 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-muted-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Start your adventure by adding some treasures!
              </p>
              <Link href="/products">
                <Button>
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItemRow 
                  key={item.id} 
                  item={item} 
                  product={item.products}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-card border-border sticky top-24">
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-heading)]">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>฿{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `฿${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  {subtotal < 1500 && (
                    <p className="text-xs text-muted-foreground">
                      Add ฿{(1500 - subtotal).toLocaleString()} more for free shipping!
                    </p>
                  )}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">฿{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <CheckoutButton 
                    cartItems={cartItems} 
                    total={total}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
