import { Card, CardContent } from "@/components/ui/card"
import { Anchor, Ship, Candy, Waves, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
              <Anchor className="h-6 w-6 text-primary" />
              <span className="text-lg font-medium text-primary">
                Stormalong Shop
              </span>
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-foreground mb-6">
            เกี่ยวกับเรา
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ยินดีต้อนรับสู่ Stormalong Shop แหล่งรวมสินค้าสุดพิเศษที่ได้แรงบันดาลใจจาก
            The Marvelous Misadventures of Flapjack เราคัดสรรสินค้าอย่างพิถีพิถัน
            เพื่อนำโลกแห่ง Candied Island มาสู่ชีวิตจริงของคุณ
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-border">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground mb-4">
                    พันธกิจของเรา
                  </h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    เราเชื่อในการส่งต่อความสุขและการผจญภัยผ่านสินค้าคุณภาพที่สะท้อนจิตวิญญาณของโลก Flapjack
                    ทุกชิ้นในร้านของเราถูกคัดเลือกมาอย่างใส่ใจ เพื่อให้มันนำรอยยิ้มและความมหัศจรรย์
                    มาสู่การผจญภัยประจำวันของคุณ
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    จากท่าเรือ Stormalong Harbor สู่ดินแดนในตำนาน Candied Island
                    เราพร้อมเคียงข้างคุณในทุกการผจญภัยอันมหัศจรรย์!
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values Grid */}
        <section className="mb-20">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-center mb-12 text-foreground">
            ค่านิยมของเรา
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Candy className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-3 text-card-foreground">
                  คุณภาพและความหวาน
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  เหมือนสมบัติแห่ง Candied Island เราดูแลให้สินค้าทุกชิ้นมีคุณภาพสูงสุด
                  และนำความหวานมาสู่ชีวิตของคุณ
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ship className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-3 text-card-foreground">
                  จิตวิญญาณผจญภัย
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  เราซึมซับจิตวิญญาณนักผจญภัยของ Flapjack และ Captain K'nuckles
                  และส่งเสริมให้ทุกคนออกเดินทางสู่การผจญภัยของตัวเอง
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Waves className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-3 text-card-foreground">
                  ชุมชนและมิตรภาพ
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  เหมือนสายใยระหว่าง Flapjack, Bubbie และ Captain K'nuckles
                  เราให้คุณค่ากับชุมชนและมิตรภาพที่ทำให้ชีวิตเต็มไปด้วยการผจญภัย
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-20">
          <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-center mb-8 text-foreground">
              เรื่องราวของเรา
            </h2>

            <div className="max-w-4xl mx-auto space-y-6 text-muted-foreground">
              <p className="leading-relaxed">
                Stormalong Shop ถือกำเนิดจากความรักอันล้นเหลือที่มีต่อ The Marvelous Misadventures of Flapjack
                และโลกมหัศจรรย์ที่มันสร้างขึ้น เราเห็นว่าซีรีส์นี้ครองใจผู้ชมด้วยการผสมผสานการผจญภัย
                อารมณ์ขัน และความอบอุ่นหัวใจอย่างเป็นเอกลักษณ์
              </p>

              <p className="leading-relaxed">
                จากสินค้าแฟนคลับเพียงไม่กี่ชิ้น เราเติบโตกลายเป็นร้านค้าที่ครบครันสำหรับแฟนๆ ทุกที่ทั่วโลก
                เราทุ่มเทอย่างไม่หยุดยั้งในการค้นหาและสร้างสินค้าที่จะทำให้ Flapjack, Captain K'nuckles
                และ Bubbie ภูมิใจ
              </p>

              <p className="leading-relaxed">
                ทุกชิ้นในร้านของเราบอกเล่าเรื่องราว ไม่ว่าจะเป็นสินค้าที่ได้แรงบันดาลใจจากสมบัติหวานของ Candied Island
                หรืออุปกรณ์สำหรับการผจญภัยบนท้องทะเลของคุณเอง เราไม่ได้แค่ขายสินค้า
                แต่เราแบ่งปันความมหัศจรรย์ที่ทำให้โลกของ Flapjack พิเศษเสมอมา
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold mb-4 text-foreground">
            ร่วมผจญภัยไปกับเรา!
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            พร้อมเริ่มต้นการผจญภัยอันมหัศจรรย์ของคุณแล้วหรือยัง?
            สำรวจคอลเลกชันของเราและค้นหาสมบัติที่ใช่สำหรับการเดินทางของคุณ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
              <a
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Ship className="mr-2 h-4 w-4" />
              สำรวจสินค้า
            </a>
            
              <a
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              เข้าร่วมทีม
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}