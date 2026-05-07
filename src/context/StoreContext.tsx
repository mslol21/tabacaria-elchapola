import React, { createContext, useContext, useState } from 'react';

interface StoreContextType {
  storeId: string;
  setStoreId: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default store ID for initialization
  const [storeId, setStoreId] = useState('default_store');

  return (
    <StoreContext.Provider value={{ storeId, setStoreId }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
