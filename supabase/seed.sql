-- Seed data for Tabacaria Gabi

-- 1. Insert Store Settings
INSERT INTO settings (store_id, name, whatsapp, niche, instagram, tiktok, slogan)
VALUES ('default_store', 'Tabacaria Gabi', '5511999999999', 'Tabacaria & Headshop', '@tabacariagabi', '@tabacariagabi', 'A melhor headshop da região com os melhores preços.')
ON CONFLICT (store_id) DO NOTHING;

-- 2. Insert Categories
INSERT INTO categories (name, image, store_id)
VALUES 
('Sedas', 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80', 'default_store'),
('Isqueiros', 'https://images.unsplash.com/photo-1544473244-f6895e69ad93?auto=format&fit=crop&q=80', 'default_store'),
('Bongs', 'https://images.unsplash.com/photo-1589131438258-0062f6b306b6?auto=format&fit=crop&q=80', 'default_store'),
('Acessórios', 'https://images.unsplash.com/photo-1616423642141-73ef13959efa?auto=format&fit=crop&q=80', 'default_store')
ON CONFLICT DO NOTHING;

-- 3. Insert Sample Products
INSERT INTO products (name, description, price, image, category, store_id, is_active)
VALUES 
('Seda Elements King Size', 'Seda ultrafina de arroz, queima lenta.', 12.00, 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80', 'Sedas', 'default_store', true),
('Isqueiro Clipper Metal', 'Isqueiro recarregável de metal com estojo.', 45.00, 'https://images.unsplash.com/photo-1544473244-f6895e69ad93?auto=format&fit=crop&q=80', 'Isqueiros', 'default_store', true),
('Bong de Vidro Honeycomb', 'Bong de vidro borossilicato com percolador.', 180.00, 'https://images.unsplash.com/photo-1589131438258-0062f6b306b6?auto=format&fit=crop&q=80', 'Bongs', 'default_store', true),
('Dichavador de Policarbonato', 'Dichavador resistente com 3 partes.', 25.00, 'https://images.unsplash.com/photo-1616423642141-73ef13959efa?auto=format&fit=crop&q=80', 'Acessórios', 'default_store', true)
ON CONFLICT DO NOTHING;
