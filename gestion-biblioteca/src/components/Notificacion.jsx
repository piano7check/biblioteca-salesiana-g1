import React, { useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const Notificacion = ({ tipo = 'exito', mensaje, onClose, duracion = 5000 }) => {
    useEffect(() => {
        if (duracion) {
            const timer = setTimeout(() => {
                onClose();
            }, duracion);
            return () => clearTimeout(timer);
        }
    }, [onClose, duracion]);

    const tiposNotificacion = {
        exito: {
            icono: <FaCheckCircle />,
            clase: 'notificacion-exito',
        },
        error: {
            icono: <FaExclamationTriangle />,
            clase: 'notificacion-error',
        },
        advertencia: {
            icono: <FaExclamationTriangle />,
            clase: 'notificacion-advertencia',
        },
        informacion: {
            icono: <FaInfoCircle />,
            clase: 'notificacion-informacion',
        }
    };

    const { icono, clase } = tiposNotificacion[tipo] || tiposNotificacion.exito;

    return (
        <div className={`notificacion ${clase}`}>
            <div className="notificacion-icono">{icono}</div>
            <div className="notificacion-mensaje">{mensaje}</div>
            <button
                type="button"
                className="notificacion-cerrar"
                onClick={onClose}
                aria-label="Cerrar notificación"
            >
                <FaTimes />
            </button>
        </div>
    );
};

export default Notificacion;