import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLibrosCount, getUsuariosCount, getPrestamosActivosCount } from '../services/bibliotecaService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';


const HomePage = () => {
  const [stats, setStats] = useState({
    libros: 0,
    usuarios: 0,
    prestamosActivos: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true, error: null }));

        const [libros, usuarios, prestamosActivos] = await Promise.all([
          getLibrosCount(),
          getUsuariosCount(),
          getPrestamosActivosCount()
        ]);

        setStats({
          libros,
          usuarios,
          prestamosActivos,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching stats, error');
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Error al cargar las estadisticas'
        }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h2>Bienvenido al Sistema de Gestión Bibliotecaria</h2>
          <p>Gestiona tu biblioteca de manera eficiente y organizada</p>
          <div className="hero-actions">
            <Link to="/libros" className="btn primary">Explorar Libros</Link>
            <Link to="/prestamos" className="btn secondary">Ver Préstamos</Link>
            <Link to="/prediccionDeCrecimiento" className='btn primary'>Sistema de Prediccion de Cultivos</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Gestión de Libros</h3>
          <p>Administra tu catálogo de libros, categorías y disponibilidad</p>
          <Link to="/libros" className="feature-link">Ver más →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Registro de Usuarios</h3>
          <p>Mantén un registro de los miembros de tu biblioteca</p>
          <Link to="/usuarios" className="feature-link">Ver más →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>Control de Préstamos</h3>
          <p>Gestiona préstamos, devoluciones y multas</p>
          <Link to="/prestamos" className="feature-link">Ver más →</Link>
        </div>
      </section>

      {stats.loading ? (
        <LoadingSpinner />
      ) : stats.error ? (
        <ErrorMessage message={stats.error} />
      ) : (
        <section className="stats">
          <div className="stat-card">
            <h4>{stats.libros.toLocaleString()}</h4>
            <p>Libros en catálogo</p>
          </div>
          <div className="stat-card">
            <h4>{stats.usuarios.toLocaleString()}</h4>
            <p>Usuarios registrados</p>
          </div>
          <div className="stat-card">
            <h4>{stats.prestamosActivos.toLocaleString()}</h4>
            <p>Préstamos activos</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;