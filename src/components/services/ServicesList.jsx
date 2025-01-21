/* eslint-disable react-hooks/exhaustive-deps */

import useFetch from '../../hooks/fetchToFilters';
import { useEffect, useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { CgMathPlus } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ServicesList = () => {
    const navigate = useNavigate();
    const { token } = useAuth('state');
    const [user, setUser] = useState(null)
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
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

    const handleSearch = (event) => {
        event.preventDefault();
        const query = new URLSearchParams();
        if (category) query.append('category', category);
        if (title) query.append('title', title);
        const searchUrl = `${import.meta.env.VITE_BASE_URL}api/services/?${query.toString()}`;
        console.log('Search URL:', searchUrl); // Añadir este log para verificar la URL
        doFetch(searchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const handleClearFilters = () => {
        setCategory('');
        setTitle('');
        doFetch(
            `${import.meta.env.VITE_BASE_URL}api/services`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
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
                <div className="col-md-12">
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Filtrar por categoria"
                            aria-label="Category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Filtrar por nombre"
                            aria-label="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <button className="btn btn-outline-success me-2" type="submit">Filtrar</button>
                        <button className="btn btn-outline-danger" type="button" onClick={handleClearFilters}>Limpiar</button>
                    </form>
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