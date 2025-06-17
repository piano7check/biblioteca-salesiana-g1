package com.biblioteca.gestionbiblioteca.service;

import com.biblioteca.gestionbiblioteca.model.Usuario;
import com.biblioteca.gestionbiblioteca.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional(readOnly = true)
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Usuario> findByNombre(String nombre) {
        return usuarioRepository.findByNombreContainingIgnoreCase(nombre);
    }

    @Transactional(readOnly = true)
    public boolean existsByCi(String ci) {
        return usuarioRepository.existsByCi(ci);
    }

    @Transactional(readOnly = true)
    public boolean existsByCorreo(String email) {
        return usuarioRepository.existsByCorreo(email);
    }

    public Usuario updatedUsuario(Long id, Usuario usuarioDetails) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));

        if (!usuario.getCi().equals(usuarioDetails.getCi()) && usuarioRepository.existsByCi(usuarioDetails.getCi())) {
            throw new IllegalArgumentException("El CI ya está registrado");
        }

        if (!usuario.getCorreo().equals(usuarioDetails.getCorreo()) &&
                usuarioRepository.existsByCorreo(usuarioDetails.getCorreo())) {
            throw new IllegalArgumentException("El correo ya está registrado");
        }

        usuario.setNombre(usuarioDetails.getNombre());
        usuario.setApellido(usuarioDetails.getApellido());
        usuario.setCi(usuarioDetails.getCi());
        usuario.setCorreo(usuarioDetails.getCorreo());
        usuario.setTelefono(usuarioDetails.getTelefono());
        usuario.setDireccion(usuarioDetails.getDireccion());
        usuario.setTipoUsuario(usuarioDetails.getTipoUsuario());

        return usuarioRepository.save(usuario);
    }

    @Transactional(readOnly = true)
    public List<Usuario> findByTipoUsuario(Usuario.TipoUsuario tipoUsuario) {
        return usuarioRepository.findByTipoUsuario(tipoUsuario);
    }
}