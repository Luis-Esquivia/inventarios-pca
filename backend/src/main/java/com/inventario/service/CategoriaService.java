package com.inventario.service;

import com.inventario.entity.Categoria;

import java.util.List;

public interface CategoriaService {
    List<Categoria> listar();

    Categoria obtenerPorId(Long id);

    Categoria guardar(Categoria categoria);

    Categoria actualizar(Long id, Categoria categoria);

    void eliminar(Long id);
}
