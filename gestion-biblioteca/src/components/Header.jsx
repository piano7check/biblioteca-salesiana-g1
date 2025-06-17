import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logousb2.png';
import { FaBook, FaUsers, FaExchangeAlt, FaTags, FaUserCircle, FaSignOutAlt, FaCog, FaBell } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [userName] = useState('A');

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    // Cerrar menús al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = () => {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);
    
    // Iconos para cada elemento del menú
    const navItems = [
        { path: '/', label: 'Inicio', icon: <FaBook /> },
        { path: '/libros', label: 'Libros', icon: <FaBook /> },
        { path: '/usuarios', label: 'Usuarios', icon: <FaUsers /> },
        { path: '/prestamos', label: 'Préstamos', icon: <FaExchangeAlt /> },
        { path: '/categorias', label: 'Categorías', icon: <FaTags /> }
    ];

    return (
        <header className="header">
        <div className="header-container">
            <div className="logo-container">
            <Link to="/">
                <img src={logo} alt="Universidad Salesiana de Bolivia" className="logo" />
            </Link>
            <h1>Sistema Bibliotecario USB</h1>
            </div>
            
            <nav className="navigation">
            <div className="menu-toggle" onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
            }}>
                <FiMenu size={24} />
            </div>
            
            <ul className={mobileMenuOpen ? 'mobile-active' : ''}>
                {navItems.map((item) => (
                <li key={item.path}>
                    <Link 
                    to={item.path} 
                    className={`${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    {item.icon}
                    <span>{item.label}</span>
                    </Link>
                </li>
                ))}
            </ul>
            
            <div className="user-actions">
                <button className="notification-btn">
                <FaBell size={18} />
                <span className="notification-badge">3</span>
                </button>
                
                <div 
                className="user-profile" 
                onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                }}
                >
                <div className="user-avatar">{userName.charAt(0)}</div>
                <div className="user-name">Administrador</div>
                </div>
                
                <div className={`dropdown-menu ${userMenuOpen ? 'active' : ''}`}>
                <div className="user-info">
                    <div className="user-avatar large">{userName.charAt(0)}</div>
                    <div>
                    <div className="user-name">Administrador</div>
                    <div className="user-role">Bibliotecario</div>
                    </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <Link to="/perfil">
                    <FaUserCircle />
                    <span>Mi Perfil</span>
                </Link>
                <Link to="/configuracion">
                    <FaCog />
                    <span>Configuración</span>
                </Link>
                
                <div className="dropdown-divider"></div>
                
                <Link to="/logout">
                    <FaSignOutAlt />
                    <span>Cerrar Sesión</span>
                </Link>
                </div>
            </div>
            </nav>
        </div>
        </header>
    );
};

export default Header;