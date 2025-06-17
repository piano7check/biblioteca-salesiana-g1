package com.biblioteca.gestionbiblioteca.service;

import com.biblioteca.gestionbiblioteca.model.Libro;
import com.biblioteca.gestionbiblioteca.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibroService {

    private final LibroRepository libroRepository;

    @Autowired
    public LibroService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    public List<Libro> findAll() {
        return libroRepository.findAll();
    }

    public Optional<Libro> findById(Long id) {
        return libroRepository.findById(id);
    }

    public List<Libro> findByTitulo(String titulo) {
        return libroRepository.findByTituloContainingIgnoreCase(titulo);
    }

    public Libro saveLibro(Libro libro) {
        // Validar que la cantidad no sea negatica
        if (libro.getCantidadTotal() < 0 || libro.getCantidadDisponible() < 0) {
            throw new IllegalArgumentException("Las cantidades no pueden ser negativas");
        }
        //Validar que el tiulo no este vacio
        if (libro.getTitulo() == null || libro.getTitulo().trim().isEmpty()) {
            throw new IllegalArgumentException("El titulo es obligatorio");
        }

        //Validar que el autor no este vacio
        if (libro.getAutor() == null || libro.getAutor().trim().isEmpty()) {
            throw new IllegalArgumentException("el autor es obligatorio");
        }

        // Asegurar que cantidad disponible no sea mayor que cantidad total
        if (libro.getCantidadDisponible() > libro.getCantidadTotal()) {
            libro.setCantidadDisponible(libro.getCantidadTotal());
        }

        return libroRepository.save(libro);
    }

    public Libro updatedLibro(Long id, Libro libroDetails) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado con id" + id));

        libro.setTitulo(libroDetails.getTitulo());
        libro.setAutor(libroDetails.getAutor());
        libro.setEditorial(libroDetails.getEditorial());
        libro.setAnioPublicacion(libroDetails.getAnioPublicacion());
        libro.setCategoria(libroDetails.getCategoria());
        libro.setIsbn(libroDetails.getIsbn());

        //Validar cantidaddes
        if (libroDetails.getCantidadTotal() < 0 || libroDetails.getCantidadDisponible() < 0 ){
            throw new IllegalArgumentException("Las cantidades no pueden ser negativas");
        }

        libro.setCantidadTotal(libroDetails.getCantidadTotal());

        //Ajustar cantidad disponible si es necesario
        int diferencia =  libroDetails.getCantidadTotal() - libro.getCantidadTotal();
        libro.setCantidadDisponible(libro.getCantidadDisponible() + diferencia);

        return libroRepository.save(libro);
    }

    public void deleteById(Long id) {
        libroRepository.deleteById(id);
    }
}

