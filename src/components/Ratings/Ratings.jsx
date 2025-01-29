/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Rating_Oferente } from './Ratings_Oferente';
import { toast } from 'react-toastify';

export const Ratings = () => {
    const { token } = useAuth('state');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const location = useLocation();
    const { firstName, lastName, username, email, telephone, id_oferente, state_oferente,} = location.state || {};
    const [formData, setFormData] = useState({ stars: "", comment: "" , user_id: id_oferente});

    // Fetch para obtener las calificaciones del oferente
    const ratings_url = `${import.meta.env.VITE_BASE_URL}api/ratings/`;
    const [{ data: data_ratings, isLoading: isLoading_ratings, error: error_ratings }, doFetch_ratings] = useFetch(ratings_url, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    const handleStarClick = (value) => {
        setFormData({ ...formData, stars: value });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.stars) {
            toast.error('Por favor, selecciona una calificación.');
            return;
        }
        const isConfirmed = window.confirm('¿Estás seguro de que deseas calificar al oferente?');
        if (isConfirmed) {
            const form = new FormData();
            form.append("stars", formData.stars);
            form.append("comment", formData.comment);
            form.append("user_id", formData.user_id);

            doFetch_ratings({ body: form });
            console.log(form)
            toast.success('Calificación enviada con éxito.');
            window.location.reload();
        }
    }

    // Estilos para las estrellas de calificación
    const starStyles = {
        star: { cursor: 'pointer', fontSize: '24px', margin: '0 5px', color: 'gray' },
        starSelected: { color: 'gold' },
    };

    if (error_ratings) return <div className='container text-center'>Error al cargar datos del perfil.</div>;

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <h1>Calificar al Oferente</h1>
                    <hr className="border border-primary border-2 opacity-50" />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src='src/assets/userLogo.jpeg' className="card-img-top p-5" alt="foto de perfil" />
                                {/* <img src={data.imagen} className="card-img-top" alt="foto de perfil" /> */}
                            </div>
                            <div className="col-md-8">
                                <div className="card-body mt-3">
                                    <h2 className='card-title'><strong> {firstName} {lastName} </strong> </h2>
                                    <p className='card-text mt-4'><strong>Usuario:</strong> {username} </p>
                                    <p><strong>Email:</strong> {email} </p>
                                    <p><strong>Celular:</strong> {telephone} </p>

                                    {state_oferente &&  
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="rating" className="form-label">Calificación:</label>
                                            <div style={starStyles.container}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        onClick={() => handleStarClick(star)}
                                                        style={formData.stars >= star ? { ...starStyles.star, ...starStyles.starSelected } : starStyles.star}
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
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {<Rating_Oferente id_oferente={id_oferente} />}
        </div>
    )
};