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

  constructor(private readonly movimientoService: MovimientoService) {}

  ngOnChanges(): void {
    if (!this.productoId) {
      this.movimientos = [];
      return;
    }
    this.movimientoService.historial(this.productoId).subscribe((data) => (this.movimientos = data));
  }
}
