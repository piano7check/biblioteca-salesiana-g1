package com.biblioteca.gestionbiblioteca.service;

import com.biblioteca.gestionbiblioteca.model.*;
import com.biblioteca.gestionbiblioteca.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PrestamoService {

    private final PrestamoRepository prestamoRepository;
    private final UsuarioRepository usuarioRepository;
    private final LibroRepository libroRepository;

    public PrestamoService(PrestamoRepository prestamoRepository,
                           UsuarioRepository usuarioRepository,
                           LibroRepository libroRepository) {
        this.prestamoRepository = prestamoRepository;
        this.usuarioRepository = usuarioRepository;
        this.libroRepository = libroRepository;
    }

    public ResponseEntity<List<Prestamo>> obtenerTodosLosPrestamos() {
        List<Prestamo> prestamos = prestamoRepository.findAll();
        return new ResponseEntity<>(prestamos, HttpStatus.OK);
    }

    public ResponseEntity<Prestamo> buscarPorId(Long id) {
        return prestamoRepository.findById(id)
                .map(prestamo -> new ResponseEntity<>(prestamo, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<?> registrarPrestamo(Long usuarioId, Long libroId) {
        try {
            // Verificar existencia de usuario y libro
            Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElse(null);
            if (usuario == null) {
                return new ResponseEntity<>("Usuario no encontrado con ID: " + usuarioId, HttpStatus.NOT_FOUND);
            }

            Libro libro = libroRepository.findById(libroId)
                    .orElse(null);
            if (libro == null) {
                return new ResponseEntity<>("Libro no encontrado con ID: " + libroId, HttpStatus.NOT_FOUND);
            }

            // Validar disponibilidad del libro
            if (libro.getCantidadDisponible() <= 0) {
                return new ResponseEntity<>("El libro no está disponible para préstamo", HttpStatus.BAD_REQUEST);
            }

            // Crear y guardar el préstamo
            Prestamo prestamo = new Prestamo();
            prestamo.setUsuario(usuario);
            prestamo.setLibro(libro);
            prestamo.setFechaPrestamo(LocalDate.now());
            prestamo.setEstado(Prestamo.EstadoPrestamo.PRESTADO);

            // Actualizar inventario del libro
            libro.setCantidadDisponible(libro.getCantidadDisponible() - 1);
            libroRepository.save(libro);

            Prestamo prestamoGuardado = prestamoRepository.save(prestamo);
            return new ResponseEntity<>(prestamoGuardado, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("Error al registrar el préstamo: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> actualizarPrestamo(Long id, Prestamo prestamoActualizado) {
        try {
            Prestamo prestamoExistente = prestamoRepository.findById(id).orElse(null);
            if (prestamoExistente == null) {
                return new ResponseEntity<>("Préstamo no encontrado con ID: " + id, HttpStatus.NOT_FOUND);
            }

            // Validar que no se modifiquen datos críticos
            if (!prestamoExistente.getUsuario().getIdUsuario().equals(prestamoActualizado.getUsuario().getIdUsuario())) {
                return new ResponseEntity<>("No se puede cambiar el usuario de un préstamo", HttpStatus.BAD_REQUEST);
            }

            if (!prestamoExistente.getLibro().getIdLibro().equals(prestamoActualizado.getLibro().getIdLibro())) {
                return new ResponseEntity<>("No se puede cambiar el libro de un préstamo", HttpStatus.BAD_REQUEST);
            }

            // Actualizar solo campos permitidos
            prestamoExistente.setFechaDevolucion(prestamoActualizado.getFechaDevolucion());
            prestamoExistente.setEstado(prestamoActualizado.getEstado());

            Prestamo prestamoActualizadoDb = prestamoRepository.save(prestamoExistente);
            return new ResponseEntity<>(prestamoActualizadoDb, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error al actualizar el préstamo: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> eliminarPrestamo(Long id) {
        try {
            Prestamo prestamo = prestamoRepository.findById(id).orElse(null);
            if (prestamo == null) {
                return new ResponseEntity<>("Préstamo no encontrado con ID: " + id, HttpStatus.NOT_FOUND);
            }

            // Devolver el libro al inventario si aún no se ha devuelto
            if (prestamo.getEstado() == Prestamo.EstadoPrestamo.PRESTADO) {
                Libro libro = prestamo.getLibro();
                libro.setCantidadDisponible(libro.getCantidadDisponible() + 1);
                libroRepository.save(libro);
            }

            prestamoRepository.delete(prestamo);
            return new ResponseEntity<>("Préstamo eliminado correctamente", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar el préstamo: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> registrarDevolucion(Long idPrestamo) {
        try {
            Prestamo prestamo = prestamoRepository.findById(idPrestamo).orElse(null);
            if (prestamo == null) {
                return new ResponseEntity<>("Préstamo no encontrado con ID: " + idPrestamo, HttpStatus.NOT_FOUND);
            }

            // Validar que el préstamo no esté ya devuelto
            if (prestamo.getEstado() == Prestamo.EstadoPrestamo.DEVUELTO) {
                return new ResponseEntity<>("El préstamo ya fue devuelto", HttpStatus.BAD_REQUEST);
            }

            // Actualizar estado y fecha
            prestamo.setFechaDevolucion(LocalDate.now());
            prestamo.setEstado(Prestamo.EstadoPrestamo.DEVUELTO);

            // Actualizar inventario del libro
            Libro libro = prestamo.getLibro();
            libro.setCantidadDisponible(libro.getCantidadDisponible() + 1);
            libroRepository.save(libro);

            Prestamo prestamoActualizado = prestamoRepository.save(prestamo);
            return new ResponseEntity<>(prestamoActualizado, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error al registrar la devolución: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<Prestamo>> buscarPrestamosActivosPorUsuario(Long usuarioId) {
        List<Prestamo> prestamos = prestamoRepository.findByUsuarioIdAndEstado(usuarioId, Prestamo.EstadoPrestamo.PRESTADO);
        return new ResponseEntity<>(prestamos, HttpStatus.OK);
    }

    public ResponseEntity<List<Prestamo>> buscarPrestamosPorEstado(Prestamo.EstadoPrestamo estado) {
        List<Prestamo> prestamos = prestamoRepository.findByEstado(estado);
        return new ResponseEntity<>(prestamos, HttpStatus.OK);
    }
}