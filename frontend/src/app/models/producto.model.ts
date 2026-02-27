import { Categoria } from './categoria.model';

export interface Producto {
  id?: number;
  codigo: string;
  nombre: string;
  precio: number;
  stockActual: number;
  categoria: Categoria;
}
