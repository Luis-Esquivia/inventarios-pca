package com.inventario.service.impl;

import com.inventario.dto.MovimientoRequest;
import com.inventario.entity.MovimientoInventario;
import com.inventario.entity.Producto;
import com.inventario.entity.TipoMovimiento;
import com.inventario.exception.BusinessException;
import com.inventario.exception.ResourceNotFoundException;
import com.inventario.repository.MovimientoInventarioRepository;
import com.inventario.repository.ProductoRepository;
import com.inventario.service.MovimientoInventarioService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MovimientoInventarioServiceImpl implements MovimientoInventarioService {

    private final MovimientoInventarioRepository movimientoRepository;
    private final ProductoRepository productoRepository;

    public MovimientoInventarioServiceImpl(MovimientoInventarioRepository movimientoRepository, ProductoRepository productoRepository) {
        this.movimientoRepository = movimientoRepository;
        this.productoRepository = productoRepository;
    }

    @Override
    @Transactional
    public MovimientoInventario registrar(MovimientoRequest request) {
        Producto producto = productoRepository.findById(request.getProductoId())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + request.getProductoId()));

        int stockActual = producto.getStockActual();
        if (request.getTipoMovimiento() == TipoMovimiento.ENTRADA) {
            producto.setStockActual(stockActual + request.getCantidad());
        } else {
            int nuevoStock = stockActual - request.getCantidad();
            if (nuevoStock < 0) {
                throw new BusinessException("No hay stock suficiente para registrar la salida");
            }
            producto.setStockActual(nuevoStock);
        }

        MovimientoInventario movimiento = new MovimientoInventario();
        movimiento.setProducto(producto);
        movimiento.setTipoMovimiento(request.getTipoMovimiento());
        movimiento.setCantidad(request.getCantidad());

        productoRepository.save(producto);
        return movimientoRepository.save(movimiento);
    }

    @Override
    public List<MovimientoInventario> historialPorProducto(Long productoId) {
        if (!productoRepository.existsById(productoId)) {
            throw new ResourceNotFoundException("Producto no encontrado con id: " + productoId);
        }
        return movimientoRepository.findByProductoIdOrderByFechaDesc(productoId);
    }
}
