-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. settings table
CREATE TABLE settings (
    store_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    whatsapp TEXT,
    niche TEXT,
    instagram TEXT,
    tiktok TEXT,
    slogan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id TEXT REFERENCES settings(store_id),
    name TEXT NOT NULL,
    image TEXT,
    subcategories TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id TEXT REFERENCES settings(store_id),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) DEFAULT 0.00,
    image TEXT,
    category TEXT,
    subcategory TEXT,
    is_customizable BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    available_colors TEXT,
    has_name_option BOOLEAN DEFAULT false,
    name_price DECIMAL(10,2) DEFAULT 0.00,
    wholesale_price DECIMAL(10,2),
    wholesale_min_quantity INTEGER,
    stock_quantity INTEGER DEFAULT 0,
    variations JSONB DEFAULT '[]'::jsonb,
    customization_lists JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. global_options table
CREATE TABLE global_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT CHECK (type IN ('color', 'assembly')),
    name TEXT NOT NULL,
    price DECIMAL(10,2) DEFAULT 0.00,
    image TEXT,
    category_ids TEXT[] DEFAULT '{}',
    "group" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES

-- Settings: Everyone can read, only authenticated can update
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow auth update settings" ON settings FOR UPDATE TO authenticated USING (true);

-- Categories: Everyone can read, only authenticated can CRUD
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow auth all categories" ON categories FOR ALL TO authenticated USING (true);

-- Products: Everyone can read, only authenticated can CRUD
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Allow auth all products" ON products FOR ALL TO authenticated USING (true);

-- Global Options: Everyone can read, only authenticated can CRUD
ALTER TABLE global_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read global_options" ON global_options FOR SELECT USING (true);
CREATE POLICY "Allow auth all global_options" ON global_options FOR ALL TO authenticated USING (true);
