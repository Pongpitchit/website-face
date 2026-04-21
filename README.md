# Stormalong Shop - The Marvelous Misadventures of Flapjack

ร้านค้าออนไลน์สำหรับสินค้าจากการ์ตูน The Marvelous Misadventures of Flapjack

## 📋 เนื้อหา

ร้านค้า Stormalong Shop เป็นแพลตฟอร์ม e-commerce ที่สร้างขึ้นมาเพื่อจำหน่ายสินค้าจากการ์ตูนแอนิเมชันเรื่อง The Marvelous Misadventures of Flapjack ที่ออกอากาศทาง Cartoon Network

### 🎭 เกี่ยวกับ Flapjack

The Marvelous Misadventures of Flapjack เป็นการ์ตูนแอนิเมชันแนวผจญภัย–ตลก–แฟนตาซี เล่าเรื่องของ แฟลปแจ็ก เด็กชายผู้ไร้เดียงสาแต่เต็มไปด้วยจินตนาการ เขาอาศัยอยู่ในเมืองท่าชื่อ Stormalong Harbor และใช้ชีวิตร่วมกับ กัปตันแคนเคอร์รัส กะลาสีแก่ผู้โลภ ชอบโกหก และหมกมุ่นกับสมบัติ และ บับบี วาฬยักษ์ใจดี ที่เลี้ยงแฟลปแจ็กเหมือนลูก

## 🚀 คุณสมบัติ

- **📦 หมวดหมู่สินค้า**: Figure, Doll, Plush, Poster, Apparel, Sticker
- **🔍 การค้นหาและกรอง**: ค้นหาสินค้าตามหมวดหมู่ได้
- **🛒 ตะกร้าสินค้า**: ระบบตะกร้าสินค้าที่ทำงานได้ดี
- **👤 บัญชีผู้ใช้**: ระบบสมัครและจัดการบัญชีผู้ใช้
- **💳 การสั่งซื้อ**: ระบบสั่งซื้อและชำระเงินออนไลน์
- **📊 การจัดการสต็อก**: ระบบติดตามสต็อกสินค้าแบบ real-time
- **🎨 การออกแบบ**: UI ที่สวยงามและใช้งานง่าย

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📁 โครงสร้างโปรเจกต์

```
website-face/
├── app/                    # Next.js App Router
│   ├── (auth)/           # Authentication pages
│   ├── admin/            # Admin dashboard
│   │   └── products/    # Product CRUD
│   ├── about/            # About page
│   ├── products/         # Products listing
│   ├── cart/             # Shopping cart
│   └── page.tsx          # Homepage
├── components/            # React components
│   ├── ui/              # shadcn/ui components
│   ├── navbar.tsx        # Navigation bar
│   └── product-image.tsx # Product image component
├── lib/                 # Utilities
│   └── supabase/        # Supabase client
├── scripts/              # Database scripts
│   ├── 001_create_tables.sql
│   ├── 002_seed_products.sql
│   ├── 003_stock_management.sql
│   └── 004_product_categories.sql
└── public/               # Static assets
```

## 🗄️ ฐานข้อมูล

### ตารางหลัก

- **products**: ข้อมูลสินค้า
- **profiles**: ข้อมูลผู้ใช้
- **cart_items**: รายการสินค้าในตะกร้า
- **orders**: คำสั่งซื้อ
- **order_items**: รายการสินค้าในคำสั่งซื้อ

### หมวดหมู่สินค้า

1. **Figure** - ฟิกเกอร์ตัวละคร
2. **Doll** - ตุ๊กตา
3. **Plush** - ตุ๊กตานุ่ม
4. **Poster** - โปสเตอร์
5. **Apparel** - เสื้อผ้า
6. **Sticker** - สติ๊กเกอร์

## 🚀 การติดตั้งและใช้งาน

### 1. Clone Repository
```bash
git clone <repository-url>
cd website-face
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
สร้างไฟล์ `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Setup Database
รัน SQL scripts ในโฟลเดอร์ `scripts/` ตามลำดับ:
1. `001_create_tables.sql`
2. `002_seed_products.sql`
3. `003_stock_management.sql`
4. `004_product_categories.sql`

