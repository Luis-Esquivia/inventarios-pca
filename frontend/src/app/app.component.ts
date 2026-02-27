import { Component, OnInit } from '@angular/core';
import { Producto } from './models/producto.model';
import { MovimientoService } from './services/movimiento.service';
import { ProductoService } from './services/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  productos: Producto[] = [];
  productoHistorialId?: number;
  error = '';

  constructor(
    private readonly productoService: ProductoService,
    private readonly movimientoService: MovimientoService
  ) {}

  ngOnInit(): void {
    this.recargarProductos();
  }

  recargarProductos(): void {
    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data;
        if (!this.productoHistorialId && data.length) {
          this.productoHistorialId = data[0].id;
        }
      },
      error: () => {
        this.error = 'No se pudieron cargar los productos para movimientos.';
      }
    });
  }

  registrarMovimiento(evento: { productoId: number; tipoMovimiento: 'ENTRADA' | 'SALIDA'; cantidad: number }): void {
    this.movimientoService.registrar(evento).subscribe({
      next: () => {
        this.error = '';
        this.productoHistorialId = evento.productoId;
        this.recargarProductos();
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'No se pudo registrar el movimiento.';
      }
    });
  }
}
