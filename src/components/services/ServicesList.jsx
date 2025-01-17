/* eslint-disable react-hooks/exhaustive-deps */

import useFetch from '../../hooks/fetchHook';
import { useEffect } from 'react';
import { ServiceCard } from './ServiceCard';

export const ServicesList = () => {
    const [ {data, isLoading, errors}, doFetch ] = useFetch('http://127.0.0.1:8000/api/services/', {
        method: 'GET',
    });

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar los servicios.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    return (
        <div className="container">
            <div className="row">
                <h1>Servicios</h1>
                <hr />
            </div>

            <div className="row mb-3">
                <div className="btn-group">
                    <button className="btn btn-outline-dark">Todos</button>
                    <button className="btn btn-outline-dark">Tecnología</button>
                    <button className="btn btn-outline-dark">Educación</button>
                    <button className="btn btn-outline-dark">Repostería</button>
                    <button className="btn btn-outline-dark">Marketing</button>
                    <button className="btn btn-outline-dark">Salud y Bienestar</button>
                    <button className="btn btn-outline-dark">Diseño Grafico</button>
                    <button className="btn btn-outline-dark">Marketing</button>
                </div>
            </div>

            <div className="row">
                    { data.length === 0 ? (
                        <div className="alert alert-warning text-center" role='alert'>No hay servicios disponibles.</div>
                    ) : (
                        data.map((service, index) => (
                            <div key={index} className="col-12 col-md-4 mb-4">
                                <ServiceCard key={index} service={service} />
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
};