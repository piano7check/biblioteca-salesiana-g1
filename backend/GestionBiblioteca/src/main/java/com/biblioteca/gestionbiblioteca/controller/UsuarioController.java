package com.biblioteca.gestionbiblioteca.controller;

import com.biblioteca.gestionbiblioteca.model.Usuario;
import com.biblioteca.gestionbiblioteca.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.findAll();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getusuarioById(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        return usuario.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> createUsuario(@RequestBody Usuario usuario) {
        if (usuarioService.existsByCi(usuario.getCi())) {
            return ResponseEntity.badRequest().body("Error: El CI ya está registrado");
        }
        if (usuarioService.existsByCorreo(usuario.getCorreo())) {
            return ResponseEntity.badRequest().body("Error: El correo ya está registrado");
        }
        Usuario nuevoUsuario = usuarioService.saveUsuario(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    // Actualizar un usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetails) {
        try {
            return new ResponseEntity<>(usuarioService.updatedUsuario(id, usuarioDetails), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        if (usuarioService.findById(id).isPresent()) {
            usuarioService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Usuario>> searchByNombre(@RequestParam String nombre) {
        return new ResponseEntity<>(usuarioService.findByNombre(nombre), HttpStatus.OK);
    }

    @GetMapping("/by-tipo/{tipoUsuario}")
    public ResponseEntity<List<Usuario>> getUsuariosByTipo(@PathVariable Usuario.TipoUsuario tipoUsuario) {
        return new ResponseEntity<>(usuarioService.findByTipoUsuario(tipoUsuario), HttpStatus.OK);
    }
}
