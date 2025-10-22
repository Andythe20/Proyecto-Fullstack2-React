# OnlyFlans — Tienda de postres (React + TypeScript + Vite)

[![Netlify Status](https://api.netlify.com/api/v1/badges/8fc0eee7-95a9-47fa-82bc-1cba00041bac/deploy-status)](https://app.netlify.com/sites/onlyflans2/overview)
---

Proyecto frontend de una pequeña tienda de repostería llamada "OnlyFlans". Está construido con React + TypeScript y empaquetado con Vite. Incluye páginas públicas, listado de productos cargado desde un JSON local, un carrito simple persistente en localStorage y notificaciones tipo toast.

## 🌐 Demo en vivo
**Puedes ver la aplicación funcionando aquí:** [https://onlyflans2.netlify.app](https://onlyflans2.netlify.app)

Índice
-- Instalación y ejecución
-- Scripts disponibles
-- Rutas y páginas
-- Funcionalidades principales
-- Estructura del proyecto (resumen)
-- Modelo de datos (Product)
-- Librerías y dependencias
-- Contrato mínimo (inputs/outputs)
-- Casos de borde
-- Sugerencias / próximos pasos

## Instalación y ejecución

Requisitos: Node.js y npm instalados en tu máquina. (Se recomienda una versión moderna de Node >= 16).

Instalar dependencias y ejecutar en modo desarrollo:

```bash
npm install
npm run dev
```

Construir para producción:

```bash
npm run build
npm run preview
```

## Scripts disponibles

Los scripts definidos en `package.json`:

- `dev` — Inicia Vite en modo desarrollo (HMR)
- `build` — Compila TypeScript y genera la build de Vite
- `preview` — Sirve la build estática para previsualizar
- `lint` — Ejecuta ESLint sobre el proyecto

## Rutas y páginas (navegación)

Las rutas están definidas en `src/routes/AppRoutes.tsx` y montadas en `src/main.tsx`:

- `/` → `src/pages/Inicio.tsx` (Inicio)
- `/nosotros` → `src/pages/Sobre-nosotros/Nosotros.tsx` (Nosotros)
- `/productos` → `src/pages/Productos/Productos.tsx` (Listado de productos)
- `/contacto` → `src/pages/Contacto/Contacto.tsx` (Contacto)

El `Navbar` (`src/components/Navbar/Navbar.tsx`) contiene enlaces a estas rutas y el `Footer` está presente en todas las páginas desde `src/main.tsx`.

Nota: Actualmente no hay una ruta dinámica de detalle implementada en React (las tarjetas apuntan a `./detalleProducto.html?cod=...` como referencia), por lo que una mejora recomendable es implementar una ruta `/productos/:codigo` para ver detalle del producto.

## Funcionalidades principales

- Listado de productos cargado desde `public/data/db.json` (se obtiene mediante `fetch('/data/db.json')`).
- Skeletons de carga (`src/components/ProductSkeleton`) mientras se cargan los productos.
- Card de producto con imagen, precio formateado y botón "Agregar" (`src/components/CardProduct/CardProduct.tsx`).
- Carrito global implementado con Context API:
  - `src/context/CarritoContext.tsx` (contexto)
  - `src/context/CarritoProvider.tsx` (provee el estado del carrito)
  - `src/hooks/useCarrito.ts` (hook para consumir el carrito)
  - El carrito se persiste en `localStorage` bajo la clave `carrito`.
- Notificaciones tipo toast usando SweetAlert2 (`src/utils/showToastAlert.ts`) al agregar productos.
- Formateo de moneda con `Intl.NumberFormat` en `src/utils/formatCurrency.ts` (por defecto `es-CL` y `CLP`).

## Estructura del proyecto (resumen)

- `public/`
  - `data/db.json` — Productos de ejemplo (JSON)
  - `assets/` — imágenes y fuentes públicas
- `src/`
  - `main.tsx` — punto de entrada, router y providers
  - `routes/AppRoutes.tsx` — rutas de la app
  - `pages/` — páginas (`Inicio`, `Productos`, `Contacto`, `Sobre-nosotros`, `Login`)
  - `components/` — componentes reutilizables (Navbar, Footer, CardProduct, Button, ProductSkeleton, etc.)
  - `context/` — `CarritoContext`, `CarritoProvider`
  - `hooks/` — `useCarrito`
  - `types/` — definiciones TypeScript (`product.ts`)
  - `utils/` — utilidades (`formatCurrency.ts`, `showToastAlert.ts`)

## Modelo de datos (Product)

Definición en `src/types/product.ts`:

```ts
export interface Product {
  codigo: string;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  url: string;
  quantity?: number; // usado por el carrito
}
```

## Librerías y dependencias principales

Dependencias (extras relevantes listadas en `package.json`):

- `react`, `react-dom` — UI
- `react-router-dom` (v7) — enrutamiento
- `bootstrap` — estilos y utilidades CSS
- `react-icons` — iconos SVG
- `sweetalert2` — notificaciones / toasts
- `vite` — bundler / dev server
- `typescript` — tipado estático
- ESLint y plugins relacionados para linting
- `@vitejs/plugin-react-swc` (devDependency) — plugin React + SWC para Vite

## Contrato mínimo (inputs / outputs)

- Input principal: `public/data/db.json` (array de `Product`) — fuente de datos para el catálogo.
- Output principal: UI con listado de productos y estado del carrito persistido en `localStorage`.
- Errores manejados: si el `fetch` falla, la página de `Productos` muestra un mensaje de error simple.

## Contribuir

1. Haz fork del repositorio
2. Crea una rama feature: `git checkout -b feat/mi-cambio`
3. Haz commits claros y crea un PR
