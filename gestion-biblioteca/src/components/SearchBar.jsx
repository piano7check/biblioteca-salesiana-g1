import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({
    placeholder = "Buscar...",
    onSearch,          // Función que se ejecuta al buscar
    onClear,           // Función que se ejecuta al limpiar
    showFilters = false,
    filterOptions = [],
    currentFilter = '',
    onFilterChange,
    className = '',
    inputClassName = '',
    buttonClassName = '',
    selectClassName = ''
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        if (onClear) onClear();
    };

    return (
        <div className={`search-bar ${className}`}>
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`search-input ${inputClassName}`}
                        aria-label="Buscar"
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className={`btn-clear ${buttonClassName}`}
                            aria-label="Limpiar búsqueda"
                        >
                            &times;
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className={`btn search-btn ${buttonClassName}`}
                    disabled={!searchTerm.trim()}
                >
                    Buscar
                </button>

                {showFilters && filterOptions.length > 0 && (
                    <div className="search-filters">
                        <select
                            value={currentFilter}
                            onChange={(e) => onFilterChange(e.target.value)}
                            className={`filter-select ${selectClassName}`}
                        >
                            {filterOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </form>
        </div>
    );
};

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    showFilters: PropTypes.bool,
    filterOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ),
    currentFilter: PropTypes.string,
    onFilterChange: PropTypes.func,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    selectClassName: PropTypes.string,
};

export default SearchBar;