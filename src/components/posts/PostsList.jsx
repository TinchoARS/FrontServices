import useFetch from '../../hooks/fetchHook';
import { useEffect } from 'react';

export const PostsList = () => {

    return (
        <div className="container">
            <div className="row">
                <h1>Publicaciones</h1>
                <hr />
            </div>

            <div className="row mb-3">
                <div className="btn-group">
                    <button className="btn btn-outline-dark">Todos</button>
                    <button className="btn btn-outline-dark">Recientes</button>
                    <button className="btn btn-outline-dark">hace 1 semana</button>
                    <button className="btn btn-outline-dark">hace 1 mes</button>
                </div>
            </div>

            <div className="row">
                <div className="alert alert-warning text-center" role='alert'>No hay publicaciones disponibles.</div>
            </div>
        </div>
    )
};