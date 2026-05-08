import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Tags, 
  Settings, 
  Plus, 
  LogOut, 
  Edit2, 
  Trash2, 
  Layers,
  X,
  Upload,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useStore } from '../context/StoreContext';
import type { Product, Category, StoreSettings, GlobalOption } from '../types';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { 
    products, 
    categories, 
    globalOptions,
    settings, 
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
    uploadFile 
  } = useData();
  const { storeId } = useStore();
  
  const [activeTab, setActiveTab] = useState('products');
  const [isLogged, setIsLogged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingVariation, setEditingVariation] = useState<GlobalOption | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAdmin');
    if (!auth) {
      navigate('/admin/login');
    } else {
      setIsLogged(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const openCategoryModal = (category?: Category) => {
    setEditingCategory(category || null);
    setIsCategoryModalOpen(true);
  };

  const openVariationModal = (variation?: GlobalOption) => {
    setEditingVariation(variation || null);
    setIsVariationModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduct(id);
        triggerToast();
      } catch (err) {
        console.error(err);
        alert('Erro ao excluir produto');
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await deleteCategory(id);
        triggerToast();
      } catch (err) {
        console.error(err);
        alert('Erro ao excluir categoria');
      }
    }
  };

  const handleDeleteVariation = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta variação?')) {
      try {
        await deleteGlobalOption(id);
        triggerToast();
      } catch (err) {
        console.error(err);
        alert('Erro ao excluir variação');
      }
    }
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (!isLogged) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-brand-dark border-r border-white/5 flex flex-col items-center md:items-stretch p-4 md:p-6">
        <div className="flex items-center gap-3 mb-12 px-2">
          <img src="/logo.png" alt="Logo" className="h-8 md:h-10" />
          <span className="text-xl font-black hidden md:block tracking-tighter">ADMIN <span className="text-brand-primary">GABI</span></span>
        </div>

        <nav className="flex-grow space-y-2">
          <SidebarLink 
            icon={<Package size={20} />} 
            label="Produtos" 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')} 
          />
          <SidebarLink 
            icon={<Tags size={20} />} 
            label="Categorias" 
            active={activeTab === 'categories'} 
            onClick={() => setActiveTab('categories')} 
          />
          <SidebarLink 
            icon={<Layers size={20} />} 
            label="Variações" 
            active={activeTab === 'variations'} 
            onClick={() => setActiveTab('variations')} 
          />
          <SidebarLink 
            icon={<Settings size={20} />} 
            label="Configurações" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-4 text-white/40 hover:text-brand-accent transition-all w-full rounded-2xl"
        >
          <LogOut size={20} />
          <span className="font-bold hidden md:block">Sair</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="p-6 md:p-10 border-b border-white/5 flex justify-between items-center bg-brand-dark/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
              {activeTab === 'products' && 'Gestão de Produtos'}
              {activeTab === 'categories' && 'Gestão de Categorias'}
              {activeTab === 'variations' && 'Variações Globais'}
              {activeTab === 'settings' && 'Configurações da Loja'}
            </h1>
            <p className="text-white/40 text-sm hidden md:block">Gerencie os dados do seu sistema em tempo real.</p>
          </div>

          {(activeTab === 'products' || activeTab === 'categories' || activeTab === 'variations') && (
            <button 
              onClick={() => {
                if (activeTab === 'products') openNewProductModal();
                if (activeTab === 'categories') openCategoryModal();
                if (activeTab === 'variations') openVariationModal();
              }}
              className="bg-brand-primary text-brand-dark font-black py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all"
            >
              <Plus size={20} />
              {activeTab === 'products' && 'NOVO PRODUTO'}
              {activeTab === 'categories' && 'NOVA CATEGORIA'}
              {activeTab === 'variations' && 'NOVA VARIAÇÃO'}
            </button>
          )}
        </header>

        <div className="p-6 md:p-10">
          {activeTab === 'products' && (
            <ProductsTable 
              products={products} 
              onEdit={openEditProductModal}
              onDelete={handleDeleteProduct}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsForm 
              settings={settings} 
              onSave={async (data) => {
                setIsSaving(true);
                try {
                  await updateSettings(data);
                  triggerToast();
                } finally {
                  setIsSaving(false);
                }
              }}
              isSaving={isSaving}
            />
          )}
          {activeTab === 'categories' && (
            <CategoriesTable 
              categories={categories} 
              onEdit={openCategoryModal}
              onDelete={handleDeleteCategory}
            />
          )}
          {activeTab === 'variations' && (
            <VariationsTable 
              variations={globalOptions} 
              onEdit={openVariationModal}
              onDelete={handleDeleteVariation}
            />
          )}
        </div>
      </main>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal 
          product={editingProduct} 
          categories={categories}
          storeId={storeId}
          onClose={() => setIsModalOpen(false)}
          onSave={async (data) => {
            setIsSaving(true);
            try {
              if (editingProduct) {
                await updateProduct(editingProduct.id, data as any);
              } else {
                await addProduct(data as any);
              }
              setIsModalOpen(false);
              triggerToast();
            } finally {
              setIsSaving(false);
            }
          }}
          isSaving={isSaving}
          uploadFile={uploadFile}
        />
      )}
      {/* Category Modal */}
      {isCategoryModalOpen && (
        <CategoryModal 
          category={editingCategory}
          storeId={storeId}
          onClose={() => setIsCategoryModalOpen(false)}
          onSave={async (data) => {
            setIsSaving(true);
            try {
              if (editingCategory) {
                await updateCategory(editingCategory.id, data);
              } else {
                await addCategory(data);
              }
              setIsCategoryModalOpen(false);
              triggerToast();
            } finally {
              setIsSaving(false);
            }
          }}
          isSaving={isSaving}
          uploadFile={uploadFile}
        />
      )}

      {/* Variation Modal */}
      {isVariationModalOpen && (
        <VariationModal 
          variation={editingVariation}
          onClose={() => setIsVariationModalOpen(false)}
          onSave={async (data) => {
            setIsSaving(true);
            try {
              if (editingVariation) {
                await updateGlobalOption(editingVariation.id, data);
              } else {
                await addGlobalOption(data);
              }
              setIsVariationModalOpen(false);
              triggerToast();
            } finally {
              setIsSaving(false);
            }
          }}
          isSaving={isSaving}
          uploadFile={uploadFile}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 right-10 bg-green-500 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl animate-bounce-in z-50 font-bold">
          <CheckCircle2 size={24} />
          Alteração salva com sucesso!
        </div>
      )}
    </div>
  );
};

