import useFetch from '../../hooks/fetchHook';
import { useEffect, useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { RequestCard } from './RequestCard';

export const RequestsList = () => {
    const { token } = useAuth('state');

    const [{ data: requestsData, isLoading: isLoadingRequests, errors: errorsRequests }, doFetchRequests] = useFetch(`${import.meta.env.VITE_BASE_URL}api/requests/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
    });

    const [{ data: profileData, isLoading: isLoadingProfile, errors: errorsProfile }, doFetchProfile] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
    });

    const [filteredRequests, setFilteredRequests] = useState([]);

    useEffect(() => {
        doFetchProfile();
        doFetchRequests();
    }, []);
    
    useEffect(() => {
        if (profileData && requestsData) {
            if(profileData.is_finder){
            const filtered = requestsData.filter(request => request.user.id === profileData.id);
            setFilteredRequests(filtered);
        } else if (profileData.is_supplier){
            const filtered = requestsData.filter(request => request.post.user.id === profileData.id);
            setFilteredRequests(filtered);
        }}

    }, [profileData, requestsData]);

    if (isLoadingRequests || isLoadingProfile) return <div className='container text-center'>Cargando...</div>;
    if (errorsRequests || errorsProfile) return <div className='container text-center'>Error al cargar los datos.</div>;
    if (!requestsData || !profileData) return <div className='container text-center'>La Sesión ha expirado, vuelva a iniciar sesión.</div>;

    return (
        <div className="container">
            <div className="row">
                <h1>Mis solicitudes</h1>
                <hr />
            </div>

            <div className="row mb-3">
                <div className="btn-group">
                    <button className="btn btn-outline-dark">Todos</button>
                    <button className="btn btn-outline-dark">Rechazados</button>
                    <button className="btn btn-outline-dark">Pendientes</button>
                    <button className="btn btn-outline-dark">Aceptadas</button>
                </div>
            </div>
            {/* esto esta horrible pero basicamente si el perfil logueado 
            es oferente muestra las solicitudes con los botones aceptar y rechazar 
            si es buscador solo muestra las solicitudes que mando
            */}
            <div className="row"> {profileData.is_supplier ? ( 
                filteredRequests.length === 0 ?
                ( <div className="alert alert-warning text-center" role='alert'>No hay servicios disponibles para oferentes.</div> 
                ) : ( filteredRequests.map((request, index) => ( 
                <div key={index} className="col-12 col-md-4 mb-4"> 
                <RequestCard key={index} request={request} /> 
                <div className="btn-group mt-2"> 
                <button className="btn btn-success">Aceptar</button> 
                <button className="btn btn-danger">Rechazar</button> </div> </div> )) )
             ) : ( filteredRequests.length === 0 ? ( 
             <div className="alert alert-warning text-center" role='alert'>No hay servicios disponibles para buscador.</div>
              ) : ( filteredRequests.map((request, index) => ( 
              <div key={index} className="col-12 col-md-4 mb-4">
                 <RequestCard key={index} request={request} /> </div> )) ) )} </div>
        </div>
    );
};
