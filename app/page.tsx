import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Anchor, Ship, Waves, Candy } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { ProductImage } from "@/components/product-image"

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
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

            {/* Left: Text */}
            <div>
              <div className="flex mb-6">
                <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
                  <Anchor className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-secondary-foreground">
                    หน้าหลัก
                  </span>
                </div>
              </div>

              <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                The Marvelous Misadventures of{" "}
                <span className="text-primary">Flapjack</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
                The Marvelous Misadventures of Flapjack เป็นการ์ตูนแอนิเมชันแนวผจญภัย–ตลก–แฟนตาซี เล่าเรื่องของ แฟลปแจ็ก เด็กชายผู้ไร้เดียงสาแต่เต็มไปด้วยจินตนาการ เขาอาศัยอยู่ในเมืองท่าชื่อ Stormalong Harbor และใช้ชีวิตร่วมกับ กัปตันแคนเคอร์รัส กะลาสีแก่ผู้โลภ ชอบโกหก และหมกมุ่นกับสมบัติ และ บับบี วาฬยักษ์ใจดี ที่เลี้ยงแฟลปแจ็กเหมือนลูก
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Ship className="mr-2 h-5 w-5" />
                    สำรวจสินค้า
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    เข้าร่วมทีม
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-border">
                <img
                  src="https://m.media-amazon.com/images/S/pv-target-images/e050556214396182914aa19af0c480fc20539f4d9b17235e475e13fc9f81b550.jpg"
                  alt="Flapjack"
                  className="w-full h-full object-cover"
                />
              </div>
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

      {/* Book Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            สินค้าที่ระลึก
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Candy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2 text-card-foreground">
                  หนังสือ
                </h3>
                <p className="text-muted-foreground mb-4">
                  รายละเอียด
                </p>
                <p className="text-sm text-muted-foreground">
                  รายการหนังสือการ์ตูน Flapjack คอลเลกชันที่สมบูรณ์
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ship className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2 text-card-foreground">
                  ตุ๊กตา
                </h3>
                <p className="text-muted-foreground mb-4">
                  รายละเอียด
                </p>
                <p className="text-sm text-muted-foreground">
                  รายการตุ๊กตาตัวละครจากการ์ตูน Flapjack
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-2 text-card-foreground">
                  เสื้อ
                </h3>
                <p className="text-muted-foreground mb-4">
                  รายละเอียด
                </p>
                <p className="text-sm text-muted-foreground">
                  รายการเสื้อผ้าและแฟชั่นจาก Flapjack
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
              สมบัติที่โดดเด่น
            </h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              ประวัติผู้เขียน
            </h2>

            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-border">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground mb-4">
                      Creator of Flapjack
                    </h3>
                    <h4 className="text-xl font-semibold text-primary mb-4">
                      Thurop Van Orman
                    </h4>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Thurop Van Orman เป็นนักเขียน ผู้กำกับ และนักพากย์ชาวอเมริกัน ผู้สร้างการ์ตูนเรื่อง The Marvelous Misadventures of Flapjack ให้กับ Cartoon Network เขาเป็นที่รู้จักจากสไตล์งานที่แปลกประหลาด ดาร์ก และเสียดสีสังคม
                      </p>
                      <p>
                        ผลงานของเขามักสะท้อนด้านหม่นของโลกผู้ใหญ่ ผ่านมุมมองที่ดูเหมือนจะไร้เดียงสา ผลงานของเขามักสะท้อนด้านหม่นของโลกผู้ใหญ่ ผ่านมุมมองที่ดูเหมือนจะไร้เดียงสา
                      </p>
                      <p>
                        Flapjack ถือเป็นผลงานที่มีอิทธิพลอย่างมากต่อวงการแอนิเมชัน และเป็นจุดเริ่มต้นของนักสร้างการ์ตูนชื่อดังหลายคนในยุคต่อมา
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-80 h-100 rounded-xl overflow-hidden shadow-lg border border-border">
                      <img
                        src="/orman.webp"
                        alt="Thurop Van Orman"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Activities Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            กิจกรรม
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Ship className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">ม.ค.</span>
                      <span className="text-sm font-medium text-muted-foreground">21</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-card-foreground mb-2">
                      The Marvelous Misadventures of Flapjack
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>ผู้สร้าง:</strong> Thurop Van Orman</p>
                      <p><strong>ประเภท:</strong> การ์ตูนอนิเมชัน ผจญภัย / ตลกเหนือจริง</p>
                      <p><strong>ออกอากาศ:</strong> ปี 2008–2010 (Cartoon Network)</p>
                      <p className="mt-2">
                        การ์ตูนอนิเมชันแนวผจญภัยแฟนตาซี เล่าเรื่องของ Flapjack เด็กชายที่ออกเดินทางผจญภัยในทะเลร่วมกับกัปตัน K'nuckles เพื่อค้นหาเกาะลูกกวาด ท่ามกลางเรื่องราวตลกเหนือจริงและสไตล์ภาพที่เป็นเอกลักษณ์
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Anchor className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">ม.ค.</span>
                      <span className="text-sm font-medium text-muted-foreground">21</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-card-foreground mb-2">
                      จะได้เจอ ผู้สร้าง: Thurop Van Orman ที่ประเทศไทย
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>ในงานจะมี "FAN MEETING คุณ Thurop Van Orman"</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Waves className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">ม.ค.</span>
                      <span className="text-sm font-medium text-muted-foreground">21</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-card-foreground mb-2">
                      งานจัดแสดง The Marvelous Misadventures of Flapjack
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>วันที่จัดแสดง:</strong> 21 มกราคม 2568 - 30 มกราคม 2568</p>
                      <p><strong>พิกัด:</strong> MEGA BANGNA ชั้น 3</p>
                      <p><strong>เปิดให้เข้างาน:</strong> 13:00-17:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
