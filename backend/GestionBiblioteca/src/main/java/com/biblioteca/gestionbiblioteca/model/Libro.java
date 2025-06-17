package com.biblioteca.gestionbiblioteca.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "libros")
@JsonIgnoreProperties({"prestamos"})
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_libro")
    private Long id;

    @OneToMany(mappedBy = "libro", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Prestamo> prestamos = new ArrayList<>();

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 255, message = "El título no puede exceder los 255 caracteres")
    @Column(nullable = false)
    private String titulo;

    @Size(max = 255, message = "El autor no puede exceder los 255 caracteres")
    private String autor;

    @Size(max = 255, message = "La editorial no puede exceder los 255 caracteres")
    private String editorial;

    @Min(value = 0, message = "El año de publicación debe ser un valor positivo")
    @Column(name = "anio_publicacion")
    private Integer anioPublicacion;

    @Size(max = 100, message = "La categoría no puede exceder los 100 caracteres")
    private String categoria;

    @Size(max = 20, message = "El ISBN no puede exceder los 20 caracteres")
    private String isbn;

    @NotNull(message = "La cantidad total es obligatoria")
    @Min(value = 0, message = "La cantidad total no puede ser negativa")
    @Column(name = "cantidad_total", nullable = false)
    private Integer cantidadTotal;

    @NotNull(message = "La cantidad disponible es obligatoria")
    @Min(value = 0, message = "La cantidad disponible no puede ser negativa")
    @Column(name = "cantidad_disponible", nullable = false)
    private Integer cantidadDisponible;

    // Constructores
    public Libro() {}

    public Libro(String titulo, String autor, String isbn, int cantidadTotal, int cantidadDisponible) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.cantidadTotal = cantidadTotal;
        this.cantidadDisponible = cantidadDisponible;
    }

    // Getters y Setters
    public Long getIdLibro() {
        return id;
    }

    public void setIdLibro(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getEditorial() {
        return editorial;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public Integer getAnioPublicacion() {
        return anioPublicacion;
    }

    public void setAnioPublicacion(Integer anioPublicacion) {
        this.anioPublicacion = anioPublicacion;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getCantidadTotal() {
        return cantidadTotal;
    }

    public void setCantidadTotal(Integer cantidadTotal) {
        this.cantidadTotal = cantidadTotal;
    }

    public Integer getCantidadDisponible() {
        return cantidadDisponible;
    }

    public void setCantidadDisponible(Integer cantidadDisponible) {
        this.cantidadDisponible = cantidadDisponible;
    }
}
