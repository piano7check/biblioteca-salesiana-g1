package com.biblioteca.gestionbiblioteca.repository;

import com.biblioteca.gestionbiblioteca.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {

    // 1) Buscar libros por título (ignorando mayúsculas/minúsculas)
    List<Libro> findByTituloContainingIgnoreCase(String titulo);

//    // 2) Buscar libros por autor (ignorando mayúsculas/minúsculas)
//    List<Libro> findByAutorContainingIgnoreCase(String autor);
//
//    // 3) Buscar libros por nombre de categoría
//    @Query("""
//                SELECT l FROM Libro l
//                WHERE LOWER(l.categoria.nombre) LIKE LOWER(CONCAT('%', :nombreCategoria, '%'))
//            """)
//    List<Libro> findByNombreCategoria(@Param("nombreCategoria") String nombreCategoria);
//
//    // 4) Buscar libro por ISBN
//    Optional<Libro> findByIsbn(String isbn);
//
//    // 5) Libros con cantidad disponible mayor a una cantidad
//    List<Libro> findByCantidadDisponibleGreaterThan(int cantidad);
//
//    // 6) Libros publicados después de un año
//    List<Libro> findByAnioPublicacionGreaterThan(Integer anio);
//
//    // 7) Libros dentro de un rango de años
//    List<Libro> findByAnioPublicacionBetween(Integer inicio, Integer fin);
//
//    // 8) Buscar por editorial (parcial, ignorando mayúsculas)
//    List<Libro> findByEditorialContainingIgnoreCase(String editorial);
//
//    // 9) Libros actualmente prestados (JOIN con préstamos activos)
//    @Query("""
//                SELECT DISTINCT l
//                FROM Libro l
//                JOIN l.prestamos p
//                WHERE p.estado = 'ACTIVO'
//            """)
//    List<Libro> findLibrosPrestadosActualmente();
//
//    /*
//     * // 10) Consulta nativa de búsqueda por texto completo (requiere índice
//     * FULLTEXT)
//     *
//     * @Query(value = """
//     * SELECT * FROM libros
//     * WHERE MATCH(titulo, autor) AGAINST(:termino IN NATURAL LANGUAGE MODE)
//     * """, nativeQuery = true)
//     * List<Libro> buscarPorTextoCompleto(@Param("termino") String termino);
//     */
}
