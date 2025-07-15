import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ocbedxvddfheemtvxxed.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jYmVkeHZkZGZoZWVtdHZ4eGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MzQ1ODMsImV4cCI6MjA2ODExMDU4M30.EPLgCza17UB7GJDK3W2E-ryMewg9puur4rIcn7r0GR4'
);

interface Sabor {
  nombre: string;
  disponible: boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  sabores: Sabor[];
}

export interface Beneficio {
  id: number;
  icon: string;
  title: string;
  desc: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface DataContextType {
  productos: Producto[];
  beneficios: Beneficio[];
  faqs: FAQ[];
  loading: boolean;

  getProducto: (id: number) => Producto | undefined;
  addProducto: (producto: Omit<Producto, 'id'>) => Promise<void>;
  updateProducto: (id: number, updates: Partial<Producto>) => Promise<void>;
  deleteProducto: (id: number) => Promise<void>;

  addBeneficio: (beneficio: Omit<Beneficio, 'id'>) => Promise<void>;
  updateBeneficio: (id: number, updates: Partial<Beneficio>) => Promise<void>;
  deleteBeneficio: (id: number) => Promise<void>;

  addFaq: (faq: Omit<FAQ, 'id'>) => Promise<void>;
  updateFaq: (id: number, updates: Partial<FAQ>) => Promise<void>;
  deleteFaq: (id: number) => Promise<void>;

  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Función para parsear sabores de manera segura
const parseSabores = (saboresInput: any): Sabor[] => {
  try {
    if (!saboresInput) return [];
    if (Array.isArray(saboresInput)) return saboresInput;
    if (typeof saboresInput === 'string') {
      // Limpia posibles caracteres inválidos en el JSON
      const cleanedJson = saboresInput
        .replace(/\\"/g, '"')
        .replace(/"\s*}/g, '"}')
        .replace(/"\s*]/g, '"]');
      return JSON.parse(cleanedJson);
    }
    return [];
  } catch (error) {
    console.error('Error parsing sabores:', error, 'Input:', saboresInput);
    return [];
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [beneficios, setBeneficios] = useState<Beneficio[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        { data: productosData, error: productosError },
        { data: beneficiosData, error: beneficiosError },
        { data: faqsData, error: faqsError }
      ] = await Promise.all([
        supabase.from('productos').select('*').order('id', { ascending: true }),
        supabase.from('beneficios').select('*'),
        supabase.from('faqs').select('*')
      ]);
      
      if (productosError) throw productosError;
      if (beneficiosError) throw beneficiosError;
      if (faqsError) throw faqsError;

      // Normalizar los productos asegurando que sabores sea un array válido
      const productosNormalizados = (productosData || []).map(producto => ({
        ...producto,
        sabores: parseSabores(producto.sabores)
      }));

      setProductos(productosNormalizados);
      setBeneficios(beneficiosData || []);
      setFaqs(faqsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Productos CRUD
  const getProducto = (id: number) => productos.find(p => p.id === id);

  const addProducto = async (producto: Omit<Producto, 'id'>) => {
    try {
      const productoParaGuardar = {
        ...producto,
        sabores: JSON.stringify(producto.sabores) // Convertir a string JSON
      };

      const { data, error } = await supabase
        .from('productos')
        .insert([productoParaGuardar])
        .select()
        .single();

      if (error) throw error;

      // Asegurar que los sabores se parsean al guardar
      setProductos(prev => [...prev, {
        ...data,
        sabores: parseSabores(data.sabores)
      }]);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProducto = async (id: number, updates: Partial<Producto>) => {
    try {
      const updatesParaGuardar = {
        ...updates,
        sabores: updates.sabores ? JSON.stringify(updates.sabores) : null
      };

      const { error } = await supabase
        .from('productos')
        .update(updatesParaGuardar)
        .eq('id', id);

      if (error) throw error;

      setProductos(prev => prev.map(p => 
        p.id === id ? { 
          ...p, 
          ...updates,
          sabores: updates.sabores || p.sabores
        } : p
      ));
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProducto = async (id: number) => {
    try {
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProductos(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  // Beneficios CRUD
  const addBeneficio = async (beneficio: Omit<Beneficio, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('beneficios')
        .insert([beneficio])
        .select()
        .single();

      if (error) throw error;
      setBeneficios(prev => [...prev, data]);
    } catch (error) {
      console.error('Error adding benefit:', error);
      throw error;
    }
  };

  const updateBeneficio = async (id: number, updates: Partial<Beneficio>) => {
    try {
      const { error } = await supabase
        .from('beneficios')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      setBeneficios(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    } catch (error) {
      console.error('Error updating benefit:', error);
      throw error;
    }
  };

  const deleteBeneficio = async (id: number) => {
    try {
      const { error } = await supabase
        .from('beneficios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBeneficios(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting benefit:', error);
      throw error;
    }
  };

  // FAQs CRUD
  const addFaq = async (faq: Omit<FAQ, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .insert([faq])
        .select()
        .single();

      if (error) throw error;
      setFaqs(prev => [...prev, data]);
    } catch (error) {
      console.error('Error adding FAQ:', error);
      throw error;
    }
  };

  const updateFaq = async (id: number, updates: Partial<FAQ>) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    } catch (error) {
      console.error('Error updating FAQ:', error);
      throw error;
    }
  };

  const deleteFaq = async (id: number) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFaqs(prev => prev.filter(f => f.id !== id));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DataContext.Provider value={{
      productos,
      beneficios,
      faqs,
      loading,
      getProducto,
      addProducto,
      updateProducto,
      deleteProducto,
      addBeneficio,
      updateBeneficio,
      deleteBeneficio,
      addFaq,
      updateFaq,
      deleteFaq,
      refreshData: loadData
    }}>
      {children}
    </DataContext.Provider>
  );
};