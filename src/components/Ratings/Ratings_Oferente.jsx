/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Rating_Oferente = ({userId}) => {
    const { token } = useAuth('state');
    const [{ data, isLoading, errors }, doFetch] = useFetch(`${import.meta.env.VITE_BASE_URL}api/ratings/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);


    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar datos del perfil.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    // Filtrar los ratings que coincidan con el userId
    const filteredRatings = data.filter((rating) => rating.oferenteId  === userId); // OFERENTE !

    // Estilos para las estrellas de calificación
    const starStyles = {
        star: { cursor: 'pointer', fontSize: '24px', margin: '0 5px', color: 'gray' },
        starSelected: { color: 'gold' },
    };

    //const ratingData = 3;

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <h1>Calificaciones</h1>
                    <hr />
                </div>
            </div>
            {filteredRatings.length === 0 ? (
                <div className="alert alert-warning text-center" role='alert'>No hay servicios disponibles.</div>
            ) : (
                filteredRatings.map((rating, index) => (
                    <div className="row" key={index}>
                        <div className="col-12">
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-8">
                                        <div className="card-body mt-3">
                                            <p className='card-text mt-4'><strong>Usuario:</strong> {data.username} </p>
                                            <div className="mb-3">
                                                <label htmlFor="rating" className="form-label">Calificación:</label>
                                                <div style={starStyles.container}>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            key={star}
                                                            style={rating.rating >= star ? { ...starStyles.star, ...starStyles.starSelected } : starStyles.star}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="comment" className="form-label">Comentario</label>
                                                <input
                                                    type="text"
                                                    className="form-control" id="comment" name="comment"
                                                    value={rating.comment}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )
            }

        </div>
    )
};