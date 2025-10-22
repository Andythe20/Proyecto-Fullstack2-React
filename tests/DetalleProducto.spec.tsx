// DetalleProducto.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetalleProducto from '../src/pages/DetalleProducto/DetalleProducto';
import '@testing-library/jest-dom';

// Mocks simples
vi.mock('../src/hooks/useProductos', () => ({
  default: vi.fn()
}));

vi.mock('../src/hooks/useCarrito', () => ({
  useCarrito: vi.fn()
}));

vi.mock('../src/utils/showToastAlert', () => ({
  default: vi.fn()
}));

vi.mock('../src/components/LoadingSpinner/LoadingSpinner', () => ({
  default: () => <div>Loading...</div>
}));

vi.mock('../src/components/Button/Button', () => ({
  default: ({ onClick, text }: any) => (
    <button onClick={onClick}>{text}</button>
  )
}));

import useProductos from '../src/hooks/useProductos';
import { useCarrito } from '../src/hooks/useCarrito';
import showToastAlert from '../src/utils/showToastAlert';

const mockUseProductos = useProductos as any;
const mockUseCarrito = useCarrito as any;
const mockShowToastAlert = showToastAlert as any;

describe('DetalleProducto', () => {
  const mockAddProduct = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCarrito.mockReturnValue({ addProduct: mockAddProduct });
    mockShowToastAlert.mockImplementation(() => {});
  });

  it('debe mostrar loading cuando está cargando', () => {
    mockUseProductos.mockReturnValue({
      isLoading: true,
      productos: [],
      error: null,
      getProductoByCode: vi.fn()
    });

    render(<BrowserRouter><DetalleProducto /></BrowserRouter>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('debe mostrar producto cuando existe', () => {
    const producto = {
      codigo: 'FLAN-001',
      nombre: 'Flan de Vainilla',
      descripcion: 'Delicioso flan',
      precio: 15000,
      url: '/flan.jpg'
    };

    mockUseProductos.mockReturnValue({
      isLoading: false,
      productos: [producto],
      error: null,
      getProductoByCode: () => producto
    });

    // Simular parámetro en URL
    window.history.pushState({}, '', '/?cod=FLAN-001');
    render(<BrowserRouter><DetalleProducto /></BrowserRouter>);

    expect(screen.getByText('Flan de Vainilla')).toBeInTheDocument();
    expect(screen.getByText('FLAN-001')).toBeInTheDocument();
  });

  it('debe agregar producto al carrito', async () => {
    const producto = {
      codigo: 'FLAN-001',
      nombre: 'Flan de Vainilla',
      descripcion: 'Delicioso flan',
      precio: 15000,
      url: '/flan.jpg'
    };

    mockUseProductos.mockReturnValue({
      isLoading: false,
      productos: [producto],
      error: null,
      getProductoByCode: () => producto
    });

    window.history.pushState({}, '', '/?cod=FLAN-001');
    render(<BrowserRouter><DetalleProducto /></BrowserRouter>);

    const addButton = screen.getByText('Agregar');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAddProduct).toHaveBeenCalledWith({
        ...producto,
        quantity: 1
      });
    });
  });

  it('debe mostrar mensaje cuando no hay producto', () => {
    mockUseProductos.mockReturnValue({
      isLoading: false,
      productos: [],
      error: null,
      getProductoByCode: () => null
    });

    window.history.pushState({}, '', '/?cod=INEXISTENTE');
    render(<BrowserRouter><DetalleProducto /></BrowserRouter>);

    expect(screen.getByText(/No se encontró el producto/i)).toBeInTheDocument();
  });
});