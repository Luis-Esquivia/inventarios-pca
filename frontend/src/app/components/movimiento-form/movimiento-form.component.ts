import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { TipoMovimiento } from '../../models/movimiento.model';

@Component({
  selector: 'app-movimiento-form',
  templateUrl: './movimiento-form.component.html'
})
export class MovimientoFormComponent {
  @Input() productos: Producto[] = [];
  @Output() registrar = new EventEmitter<{ productoId: number; tipoMovimiento: TipoMovimiento; cantidad: number }>();

  tipos: TipoMovimiento[] = ['ENTRADA', 'SALIDA'];

  form = this.fb.group({
    productoId: [null as number | null, [Validators.required]],
    tipoMovimiento: ['ENTRADA' as TipoMovimiento, [Validators.required]],
    cantidad: [1, [Validators.required, Validators.min(1)]]
  });

  constructor(private readonly fb: FormBuilder) {}

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    this.registrar.emit({
      productoId: Number(raw.productoId),
      tipoMovimiento: raw.tipoMovimiento ?? 'ENTRADA',
      cantidad: Number(raw.cantidad)
    });
  }
}
