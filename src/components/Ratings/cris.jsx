/*
import { useEffect } from 'react';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Rating_Oferente } from './Ratings_Oferente';

export const Ratings = () => {
    const { token } = useAuth('state');
    const location = useLocation();
    const { firstName, lastName, username, email, telephone, id_oferente, state_oferente,} = location.state || {};
    console.log("state: ", state_oferente);

    // Fetch para obtener las calificaciones del oferente
    const ratings_url = `${import.meta.env.VITE_BASE_URL}api/ratings/?user=${id_oferente}`;
    const [{ data: data_ratings, isLoading: isLoading_ratings, error: error_ratings }, doFetch_ratings] = useFetch(ratings_url, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch_ratings();
    }, []);

    // Función para renderizar las estrellas
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
                    <h1>Perfil del Oferente</h1>
                    <hr />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src='src/assets/userLogo.jpeg' className="card-img-top p-5" alt="foto de perfil" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body mt-3">
                                    <h1 className='card-title'><strong> {firstName} {lastName} </strong> </h1>
                                    <p className='card-text mt-4'><strong>Usuario:</strong> {username} </p>
                                    <p><strong>Email:</strong> {email} </p>
                                    <p><strong>Celular:</strong> {telephone} </p>

                                    {/* Mostrar las calificaciones del oferente 
                                    {isLoading_ratings ? (
                                        <p>Cargando calificaciones...</p>
                                    ) : error_ratings ? (
                                        <p>Error al cargar las calificaciones.</p>
                                    ) : (
                                        data_ratings && data_ratings.length > 0 ? (
                                            <div>
                                                <h3>Calificaciones</h3>
                                                {data_ratings.map((rating) => (
                                                    <div key={rating.id} className="mb-3">
                                                        {renderStars(rating.stars)}
                                                        <p>{rating.comment}</p>
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
            {state_oferente && <Rating_Oferente id_oferente={id_oferente} />}
        </div>
    );
};
*/