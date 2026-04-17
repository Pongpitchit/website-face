"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface AddToCartButtonProps {
  productId: number
  disabled?: boolean
}

export function AddToCartButton({ productId, disabled }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const addToCart = async () => {
    setLoading(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast.error("Please sign in to add items to your cart")
      router.push("/auth/login")
      setLoading(false)
      return
    }

    // Check if item already in cart
    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .single()

    if (existingItem) {
      // Update quantity
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id)

      if (error) {
        toast.error("Failed to update cart")
      } else {
        toast.success("Cart updated!")
        router.refresh()
      }
    } else {
      // Insert new item
      const { error } = await supabase
        .from("cart_items")
        .insert({
          user_id: user.id,
          product_id: productId,
          quantity: quantity,
        })

      if (error) {
        toast.error("Failed to add to cart")
      } else {
        toast.success("Added to cart!")
        router.refresh()
      }
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center border border-border rounded-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={disabled || loading}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuantity(quantity + 1)}
          disabled={disabled || loading}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Add to Cart Button */}
      <Button
        size="lg"
        className="flex-1"
        onClick={addToCart}
        disabled={disabled || loading}
      >
        {loading ? (
          <Spinner className="mr-2 h-4 w-4" />
        ) : (
          <ShoppingCart className="mr-2 h-5 w-5" />
        )}
        {disabled ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  )
}
