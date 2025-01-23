/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from '../../hooks/fetchHook';
import { PostCard } from './PostCard';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CgMathPlus } from "react-icons/cg";
import { useLocation,useNavigate } from 'react-router-dom';

export const PostsList = () => {
    const navigate = useNavigate();
    const { token } = useAuth('state');
    const [user, setUser] = useState(null)
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const serviceId = query.get('service');
    const fetchUrl = serviceId ? `${import.meta.env.VITE_BASE_URL}api/posts/?service=${serviceId}` : `${import.meta.env.VITE_BASE_URL}api/posts/`;
    const [ {data, isLoading, errors}, doFetch ] = useFetch(fetchUrl, {
        method: 'GET',
    });
    useEffect(() => {
        doFetch();
    }, [serviceId]);

    // Otro fetch para traer informacion del usuario logueado
    // hola soy goku, y si hacemos otro fetch pero no en un useefect si no en el mismo que el de arriba 
    //total ninguno depende del otro en sentido de llamados #discutir 
    //hace multiples llamadas a fetchuser por que esta dentro del if data
    useEffect(() => {
        if (data) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Token ${token}`,
                        },
                    });
                    if (!response.ok) {
                        console.log('Error al obtener los datos del usuario');
                    }
                    const user_data = await response.json();
                    setUser(user_data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchUser();
        }
    }, [data, token]);

    const handleAddService = () => {
        navigate('/posts/addPost');
    };

    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar los posts.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex align-items-center">
                    <h1 className="flex-grow-1"> Publicaciones </h1>
                    { user && user.is_supplier && (
                        <button type="button" className="btn btn-dark" onClick={handleAddService}>
                            <CgMathPlus /> Agregar Publicación
                        </button>
                    )}
                </div>
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