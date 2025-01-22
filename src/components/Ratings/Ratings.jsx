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
    const [formData, setFormData] = useState({ rating: "", comment: "" })

    //obtener todas la calificaciones del oferente
    const [{ data, isLoading, errors }, doFetch] = useFetch(`${import.meta.env.VITE_BASE_URL}api/ratings/`, { 
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);


    /*Análisis de los Datos Necesarios
    Calificar al oferente:
    
    * Requiere:
    ID del usuario oferente: Identifica al proveedor del servicio.
    ID del usuario buscador: Identifica a la persona que califica al oferente.
    Rating: La puntuación que el buscador asigna al oferente (valor numérico de 1 a 5).
    Comment: Un comentario breve del buscador.
    Vista de calificación del oferente:
    
    * Debe mostrar:
    ID del usuario oferente: Para asociar la calificación con el perfil del oferente.
    ID del usuario buscador: Para identificar quién realizó la calificación.
    Ratings: La puntuación otorgada.
    Comment: El comentario proporcionado.
    Tabla de calificaciones:
    
    * Diseñada para almacenar:
    ID del usuario oferente: El calificado.
    ID del usuario buscador: El que califica.
    Rating: Puntuación.
    Comment: Comentario. */

    // enviar calificacion al oferente
    const [{ data_R, isError_R, isLoading_R }, doFetch_R] = useFetch(
        `${import.meta.env.VITE_BASE_URL}api/ratings/`,
        {
            method: "POST",
        }
    );

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

            doFetch_R({ body: form });
            console.log(form)
            setFeedbackMessage(data_R ? '¡Servicio calificado con éxito!' : 'Error al calificar el servicio.');
        }
    }


    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar datos del perfil.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    if (data_R) {
        setFeedbackMessage('¡Servicio calificado con éxito!');
    } else if (isError_R) {
        setFeedbackMessage('Error al cargar los datos.');
    }

    // Estilos para las estrellas de calificación
    const starStyles = {
        star: { cursor: 'pointer', fontSize: '24px', margin: '0 5px', color: 'gray' },
        starSelected: { color: 'gold' },
    };

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
                                {/* <img src={data.imagen} className="card-img-top" alt="foto de perfil" /> */}
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

            <Rating_Oferente userId={userId}/>

        </div>
    )
};