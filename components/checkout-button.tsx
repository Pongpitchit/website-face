"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { CreditCard } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface CartItem {
  id: string
  quantity: number
  product_id: number
  products: {
    id: number
    price: number
  } | null
}

interface CheckoutButtonProps {
  cartItems: CartItem[]
  total: number
}

export function CheckoutButton({ cartItems, total }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    setLoading(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast.error("Please sign in to checkout")
      router.push("/auth/login")
      setLoading(false)
      return
    }

    // Check stock availability
    const productIds = cartItems.map(item => item.product_id)
    const { data: products, error: stockError } = await supabase
      .from("products")
      .select("id, stock, name")
      .in("id", productIds)

    if (stockError || !products) {
      toast.error("Failed to check product availability")
      setLoading(false)
      return
    }

    // Validate stock for each item
    for (const cartItem of cartItems) {
      const product = products.find(p => p.id === cartItem.product_id)
      if (!product || product.stock < cartItem.quantity) {
        toast.error(`Insufficient stock for ${product?.name || 'product'}. Available: ${product?.stock || 0}`)
        setLoading(false)
        return
      }
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total: total,
        status: "pending"
      })
      .select()
      .single()

    if (orderError || !order) {
      toast.error("Failed to create order")
      setLoading(false)
      return
    }

    // Create order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.products?.price || 0
    }))

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems)

    if (itemsError) {
      toast.error("Failed to process order items")
      setLoading(false)
      return
    }

    // Decrement product stock
    const stockUpdates = cartItems.map(item => {
      const product = products.find(p => p.id === item.product_id)
      return supabase
        .from("products")
        .update({ stock: product!.stock - item.quantity })
        .eq("id", item.product_id)
    })

    const stockResults = await Promise.all(stockUpdates)
    const stockUpdateFailed = stockResults.some(result => result.error)

    if (stockUpdateFailed) {
      toast.error("Order created but failed to update stock. Please contact support.")
      console.error("Stock update errors:", stockResults.map(r => r.error))
      // Don't return here - order was created successfully
    }

    // Clear cart
    const { error: clearError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)

    if (clearError) {
      console.error("Failed to clear cart:", clearError)
    }

    toast.success("Order placed successfully!")
    router.push(`/orders/${order.id}`)
    router.refresh()
    setLoading(false)
  }

  return (
    <Button 
      size="lg" 
      className="w-full" 
      onClick={handleCheckout}
      disabled={loading || cartItems.length === 0}
    >
      {loading ? (
        <Spinner className="mr-2 h-4 w-4" />
      ) : (
        <CreditCard className="mr-2 h-5 w-5" />
      )}
      Checkout
    </Button>
  )
}
