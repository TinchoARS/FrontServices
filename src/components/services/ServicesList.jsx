/* eslint-disable react-hooks/exhaustive-deps */

import useFetch from '../../hooks/fetchHook';
import { useEffect, useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { CgMathPlus } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ServicesList = () => {
    const navigate = useNavigate();
    const { token } = useAuth('state');
    const [user, setUser] = useState(null)
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`${import.meta.env.VITE_BASE_URL}api/services`, {
        method: 'GET',
    });

    useEffect(() => {
        doFetch();
    }, []);

    // Otro fetch para traer informacion del usuario logueado
    useEffect(() => {
        if (data) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Token ${token}`,
                        },
                    });
                    if (!response.ok) {
                        console.log('Error al obtener los datos del usuario');
                    }
                    const user_data = await response.json();
                    setUser(user_data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchUser();
        }
    }, [data, token]);

    const handleAddService = () => {
        navigate('/services/addService');
    };

    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar los servicios.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex align-items-center">
                    <h1 className="flex-grow-1"> Servicios </h1>
                    { user && user.is_supplier && (
                        <button type="button" className="btn btn-dark" onClick={handleAddService}>
                            <CgMathPlus /> Agregar Servicio
                        </button>
                    )}
                </div>
            </div>
            <hr />

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