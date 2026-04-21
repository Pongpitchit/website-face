-- Update existing products with new categories and add new products for all categories

-- Clear existing products
DELETE FROM products;

-- Insert products for each category
INSERT INTO products (name, description, price, image_url, category, stock) VALUES
-- Figure Category
('Flapjack Action Figure', 'Detailed action figure of Flapjack with adventure accessories. 6 inches tall with articulated joints.', 299.00, 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400', 'Figure', 25),
('Captain K''nuckles Figure', 'Collectible figure of the candy-loving Captain K''nuckles with removable hat.', 349.00, 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400', 'Figure', 20),
('Bubbie Figure Set', 'Special edition Bubbie the whale figure with mini Flapjack riding on back.', 449.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'Figure', 15),

-- Doll Category
('Flapjack Doll', 'Soft plush doll of Flapjack with removable sailor outfit. 12 inches tall.', 199.00, 'https://images.unsplash.com/photo-1589496353733-ff9c4a2db0d8?w=400', 'Doll', 30),
('Candy Island Doll Collection', 'Set of 3 character dolls: Flapjack, K''nuckles, and Bubbie.', 549.00, 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400', 'Doll', 18),
('Sailor Flapjack Doll', 'Special edition Flapjack doll in full sailor uniform with hat.', 249.00, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', 'Doll', 22),

-- Plush Category
('Giant Bubbie Plush', 'Extra large 24-inch Bubbie whale plush toy. Super soft and cuddly.', 599.00, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 'Plush', 12),
('Flapjack Plush Keychain', 'Mini Flapjack plush keychain. Perfect for backpacks and keys.', 89.00, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400', 'Plush', 50),
('Candy Monster Plush', 'Adorable candy monster plush from Candied Island adventures.', 179.00, 'https://images.unsplash.com/photo-1534375971785-5c1826f739d8?w=400', 'Plush', 35),

-- Poster Category
('Stormalong Harbor Map Poster', 'Large poster showing detailed map of Stormalong Harbor.', 299.00, 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400', 'Poster', 40),
('Flapjack Adventure Poster', 'Movie-style poster featuring Flapjack''s greatest adventures.', 249.00, 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400', 'Poster', 45),
('Character Group Poster', 'Poster featuring all main characters: Flapjack, K''nuckles, and Bubbie.', 349.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'Poster', 28),

-- Apparel Category
('Flapjack T-Shirt', 'Premium cotton t-shirt with Flapjack face design. Available in all sizes.', 399.00, 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400', 'Apparel', 100),
('Sailor Hat Replica', 'Exact replica of Flapjack''s iconic white sailor hat.', 449.00, 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400', 'Apparel', 60),
('Stormalong Hoodie', 'Comfortable hoodie with Stormalong Harbor embroidered logo.', 799.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'Apparel', 75),
('Captain K''nuckles Shirt', 'Vintage-style shirt featuring Captain K''nuckles and candy.', 449.00, 'https://images.unsplash.com/photo-1589496353733-ff9c4a2db0d8?w=400', 'Apparel', 55),

-- Sticker Category
('Flapjack Sticker Pack', 'Pack of 12 waterproof vinyl stickers featuring Flapjack adventures.', 149.00, 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400', 'Sticker', 200),
('Candy Island Stickers', 'Set of candy-themed stickers from Candied Island.', 99.00, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', 'Sticker', 150),
('Character Sticker Collection', 'Complete sticker set with all characters and adventure items.', 199.00, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 'Sticker', 120),
('Adventure Logo Stickers', 'Weatherproof stickers with adventure and nautical themes.', 79.00, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400', 'Sticker', 180);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
