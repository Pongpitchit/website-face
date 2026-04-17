import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Anchor, ArrowLeft, Package, Truck } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductImage } from "@/components/product-image"

async function getProduct(id: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()
  return data
}

async function getRelatedProducts(category: string, currentId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", currentId)
    .limit(4)
  return data || []
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id)

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/products">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="aspect-square bg-muted rounded-xl overflow-hidden relative">
            <ProductImage 
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              iconSize="lg"
            />
            {product.stock < 10 && product.stock > 0 && (
              <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground text-sm">
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-sm">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Badge variant="outline" className="w-fit mb-3">
              {product.category}
            </Badge>
            
            <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            
            <p className="text-2xl font-bold text-primary mb-6">
              ฿{Number(product.price).toLocaleString()}
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock Info */}
            <div className="flex items-center gap-2 mb-6">
              <Package className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {product.stock > 0 ? `${product.stock} items in stock` : "Out of stock"}
              </span>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <AddToCartButton 
                productId={product.id} 
                disabled={product.stock === 0}
              />
            </div>

            {/* Shipping Info */}
            <Card className="bg-muted/50 border-border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-card-foreground">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      On orders over $50. Delivered by Bubbie express!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground mb-6">
              Related Treasures
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <Card className="group bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <ProductImage 
                        src={relatedProduct.image_url}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        iconSize="sm"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-card-foreground mb-1 line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <p className="font-bold text-primary">
                        ฿{Number(relatedProduct.price).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
