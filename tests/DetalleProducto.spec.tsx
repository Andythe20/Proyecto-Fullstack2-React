// DetalleProducto.spec.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetalleProducto from '../src/pages/DetalleProducto/DetalleProducto';
import '@testing-library/jest-dom';

// Mocks
vi.mock('../src/hooks/useProductos', () => ({
  default: vi.fn()
}));

vi.mock('../src/hooks/useCarrito', () => ({
  useCarrito: vi.fn()
}));

import useProductos from '../src/hooks/useProductos';
import { useCarrito } from '../src/hooks/useCarrito';

const mockUseProductos = useProductos as any;
const mockUseCarrito = useCarrito as any;

// Mock para useSearchParams
const mockUseSearchParams = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => mockUseSearchParams(),
  };
});

describe('DetalleProducto - Producto no encontrado', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCarrito.mockReturnValue({ 
      addProduct: vi.fn(),
      productos: [] 
    });
  });

  it('debe mostrar "No se encontró el producto." cuando el código no existe', async () => {
    // Mock useSearchParams para que devuelva un código
    mockUseSearchParams.mockReturnValue([
      { get: (key: string) => key === 'cod' ? 'CODIGO_INEXISTENTE' : null }
    ]);

    // Mock: producto no encontrado
    mockUseProductos.mockReturnValue({
      isLoading: false,
      productos: [],
      error: null,
      getProductoByCode: () => null // Retorna null cuando no encuentra
    });

    render(
      <BrowserRouter>
        <DetalleProducto />
      </BrowserRouter>
    );

    // Verificar el mensaje exacto que muestras
    await waitFor(() => {
      expect(screen.getByText('No se encontró el producto.')).toBeInTheDocument();
    });
  });

  it('debe mostrar "No se proporcionó código de producto." cuando no hay código en la URL', async () => {
    // Mock useSearchParams para que devuelva null (sin código)
    mockUseSearchParams.mockReturnValue([
      { get: (key: string) => null }
    ]);

    mockUseProductos.mockReturnValue({
      isLoading: false,
      productos: [],
      error: null,
      getProductoByCode: vi.fn()
    });

    render(
      <BrowserRouter>
        <DetalleProducto />
      </BrowserRouter>
    );

    // Verificar el mensaje cuando no hay código
    await waitFor(() => {
      expect(screen.getByText('No se proporcionó código de producto.')).toBeInTheDocument();
    });
  });

  describe('DetalleProducto - Comportamientos adicionales', () => {
  // ... tu beforeEach y mocks existentes

  it('debe mostrar "Cargando producto..." cuando está cargando', () => {
    mockUseSearchParams.mockReturnValue([
      { get: (key: string) => 'FLAN-001' }
    ]);

    mockUseProductos.mockReturnValue({
      isLoading: true, // 👈 Loading activado
      productos: [],
      error: null,
      getProductoByCode: vi.fn()
    });

    render(
      <BrowserRouter>
        <DetalleProducto />
      </BrowserRouter>
    );

    expect(screen.getByText('Cargando producto...')).toBeInTheDocument();
  });

  it('debe mostrar producto cuando existe', async () => {
    const productoMock = {
      codigo: 'FLAN-001',
      nombre: 'Flan de Vainilla',
      descripcion: 'Delicioso flan artesanal',
      precio: 15000,
      url: '/flan.jpg'
    };

    mockUseSearchParams.mockReturnValue([
      { get: (key: string) => 'FLAN-001' }
    ]);

    mockUseProductos.mockReturnValue({
      isLoading: false,
      productos: [productoMock],
      error: null,
      getProductoByCode: () => productoMock // 👈 Retorna el producto
    });

    render(
      <BrowserRouter>
        <DetalleProducto />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Flan de Vainilla')).toBeInTheDocument();
      expect(screen.getByText('FLAN-001')).toBeInTheDocument();
    });
  });

  it('debe mostrar error cuando hay problema en la carga', () => {
    mockUseSearchParams.mockReturnValue([
      { get: (key: string) => 'FLAN-001' }
    ]);

    mockUseProductos.mockReturnValue({
      isLoading: false,
      productos: [],
      error: 'Error de conexión', // 👈 Error simulado
      getProductoByCode: vi.fn()
    });

    render(
      <BrowserRouter>
        <DetalleProducto />
      </BrowserRouter>
    );

    expect(screen.getByText('Error: Error de conexión')).toBeInTheDocument();
  });
});
});