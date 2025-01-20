import useFetch from '../../hooks/fetchHook';
import { PostCard } from './PostCard';
import { useEffect } from 'react';

export const PostsList = () => {
    const [ {data, isLoading, errors}, doFetch ] = useFetch(`${import.meta.env.VITE_BASE_URL}api/posts/`, {
        method: 'GET',
    });
    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar los posts.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    return (
        <div className="container">
            <div className="row">
                <h1>Publicaciones</h1>
                <hr />
            </div>
           
            <div className="row">
                    { data.length === 0 ? (
                        <div className="alert alert-warning text-center" role='alert'>No hay posts disponibles.</div>
                    ) : (
                        data.map((post, index) => (
                            <div key={index} className="col-12 mb-4">
                                <PostCard key={index} post={post} />
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
};