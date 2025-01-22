/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Rating_Oferente } from './Ratings_Oferente';

export const Ratings = () => {
    const { token } = useAuth('state');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const location = useLocation();
    const { firstName, lastName, userId } = location.state || {}; // Extrae los datos del estado
    const [{ data_user, isLoading_user, errors_user }, doFetch_user] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch_user();
    }, []);

    const [formData, setFormData] = useState({ rating: "", comment: "", oferente_id: userId || "", buscador_id: "",});

    useEffect(() => {
        if (data_user) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                buscador_id: data_user.id,
            }));
        }
    }, [data_user]);

    // enviar calificacion al oferente
    const [{ data, isLoading, errors }, doFetch] = useFetch(`${import.meta.env.VITE_BASE_URL}api/ratings/`, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    const handleStarClick = (value) => {
        setFormData({ ...formData, rating: value });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.rating) {
            alert('Por favor, selecciona una calificación.');
            return;
        }
        const isConfirmed = window.confirm('¿Estás seguro de que deseas calificar al oferente?');
        if (isConfirmed) {
            const form = new FormData();
            form.append("rating", formData.rating);
            form.append("comment", formData.comment);
            form.append("buscador_id", formData.buscador_id); 
            form.append("oferente_id", formData.oferente_id);

            doFetch({ body: form });
            console.log(form)
            setFeedbackMessage(data ? '¡Servicio calificado con éxito!' : 'Error al calificar el servicio.');
        }
    }

    // Estilos para las estrellas de calificación
    const starStyles = {
        star: { cursor: 'pointer', fontSize: '24px', margin: '0 5px', color: 'gray' },
        starSelected: { color: 'gold' },
    };

    console.log("Datos antes de enviar:", {
        rating: formData.rating,
        comment: formData.comment,
        buscador_id: formData.buscador_id, // falla al implementar 
        oferente_id: formData.oferente_id,
    });

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <h1>Calificar al Oferente</h1>
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
                                    <h2 className='card-title'><strong> {firstName} {lastName} </strong> </h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="rating" className="form-label">Calificación:</label>
                                            <div style={starStyles.container}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        onClick={() => handleStarClick(star)}
                                                        style={formData.rating >= star ? { ...starStyles.star, ...starStyles.starSelected } : starStyles.star}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="comment" className="form-label">Comentario</label>
                                            <input type="text" className="form-control" id="comment" name="comment" defaultValue=""
                                                required autoComplete="comentario"
                                                value={formData.comment}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button
                                            type='submit'
                                            className="btn btn-dark fw-bold me-3 mt-4"
                                        >
                                            Calificar
                                        </button>
                                        <div className="mb-3 text-center">
                                            <div className="control">
                                                <p>{feedbackMessage}</p>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <Rating_Oferente userId={userId} />

        </div>
    )
};