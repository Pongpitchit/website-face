"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Anchor, Plus, Minus, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface CartItemRowProps {
  item: {
    id: string
    quantity: number
    product_id: number
  }
  product: {
    id: number
    name: string
    description: string
    price: number
    image_url: string | null
    stock: number
    emoji: string | null
  } | null
}

export function CartItemRow({ item, product }: CartItemRowProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (!product) return null

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return
    if (newQuantity > product.stock) {
      toast.error(`Only ${product.stock} items available`)
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", item.id)

    if (error) {
      toast.error("Failed to update quantity")
    } else {
      router.refresh()
    }
    setLoading(false)
  }

  const removeItem = async () => {
    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", item.id)

    if (error) {
      toast.error("Failed to remove item")
    } else {
      toast.success("Item removed from cart")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link href={`/products/${product.id}`} className="flex-shrink-0">
            <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>
              )}
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-[family-name:var(--font-heading)] font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
              {product.description}
            </p>
            <p className="font-bold text-primary">
              ฿{Number(product.price).toLocaleString()}
            </p>
          </div>

          {/* Quantity & Actions */}
          <div className="flex flex-col items-end justify-between">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.quantity - 1)}
                disabled={loading || item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.quantity + 1)}
                disabled={loading || item.quantity >= product.stock}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={removeItem}
              disabled={loading}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>

        {/* Line Total */}
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="font-bold text-foreground">
            ฿{(Number(product.price) * item.quantity).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
