/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/fetchHook";
import { SlArrowLeft } from "react-icons/sl";

export const ServiceDetails = () => {
    const { idService } = useParams();
    const { token } = useAuth('state');
    const navigate = useNavigate();
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`http://127.0.0.1:8000/api/services/${idService}`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`
        }
    });

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar el servicio.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    // Función para formatear la fecha y hora
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('es-ES', options);
    };

    const viewPosts = () => {
        navigate(`/posts?service=${idService}`);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Detalles del servicio</h1>
                        <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>
                            <SlArrowLeft /> Volver
                        </button>
                    </div>
                    <hr />
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title"> {data.title} </h2>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"> {data.description} </li>
                            <li className="list-group-item"> Categoría: {data.category} </li>
                            <li className="list-group-item"> duración: {data.duration} </li>
                            <li className="list-group-item"> Alta de Servicio: {formatDateTime(data.created_at)} hs. </li>
                            <li className="list-group-item">
                                {data.tags && data.tags.split(",").map((tag, index) => (
                                    <span key={index} className="badge text-bg-dark ms-1">
                                        {tag}
                                    </span>
                                ))}
                            </li>
                        </ul>
                        <div className="card-body">
                            <button className="btn btn-outline-dark fw-bold w-100" onClick={viewPosts}>
                                Ver publicaciones de este servicio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};