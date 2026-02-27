package com.inventario.service.impl;

import com.inventario.entity.Categoria;
import com.inventario.entity.Producto;
import com.inventario.exception.ResourceNotFoundException;
import com.inventario.repository.CategoriaRepository;
import com.inventario.repository.ProductoRepository;
import com.inventario.service.ProductoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public List<Producto> listar(String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return productoRepository.findAll();
        }
        return productoRepository.findByNombreContainingIgnoreCase(nombre.trim());
    }

    @Override
    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + id));
    }

    @Override
    public Producto guardar(Producto producto) {
        Categoria categoria = categoriaRepository.findById(producto.getCategoria().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
        producto.setCategoria(categoria);
        if (producto.getStockActual() == null) {
            producto.setStockActual(0);
        }
        return productoRepository.save(producto);
    }

    @Override
    public Producto actualizar(Long id, Producto producto) {
        Producto actual = obtenerPorId(id);
        Categoria categoria = categoriaRepository.findById(producto.getCategoria().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        actual.setCodigo(producto.getCodigo());
        actual.setNombre(producto.getNombre());
        actual.setPrecio(producto.getPrecio());
        actual.setStockActual(producto.getStockActual());
        actual.setCategoria(categoria);
        return productoRepository.save(actual);
    }

    @Override
    public void eliminar(Long id) {
        Producto producto = obtenerPorId(id);
        productoRepository.delete(producto);
    }
}
