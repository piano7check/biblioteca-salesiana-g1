package com.biblioteca.gestionbiblioteca.controller;

import com.biblioteca.gestionbiblioteca.model.Libro;
import com.biblioteca.gestionbiblioteca.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/libros")
public class LibroController {

    private final LibroService libroService;

    @Autowired
    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    // Obtener todos los libros
    @GetMapping
    public ResponseEntity<List<Libro>> getAllLibros() {
        List<Libro> libros = libroService.findAll();
        return new ResponseEntity<>(libros, HttpStatus.OK);
    }

    // Obtener libro por ID
    @GetMapping("/{id}")
    public ResponseEntity<Libro> getLibroById(@PathVariable Long id) {
        Optional<Libro> libro = libroService.findById(id);
        return libro.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear un nuevo libro
    @PostMapping
    public ResponseEntity<Libro> createLibro(@RequestBody Libro libro) {
        Libro nuevoLibro = libroService.saveLibro(libro);
        return new ResponseEntity<>(nuevoLibro, HttpStatus.CREATED);
    }

    // Actualizar un libro existente
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLibro(@PathVariable Long id, @RequestBody Libro libroDetails) {
        try {
            Libro libroActualizado = libroService.updatedLibro(id, libroDetails);
            return new ResponseEntity<>(libroActualizado, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un libro
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLibro(@PathVariable Long id) {
        if (libroService.findById(id).isPresent()) {
            libroService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Buscar Libro
    @GetMapping("/buscar")
    public ResponseEntity<List<Libro>> buscarPorTitulo(@RequestParam String titulo) {
        List<Libro> libros = libroService.findByTitulo(titulo);
        return new ResponseEntity<>(libros, HttpStatus.OK);
    }

    // // Buscar por título, autor o categoría
    // @GetMapping("/buscar")
    // public ResponseEntity<List<Libro>> buscarLibros(
    // @RequestParam(required = false) String titulo,
    // @RequestParam(required = false) String autor,
    // @RequestParam(required = false) String categoria) {

    // if (titulo != null && !titulo.isEmpty()) {
    // return ResponseEntity.ok(libroService.buscarPorTitulo(titulo));
    // }
    // if (autor != null && !autor.isEmpty()) {
    // return ResponseEntity.ok(libroService.buscarPorAutor(autor));
    // }
    // if (categoria != null && !categoria.isEmpty()) {
    // return ResponseEntity.ok(libroService.buscarPorCategoria(categoria));
    // }

    // return ResponseEntity.ok(libroService.buscarTodosLibros());
    // }

    // // Buscar por ISBN
    // @GetMapping("/isbn/{isbn}")
    // public ResponseEntity<Libro> buscarLibroPorIsbn(@PathVariable String isbn) {
    // Libro libro = libroService.buscarPorIsbn(isbn);
    // return (libro != null) ? ResponseEntity.ok(libro) :
    // ResponseEntity.notFound().build();
    // }
}