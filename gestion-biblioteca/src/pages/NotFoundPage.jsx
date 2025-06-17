import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
        <div className="error-code">404</div>
        <h1>Página no encontrada</h1>
        <p>Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <Link to="/" className="btn primary">Volver al inicio</Link>
        </div>
    );
};

export default NotFoundPage;