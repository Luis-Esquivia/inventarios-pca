package com.inventario.controller;

import com.inventario.dto.MovimientoRequest;
import com.inventario.entity.MovimientoInventario;
import com.inventario.service.MovimientoInventarioService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@Validated
public class MovimientoInventarioController {

    private final MovimientoInventarioService movimientoService;

    public MovimientoInventarioController(MovimientoInventarioService movimientoService) {
        this.movimientoService = movimientoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MovimientoInventario registrar(@Valid @RequestBody MovimientoRequest request) {
        return movimientoService.registrar(request);
    }

    @GetMapping("/producto/{productoId}")
    public List<MovimientoInventario> historialPorProducto(@PathVariable Long productoId) {
        return movimientoService.historialPorProducto(productoId);
    }
}
