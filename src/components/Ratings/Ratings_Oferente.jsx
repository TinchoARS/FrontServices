/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';

export const Rating_Oferente = ({ id_oferente }) => {
    const { token } = useAuth('state');
    const [{ data, isLoading, errors }, doFetch] = useFetch(`${import.meta.env.VITE_BASE_URL}api/ratings/?user=${id_oferente}`, {
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


  
    const renderStars = (stars) => {
        const totalStars = 5;
        const starStyle = { fontSize: '30px', color: 'gray', marginRight: '5px' };

        return (
            <div>
                {[...Array(totalStars)].map((star, index) => (
                    <span key={index} style={index < stars ? { ...starStyle, color: 'gold' } : starStyle}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <h1>Calificaciones</h1>
                    <hr className="border border-primary border-2 opacity-50" />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-8">
                                <div className="card-body mt-3">
                                    {/* Mostrar las calificaciones del oferente */}
                                    {isLoading ? (
                                        <p>Cargando calificaciones...</p>
                                    ) : errors ? (
                                        <p>Error al cargar las calificaciones.</p>
                                    ) : (
                                        data && data.length > 0 ? (
                                            <div>
                                                <h3>Calificaciones</h3>
                                                {data.map((rating) => (
                                                    <div key={rating.id} className="mb-3">
                                                        {renderStars(rating.stars)}
                                                        <p>{rating.comment}</p>
                                                        {/* <p className='text-body-tertiary'>Autor: {rating.user.first_name} {rating.user.last_name}</p> */}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>No hay calificaciones disponibles.</p>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};