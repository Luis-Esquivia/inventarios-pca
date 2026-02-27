package com.inventario.service;

import com.inventario.entity.Producto;

import java.util.List;

public interface ProductoService {
    List<Producto> listar(String nombre);

    Producto obtenerPorId(Long id);

    Producto guardar(Producto producto);

    Producto actualizar(Long id, Producto producto);

    void eliminar(Long id);
}
