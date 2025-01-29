/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Rating_Oferente } from '../Ratings/Ratings_Oferente';
import { toast } from 'react-toastify';

export const Profile = () => {
    const { token } = useAuth('state');
    const { logout } = useAuth("actions");
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [{ data, isLoading, errors }, doFetch] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);

    const handleEditarPerfil = () => {
        navigate(`/profile/edit`);
    };

    const handleDeleteProfile = async () => {
        if (window.confirm('¿Está seguro de eliminar su cuenta?')) {
            setIsDeleting(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('Error al eliminar la cuenta.');
                }

                const text = await response.text();
                const data = text ? JSON.parse(text) : {};

                if (data.message) {
                    toast.error(data.message);
                } else {
                    toast.success('Cuenta eliminada con éxito.');
                }

                logout();
                navigate('/login');

            } catch (error) {
                console.error(error);
            } finally {
                setIsDeleting(false);
            }
        };
    };

    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar datos del perfil.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <h1>Mi perfil</h1>
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
                                    <h2 className='card-title'><strong> {data.first_name} {data.last_name} </strong> </h2>
                                    <p className='card-text mt-4'><strong>Usuario:</strong> {data.username} </p>
                                    <p><strong>Email:</strong> {data.email} </p>
                                    <p><strong>Celular:</strong> {data.telephone} </p>
                                    {data.is_supplier === true && <p><strong>Rol: </strong>Oferente/Proveedor</p>}
                                    {data.is_finder === true && <p><strong>Rol: </strong>Buscador</p>}
                                    <button
                                        className="btn btn-dark fw-bold me-3 mt-4"
                                        onClick={handleEditarPerfil}
                                    >
                                        Editar perfil
                                    </button>
                                    <button
                                        className="btn btn-danger fw-bold mt-4"
                                        onClick={handleDeleteProfile}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? 'Eliminando....' : 'Eliminar Cuenta'}
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            {data.is_supplier === true && <Rating_Oferente id_oferente={data.id} />}
            

        </div>
    )
};