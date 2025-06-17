import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar-salesiana">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">Sistema Bibliotecario USB</Link>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">Inicio</Link>
                    <Link to="/libros" className="navbar-link">Catálogo</Link>
                    <Link to="/libros/nuevo" className="navbar-link nav-button">
                        Nuevo Libro
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;