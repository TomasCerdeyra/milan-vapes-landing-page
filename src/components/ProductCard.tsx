import React, { useState } from 'react';
import { Producto } from '@/contexts/DataContext';

interface ProductCardProps {
  producto: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  const [selectedSabor, setSelectedSabor] = useState<string>('');

  const generateWhatsAppLink = (productName: string, sabor?: string) => {
    const baseMessage = `Hola! Quiero comprar el vape ${productName}`;
    const saborMessage = sabor ? ` sabor ${sabor}` : '';
    const fullMessage = encodeURIComponent(baseMessage + saborMessage);
    return `https://wa.me/5493329684724?text=${fullMessage}`;
  };

  const handleSaborClick = (saborNombre: string) => {
    if (producto.stock > 0) {
      setSelectedSabor(saborNombre);
      // Abrir WhatsApp directamente con el producto y sabor seleccionado
      window.open(generateWhatsAppLink(producto.nombre, saborNombre), '_blank');
    }
  };

  return (
    <div className="bg-milan-productBg rounded-2xl hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl h-full flex flex-col overflow-hidden">
      <div className="relative flex items-center justify-center bg-white h-70  lg:h-80">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="max-h-full max-w-full object-contain p-4"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x400/4A4A4A/FFFFFF?text=' + encodeURIComponent(producto.nombre);
          }}
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-milan-beige mb-2">{producto.nombre}</h3>
          <p className="text-2xl font-bold text-milan-whatsapp mb-4">${producto.precio.toLocaleString()}</p>

          {/* Botón de WhatsApp genérico (sin sabor seleccionado) */}
          <div className="mb-4">
            <a
              href={generateWhatsAppLink(producto.nombre, selectedSabor)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${producto.stock > 0
                  ? 'bg-milan-whatsapp hover:bg-milan-whatsapp/90 text-milan-beige hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              onClick={producto.stock === 0 ? (e) => e.preventDefault() : undefined}
            >
              {producto.stock > 0 ? '📩 Pedir por WhatsApp' : '📩 Pedir por WhatsApp'}
            </a>
          </div>

          {/* Stock Badge */}
          <div className="mb-0">
            {producto.stock > 0 && producto.stock <= 3 && (
              <span className="bg-milan-stockAlert text-white px-3 py-1 rounded-full text-sm font-semibold">
                🔥 ¡Quedan solo {producto.stock} en stock!
              </span>
            )}
            {producto.stock === 0 && (
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                No queda stock
              </span>
            )}
            {producto.stock > 3 && (
              <span className="bg-milan-stockAlert text-white px-3 py-1 rounded-full text-sm font-semibold">
                🔥 ¡Tenemos stock!
              </span>
            )}
          </div>
        </div>

        <div className="">
          {producto.sabores && producto.sabores.length > 0 && (
            <div>
              <p className="text-milan-beige mb-3 font-semibold">Sabores disponibles:</p>
              <div className="flex flex-wrap gap-2 mb-2 min-h-[5rem]">
                {producto.sabores.map((sabor, index) => (
                  <button
                    key={index}
                    onClick={() => handleSaborClick(sabor.nombre)}
                    disabled={producto.stock === 0 || !sabor.disponible}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 h-10 flex items-center justify-center ${producto.stock > 0 && sabor.disponible
                        ? selectedSabor === sabor.nombre
                          ? 'bg-milan-whatsapp text-milan-darkGray'
                          : 'bg-milan-beige text-milan-darkGray hover:bg-milan-whatsapp'
                        : 'bg-milan-beige/40 text-milan-darkGray/50 line-through cursor-not-allowed'
                      }`}
                  >
                    {sabor.nombre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;