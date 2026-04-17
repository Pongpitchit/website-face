-- Seed products with Flapjack theme
INSERT INTO products (name, description, price, image_url, category, stock) VALUES
  ('Candy Barrel', 'A wooden barrel filled with the finest candies from Candied Island. Captain K''nuckles approved!', 29.99, 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400', 'Candy', 50),
  ('Adventure Map', 'An authentic treasure map leading to Candied Island. May or may not be accurate.', 49.99, 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400', 'Adventure Gear', 25),
  ('Sailor Hat', 'A classic sailor hat just like Flapjack wears. Perfect for any aspiring adventurer!', 19.99, 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400', 'Apparel', 100),
  ('Bubbie Plushie', 'A cuddly whale plush toy inspired by everyone''s favorite talking whale, Bubbie!', 34.99, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'Toys', 75),
  ('Maple Syrup Bottle', 'Premium maple syrup from Stormalong Harbor. Flapjack''s favorite breakfast topping!', 12.99, 'https://images.unsplash.com/photo-1589496353733-ff9c4a2db0d8?w=400', 'Food', 200),
  ('Pirate Telescope', 'A brass telescope for spotting Candied Island from miles away. Essential for any adventure!', 59.99, 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400', 'Adventure Gear', 30),
  ('Anchor Necklace', 'A beautiful anchor pendant necklace. Show your love for the sea and adventure!', 24.99, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', 'Accessories', 80),
  ('Stormalong Coffee Mug', 'Start your morning like a true sailor with this Stormalong Harbor themed mug.', 14.99, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400', 'Home', 150),
  ('Candy Cane Compass', 'A unique compass with candy cane design. Always points toward adventure!', 39.99, 'https://images.unsplash.com/photo-1534375971785-5c1826f739d8?w=400', 'Adventure Gear', 45),
  ('Sea Monster Journal', 'A leather-bound journal for documenting all your marvelous misadventures.', 22.99, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 'Stationery', 60)
ON CONFLICT DO NOTHING;
