import { Producto } from './producto.model';

export type TipoMovimiento = 'ENTRADA' | 'SALIDA';

export interface MovimientoInventario {
  id?: number;
  producto: Producto;
  tipoMovimiento: TipoMovimiento;
  cantidad: number;
  fecha?: string;
}
