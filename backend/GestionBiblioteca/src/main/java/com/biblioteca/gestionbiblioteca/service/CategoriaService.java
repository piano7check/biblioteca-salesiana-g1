package com.biblioteca.gestionbiblioteca.service;

import com.biblioteca.gestionbiblioteca.model.Categoria;
import com.biblioteca.gestionbiblioteca.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria saveCategoria(Categoria categoria) {
        if (categoria.getNombreCategoria() == null || categoria.getNombreCategoria().isEmpty()) {
            throw new IllegalArgumentException("El nombre de la categoría no puede estar vacío.");
        }
//        if (categoriaRepository.existsByNombreCategoria(categoria.getNombreCategoria())) {
//            throw new IllegalArgumentException("Ya existe una categoría con ese nombre.");
//        }
        return categoriaRepository.save(categoria);
    }
}