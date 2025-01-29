/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from '../../hooks/fetchHook';
import { PostCard } from './PostCard';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CgMathPlus } from "react-icons/cg";
import { useLocation,useNavigate } from 'react-router-dom';

export const PostsList = () => {
    const navigate = useNavigate();
    const { token } = useAuth('state');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const serviceId = query.get('service');
    const fetchUrl = serviceId ? `${import.meta.env.VITE_BASE_URL}api/posts/?service=${serviceId}` : `${import.meta.env.VITE_BASE_URL}api/posts/`;
    const [ {data, isLoading, errors}, doFetch ] = useFetch(fetchUrl, {
        method: 'GET',
    });

    const [{ data: profileData, isLoading: isLoadingProfile, errors: errorsProfile }, doFetchProfile] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
    });

    useEffect(() => {
        doFetch();
        doFetchProfile();
    }, [serviceId]);

    const handleAddService = () => {
        navigate('/posts/addPost');
    };

    if (isLoading || isLoadingProfile ) return <div className='container text-center'>Cargando...</div>;
    if (errors || errorsProfile) return <div className='container text-center'>Error al cargar los posts.</div>;
    if (!data || !profileData) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex align-items-center">
                    <h1 className="flex-grow-1"> Publicaciones </h1>
                    { profileData && profileData.is_supplier && (
                        <button type="button" className="btn btn-dark" onClick={handleAddService}>
                            <CgMathPlus /> Agregar Publicación
                        </button>
                    )}
                </div>
                <hr className="border border-primary border-2 opacity-50" />
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