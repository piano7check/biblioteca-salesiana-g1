package com.biblioteca.gestionbiblioteca.repository;

import com.biblioteca.gestionbiblioteca.model.Usuario;
import com.biblioteca.gestionbiblioteca.model.Usuario.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
//import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // 1) Consulta derivada para buscar por nombre (insensible a mayúsculas/minúsculas)
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);

    // 2) Consulta para verificar existencia por CI
    boolean existsByCi(String ci);

    // 3) Consulta para verificar existencia por correo
    boolean existsByCorreo(String correo);

    // Consulta derivada para buscar por tipo de usuario
    List<Usuario> findByTipoUsuario(TipoUsuario tipoUsuario);

//    // 5) Buscar usuarios por teléfono
//    List<Usuario> findByTelefonoContaining(String telefono);
//
//    // 6) Buscar por dirección (búsqueda parcial ignorando mayúsculas)
//    List<Usuario> findByDireccionContainingIgnoreCase(String direccion);
//
//    // 7) Buscar usuarios por tipo y ordenar por apellido y nombre
//    List<Usuario> findByTipoUsuarioOrderByApellidoAscNombreAsc(TipoUsuario tipo);
//
//    // 8) Contar usuarios por tipo (agrupados)
//    @Query("""
//                SELECT u.tipoUsuario, COUNT(u)
//                FROM Usuario u
//                GROUP BY u.tipoUsuario
//            """)
//    List<Object[]> contarUsuariosPorTipo();
//
//    // 9) Usuarios con préstamos activos
//    @Query("""
//                SELECT DISTINCT u
//                FROM Usuario u
//                JOIN u.prestamos p
//                WHERE p.estado = 'ACTIVO'
//            """)
//    List<Usuario> findUsuariosConPrestamosActivos();
//
//    // 10) Consulta nativa: usuarios creados hoy por tipo
//    @Query(value = """
//                SELECT * FROM usuarios
//                WHERE tipo_usuario = :tipo
//                AND DATE(created_at) = CURDATE()
//            """, nativeQuery = true)
//    List<Usuario> findUsuariosCreadosHoyPorTipo(@Param("tipo") String tipo);
}