import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Paginas principales
import HomePage from './pages/HomePage';
import LibrosPage from './pages/LibrosPage';
import UsuariosPage from './pages/UsuariosPage';
import PrestamosPage from './pages/PrestamosPage';
import CategoriasPage from './pages/CategoriasPage';
import NotFoundPage from './pages/NotFoundPage';


import LibroForm from './components/LibroForm';
import CategoriaForm from './components/CategoriaForm';
import PrestamoForm from './components/PrestamoForm';
import UsuarioForm from './components/UsuarioForm';
import UsuarioDetail from './components/UsuarioDetail';

// Layouts (si los tienes o planeas agregar)
//import MainLayout from './layouts/MainLayout';
//import AuthLayout from './layouts/AuthLayout';

const AppRoutes = () => {
    // Funciones de guardado (simuladas)
    const handleSaveCategoria = (categoria) => {
        console.log('Guardando categoría:', categoria);
        // Aquí iría la lógica para guardar en la API
    };

    const handleSavePrestamo = (prestamo) => {
        console.log('Guardando préstamo:', prestamo);
        // Aquí iría la lógica para guardar en la API
    };

    return (
        <Routes>
            {/* Layout principal para todas las rutas */}
            {/* <Route element={<MainLayout />}> */}
            {/* Ruta de inicio */}
            <Route index element={<HomePage />} />

            {/* Rutas de libros */}
            <Route path="libros">
                <Route index element={<LibrosPage />} />
                <Route path="nuevo" element={<LibroForm />} />
                <Route path="editar/:id" element={<LibroForm />} />
            </Route>

            {/* Rutas de usuarios */}
            <Route path="usuarios">
                <Route index element={<UsuariosPage />} />
                <Route path="nuevo" element={<UsuarioForm />} />
                <Route path="editar/:id" element={<UsuarioForm />} />
                <Route path='detalle/:id' element={<UsuarioDetail />} />
            </Route>

            {/* Rutas de préstamos */}
            <Route path="prestamos">
                <Route index element={<PrestamosPage />} />
                <Route path="/prestamos/nuevo" element={<PrestamoForm />} />
                <Route path="/prestamos/editar/:id" element={<PrestamoForm />} />
            </Route>

            {/* Rutas de categorías */}
            <Route path="categorias">
                <Route index element={<CategoriasPage />} />
                <Route path="/categorias/nuevo" element={<CategoriaForm />} />
                <Route path="/categorias/editar/:id" element={<CategoriaForm />} />
            </Route>

            {/* Ruta para páginas no encontradas */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;