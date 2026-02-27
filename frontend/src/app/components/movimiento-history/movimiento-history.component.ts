import { Component, Input, OnChanges } from '@angular/core';
import { MovimientoInventario } from '../../models/movimiento.model';
import { MovimientoService } from '../../services/movimiento.service';

@Component({
  selector: 'app-movimiento-history',
  templateUrl: './movimiento-history.component.html'
})
export class MovimientoHistoryComponent implements OnChanges {
  @Input() productoId?: number;
  movimientos: MovimientoInventario[] = [];

  error = '';


  constructor(private readonly movimientoService: MovimientoService) {}

  ngOnChanges(): void {
    if (!this.productoId) {
      this.movimientos = [];
      return;
    }
    this.movimientoService.historial(this.productoId).subscribe({
      next: (data) => {
        this.movimientos = data;
        this.error = '';
      },
      error: () => {
        this.error = 'No se pudo cargar el historial de movimientos.';
      }
    });

  }
}
