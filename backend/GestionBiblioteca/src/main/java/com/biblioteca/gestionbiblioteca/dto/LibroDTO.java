package com.biblioteca.gestionbiblioteca.dto;

import jakarta.validation.constraints.*;

public class LibroDTO {

    @NotBlank(message = "El código del libro es obligatorio")
    @Size(min = 3, max = 20, message = "El código debe tener entre 3 y 20 caracteres")
    private String codigoLibro;

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 100, message = "El título no puede exceder 100 caracteres")
    private String titulo;

    @NotBlank(message = "El autor es obligatorio")
    private String autor;

    @NotBlank(message = "La editorial es obligatoria")
    private String editorial;

    @NotNull(message = "El año de publicación es obligatorio")
    @Min(value = 1000, message = "El año debe tener al menos 4 dígitos")
    private Integer anioPublicacion;

    @NotBlank(message = "La categoría es obligatoria")
    private String categoria;

    @NotBlank(message = "El ISBN es obligatorio")
    @Pattern(regexp = "\\d{10}|\\d{13}", message = "El ISBN debe tener 10 o 13 dígitos")
    private String isbn;

    @NotNull(message = "La cantidad total es obligatoria")
    @Min(value = 1, message = "Debe haber al menos un libro")
    private Integer cantidadTotal;

    @NotNull(message = "La cantidad disponible es obligatoria")
    @Min(value = 0, message = "La cantidad disponible no puede ser negativa")
    private Integer cantidadDisponible;

    // Getters y Setters
    public String getCodigoLibro() {
        return codigoLibro;
    }

    public void setCodigoLibro(String codigoLibro) {
        this.codigoLibro = codigoLibro;
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
