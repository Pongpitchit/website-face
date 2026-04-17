import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Anchor, Ship, Waves, Candy } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

async function getFeaturedProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .limit(4)
  return data || []
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
                <Anchor className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">
                  Welcome to Stormalong Harbor
                </span>
              </div>
            </div>
            
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              The Marvelous Misadventures of{" "}
              <span className="text-primary">Flapjack</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Embark on an adventure with Flapjack, Captain K&apos;nuckles, and Bubbie! 
              Discover treasures from Candied Island and gear up for your own marvelous misadventures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  <Ship className="mr-2 h-5 w-5" />
                  Explore Products
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Join the Crew
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path 
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Shop at Stormalong?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Candy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2 text-card-foreground">
                  Candied Island Treasures
                </h3>
                <p className="text-muted-foreground">
                  Authentic merchandise inspired by the sweetest island in all the seas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ship className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2 text-card-foreground">
                  Adventure Ready
                </h3>
                <p className="text-muted-foreground">
                  Everything you need for your own marvelous misadventures.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2 text-card-foreground">
                  Fast Shipping
                </h3>
                <p className="text-muted-foreground">
                  Delivered faster than Bubbie can swim across the harbor!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-foreground">
              Featured Treasures
            </h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="group bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center">
                      <span className="text-6xl group-hover:scale-110 transition-transform">
                        {product.emoji || "📦"}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-[family-name:var(--font-heading)] font-semibold text-card-foreground mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="font-bold text-primary">
                      ฿{Number(product.price).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4">
                  Ready for Adventure?
                </h2>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of adventurers who have found their treasures at Stormalong Shop. 
                  Sign up today and get 10% off your first order!
                </p>
                <Link href="/auth/sign-up">
                  <Button size="lg" variant="secondary">
                    Create Your Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Anchor className="h-6 w-6 text-primary" />
              <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                Stormalong Shop
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The Marvelous Misadventures of Flapjack Fan Shop
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
