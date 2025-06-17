import React from 'react';
import { FaFilter } from 'react-icons/fa';
import SearchBar from './SearchBar'; // Asegúrate de que la ruta sea correcta

const FiltrosPrestamos = ({
    searchTerm,
    setSearchTerm,
    filtro,
    setFiltro,
    setCurrentPage
}) => {
    const estados = [
        { value: 'TODOS', label: 'Todos' },
        { value: 'PRESTADO', label: 'Prestados' },
        { value: 'DEVUELTO', label: 'Devueltos' },
        { value: 'RETRASADO', label: 'Retrasados' }
    ];

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleFilterChange = (value) => {
        setFiltro(value);
        setCurrentPage(1);
    };

    return (
        <div className="filtros-prestamos-container">
            <div className="filtros-header">
                <h3 className="filtros-title">
                    <FaFilter className="me-2" />
                    Filtros de Préstamos
                </h3>
            </div>

            <div className="filtros-content">
                <SearchBar
                    placeholder="Buscar por libro, usuario o código..."
                    onSearch={handleSearch}
                    onClear={() => handleSearch('')}
                    showFilters={true}
                    filterOptions={estados}
                    currentFilter={filtro}
                    onFilterChange={handleFilterChange}
                    className="prestamos-search"
                    inputClassName="prestamos-search-input"
                    buttonClassName="prestamos-search-btn"
                    selectClassName="prestamos-filter-select"
                />
            </div>
        </div>
    );
};

export default FiltrosPrestamos;