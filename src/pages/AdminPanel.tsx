import React, { useState, useEffect } from 'react';
import { useData, Producto, Beneficio, FAQ } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminPanel = () => {
  const {
    productos,
    beneficios,
    faqs,
    loading,
    addProducto,
    updateProducto,
    deleteProducto,
    addBeneficio,
    updateBeneficio,
    deleteBeneficio,
    addFaq,
    updateFaq,
    deleteFaq
  } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('productos');

  // Estados para productos
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    stock: '',
    sabores: [] as { nombre: string; disponible: boolean }[]
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Estados para sabores
  const [newSabor, setNewSabor] = useState({ nombre: '', disponible: true });

  // Estados para beneficios
  const [newBeneficio, setNewBeneficio] = useState({ icon: '', title: '', desc: '' });
  const [editingBeneficio, setEditingBeneficio] = useState<Beneficio | null>(null);
  const [isAddingBeneficio, setIsAddingBeneficio] = useState(false);

  // Estados para FAQs
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth') === 'true';
    setIsAuthenticated(auth);
  }, []);

  // Autenticación
  const handleLogin = async () => {
    try {
      // Aquí deberías implementar autenticación segura con Supabase Auth
      if (loginData.username === 'admin' && loginData.password === 'milan2025') {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      toast.error('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  // Productos
  const handleAddProduct = async () => {
    try {
      await addProducto({
        nombre: newProduct.nombre,
        precio: Number(newProduct.precio),
        imagen: newProduct.imagen || 'https://via.placeholder.com/300x400/4A4A4A/FFFFFF?text=' + encodeURIComponent(newProduct.nombre),
        stock: Number(newProduct.stock),
        sabores: newProduct.sabores
      });

      setNewProduct({ nombre: '', precio: '', imagen: '', stock: '', sabores: [] });
      setIsAddingProduct(false);
      toast.success('Producto agregado');
    } catch (error) {
      toast.error('Error al agregar producto');
    }
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;

    try {
      await updateProducto(editingProduct.id, editingProduct);
      setEditingProduct(null);
      toast.success('Producto actualizado');
    } catch (error) {
      toast.error('Error al actualizar producto');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProducto(id);
        toast.success('Producto eliminado');
      } catch (error) {
        toast.error('Error al eliminar producto');
      }
    }
  };

  // Beneficios
  const handleAddBeneficio = async () => {
    try {
      await addBeneficio(newBeneficio);
      setNewBeneficio({ icon: '', title: '', desc: '' });
      setIsAddingBeneficio(false);
      toast.success('Beneficio agregado');
    } catch (error) {
      toast.error('Error al agregar beneficio');
    }
  };

  const handleSaveBeneficio = async () => {
    if (!editingBeneficio || !editingBeneficio.id) return;

    try {
      await updateBeneficio(editingBeneficio.id, editingBeneficio);
      setEditingBeneficio(null);
      toast.success('Beneficio actualizado');
    } catch (error) {
      toast.error('Error al actualizar beneficio');
    }
  };

  const handleDeleteBeneficio = async (id: number) => {
    if (confirm('¿Eliminar este beneficio?')) {
      try {
        await deleteBeneficio(id);
        toast.success('Beneficio eliminado');
      } catch (error) {
        toast.error('Error al eliminar beneficio');
      }
    }
  };

  // FAQs
  const handleAddFaq = async () => {
    try {
      await addFaq(newFaq);
      setNewFaq({ question: '', answer: '' });
      setIsAddingFaq(false);
      toast.success('FAQ agregada');
    } catch (error) {
      toast.error('Error al agregar FAQ');
    }
  };

  const handleSaveFaq = async () => {
    if (!editingFaq || !editingFaq.id) return;

    try {
      await updateFaq(editingFaq.id, editingFaq);
      setEditingFaq(null);
      toast.success('FAQ actualizada');
    } catch (error) {
      toast.error('Error al actualizar FAQ');
    }
  };

  const handleDeleteFaq = async (id: number) => {
    if (confirm('¿Eliminar esta FAQ?')) {
      try {
        await deleteFaq(id);
        toast.success('FAQ eliminada');
      } catch (error) {
        toast.error('Error al eliminar FAQ');
      }
    }
  };

  // Funciones para manejar sabores
  const handleAddSaborToNew = () => {
    if (newSabor.nombre.trim()) {
      setNewProduct(prev => ({
        ...prev,
        sabores: [...(prev.sabores || []), { ...newSabor }]
      }));
      setNewSabor({ nombre: '', disponible: true });
    }
  };

  const handleRemoveSaborFromNew = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      sabores: prev.sabores.filter((_, i) => i !== index)
    }));
  };

  const handleAddSaborToEdit = () => {
    if (!editingProduct || !newSabor.nombre.trim()) return;

    setEditingProduct({
      ...editingProduct,
      sabores: [...(editingProduct.sabores || []), { ...newSabor }]
    });
    setNewSabor({ nombre: '', disponible: true });
  };

  const handleRemoveSaborFromEdit = (index: number) => {
    if (!editingProduct) return;

    setEditingProduct({
      ...editingProduct,
      sabores: editingProduct.sabores.filter((_, i) => i !== index)
    });
  };

  const handleToggleSaborDisponibilidad = (index: number, isEditing = false) => {
    if (isEditing && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        sabores: editingProduct.sabores.map((sabor, i) =>
          i === index ? { ...sabor, disponible: !sabor.disponible } : sabor
        )
      });
    } else {
      setNewProduct({
        ...newProduct,
        sabores: newProduct.sabores.map((sabor, i) =>
          i === index ? { ...sabor, disponible: !sabor.disponible } : sabor
        )
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-milan-darkGray">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Acceso Administrativo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              value={loginData.username}
              onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginData.password}
              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full p-2 border rounded"
            />
            <Button onClick={handleLogin} className="w-full">
              Iniciar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-milan-darkGray">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-milan-darkGray text-milan-cream p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <div className="flex gap-2">
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Ver la Web
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <Button
            onClick={() => setActiveTab('productos')}
            variant={activeTab === 'productos' ? 'default' : 'outline'}
          >
            Productos
          </Button>
          <Button
            onClick={() => setActiveTab('beneficios')}
            variant={activeTab === 'beneficios' ? 'default' : 'outline'}
          >
            Beneficios
          </Button>
          <Button
            onClick={() => setActiveTab('faqs')}
            variant={activeTab === 'faqs' ? 'default' : 'outline'}
          >
            FAQs
          </Button>
        </div>

        {/* Sección de Productos */}
        {activeTab === 'productos' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Productos</h2>
              <Button onClick={() => setIsAddingProduct(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Producto
              </Button>
            </div>

            {/* Formulario para agregar producto */}
            {isAddingProduct && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Nuevo Producto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={newProduct.nombre}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, nombre: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Precio"
                    value={newProduct.precio}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, precio: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="url"
                    placeholder="URL de la imagen"
                    value={newProduct.imagen}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, imagen: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                    className="w-full p-2 border rounded"
                  />

                  {/* Sección de sabores */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Sabores</h4>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="Nombre del sabor"
                        value={newSabor.nombre}
                        onChange={(e) => setNewSabor(prev => ({ ...prev, nombre: e.target.value }))}
                        className="flex-1 p-2 border rounded"
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newSabor.disponible}
                          onChange={(e) => setNewSabor(prev => ({ ...prev, disponible: e.target.checked }))}
                        />
                        Disponible
                      </label>
                      <Button onClick={handleAddSaborToNew} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {newProduct.sabores.map((sabor, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge
                            variant={sabor.disponible ? "default" : "secondary"}
                            className="cursor-pointer"
                            onClick={() => handleToggleSaborDisponibilidad(index)}
                          >
                            {sabor.nombre}
                          </Badge>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRemoveSaborFromNew(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct}>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lista de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map((producto) => (
                <Card key={producto.id}>
                  <CardContent className="p-4">
                    {editingProduct?.id === producto.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingProduct.nombre}
                          onChange={(e) => setEditingProduct({ ...editingProduct, nombre: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="number"
                          value={editingProduct.precio}
                          onChange={(e) => setEditingProduct({ ...editingProduct, precio: Number(e.target.value) })}
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="url"
                          value={editingProduct.imagen}
                          onChange={(e) => setEditingProduct({ ...editingProduct, imagen: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="number"
                          value={editingProduct.stock}
                          onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                          className="w-full p-2 border rounded"
                        />

                        {/* Sección de sabores para edición */}
                        <div className="border-t pt-3">
                          <h4 className="font-semibold mb-2">Sabores</h4>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              placeholder="Nuevo sabor"
                              value={newSabor.nombre}
                              onChange={(e) => setNewSabor({ ...newSabor, nombre: e.target.value })}
                              className="flex-1 p-1 border rounded text-sm"
                            />
                            <label className="flex items-center gap-1 text-sm">
                              <input
                                type="checkbox"
                                checked={newSabor.disponible}
                                onChange={(e) => setNewSabor({ ...newSabor, disponible: e.target.checked })}
                              />
                              Disp.
                            </label>
                            <Button onClick={handleAddSaborToEdit} size="sm">
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {editingProduct.sabores.map((sabor, index) => (
                              <div key={index} className="flex items-center gap-1">
                                <Badge
                                  variant={sabor.disponible ? "default" : "secondary"}
                                  className="text-xs cursor-pointer"
                                  onClick={() => handleToggleSaborDisponibilidad(index, true)}
                                >
                                  {sabor.nombre}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRemoveSaborFromEdit(index)}
                                  className="h-5 w-5 p-0"
                                >
                                  <X className="w-2 h-2" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={handleSaveProduct} size="sm">
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" onClick={() => setEditingProduct(null)} size="sm">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-full h-32 object-cover rounded mb-3"
                        /*   onError={(e) => {
                            e.currentTarget.src = producto.imagen;
                          }} */
                        />
                        <h3 className="font-semibold">{producto.nombre}</h3>
                        <p className="text-lg font-bold text-green-600">${producto.precio.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Stock: {producto.stock}</p>

                        {producto.sabores?.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Sabores:</p>
                            <div className="flex flex-wrap gap-1">
                              {producto.sabores.map((sabor, index) => (
                                <div key={index} className="flex items-center gap-1">
                                  <Badge
                                    variant={sabor.disponible ? "default" : "secondary"}
                                    className="text-xs cursor-pointer"
                                    onClick={() => handleToggleSaborDisponibilidad(index, true)}
                                  >
                                    {sabor.nombre}
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => true
                                      ? handleRemoveSaborFromEdit(index)
                                      : handleRemoveSaborFromNew(index)}
                                    className="h-5 w-5 p-0"
                                  >
                                    <X className="w-2 h-2" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 mt-4">
                          <Button onClick={() => setEditingProduct(producto)} size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => handleDeleteProduct(producto.id)} variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Sección de Beneficios */}
        {activeTab === 'beneficios' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Beneficios</h2>
              <Button onClick={() => setIsAddingBeneficio(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Beneficio
              </Button>
            </div>

            {/* Formulario para agregar beneficio */}
            {isAddingBeneficio && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Nuevo Beneficio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input
                    type="text"
                    placeholder="Icono (emoji)"
                    value={newBeneficio.icon}
                    onChange={(e) => setNewBeneficio({ ...newBeneficio, icon: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Título"
                    value={newBeneficio.title}
                    onChange={(e) => setNewBeneficio({ ...newBeneficio, title: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    placeholder="Descripción"
                    value={newBeneficio.desc}
                    onChange={(e) => setNewBeneficio({ ...newBeneficio, desc: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddBeneficio}>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingBeneficio(false)}>
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lista de beneficios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficios.map((beneficio) => (
                <Card key={beneficio.id}>
                  <CardContent className="p-4">
                    {editingBeneficio?.id === beneficio.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingBeneficio.icon}
                          onChange={(e) => setEditingBeneficio({ ...editingBeneficio, icon: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="text"
                          value={editingBeneficio.title}
                          onChange={(e) => setEditingBeneficio({ ...editingBeneficio, title: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                        <textarea
                          value={editingBeneficio.desc}
                          onChange={(e) => setEditingBeneficio({ ...editingBeneficio, desc: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleSaveBeneficio}>
                            <Save className="w-4 h-4 mr-2" />
                            Guardar
                          </Button>
                          <Button variant="outline" onClick={() => setEditingBeneficio(null)}>
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl mb-2">{beneficio.icon}</div>
                        <h3 className="font-semibold">{beneficio.title}</h3>
                        <p className="text-sm text-gray-600">{beneficio.desc}</p>
                        <div className="flex gap-2 mt-4">
                          <Button onClick={() => setEditingBeneficio(beneficio)} size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => handleDeleteBeneficio(beneficio.id!)} variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Sección de FAQs */}
        {activeTab === 'faqs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">FAQs</h2>
              <Button onClick={() => setIsAddingFaq(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar FAQ
              </Button>
            </div>

            {/* Formulario para agregar FAQ */}
            {isAddingFaq && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Nueva FAQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input
                    type="text"
                    placeholder="Pregunta"
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    placeholder="Respuesta"
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddFaq}>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingFaq(false)}>
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lista de FAQs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqs.map((faq) => (
                <Card key={faq.id}>
                  <CardContent className="p-4">
                    {editingFaq?.id === faq.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingFaq.question}
                          onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                        <textarea
                          value={editingFaq.answer}
                          onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleSaveFaq}>
                            <Save className="w-4 h-4 mr-2" />
                            Guardar
                          </Button>
                          <Button variant="outline" onClick={() => setEditingFaq(null)}>
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-semibold">{faq.question}</h3>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                        <div className="flex gap-2 mt-4">
                          <Button onClick={() => setEditingFaq(faq)} size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => handleDeleteFaq(faq.id!)} variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;