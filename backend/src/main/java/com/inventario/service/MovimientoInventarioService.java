package com.inventario.service;

import com.inventario.dto.MovimientoRequest;
import com.inventario.entity.MovimientoInventario;

import java.util.List;

public interface MovimientoInventarioService {
    MovimientoInventario registrar(MovimientoRequest request);

    List<MovimientoInventario> historialPorProducto(Long productoId);
}
