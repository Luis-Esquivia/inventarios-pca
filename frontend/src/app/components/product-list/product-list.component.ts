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

  error = '';


  constructor(
    private readonly productoService: ProductoService,
    private readonly categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.buscar();
  }

  cargarCategorias(): void {

    this.categoriaService.listar().subscribe({
      next: (data) => {
        this.categorias = data;
        this.error = '';
      },
      error: () => {
        this.error = 'No se pudieron cargar las categorías. Verifique que el backend esté ejecutándose en http://localhost:8080.';
      }
    });
  }

  buscar(): void {
    this.productoService.listar(this.filtro).subscribe({
      next: (data) => {
        this.productos = data;
        this.error = '';
      },
      error: () => {
        this.error = 'No se pudieron cargar los productos. Verifique API y CORS.';
      }
    });

  }

  guardar(producto: Producto): void {
    const request = producto.id
      ? this.productoService.actualizar(producto)
      : this.productoService.crear(producto);


    request.subscribe({
      next: () => {
        this.seleccionado = null;
        this.buscar();
      },
      error: () => {
        this.error = 'No se pudo guardar el producto.';
      }

    });
  }

  editar(producto: Producto): void {
    this.seleccionado = producto;
  }

  eliminar(id?: number): void {
    if (!id) {
      return;
    }
    this.productoService.eliminar(id).subscribe({
      next: () => this.buscar(),
      error: () => {
        this.error = 'No se pudo eliminar el producto.';
      }
    });

  }
}
