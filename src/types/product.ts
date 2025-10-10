export interface Product {
  codigo: string;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  url: string;
}

export interface CartProduct extends Product {
  quantity: number;
}
