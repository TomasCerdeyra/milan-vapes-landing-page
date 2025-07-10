# Milan Vapes - Landing Page

## 📄 Descripción del Proyecto

Landing page responsive y dinámica para Milan Vapes, diseñada para mostrar productos (vapes) y convertir visitas en ventas mediante redirección a WhatsApp. Incluye un panel de administración completo para gestionar contenido de forma dinámica.

**URL del Proyecto**: https://lovable.dev/projects/ffe67b8d-3ff5-4670-99b2-d45cdd4f9dcf

## 🛠️ Tecnologías Utilizadas

- **React.js** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y servidor de desarrollo
- **TailwindCSS** - Framework de estilos
- **shadcn/ui** - Biblioteca de componentes UI
- **React Router** - Navegación entre páginas
- **Lucide React** - Iconos

## 🏗️ Arquitectura del Proyecto

### 📁 Estructura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de shadcn/ui
│   ├── Hero.tsx        # Sección principal/hero
│   ├── ProductCard.tsx # Card individual de producto
│   ├── ProductCatalog.tsx # Catálogo de productos
│   ├── Benefits.tsx    # Sección de beneficios
│   ├── FAQ.tsx         # Preguntas frecuentes
│   ├── Footer.tsx      # Pie de página
│   ├── FloatingWhatsApp.tsx # Botón flotante de WhatsApp
│   └── BackToTop.tsx   # Botón volver arriba
├── pages/              # Páginas principales
│   ├── Index.tsx       # Página principal (homepage)
│   ├── HomePage.tsx    # Componente homepage
│   ├── AdminPanel.tsx  # Panel de administración
│   └── NotFound.tsx    # Página 404
├── contexts/           # Contextos de React
│   └── DataContext.tsx # Manejo de estado global de datos
├── hooks/              # Hooks personalizados
├── lib/               # Utilidades
└── assets/            # Recursos estáticos

public/
└── data/              # Archivos JSON de datos
    ├── productos.json  # Datos de productos
    ├── beneficios.json # Datos de beneficios
    ├── faqs.json      # Preguntas frecuentes
    └── admin.json     # Credenciales de administrador
```

## 📋 Componentes Principales

### 🏠 Hero (`src/components/Hero.tsx`)
**Propósito**: Sección principal de bienvenida con título llamativo y CTA.

**Características**:
- Título estilizado "Milan Vapes" con fuentes personalizadas
- Fondo con imagen de patrón
- Botón CTA que lleva al catálogo de productos
- Animaciones suaves al cargar

### 🛍️ ProductCard (`src/components/ProductCard.tsx`)
**Propósito**: Card individual para mostrar cada producto.

**Props**:
```typescript
interface ProductCardProps {
  producto: Producto;
}
```

**Características**:
- Imagen del producto responsive
- Nombre y precio del producto
- Botón "Pedir por WhatsApp" 
- Indicador de stock disponible
- Botones de sabores disponibles
- Manejo de estados (stock agotado, sabores no disponibles)
- Generación automática de enlace de WhatsApp

### 📦 ProductCatalog (`src/components/ProductCatalog.tsx`)
**Propósito**: Contenedor que renderiza todos los productos en un grid responsive.

**Características**:
- Grid responsive (1 columna móvil, 2 tablet, 3 desktop)
- Animaciones escalonadas al hacer scroll
- Carga productos desde el contexto global

### ✨ Benefits (`src/components/Benefits.tsx`)
**Propósito**: Muestra los beneficios de comprar en Milan Vapes.

**Características**:
- Cards con iconos, títulos y descripciones
- Datos cargados dinámicamente desde JSON
- Grid responsive con animaciones

### ❓ FAQ (`src/components/FAQ.tsx`)
**Propósito**: Sección de preguntas frecuentes con acordeón.

**Características**:
- Acordeón expandible/colapsable
- Datos cargados desde JSON
- Diseño responsive y accesible

### 👑 AdminPanel (`src/pages/AdminPanel.tsx`)
**Propósito**: Panel de administración para gestionar contenido.

**Características**:
- Login con usuario/contraseña
- CRUD completo de productos (crear, leer, actualizar, eliminar)
- CRUD de beneficios y FAQs
- Persistencia de datos en localStorage
- Interfaz intuitiva con pestañas

### 🌐 DataContext (`src/contexts/DataContext.tsx`)
**Propósito**: Manejo de estado global de la aplicación.

**Datos Gestionados**:
- `productos`: Array de productos
- `beneficios`: Array de beneficios  
- `faqs`: Array de preguntas frecuentes
- `loading`: Estado de carga

**Funciones**:
- Carga inicial de datos desde JSON
- Persistencia de cambios en localStorage
- Funciones para añadir/eliminar elementos

## 📊 Estructura de Datos

### Producto
```typescript
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  sabores: Array<{
    nombre: string;
    disponible: boolean;
  }>;
}
```

### Beneficio
```typescript
interface Beneficio {
  icon: string;    // Emoji
  title: string;
  desc: string;
}
```

### FAQ
```typescript
interface FAQ {
  question: string;
  answer: string;
}
```

## 🎨 Sistema de Diseño

### Paleta de Colores (Tokens CSS)
```css
:root {
  /* Colores principales */
  --milan-cream: #EAE7DC;        /* Títulos principales */
  --milan-beige: #F5F5DC;        /* Texto en cards/botones */
  --milan-whatsapp: #25D366;     /* Color WhatsApp/acentos */
  --milan-darkGray: #181A1B;     /* Textos oscuros */
  --milan-productBg: #4A4A4A;    /* Fondo cards productos */
  --milan-stockAlert: #D95F45;   /* Alerta stock bajo */
  
  /* Gradientes */
  --gradient-hero: linear-gradient(135deg, rgba(42,42,42,0.95), rgba(24,26,27,0.85));
  
  /* Patrones */
  --mushroom-pattern: /* Imagen de fondo */
}
```

### Fuentes Personalizadas
- **Tan Nimbus**: Para título "Milan"
- **Perandory Condensed**: Para subtítulo "Vapes"

### Responsividad
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Funcionalidades Principales

### 1. Catálogo Dinámico
- Productos cargados desde JSON
- Filtrado por stock disponible
- Selección de sabores
- Enlaces directos a WhatsApp

### 2. Panel de Administración
- **Acceso**: Usuario y contraseña desde `admin.json`
- **Productos**: Añadir, editar, eliminar productos y sabores
- **Beneficios**: Gestionar cards de beneficios
- **FAQs**: Administrar preguntas frecuentes
- **Persistencia**: Cambios guardados en localStorage

### 3. Integración WhatsApp
- Enlace automático: `https://wa.me/5493329684724`
- Mensaje personalizado con producto y sabor seleccionado
- Botón flotante siempre visible