### 5. Run Development Server
```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## 📱 หน้าเพจต่างๆ

### 🏠 หน้าหลัก (`/`)
- แนะนำการ์ตูน Flapjack
- แสดงสินค้าแนะนำ
- ข้อมูลผู้สร้าง Thurop Van Orman
- กิจกรรมและอีเวนต์

### 🛍️ หน้าสินค้า (`/products`)
- แสดงสินค้าทั้งหมด
- กรองตามหมวดหมู่ (Figure, Doll, Plush, Poster, Apparel, Sticker)
- ค้นหาสินค้า
- แสดงสถานะสต็อก

### 🛒 หน้าตะกร้า (`/cart`)
- แสดงสินค้าในตะกร้า
- ปรับจำนวนสินค้า
- คำนวณราคารวม

### 👤 หน้าสมาชิก (`/auth`)
- สมัครสมาชิกใหม่
- เข้าสู่ระบบ
- จัดการโปรไฟล์

### ℹ️ หน้าเกี่ยวกับ (`/about`)
- ประวัติร้านค้า
- ข้อมูลผู้สร้าง
- วิสัยร้านค้า

### ⚙️ หน้าผู้ดูแล (`/admin/products`)
- จัดการสินค้า (CRUD)
- เพิ่ม/แก้ไข/ลบสินค้า
- จัดการสต็อกสินค้า

## 🔧 คุณสมบัติของระบบ

### Authentication
- สมัครสมาชิก/เข้าสู่ระบบด้วย Supabase Auth
- ป้องกันการเข้าถึงหน้า protected
- จัดการ session แบบ real-time

### Shopping Cart
- เพิ่มสินค้าในตะกร้า
- ปรับจำนวนสินค้า
- บันทึกตะกร้าในฐานข้อมูล
- ลบสินค้าจากตะกร้า

### Order Management
- สร้างคำสั่งซื้อ
- จัดการสถานะคำสั่ง
- อัปเดตสต็อกสินค้าอัตโนมัติ

### Stock Management
- ติดตามสต็อกสินค้าแบบ real-time
- ลดสต็อกเมื่อมีการสั่งซื้อ
- แจ้งเตือนเมื่อสต็อกต่ำ
- อัปเดตสต็อกด้วย trigger

## 🎨 การออกแบบ

- **Design System**: ใช้ shadcn/ui components
- **Color Scheme**: สนับสนุนกับธีม Flapjack
- **Typography**: ใช้ custom font heading
- **Responsive**: รองรับทุกขนาดหน้าจอ
- **Animations**: Hover effects และ transitions

## 🚀 การ Deploy

### Vercel (แนะนำ)
```bash
npm run build
vercel --prod
```

### Environment Variables สำหรับ Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 🤝 การมีส่วนร่วม

ร้านค้านี้เป็นโปรเจกต์สำหรับการเรียนรู้แบบ e-commerce และการใช้ Next.js กับ Supabase หากคุณสนใจมีส่วนร่วมในการพัฒนา:

1. Fork repository
2. สร้าง feature branch
3. ส่ง pull request
4. แจ้งปัญหาและข้อเสนอแนะนำ

## 📄 ใบอนุญาติ

- **License**: MIT
- **Author**: Stormalong Shop Team
- **Version**: 1.0.0

## 🆘 การสนับสนุน

หากพบปัญหาหรือมีข้อสงสัย:

1. ตรวจสอบ [Issues](link-to-issues) ก่อน
2. สร้าง issue ใหม่พร้อมรายละเอียด
3. แจ้งข้อมูลสิ่งแวดล้อม:
   - เวอร์ชัน browser/OS
   - ขั้นตอนการเกิดปัญหา
   - Screenshot ถ้าจำเป็น
   - Console errors

---

**⚓ Stormalong Shop - พร้อมให้บริการผจญภัยของคุณ!**

*"The Marvelous Misadventures of Flapjack ถือเป็นผลงานที่มีอิทธิพลอย่างมากต่อวงการแอนิเมชัน และเป็นจุดเริ่มต้นของนักสร้างการ์ตูนชื่อดังหลายคนในยุคต่อมา"*
