
import React, { useState } from 'react';
import { Producto } from '@/contexts/DataContext';

interface ProductCardProps {
  producto: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  const [selectedSabor, setSelectedSabor] = useState<string>('');

  const generateWhatsAppLink = (sabor?: string) => {
    const baseMessage = `Hola! Quiero comprar el vape ${producto.nombre}`;
    const saborMessage = sabor ? ` sabor ${sabor}` : '';
    const fullMessage = encodeURIComponent(baseMessage + saborMessage);
    return `https://wa.me/5493329684724?text=${fullMessage}`;
  };

  const availableFlavors = producto.sabores.filter(sabor => sabor.disponible);

  return (
    <div className="bg-milan-productBg rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
      <div className="relative mb-4">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-64 object-cover rounded-xl"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x400/4A4A4A/FFFFFF?text=' + encodeURIComponent(producto.nombre);
          }}
        />
        
        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {producto.stock > 0 ? (
            <span className="bg-milan-stockAlert text-white px-3 py-1 rounded-full text-sm font-semibold">
              🔥 ¡Quedan solo {producto.stock} en stock!
            </span>
          ) : (
            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              No queda stock
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-milan-beige mb-2">{producto.nombre}</h3>
          <p className="text-2xl font-bold text-milan-whatsapp">${producto.precio.toLocaleString()}</p>
        </div>
        
        {availableFlavors.length > 0 && (
          <div>
            <p className="text-milan-beige mb-3 font-semibold">Sabores disponibles:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {producto.sabores.map((sabor, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSabor(sabor.nombre)}
                  disabled={!sabor.disponible}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    sabor.disponible
                      ? selectedSabor === sabor.nombre
                        ? 'bg-milan-whatsapp text-milan-darkGray'
                        : 'bg-milan-beige text-milan-darkGray hover:bg-milan-whatsapp'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {sabor.nombre}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <a
          href={generateWhatsAppLink(selectedSabor)}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 ${
            producto.stock > 0
              ? 'bg-milan-whatsapp hover:bg-milan-whatsapp/90 text-milan-beige hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
          onClick={producto.stock === 0 ? (e) => e.preventDefault() : undefined}
        >
          {producto.stock > 0 ? 'Pedir por WhatsApp' : 'Sin stock disponible'}
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
