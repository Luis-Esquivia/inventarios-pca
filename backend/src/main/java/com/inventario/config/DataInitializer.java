package com.inventario.config;

import com.inventario.entity.Categoria;
import com.inventario.entity.Producto;
import com.inventario.repository.CategoriaRepository;
import com.inventario.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(CategoriaRepository categoriaRepository, ProductoRepository productoRepository) {
        return args -> {
            Categoria electronica = categoriaRepository.findAll().stream()
                    .filter(c -> "Electrónica".equalsIgnoreCase(c.getNombre()))
                    .findFirst()
                    .orElseGet(() -> {
                        Categoria nueva = new Categoria();
                        nueva.setNombre("Electrónica");
                        nueva.setDescripcion("Dispositivos y accesorios");
                        return categoriaRepository.save(nueva);
                    });

            Categoria hogar = categoriaRepository.findAll().stream()
                    .filter(c -> "Hogar".equalsIgnoreCase(c.getNombre()))
                    .findFirst()
                    .orElseGet(() -> {
                        Categoria nueva = new Categoria();
                        nueva.setNombre("Hogar");
                        nueva.setDescripcion("Artículos para el hogar");
                        return categoriaRepository.save(nueva);
                    });

            if (productoRepository.count() == 0) {
                Producto p1 = new Producto();
                p1.setCodigo("ELEC-001");
                p1.setNombre("Teclado Mecánico");
                p1.setPrecio(new BigDecimal("49.90"));
                p1.setStockActual(15);
                p1.setCategoria(electronica);
                productoRepository.save(p1);

                Producto p2 = new Producto();
                p2.setCodigo("HOG-001");
                p2.setNombre("Lámpara LED");
                p2.setPrecio(new BigDecimal("19.50"));
                p2.setStockActual(30);
                p2.setCategoria(hogar);
                productoRepository.save(p2);
            }
        };
    }
}
