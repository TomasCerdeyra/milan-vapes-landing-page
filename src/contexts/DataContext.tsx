
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  sabores: { nombre: string; disponible: boolean }[];
}

export interface Beneficio {
  icon: string;
  title: string;
  desc: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

interface DataContextType {
  productos: Producto[];
  beneficios: Beneficio[];
  faqs: FAQ[];
  updateProductos: (productos: Producto[]) => void;
  updateBeneficios: (beneficios: Beneficio[]) => void;
  updateFAQs: (faqs: FAQ[]) => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [beneficios, setBeneficios] = useState<Beneficio[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [productosRes, beneficiosRes, faqsRes] = await Promise.all([
        fetch('/data/productos.json'),
        fetch('/data/beneficios.json'),
        fetch('/data/faqs.json')
      ]);

      const productosData = await productosRes.json();
      const beneficiosData = await beneficiosRes.json();
      const faqsData = await faqsRes.json();

      setProductos(productosData);
      setBeneficios(beneficiosData);
      setFaqs(faqsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateProductos = (newProductos: Producto[]) => {
    setProductos(newProductos);
  };

  const updateBeneficios = (newBeneficios: Beneficio[]) => {
    setBeneficios(newBeneficios);
  };

  const updateFAQs = (newFaqs: FAQ[]) => {
    setFaqs(newFaqs);
  };

  return (
    <DataContext.Provider value={{
      productos,
      beneficios,
      faqs,
      updateProductos,
      updateBeneficios,
      updateFAQs,
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
};
