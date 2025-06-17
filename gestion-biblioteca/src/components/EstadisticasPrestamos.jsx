import React from 'react';
import { differenceInDays, parseISO, isValid } from 'date-fns';

const EstadisticasPrestamos = ({ prestamos }) => {
    // Función para calcular días de diferencia de manera segura
    const calcularDiasDiferencia = (fechaDevolucionStr) => {
        if (!fechaDevolucionStr) return null;

        try {
            const fechaDevolucion = parseISO(fechaDevolucionStr);
            if (!isValid(fechaDevolucion)) return null;

            const hoy = new Date();
            return differenceInDays(fechaDevolucion, hoy);
        } catch (error) {
            console.error('Error calculando días de diferencia:', error);
            return null;
        }
    };

    // Calcular estadísticas usando reduce
    const { totalActivos, totalVencidos, totalMultas } = prestamos.reduce(
        (stats, prestamo) => {
            if (prestamo.estado === 'PRESTADO') {
                stats.totalActivos++;

                const diasDiferencia = calcularDiasDiferencia(prestamo.fechaDevolucion);
                if (diasDiferencia !== null && diasDiferencia < 0) {
                    stats.totalVencidos++;
                    stats.totalMultas += Math.abs(diasDiferencia) * 0.50; // 0.50 Bs por día de retraso
                }
            }
            return stats;
        },
        { totalActivos: 0, totalVencidos: 0, totalMultas: 0 }
    );

    return (
        <div className="estadisticas-container">
            {/* Tarjeta Préstamos Activos */}
            <div className="estadistica-card estadistica-activos">
                <div className="estadistica-contenido">
                    <h3 className="estadistica-valor">{totalActivos}</h3>
                    <p className="estadistica-texto">Préstamos Activos</p>
                </div>
            </div>

            {/* Tarjeta Préstamos Vencidos */}
            <div className="estadistica-card estadistica-vencidos">
                <div className="estadistica-contenido">
                    <h3 className="estadistica-valor">{totalVencidos}</h3>
                    <p className="estadistica-texto">Préstamos Vencidos</p>
                </div>
            </div>

            {/* Tarjeta Multas Pendientes */}
            <div className="estadistica-card estadistica-multas">
                <div className="estadistica-contenido">
                    <h3 className="estadistica-valor">Bs. {totalMultas.toFixed(2)}</h3>
                    <p className="estadistica-texto">Multas Pendientes</p>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasPrestamos;