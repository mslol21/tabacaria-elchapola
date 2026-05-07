import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product, Category, GlobalOption, StoreSettings } from '../types';

interface DataContextType {
  products: Product[];
  categories: Category[];
  globalOptions: GlobalOption[];
  settings: StoreSettings | null;
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addGlobalOption: (option: Omit<GlobalOption, 'id'>) => Promise<void>;
  updateGlobalOption: (id: string, option: Partial<GlobalOption>) => Promise<void>;
  deleteGlobalOption: (id: string) => Promise<void>;
  updateSettings: (settings: Partial<StoreSettings>) => Promise<void>;
  uploadFile: (file: File, bucket: string) => Promise<string | null>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [globalOptions, setGlobalOptions] = useState<GlobalOption[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes, globalOptionsRes, settingsRes] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
        supabase.from('global_options').select('*'),
        supabase.from('settings').select('*').single(),
      ]);

      if (productsRes.data) setProducts(productsRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (globalOptionsRes.data) setGlobalOptions(globalOptionsRes.data);
      if (settingsRes.data) setSettings(settingsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const { error } = await supabase.from('products').insert([product]);
    if (error) throw error;
    await fetchData();
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    const { error } = await supabase.from('products').update(product).eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const addCategory = async (category: Omit<Category, 'id'>) => {
    const { error } = await supabase.from('categories').insert([category]);
    if (error) throw error;
    await fetchData();
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    const { error } = await supabase.from('categories').update(category).eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const addGlobalOption = async (option: Omit<GlobalOption, 'id'>) => {
    const { error } = await supabase.from('global_options').insert([option]);
    if (error) throw error;
    await fetchData();
  };

  const updateGlobalOption = async (id: string, option: Partial<GlobalOption>) => {
    const { error } = await supabase.from('global_options').update(option).eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const deleteGlobalOption = async (id: string) => {
    const { error } = await supabase.from('global_options').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const updateSettings = async (newSettings: Partial<StoreSettings>) => {
    const { error } = await supabase.from('settings').update(newSettings).eq('store_id', settings?.store_id);
    if (error) throw error;
    await fetchData();
  };

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        globalOptions,
        settings,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addGlobalOption,
        updateGlobalOption,
        deleteGlobalOption,
        updateSettings,
        uploadFile,
        refreshData: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
