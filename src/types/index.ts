export interface StoreSettings {
  store_id: string;
  name: string;
  whatsapp: string;
  niche: string;
  instagram: string;
  tiktok: string;
  slogan: string;
}

export interface Category {
  id: string;
  store_id: string;
  name: string;
  image: string;
  subcategories: string[];
}

export interface ProductVariation {
  name: string;
  options: string[];
  price?: number;
}

export interface CustomizationList {
  name: string;
  items: {
    name: string;
    price: number;
  }[];
}

export interface Product {
  id: string;
  store_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  is_customizable: boolean;
  is_active: boolean;
  available_colors?: string;
  has_name_option?: boolean;
  name_price?: number;
  wholesale_price?: number;
  wholesale_min_quantity?: number;
  variations: ProductVariation[];
  customization_lists: CustomizationList[];
}

export interface GlobalOption {
  id: string;
  type: 'color' | 'assembly';
  name: string;
  price: number;
  image: string;
  category_ids: string[];
  group: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariations?: Record<string, string>;
  customName?: string;
  selectedCustomizations?: {
    listName: string;
    itemName: string;
    price: number;
  }[];
}
