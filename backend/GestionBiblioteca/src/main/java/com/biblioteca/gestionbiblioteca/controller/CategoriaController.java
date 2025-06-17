package com.biblioteca.gestionbiblioteca.controller;

import com.biblioteca.gestionbiblioteca.model.Categoria;
import com.biblioteca.gestionbiblioteca.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoriaRepository.findAll();
        return new ResponseEntity<>(categorias, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerCategoria(@PathVariable Integer id) {
        return categoriaRepository.findById(id)
                .map(categoria -> new ResponseEntity<>(categoria, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria categoria) {
        Categoria nuevaCategoria = categoriaRepository.save(categoria);
        return new ResponseEntity<>(nuevaCategoria, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Categoria> actualizarCategoria(
            @PathVariable Integer id,
            @RequestBody Categoria categoriaActualizada) {

        return categoriaRepository.findById(id)
                .map(categoriaExistente -> {
                    categoriaExistente.setNombreCategoria(categoriaActualizada.getNombreCategoria());
                    categoriaExistente.setDescripcion(categoriaActualizada.getDescripcion());
                    Categoria actualizada = categoriaRepository.save(categoriaExistente);
                    return new ResponseEntity<>(actualizada, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Integer id) {
        if (categoriaRepository.existsById(id)) {
            categoriaRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}