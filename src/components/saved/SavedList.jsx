/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useFetch from '../../hooks/fetchHook';
import { useEffect } from 'react';
import { PostCard } from '../posts/PostCard';

export const SavedList = () => {
    const navigate = useNavigate();
    const { token } = useAuth('state');
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`${import.meta.env.VITE_BASE_URL}api/savedPosts`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    useEffect(() => {
        doFetch();
    }, []); // Dependencia vacía para ejecutar solo una vez

    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar datos.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Mis Guardados</h1>
                    <hr />
                </div>
            </div>
            <div className="row">
            { data.length === 0 ? (
                        <div className="alert alert-warning text-center" role='alert'>No hay publicaciones guardadas.</div>
                    ) : (
                        data.map((savedPost, index) => (
                            <div key={index} className="col-12 mb-4">
                                <PostCard key={index} post={savedPost.post} />
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};