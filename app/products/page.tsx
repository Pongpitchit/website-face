"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"
import { ProductImage } from "@/components/product-image"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  category: string
  stock: number
  created_at: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
      
      if (error) {
        console.error("Error fetching products:", error)
        setProducts([])
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    const fetchCategories = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("products")
        .select("category")
      const uniqueCategories = [...new Set(data?.map(p => p.category).filter(Boolean))]
      setCategories(uniqueCategories as string[])
    }

    fetchProducts()
    fetchCategories()
  }, [])

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

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
          <Badge 
            variant={selectedCategory === "All" ? "secondary" : "outline"} 
            className="text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setSelectedCategory("All")}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={selectedCategory === category ? "secondary" : "outline"} 
              className="text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4 animate-pulse" />
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-muted-foreground">
              Loading products...
            </h3>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-muted-foreground">
                  No products found
                </h3>
                <p className="text-muted-foreground mt-2">
                  Try selecting a different category!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