// --- Sub-components ---

const SidebarLink = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 p-4 w-full rounded-2xl transition-all ${
      active 
      ? 'bg-brand-primary text-brand-dark font-black shadow-lg shadow-brand-primary/10' 
      : 'text-white/40 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="hidden md:block">{label}</span>
  </button>
);

const ProductsTable = ({ 
  products, 
  onEdit, 
  onDelete 
}: { 
  products: Product[], 
  onEdit: (p: Product) => void,
  onDelete: (id: string) => void
}) => (
  <div className="glass-dark rounded-[32px] overflow-hidden border border-white/5">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-white/5">
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest">Produto</th>
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest">Categoria</th>
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest">Preço</th>
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest">Status</th>
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex-shrink-0">
                    <img src={p.image || '/logo.png'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="text-white/30 text-xs truncate max-w-[200px]">{p.description}</div>
                  </div>
                </div>
              </td>
              <td className="p-6">
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-white/60">
                  {p.category}
                </span>
              </td>
              <td className="p-6">
                <div className="font-black text-brand-primary">R$ {Number(p.price).toFixed(2)}</div>
                {p.wholesale_price && <div className="text-[10px] text-white/30 italic">Atacado: R$ {p.wholesale_price}</div>}
              </td>
              <td className="p-6">
                {p.is_active ? (
                  <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    ATIVO
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-white/20 text-xs font-bold">
                    <div className="w-2 h-2 bg-white/20 rounded-full" />
                    INATIVO
                  </div>
                )}
              </td>
              <td className="p-6 text-right">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onEdit(p)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => onDelete(p.id)}
                    className="p-2 bg-white/5 hover:bg-brand-accent/20 rounded-lg text-white/50 hover:text-brand-accent transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CategoriesTable = ({ 
  categories, 
  onEdit, 
  onDelete 
}: { 
  categories: Category[], 
  onEdit: (c: Category) => void,
  onDelete: (id: string) => void
}) => (
  <div className="glass-dark rounded-[32px] overflow-hidden border border-white/5">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-white/5">
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest">Categoria</th>
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest">Subcategorias</th>
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {categories.map((c) => (
            <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex-shrink-0">
                    <img src={c.image || '/logo.png'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="font-bold text-white">{c.name}</div>
                </div>
              </td>
              <td className="p-6">
                <div className="flex flex-wrap gap-2">
                  {c.subcategories?.map(sub => (
                    <span key={sub} className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-white/40">
                      {sub}
                    </span>
                  ))}
                  {(!c.subcategories || c.subcategories.length === 0) && <span className="text-white/20 italic text-xs">Nenhuma</span>}
                </div>
              </td>
              <td className="p-6 text-right">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onEdit(c)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => onDelete(c.id)}
                    className="p-2 bg-white/5 hover:bg-brand-accent/20 rounded-lg text-white/50 hover:text-brand-accent transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const VariationsTable = ({ 
  variations, 
  onEdit, 
  onDelete 
}: { 
  variations: GlobalOption[], 
  onEdit: (v: GlobalOption) => void,
  onDelete: (id: string) => void
}) => (
  <div className="glass-dark rounded-[32px] overflow-hidden border border-white/5">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-white/5">
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest">Variação</th>
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest">Tipo</th>
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest">Preço Extra</th>
            <th className="p-6 text-xs font-black text-white/40 uppercase tracking-widest text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {variations.map((v) => (
            <tr key={v.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="p-6">
                <div className="flex items-center gap-4">
                  {v.image && (
                    <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                      <img src={v.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="font-bold text-white">{v.name}</div>
                </div>
              </td>
              <td className="p-6">
                <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                  {v.type === 'color' ? 'Cor/Estilo' : 'Montagem/Extra'}
                </span>
              </td>
              <td className="p-6 font-bold text-white/60">
                R$ {Number(v.price).toFixed(2)}
              </td>
              <td className="p-6 text-right">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onEdit(v)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => onDelete(v.id)}
                    className="p-2 bg-white/5 hover:bg-brand-accent/20 rounded-lg text-white/50 hover:text-brand-accent transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SettingsForm = ({ settings, onSave, isSaving }: { settings: StoreSettings | null, onSave: (data: Partial<StoreSettings>) => void, isSaving: boolean }) => {
  const [formData, setFormData] = useState<Partial<StoreSettings>>({});

  useEffect(() => {
    if (settings) setFormData(settings);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Nome da Loja</label>
          <input 
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">WhatsApp (55...)</label>
          <input 
            name="whatsapp"
            value={formData.whatsapp || ''}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Instagram</label>
          <input 
            name="instagram"
            value={formData.instagram || ''}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">TikTok</label>
          <input 
            name="tiktok"
            value={formData.tiktok || ''}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Slogan da Loja</label>
        <textarea 
          name="slogan"
          value={formData.slogan || ''}
          onChange={handleChange}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all h-32"
        />
      </div>
      
      <button 
        onClick={() => onSave(formData)}
        disabled={isSaving}
        className="bg-brand-primary text-brand-dark font-black py-4 px-10 rounded-2xl flex items-center gap-3 shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all disabled:opacity-50"
      >
        <Save size={20} />
        {isSaving ? 'SALVANDO...' : 'SALVAR CONFIGURAÇÕES'}
      </button>
    </div>
  );
};

const ProductModal = ({ 
  product, 
  categories, 
  storeId,
  onClose, 
  onSave, 
  isSaving,
  uploadFile 
}: { 
  product: Product | null, 
  categories: Category[],
  storeId: string,
  onClose: () => void, 
  onSave: (data: Partial<Product>) => void, 
  isSaving: boolean,
  uploadFile: (file: File, bucket: string) => Promise<string | null>
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    store_id: storeId,
    name: '',
    description: '',
    price: 0,
    category: '',
    is_active: true,
    image: '',
    variations: [],
    customization_lists: []
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(prev => ({ ...prev, category: categories[0]?.name || '' }));
    }
  }, [product, categories]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFile(file, 'products');
      if (url) setFormData((prev: any) => ({ ...prev, image: url }));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-brand-dark border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] p-8 md:p-12 shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/20 hover:text-white transition-all">
          <X size={32} />
        </button>

        <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase">
          {product ? 'Editar Produto' : 'Novo Produto'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Upload */}
          <div className="space-y-4">
            <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Imagem do Produto</label>
            <div className="aspect-square bg-white/5 rounded-[32px] border-2 border-dashed border-white/10 overflow-hidden relative group">
              {formData.image ? (
                <img src={formData.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                  <Upload size={48} className="mb-4" />
                  <span className="font-bold">Clique para enviar</span>
                </div>
              )}
              <input 
                type="file" 
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Nome</label>
              <input 
                value={formData.name}
                onChange={e => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Preço (R$)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={e => setFormData((prev: any) => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Categoria</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData((prev: any) => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all appearance-none"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name} className="bg-brand-dark">{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Descrição</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all h-32"
              />
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox"
                checked={formData.is_active}
                onChange={e => setFormData((prev: any) => ({ ...prev, is_active: e.target.checked }))}
                className="w-5 h-5 accent-brand-primary"
                id="active"
              />
              <label htmlFor="active" className="text-sm font-bold text-white/60 cursor-pointer uppercase tracking-widest">Produto Ativo</label>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-8 py-4 rounded-2xl font-black text-white/40 hover:text-white transition-all"
          >
            CANCELAR
          </button>
          <button 
            onClick={() => onSave(formData)}
            disabled={isSaving}
            className="bg-brand-primary text-brand-dark font-black px-12 py-4 rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all disabled:opacity-50"
          >
            {isSaving ? 'SALVANDO...' : 'SALVAR PRODUTO'}
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryModal = ({ 
  category, 
  storeId,
  onClose, 
  onSave, 
  isSaving,
  uploadFile 
}: { 
  category: Category | null, 
  storeId: string,
  onClose: () => void, 
  onSave: (data: Partial<Category>) => void, 
  isSaving: boolean,
  uploadFile: (file: File, bucket: string) => Promise<string | null>
}) => {
  const [formData, setFormData] = useState<Partial<Category>>({
    store_id: storeId,
    name: '',
    image: '',
    subcategories: []
  });

  useEffect(() => {
    if (category) setFormData(category);
  }, [category]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFile(file, 'categories');
      if (url) setFormData((prev: any) => ({ ...prev, image: url }));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-brand-dark border border-white/10 w-full max-w-2xl overflow-y-auto rounded-[40px] p-8 md:p-12 shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/20 hover:text-white transition-all">
          <X size={32} />
        </button>

        <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase">
          {category ? 'Editar Categoria' : 'Nova Categoria'}
        </h2>

        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Imagem da Categoria</label>
            <div className="aspect-video bg-white/5 rounded-3xl border-2 border-dashed border-white/10 overflow-hidden relative group">
              {formData.image ? (
                <img src={formData.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                  <Upload size={32} className="mb-2" />
                  <span className="font-bold text-xs">Clique para enviar</span>
                </div>
              )}
              <input 
                type="file" 
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Nome</label>
            <input 
              value={formData.name}
              onChange={e => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-8 py-4 rounded-2xl font-black text-white/40 hover:text-white transition-all"
          >
            CANCELAR
          </button>
          <button 
            onClick={() => onSave(formData)}
            disabled={isSaving}
            className="bg-brand-primary text-brand-dark font-black px-12 py-4 rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all disabled:opacity-50"
          >
            {isSaving ? 'SALVANDO...' : 'SALVAR CATEGORIA'}
          </button>
        </div>
      </div>
    </div>
  );
};

const VariationModal = ({ 
  variation, 
  onClose, 
  onSave, 
  isSaving,
  uploadFile 
}: { 
  variation: GlobalOption | null, 
  onClose: () => void, 
  onSave: (data: Partial<GlobalOption>) => void, 
  isSaving: boolean,
  uploadFile: (file: File, bucket: string) => Promise<string | null>
}) => {
  const [formData, setFormData] = useState<Partial<GlobalOption>>({
    name: '',
    type: 'color',
    price: 0,
    image: '',
    group: ''
  });

  useEffect(() => {
    if (variation) setFormData(variation);
  }, [variation]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFile(file, 'variations');
      if (url) setFormData((prev: any) => ({ ...prev, image: url }));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-brand-dark border border-white/10 w-full max-w-2xl overflow-y-auto rounded-[40px] p-8 md:p-12 shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/20 hover:text-white transition-all">
          <X size={32} />
        </button>

        <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase">
          {variation ? 'Editar Variação' : 'Nova Variação'}
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Tipo</label>
              <select 
                value={formData.type}
                onChange={e => setFormData((prev: any) => ({ ...prev, type: e.target.value as any }))}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all appearance-none"
              >
                <option value="color" className="bg-brand-dark">Cor/Estilo</option>
                <option value="assembly" className="bg-brand-dark">Montagem/Extra</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Preço Extra (R$)</label>
              <input 
                type="number"
                step="0.01"
                value={formData.price}
                onChange={e => setFormData((prev: any) => ({ ...prev, price: parseFloat(e.target.value) }))}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Nome</label>
            <input 
              value={formData.name}
              onChange={e => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all"
              placeholder="Ex: Prata, Com Gelo, etc."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Grupo (Opcional)</label>
            <input 
              value={formData.group}
              onChange={e => setFormData((prev: any) => ({ ...prev, group: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:border-brand-primary outline-none transition-all"
              placeholder="Ex: Essências, Bebidas, etc."
            />
          </div>

          <div className="space-y-4 pt-4">
            <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Ícone/Imagem (Opcional)</label>
            <div className="w-24 h-24 bg-white/5 rounded-2xl border-2 border-dashed border-white/10 overflow-hidden relative group">
              {formData.image ? (
                <img src={formData.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                  <Upload size={20} />
                </div>
              )}
              <input 
                type="file" 
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-8 py-4 rounded-2xl font-black text-white/40 hover:text-white transition-all"
          >
            CANCELAR
          </button>
          <button 
            onClick={() => onSave(formData)}
            disabled={isSaving}
            className="bg-brand-primary text-brand-dark font-black px-12 py-4 rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all disabled:opacity-50"
          >
            {isSaving ? 'SALVANDO...' : 'SALVAR VARIAÇÃO'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