### 4. Experiencia de Usuario
- **Animaciones**: Scroll animations con Intersection Observer
- **Responsive**: Adaptable a todos los dispositivos
- **Navegación**: Botón "Volver arriba" y scroll suave
- **Loading**: Estados de carga apropiados

## 🔧 Cómo Editar el Proyecto

### Modificar Productos
1. **Vía Admin Panel**: Ir a `/admin`, login y usar la interfaz
2. **Vía JSON**: Editar `public/data/productos.json` directamente

### Agregar Nuevos Beneficios
1. Editar `public/data/beneficios.json`
2. Seguir la estructura: `{ "icon": "🚚", "title": "Título", "desc": "Descripción" }`

### Personalizar Colores
1. Editar variables CSS en `src/index.css`
2. Actualizar configuración en `tailwind.config.ts`

### Modificar WhatsApp
- Cambiar número en `ProductCard.tsx` línea 15:
```typescript
return `https://wa.me/TU_NUMERO?text=${fullMessage}`;
```

### Agregar Nuevas Secciones
1. Crear componente en `src/components/`
2. Importar y usar en `src/pages/HomePage.tsx`
3. Agregar navegación si es necesario

## 🏃‍♂️ Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview

# Lint del código
npm run lint
```

## 📱 Deployment

### Vía Lovable
1. Abrir [Lovable Project](https://lovable.dev/projects/ffe67b8d-3ff5-4670-99b2-d45cdd4f9dcf)
2. Click en Share → Publish

### Vía GitHub
1. Push cambios al repositorio
2. Usar cualquier servicio de hosting estático (Vercel, Netlify, etc.)

## 🔒 Seguridad

- **Admin Panel**: Credenciales básicas (no para producción)
- **Datos**: Almacenados en localStorage (cliente)
- **API Keys**: No se requieren APIs externas

## 🐛 Solución de Problemas

### Productos no se muestran
- Verificar que `public/data/productos.json` esté bien formateado
- Revisar la consola del navegador por errores

### Imágenes no cargan
- Verificar URLs de imágenes en el JSON
- Asegurar que las imágenes sean accesibles

### Animaciones no funcionan
- Verificar que JavaScript esté habilitado
- Comprobar que el CSS de animaciones esté cargando

## 📞 Contacto y Soporte

Para soporte o consultas sobre el proyecto:
- **WhatsApp**: [5493329684724](https://wa.me/5493329684724)
- **Proyecto Lovable**: https://lovable.dev/projects/ffe67b8d-3ff5-4670-99b2-d45cdd4f9dcf

---
*© 2025 Milan Vapes - Todos los derechos reservados.*