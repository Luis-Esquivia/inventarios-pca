import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnChanges {
  @Input() categorias: Categoria[] = [];
  @Input() productoEditar?: Producto | null;
  @Output() guardar = new EventEmitter<Producto>();

  form = this.fb.group({
    id: [null as number | null],
    codigo: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    precio: [0, [Validators.required, Validators.min(0)]],
    stockActual: [0, [Validators.required, Validators.min(0)]],
    categoriaId: [null as number | null, [Validators.required]]
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoEditar'] && this.productoEditar) {
      this.form.patchValue({
        id: this.productoEditar.id ?? null,
        codigo: this.productoEditar.codigo,
        nombre: this.productoEditar.nombre,
        precio: this.productoEditar.precio,
        stockActual: this.productoEditar.stockActual,
        categoriaId: this.productoEditar.categoria.id ?? null
      });
    }
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const categoria = this.categorias.find((c) => c.id === raw.categoriaId);
    if (!categoria) {
      return;
    }

    this.guardar.emit({
      id: raw.id ?? undefined,
      codigo: raw.codigo ?? '',
      nombre: raw.nombre ?? '',
      precio: Number(raw.precio),
      stockActual: Number(raw.stockActual),
      categoria
    });
    this.form.reset({ precio: 0, stockActual: 0, categoriaId: null, id: null, codigo: '', nombre: '' });
  }
}
