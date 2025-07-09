
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Plus, Edit, Trash2, Save, X, Eye, LogOut } from 'lucide-react';
import { useData, Producto, Beneficio, FAQ } from '@/contexts/DataContext';
import { toast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'productos' | 'beneficios' | 'faqs'>('productos');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  
  const { productos, beneficios, faqs, updateProductos, updateBeneficios, updateFAQs } = useData();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('/data/admin.json');
      const adminData = await response.json();
      
      if (username === adminData.username && password === adminData.password) {
        setIsAuthenticated(true);
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        });
      } else {
        toast({
          title: "Error",
          description: "Usuario o contraseña incorrectos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo verificar las credenciales.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleSaveProducto = (producto: Producto) => {
    if (editingItem?.id) {
      // Editar producto existente
      const updatedProductos = productos.map(p => 
        p.id === editingItem.id ? { ...producto, id: editingItem.id } : p
      );
      updateProductos(updatedProductos);
      toast({
        title: "Producto actualizado",
        description: "El producto se ha actualizado correctamente.",
      });
    } else {
      // Agregar nuevo producto
      const newId = Math.max(...productos.map(p => p.id), 0) + 1;
      const newProducto = { ...producto, id: newId };
      updateProductos([...productos, newProducto]);
      toast({
        title: "Producto agregado",
        description: "El producto se ha agregado correctamente.",
      });
    }
    setEditingItem(null);
    setShowForm(false);
  };

  const handleDeleteProducto = (id: number) => {
    const updatedProductos = productos.filter(p => p.id !== id);
    updateProductos(updatedProductos);
    toast({
      title: "Producto eliminado",
      description: "El producto se ha eliminado correctamente.",
    });
  };

  const handleSaveBeneficio = (beneficio: Beneficio, index?: number) => {
    if (typeof index === 'number') {
      // Editar beneficio existente
      const updatedBeneficios = beneficios.map((b, i) => 
        i === index ? beneficio : b
      );
      updateBeneficios(updatedBeneficios);
      toast({
        title: "Beneficio actualizado",
        description: "El beneficio se ha actualizado correctamente.",
      });
    } else {
      // Agregar nuevo beneficio
      updateBeneficios([...beneficios, beneficio]);
      toast({
        title: "Beneficio agregado",
        description: "El beneficio se ha agregado correctamente.",
      });
    }
    setEditingItem(null);
    setShowForm(false);
  };

  const handleDeleteBeneficio = (index: number) => {
    const updatedBeneficios = beneficios.filter((_, i) => i !== index);
    updateBeneficios(updatedBeneficios);
    toast({
      title: "Beneficio eliminado",
      description: "El beneficio se ha eliminado correctamente.",
    });
  };

  const handleSaveFAQ = (faq: FAQ, index?: number) => {
    if (typeof index === 'number') {
      // Editar FAQ existente
      const updatedFAQs = faqs.map((f, i) => 
        i === index ? faq : f
      );
      updateFAQs(updatedFAQs);
      toast({
        title: "Pregunta actualizada",
        description: "La pregunta se ha actualizado correctamente.",
      });
    } else {
      // Agregar nueva FAQ
      updateFAQs([...faqs, faq]);
      toast({
        title: "Pregunta agregada",
        description: "La pregunta se ha agregado correctamente.",
      });
    }
    setEditingItem(null);
    setShowForm(false);
  };

  const handleDeleteFAQ = (index: number) => {
    const updatedFAQs = faqs.filter((_, i) => i !== index);
    updateFAQs(updatedFAQs);
    toast({
      title: "Pregunta eliminada",
      description: "La pregunta se ha eliminado correctamente.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center mushroom-pattern">
        <div className="hero-gradient absolute inset-0"></div>
        <div className="relative z-10 bg-milan-cardBg backdrop-blur-sm rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-milan-whatsapp mx-auto mb-4" />
            <h1 className="text-2xl font-tan-nimbus text-milan-cream">Panel de Administración</h1>
            <p className="text-milan-beige/70">Milan Vapes</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-milan-productBg text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 rounded-lg bg-milan-productBg text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-milan-whatsapp hover:bg-milan-whatsapp/90 text-milan-beige py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Iniciar Sesión
            </button>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="mt-6 w-full flex items-center justify-center gap-2 text-milan-beige/70 hover:text-milan-beige transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
            Ver sitio web
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-milan-darkGray">
      {/* Header */}
      <div className="bg-milan-productBg border-b border-gray-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-tan-nimbus text-milan-cream">Panel de Administración - Milan Vapes</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-milan-whatsapp hover:bg-milan-whatsapp/90 text-milan-beige rounded-lg transition-colors duration-200"
            >
              <Eye className="w-4 h-4" />
              Ver sitio
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-600">
        <div className="flex">
          {(['productos', 'beneficios', 'faqs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowForm(false);
                setEditingItem(null);
              }}
              className={`px-6 py-3 font-medium capitalize transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-milan-whatsapp text-milan-beige border-b-2 border-milan-whatsapp'
                  : 'text-milan-beige/70 hover:text-milan-beige hover:bg-milan-productBg/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Content based on active tab */}
        {activeTab === 'productos' && (
          <ProductosAdmin
            productos={productos}
            onSave={handleSaveProducto}
            onDelete={handleDeleteProducto}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
        
        {activeTab === 'beneficios' && (
          <BeneficiosAdmin
            beneficios={beneficios}
            onSave={handleSaveBeneficio}
            onDelete={handleDeleteBeneficio}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
        
        {activeTab === 'faqs' && (
          <FAQAdmin
            faqs={faqs}
            onSave={handleSaveFAQ}
            onDelete={handleDeleteFAQ}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  );
};

// Componente para administrar productos
const ProductosAdmin: React.FC<{
  productos: Producto[];
  onSave: (producto: Producto) => void;
  onDelete: (id: number) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}> = ({ productos, onSave, onDelete, editingItem, setEditingItem, showForm, setShowForm }) => {
  const [formData, setFormData] = useState<Producto>({
    id: 0,
    nombre: '',
    precio: 0,
    imagen: '',
    stock: 0,
    sabores: []
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        id: 0,
        nombre: '',
        precio: 0,
        imagen: '',
        stock: 0,
        sabores: []
      });
    }
  }, [editingItem]);

  const handleAddSabor = () => {
    setFormData({
      ...formData,
      sabores: [...formData.sabores, { nombre: '', disponible: true }]
    });
  };

  const handleRemoveSabor = (index: number) => {
    const newSabores = formData.sabores.filter((_, i) => i !== index);
    setFormData({ ...formData, sabores: newSabores });
  };

  const handleSaborChange = (index: number, field: 'nombre' | 'disponible', value: string | boolean) => {
    const newSabores = formData.sabores.map((sabor, i) =>
      i === index ? { ...sabor, [field]: value } : sabor
    );
    setFormData({ ...formData, sabores: newSabores });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-milan-cream">Gestión de Productos</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-milan-whatsapp hover:bg-milan-whatsapp/90 text-milan-beige rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Agregar Producto
        </button>
      </div>

      {showForm && (
        <div className="bg-milan-productBg rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-milan-cream">
              {editingItem ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre del producto"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="px-4 py-2 rounded-lg bg-milan-darkGray text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none"
            />
            <input
              type="number"
              placeholder="Precio"
              value={formData.precio || ''}
              onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
              className="px-4 py-2 rounded-lg bg-milan-darkGray text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none"
            />
            <input
              type="text"
              placeholder="URL de la imagen"
              value={formData.imagen}
              onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              className="px-4 py-2 rounded-lg bg-milan-darkGray text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none"
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock || ''}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              className="px-4 py-2 rounded-lg bg-milan-darkGray text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-milan-beige font-medium">Sabores</label>
              <button
                onClick={handleAddSabor}
                className="text-milan-whatsapp hover:text-milan-whatsapp/80"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {formData.sabores.map((sabor, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Nombre del sabor"
                    value={sabor.nombre}
                    onChange={(e) => handleSaborChange(index, 'nombre', e.target.value)}
                    className="flex-1 px-3 py-2 rounded bg-milan-darkGray text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none"
                  />
                  <label className="flex items-center gap-2 text-milan-beige">
                    <input
                      type="checkbox"
                      checked={sabor.disponible}
                      onChange={(e) => handleSaborChange(index, 'disponible', e.target.checked)}
                      className="rounded"
                    />
                    Disponible
                  </label>
                  <button
                    onClick={() => handleRemoveSabor(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="bg-milan-productBg rounded-lg p-4">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-32 object-cover rounded mb-3"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300x200/4A4A4A/FFFFFF?text=' + encodeURIComponent(producto.nombre);
              }}
            />
            <h3 className="text-milan-beige font-semibold mb-1">{producto.nombre}</h3>
            <p className="text-milan-whatsapp font-bold mb-1">${producto.precio.toLocaleString()}</p>
            <p className="text-gray-300 text-sm mb-2">Stock: {producto.stock}</p>
            <p className="text-gray-300 text-sm mb-3">
              Sabores: {producto.sabores.filter(s => s.disponible).length} disponibles
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingItem(producto);
                  setShowForm(true);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors duration-200"
              >
                <Edit className="w-3 h-3" />
                Editar
              </button>
              <button
                onClick={() => onDelete(producto.id)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors duration-200"
              >
                <Trash2 className="w-3 h-3" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para administrar beneficios
const BeneficiosAdmin: React.FC<{
  beneficios: Beneficio[];
  onSave: (beneficio: Beneficio, index?: number) => void;
  onDelete: (index: number) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}> = ({ beneficios, onSave, onDelete, editingItem, setEditingItem, showForm, setShowForm }) => {
  const [formData, setFormData] = useState<Beneficio>({
    icon: '',
    title: '',
    desc: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem.data);
    } else {
      setFormData({
        icon: '',
        title: '',
        desc: ''
      });
    }
  }, [editingItem]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-milan-cream">Gestión de Beneficios</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-milan-whatsapp hover:bg-milan-whatsapp/90 text-milan-beige rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Agregar Beneficio
        </button>
      </div>

      {showForm && (
        <div className="bg-milan-productBg rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-milan-cream">
              {editingItem ? 'Editar Beneficio' : 'Nuevo Beneficio'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Emoji (ej: 🚚)"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-milan-darkGray text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none"
            />
            <input
              type="text"
              placeholder="Título del beneficio"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-milan-darkGray text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none"
            />
            <textarea
              placeholder="Descripción del beneficio"
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-milan-darkGray text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none resize-none"
            />
          </div>

          <button
            onClick={() => onSave(formData, editingItem?.index)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beneficios.map((beneficio, index) => (
          <div key={index} className="bg-milan-productBg rounded-lg p-4">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">{beneficio.icon}</div>
              <h3 className="text-milan-beige font-semibold mb-1">{beneficio.title}</h3>
              <p className="text-gray-300 text-sm">{beneficio.desc}</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingItem({ data: beneficio, index });
                  setShowForm(true);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors duration-200"
              >
                <Edit className="w-3 h-3" />
                Editar
              </button>
              <button
                onClick={() => onDelete(index)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors duration-200"
              >
                <Trash2 className="w-3 h-3" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para administrar FAQs
const FAQAdmin: React.FC<{
  faqs: FAQ[];
  onSave: (faq: FAQ, index?: number) => void;
  onDelete: (index: number) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}> = ({ faqs, onSave, onDelete, editingItem, setEditingItem, showForm, setShowForm }) => {
  const [formData, setFormData] = useState<FAQ>({
    question: '',
    answer: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem.data);
    } else {
      setFormData({
        question: '',
        answer: ''
      });
    }
  }, [editingItem]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-milan-cream">Gestión de Preguntas Frecuentes</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-milan-whatsapp hover:bg-milan-whatsapp/90 text-milan-beige rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Agregar Pregunta
        </button>
      </div>

      {showForm && (
        <div className="bg-milan-productBg rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-milan-cream">
              {editingItem ? 'Editar Pregunta' : 'Nueva Pregunta'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Pregunta"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-milan-darkGray text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none"
            />
            <textarea
              placeholder="Respuesta"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-milan-darkGray text-milan-beige border border-gray-600 focus:border-milan-whatsapp focus:outline-none resize-none"
            />
          </div>

          <button
            onClick={() => onSave(formData, editingItem?.index)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </div>
      )}

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-milan-productBg rounded-lg p-4">
            <div className="mb-3">
              <h3 className="text-milan-beige font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-300 text-sm">{faq.answer}</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingItem({ data: faq, index });
                  setShowForm(true);
                }}
                className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors duration-200"
              >
                <Edit className="w-3 h-3" />
                Editar
              </button>
              <button
                onClick={() => onDelete(index)}
                className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors duration-200"
              >
                <Trash2 className="w-3 h-3" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
