import useFetch from '../../hooks/fetchHook';
import { useEffect } from 'react';

export const RequestsList = () => {
    // implementar fetch a la api de solicitudes

    return (
        <div className="container">
            <div className="row">
                <h1>Mis solicitudes</h1>
                <hr />
            </div>

            <div className="row mb-3">
                <div className="btn-group">
                    <button className="btn btn-outline-dark">Todos</button>
                    <button className="btn btn-outline-dark">Rechazados</button>
                    <button className="btn btn-outline-dark">Pendientes</button>
                    <button className="btn btn-outline-dark">Aceptadas</button>
                </div>
            </div>

            <div className="row">
                <div className="alert alert-warning text-center" role='alert'>No hay solicitudes disponibles.</div>
            </div>
        </div>
    )
};