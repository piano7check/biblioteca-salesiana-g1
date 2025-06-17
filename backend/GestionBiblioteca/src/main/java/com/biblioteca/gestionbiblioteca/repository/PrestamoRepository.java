package com.biblioteca.gestionbiblioteca.repository;

import com.biblioteca.gestionbiblioteca.model.Prestamo;
import com.biblioteca.gestionbiblioteca.model.Prestamo.EstadoPrestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {
    List<Prestamo> findByEstado(EstadoPrestamo estado);
    List<Prestamo> findByUsuarioId(Long usuarioId);
    List<Prestamo> findByUsuarioIdAndEstado (Long usuarioId, EstadoPrestamo estadoPrestamo);
}

