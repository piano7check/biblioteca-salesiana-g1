import React from 'react';
import PropTypes from 'prop-types';
import {
    FaUser,
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaExclamationCircle,
    FaMoneyBillWave,
    FaEdit,
    FaTrash
} from 'react-icons/fa';
import { format, parseISO, isValid, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

// Componente optimizado para formateo seguro de fechas
const SafeDate = ({ date, label, showIcon = true }) => {
    const formatDateSafe = (dateStr) => {
        if (!dateStr) return 'No especificada';
        try {
            const date = parseISO(dateStr);
            return isValid(date) ? format(date, 'PP', { locale: es }) : 'Fecha inválida';
        } catch (error) {
            console.error('Error formateando fecha:', error);
            return 'Error en fecha';
        }
    };

    return (
        <div className="col-6">
            {showIcon && <FaCalendarAlt className="me-2 text-muted" />}
            <strong>{label}:</strong><br />
            <span className="text-muted">{formatDateSafe(date)}</span>
        </div>
    );
};

SafeDate.propTypes = {
    date: PropTypes.string,
    label: PropTypes.string.isRequired,
    showIcon: PropTypes.bool
};

// Componente mejorado para mostrar el estado del préstamo
const EstadoPrestamo = ({ prestamo }) => {
    if (!prestamo.fechaDevolucionPrevista) return null;

    try {
        const fechaDevolucion = parseISO(prestamo.fechaDevolucionPrevista);
        if (!isValid(fechaDevolucion)) return null;

        const dias = differenceInDays(fechaDevolucion, new Date());
        const multa = dias < 0 ? Math.abs(dias) * 0.50 : 0;

        if (prestamo.estado === 'PRESTADO') {
            return (
                <div className={`prestamo-estado ${dias < 0 ? 'estado-vencido' : 'estado-activo'}`}>
                    <div className="estado-contenido">
                        {dias < 0 ? <FaExclamationCircle className="estado-icono" /> : <FaClock className="estado-icono" />}
                        <div className="estado-texto">
                            {dias < 0 ? (
                                <>
                                    <span className="estado-titulo">Vencido hace {Math.abs(dias)} días</span>
                                    <span className="estado-multa">
                                        <FaMoneyBillWave className="me-1" />
                                        <strong>Multa:</strong> Bs. {multa.toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span className="estado-titulo">Días restantes: {dias}</span>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        if (prestamo.estado === 'DEVUELTO' && prestamo.fechaDevolucion) {
            return (
                <div className="prestamo-estado estado-devuelto">
                    <div className="estado-contenido">
                        <FaCheckCircle className="estado-icono" />
                        <div className="estado-texto">
                            <span className="estado-titulo">Devuelto el </span>
                            <SafeDate date={prestamo.fechaDevolucion} label="" showIcon={false} />
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    } catch (error) {
        console.error('Error calculando estado:', error);
        return null;
    }
};

EstadoPrestamo.propTypes = {
    prestamo: PropTypes.shape({
        estado: PropTypes.string,
        fechaDevolucionPrevista: PropTypes.string,
        fechaDevolucion: PropTypes.string
    }).isRequired
};

// Componente principal PrestamoCard optimizado
const PrestamoCard = ({ prestamo, onDevolucion, onEdit, onDelete }) => {
    const {
        idPrestamo,
        estado,
        fechaPrestamo,
        fechaDevolucionPrevista,
        //fechaDevolucion,
        usuario,
        libro
    } = prestamo;

    return (
        <div className="prestamo-card">
            <div className="prestamo-header">
                <h3 className="prestamo-titulo">
                    {libro?.titulo || 'Libro no especificado'}
                    {libro?.autor && <span className="prestamo-autor">por {libro.autor}</span>}
                </h3>
                <span className={`prestamo-badge ${estado.toLowerCase()}`}>
                    {estado}
                </span>
            </div>

            <div className="prestamo-body">
                <div className="prestamo-usuario">
                    <FaUser className="prestamo-icono" />
                    <div className="usuario-info">
                        <span className="usuario-nombre">{usuario?.nombre} {usuario?.apellido}</span>
                        {usuario?.tipoUsuario && (
                            <span className="usuario-tipo">{usuario.tipoUsuario}</span>
                        )}
                    </div>
                </div>

                <div className="prestamo-fechas">
                    <SafeDate date={fechaPrestamo} label="Préstamo" />
                    <SafeDate date={fechaDevolucionPrevista} label="Devolución" />
                </div>

                <EstadoPrestamo prestamo={prestamo} />
            </div>

            <div className="prestamo-actions">
                {estado === 'PRESTADO' && (
                    <button
                        className="btn btn-devolver"
                        onClick={() => onDevolucion(idPrestamo)}
                        title="Registrar devolución"
                    >
                        <FaCheckCircle className="me-1" /> Devolver
                    </button>
                )}
                <button
                    className="btn btn-editar"
                    onClick={() => onEdit(prestamo)}
                    title="Editar préstamo"
                >
                    <FaEdit />
                </button>
                <button
                    className="btn btn-eliminar"
                    onClick={() => onDelete(idPrestamo)}
                    title="Eliminar préstamo"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

PrestamoCard.propTypes = {
    prestamo: PropTypes.shape({
        idPrestamo: PropTypes.number.isRequired,
        estado: PropTypes.oneOf(['PRESTADO', 'DEVUELTO', 'RETRASADO']).isRequired,
        fechaPrestamo: PropTypes.string,
        fechaDevolucionPrevista: PropTypes.string,
        fechaDevolucion: PropTypes.string,
        usuario: PropTypes.shape({
            nombre: PropTypes.string,
            apellido: PropTypes.string,
            tipoUsuario: PropTypes.string
        }),
        libro: PropTypes.shape({
            titulo: PropTypes.string,
            autor: PropTypes.string
        })
    }).isRequired,
    onDevolucion: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default PrestamoCard;