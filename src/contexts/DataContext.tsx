
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
      // First try to load from localStorage
      const savedProductos = localStorage.getItem('productos');
      const savedBeneficios = localStorage.getItem('beneficios');
      const savedFaqs = localStorage.getItem('faqs');

      if (savedProductos && savedBeneficios && savedFaqs) {
        setProductos(JSON.parse(savedProductos));
        setBeneficios(JSON.parse(savedBeneficios));
        setFaqs(JSON.parse(savedFaqs));
      } else {
        // Fallback to JSON files if no localStorage data
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
        
        // Save initial data to localStorage
        localStorage.setItem('productos', JSON.stringify(productosData));
        localStorage.setItem('beneficios', JSON.stringify(beneficiosData));
        localStorage.setItem('faqs', JSON.stringify(faqsData));
      }
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
    // Persist to localStorage for demo purposes (in production you'd use an API)
    localStorage.setItem('productos', JSON.stringify(newProductos));
  };

  const updateBeneficios = (newBeneficios: Beneficio[]) => {
    setBeneficios(newBeneficios);
    localStorage.setItem('beneficios', JSON.stringify(newBeneficios));
  };

  const updateFAQs = (newFaqs: FAQ[]) => {
    setFaqs(newFaqs);
    localStorage.setItem('faqs', JSON.stringify(newFaqs));
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
