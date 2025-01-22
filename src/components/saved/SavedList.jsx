/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useFetch from '../../hooks/fetchHook';
import { useEffect } from 'react';
import { PostCard } from '../posts/PostCard';

export const SavedList = () => {
    // const navigate = useNavigate();
    // const { token } = useAuth('state');
    // const [ {data, isLoading, errors}, doFetch ] = useFetch(`${import.meta.env.VITE_BASE_URL}api/saved`, {
    //     method: 'GET',
    // });

    // useEffect(() => {
    //     doFetch();
    // }, []);

    // if (isLoading) return <div className='container text-center'>Cargando...</div>;
    // if (errors) return <div className='container text-center'>Error al cargar datos.</div>;
    // if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    // const data = [
    //     {
    //         id: 1,
    //         id_post: 3,
    //         id_user: 12,
    //         post: {
    //             id: 3,
    //             description: 'Reparación de computadoras de escritorio y portátiles. Instalación de software y mantenimiento preventivo.',
    //             category: 'Tecnología',
    //             user: {
    //                 id: 12,
    //                 first_name: 'Juan',
    //                 last_name: 'Pérez',
    //                 email: 'juan@gmail.com',
    //                 telephone: '1234567890',
    //             },
    //             service: {
    //                 id: 1,
    //                 title: 'Reparación de computadoras',
    //             }
    //         }
    //     },
    //     {
    //         id: 2,
    //         id_post: 4,
    //         id_user: 13,
    //         post: {
    //             id: 4,
    //             description: 'Reparación de celulares de todas las marcas y modelos. Cambio de pantalla, batería y otros componentes.',
    //             category: 'Tecnología',
    //             user: {
    //                 id: 13,
    //                 first_name: 'María',
    //                 last_name: 'Gómez',
    //                 email: 'maria@gmail.com',
    //                 telephone: '0987654321',
    //             },
    //             service: {
    //                 id: 2,
    //                 title: 'Reparación de celulares',
    //             }
    //         }
    //     },
    // ]

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Mis Guardados</h1>
                    <hr />
                </div>
            </div>
            <div className="row">
            {/* { data.length === 0 ? (
                        <div className="alert alert-warning text-center" role='alert'>No hay publicaciones guardadas.</div>
                    ) : (
                        data.map((post, index) => (
                            <div key={index} className="col-12 col-md-4 mb-4">
                                <PostCard key={index} post={post.post} />
                            </div>
                        ))
                    )
                } */}
            </div>
        </div>
    );
};