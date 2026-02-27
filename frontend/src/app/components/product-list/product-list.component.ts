import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';
import { CategoriaService } from '../../services/categoria.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  categorias: Categoria[] = [];
  productos: Producto[] = [];
  filtro = '';
  seleccionado: Producto | null = null;

  constructor(
    private readonly productoService: ProductoService,
    private readonly categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.buscar();
  }

  cargarCategorias(): void {
    this.categoriaService.listar().subscribe((data) => (this.categorias = data));
  }

  buscar(): void {
    this.productoService.listar(this.filtro).subscribe((data) => (this.productos = data));
  }

  guardar(producto: Producto): void {
    const request = producto.id
      ? this.productoService.actualizar(producto)
      : this.productoService.crear(producto);

    request.subscribe(() => {
      this.seleccionado = null;
      this.buscar();
    });
  }

  editar(producto: Producto): void {
    this.seleccionado = producto;
  }

  eliminar(id?: number): void {
    if (!id) {
      return;
    }
    this.productoService.eliminar(id).subscribe(() => this.buscar());
  }
}
