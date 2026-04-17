-- Create stock management functions and triggers

-- Function to decrement stock when order is placed
CREATE OR REPLACE FUNCTION decrement_stock_on_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Decrement stock for each order item
  UPDATE products 
  SET stock = stock - NEW.quantity 
  WHERE id = NEW.product_id;
  
  RETURN NEW;
END;
$$;

-- Trigger to automatically decrement stock when order items are inserted
DROP TRIGGER IF EXISTS on_order_item_created ON order_items;
CREATE TRIGGER on_order_item_created
  AFTER INSERT ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION decrement_stock_on_order();

-- Function to increment stock when order is cancelled (optional)
CREATE OR REPLACE FUNCTION increment_stock_on_order_cancel()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only increment stock if order status is cancelled
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    UPDATE products 
    SET stock = stock + (
      SELECT COALESCE(SUM(quantity), 0) 
      FROM order_items 
      WHERE order_id = NEW.id
    )
    WHERE id IN (
      SELECT product_id 
      FROM order_items 
      WHERE order_id = NEW.id
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to handle stock restoration on order cancellation
DROP TRIGGER IF EXISTS on_order_status_change ON orders;
CREATE TRIGGER on_order_status_change
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION increment_stock_on_order_cancel();

-- Policy to allow stock updates through the trigger
CREATE POLICY "enable_stock_trigger" ON products
  FOR ALL USING (true);

-- Add stock check constraint to prevent negative stock
ALTER TABLE products 
  ADD CONSTRAINT check_stock_non_negative 
  CHECK (stock >= 0);
