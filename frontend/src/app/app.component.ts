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

  constructor(
    private readonly productoService: ProductoService,
    private readonly movimientoService: MovimientoService
  ) {}

  ngOnInit(): void {
    this.recargarProductos();
  }

  recargarProductos(): void {
    this.productoService.listar().subscribe((data) => {
      this.productos = data;
      if (!this.productoHistorialId && data.length) {
        this.productoHistorialId = data[0].id;
      }
    });
  }

  registrarMovimiento(evento: { productoId: number; tipoMovimiento: 'ENTRADA' | 'SALIDA'; cantidad: number }): void {
    this.movimientoService.registrar(evento).subscribe(() => {
      this.productoHistorialId = evento.productoId;
      this.recargarProductos();
    });
  }
}
