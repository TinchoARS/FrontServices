/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/fetchHook";
import { SlArrowLeft } from "react-icons/sl";
import '../../styles/ServiceCard.css';
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

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
    const timeAgo = formatDistanceToNow(new Date(data.created_at), { addSuffix: true, locale: es });


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

                    <div id="cardService" className="cardServ">
                        <div className="containerCardService">
                            <div className="left">
                            <div className="status-ind"></div>
                            </div>
                            <div className="right">
                            <div className="text-wrap">
                                <p className="text-content">
                                <a className="text-link" href="#">{data.category}</a>
                                </p>
                                <p className="text-content">{data.title}</p>
                                <p className="text-content">{data.description}</p>
                                <p className="text-content">Duración: {data.duration}</p>
                                <ul className="list-group">
                                    <li className="">
                                        {data.tags && data.tags.split(",").map((tag, index) => (
                                            <span key={index} className="badge text-bg-dark ms-1">
                                                {tag}
                                            </span>
                                        ))}
                                    </li>
                                </ul>
                                <p className="time mt-4">Publicado {timeAgo}</p>
                            </div>
                            <div className="button-wrap">
                                <button className="primary-cta" onClick={viewPosts}>Ver publicaciones de este servicio</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};