package com.biblioteca.gestionbiblioteca.controller;

import com.biblioteca.gestionbiblioteca.model.Prestamo;
import com.biblioteca.gestionbiblioteca.service.PrestamoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    private final PrestamoService prestamoService;

    public PrestamoController(PrestamoService prestamoService) {
        this.prestamoService = prestamoService;
    }

    @GetMapping
    public ResponseEntity<List<Prestamo>> obtenerTodosLosPrestamos() {
        return prestamoService.obtenerTodosLosPrestamos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prestamo> buscarPorId(@PathVariable Long id) {
        return prestamoService.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<?> registrarPrestamo(@RequestParam Long usuarioId,
                                               @RequestParam Long libroId) {
        return prestamoService.registrarPrestamo(usuarioId, libroId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarPrestamo(@PathVariable Long id,
                                                @RequestBody Prestamo prestamo) {
        return prestamoService.actualizarPrestamo(id, prestamo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPrestamo(@PathVariable Long id) {
        return prestamoService.eliminarPrestamo(id);
    }

    @PostMapping("/{id}/devolucion")
    public ResponseEntity<?> registrarDevolucion(@PathVariable Long id) {
        return prestamoService.registrarDevolucion(id);
    }

    @GetMapping("/usuario/{usuarioId}/activos")
    public ResponseEntity<List<Prestamo>> buscarPrestamosActivosPorUsuario(@PathVariable Long usuarioId) {
        return prestamoService.buscarPrestamosActivosPorUsuario(usuarioId);
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Prestamo>> buscarPrestamosPorEstado(@PathVariable Prestamo.EstadoPrestamo estado) {
        return prestamoService.buscarPrestamosPorEstado(estado);
    }
}
