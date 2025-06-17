import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaBook,
    FaUserGraduate, FaChalkboardTeacher, FaInfoCircle
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer">
        <div className="footer-content">
            {/* Columna 1: Logo e información */}
            <div className="footer-column">
            <div className="footer-logo-container">
                <img 
                src="../assets/images/logousb2.png" 
                alt="Universidad Salesiana de Bolivia" 
                className="footer-logo" 
                />
                <div className="footer-text">
                Formando líderes con valores salesianos para transformar la sociedad boliviana.
                </div>
            </div>
            
            <div className="social-links">
                <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                <FaFacebookF />
                </a>
                <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                <FaTwitter />
                </a>
                <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                <FaInstagram />
                </a>
                <a href="https://youtube.com" className="social-link" aria-label="YouTube">
                <FaYoutube />
                </a>
            </div>
            </div>
            
            {/* Columna 2: Enlaces rápidos */}
            <div className="footer-column">
            <h3 className="footer-title">Enlaces Rápidos</h3>
            <div className="footer-links">
                <a href="/libros">
                <FaBook />
                <span>Catálogo de Libros</span>
                </a>
                <a href="/usuarios">
                <FaUserGraduate />
                <span>Estudiantes Registrados</span>
                </a>
                <a href="/prestamos">
                <FaChalkboardTeacher />
                <span>Préstamos Activos</span>
                </a>
                <a href="/acerca">
                <FaInfoCircle />
                <span>Acerca del Sistema</span>
                </a>
            </div>
            </div>
            
            {/* Columna 3: Contacto */}
            <div className="footer-column">
            <h3 className="footer-title">Información de Contacto</h3>
            <div className="contact-info">
                <div className="contact-item">
                <div className="contact-icon">
                    <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                    <div className="contact-label">Dirección</div>
                    <div className="contact-value">
                    Av. Arce #1234, La Paz<br />
                    Bolivia
                    </div>
                </div>
                </div>
                
                <div className="contact-item">
                <div className="contact-icon">
                    <FaPhone />
                </div>
                <div className="contact-details">
                    <div className="contact-label">Teléfono</div>
                    <div className="contact-value">+591 2 123 4567</div>
                </div>
                </div>
                
                <div className="contact-item">
                <div className="contact-icon">
                    <FaEnvelope />
                </div>
                <div className="contact-details">
                    <div className="contact-label">Email</div>
                    <div className="contact-value">biblioteca@salesiana.edu.bo</div>
                </div>
                </div>
                
                <div className="contact-item">
                <div className="contact-icon">
                    <FaClock />
                </div>
                <div className="contact-details">
                    <div className="contact-label">Horario</div>
                    <div className="contact-value">
                    Lunes a Viernes: 8:00 - 20:00<br />
                    Sábados: 9:00 - 14:00
                    </div>
                </div>
                </div>
            </div>
            </div>
            
            {/* Columna 4: Misión */}
            <div className="footer-column">
            <h3 className="footer-title">Nuestra Misión</h3>
            <div className="footer-text">
                La Biblioteca Universitaria Salesiana tiene como misión proporcionar recursos 
                y servicios de información de calidad que apoyen la docencia, investigación 
                y formación integral de la comunidad universitaria, fomentando los valores 
                salesianos de respeto, responsabilidad y excelencia académica.
            </div>
            </div>
            
            {/* Copyright */}
            <div className="copyright">
            <div>
                &copy; {currentYear} Universidad Salesiana de Bolivia. Todos los derechos reservados.
            </div>
            <div className="university-address">
                Av. Arce #1234, La Paz, Bolivia | Teléfono: +591 2 123 4567
            </div>
            <div>
                Sistema de Gestión Bibliotecaria v2.0
            </div>
            </div>
        </div>
        </footer>
    );
};

export default Footer;