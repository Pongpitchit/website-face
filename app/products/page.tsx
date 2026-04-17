import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"
import { ProductImage } from "@/components/product-image"

async function getProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
  return data || []
}

async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("category")
  const categories = [...new Set(data?.map(p => p.category).filter(Boolean))]
  return categories as string[]
}

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Treasures
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing products from Stormalong Harbor. From candy to collectibles, 
            we have everything an adventurer needs!
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Badge variant="secondary" className="text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            All
          </Badge>
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant="outline" 
              className="text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="group bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <ProductImage 
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    iconSize="md"
                  />
                  {product.stock < 10 && product.stock > 0 && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                      Low Stock
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-card-foreground mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xl text-primary">
                      ฿{Number(product.price).toLocaleString()}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {product.stock} in stock
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-muted-foreground">
              No products found
            </h3>
            <p className="text-muted-foreground mt-2">
              Check back soon for new treasures!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
