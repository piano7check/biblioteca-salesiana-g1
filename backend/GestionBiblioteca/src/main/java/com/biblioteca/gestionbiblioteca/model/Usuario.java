package com.biblioteca.gestionbiblioteca.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "usuarios")
@JsonIgnoreProperties({"prestamos"})
public class Usuario {

    public enum TipoUsuario {
        Estudiante, Docente, Administrador, Otro
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Prestamo> prestamos = new ArrayList<>();

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exeder los 100 caracteres")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 100, message = "El apellido no puede exceder los 100 caracteres")
    private String apellido;


    @NotBlank(message = "El CI es obligatorio")
    @Size(max = 20, message = "El CI no puede exceder los 20 caracteres")
    @Column(unique = true)
    private String ci;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "Debe ser un correo electrónico válido")
    @Column(unique = true)
    private String correo;

    @Size(max = 20, message = "El teléfono no puede exceder los 20 caracteres")
    private String telefono;

    @Size(max = 255, message = "La dirección no puede exceder los 255 caracteres")
    private String direccion;

    @NotNull(message = "El tipo de usuario es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_usuario")
    private TipoUsuario tipoUsuario;

    // Contructores
    public Usuario() {
    }

    public Usuario(String nombre, String apellido, String ci, String correo, TipoUsuario tipoUsuario) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.ci = ci;
        this.correo = correo;
        this.tipoUsuario = tipoUsuario;
    }

    // Getters y Setters para todos los campos
    public Long getIdUsuario() {
        return id;
    }

    public void setIdUsuario(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getCi() {
        return ci;
    }

    public void setCi(String ci) {
        this.ci = ci;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
}
