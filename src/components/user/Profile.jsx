import { useEffect } from 'react';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const { token } = useAuth('state');
    const navigate = useNavigate();

    const handleEditarPerfil = () => {
        navigate(`/profile/edit`);
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <h2 className='mb-4'>Perfil</h2>

                    <div className="card">
                        {/* <img src={data.imagen} className="card-img-top" alt="foto de perfil" /> */}
                        <div className="card-body">
                            <h5 className='card-title'><strong> nombre - Apellido </strong> </h5>
                            <p className='card-text'><strong>Usuario:</strong> username </p>
                            <p><strong>Email:</strong> email </p>
                            <p><strong>Celular:</strong> celular </p>
                            <button className="btn btn-success fw-bold" onClick={handleEditarPerfil}>
                                Editar perfil
                            </button>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    )
};