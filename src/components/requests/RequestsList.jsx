/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from '../../hooks/fetchHook';
import { useEffect, useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { RequestCard } from './RequestCard';

export const RequestsList = () => {
    const { token } = useAuth('state');
    const [statusFilter,setStatusFilter] = useState('');
    const fetchUrl = statusFilter ? `${import.meta.env.VITE_BASE_URL}api/requests/?status=${statusFilter}` : `${import.meta.env.VITE_BASE_URL}api/requests/`;
   
    const [{ data: requestsData, isLoading: isLoadingRequests, errors: errorsRequests }, doFetchRequests] = useFetch(fetchUrl, {
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
    }, [statusFilter]);
    
    useEffect(() => {
        if (profileData && requestsData) {
            if(profileData.is_finder){
            const filtered = requestsData.filter(request => request.user.id === profileData.id); //si es buscador me trae las solicitudes creadas por el buscador q sean iguales al buscador logueado
            setFilteredRequests(filtered);
        } else if (profileData.is_supplier){
            const filtered = requestsData.filter(request => request.post.user.id === profileData.id); //si es oferente me trae las solicitudes de los post creados por el oferente logueado
            setFilteredRequests(filtered);
        }}

    }, [profileData, requestsData]);

    if (isLoadingRequests || isLoadingProfile) return <div className='container text-center'>Cargando...</div>;
    if (errorsRequests || errorsProfile) return <div className='container text-center'>Error al cargar los datos.</div>;
    if (!requestsData || !profileData) return <div className='container text-center'>La Sesión ha expirado, vuelva a iniciar sesión.</div>;
    
    const handleFilterChange = (status) => {
        setStatusFilter(status);
    };
    return (
        <div className="container">
            <div className="row">
                <h1>Mis solicitudes</h1>
                <hr />
            </div>

            <div className="row mb-3">
                <div className="btn-group">
                    <button className="btn btn-outline-dark" onClick={() => handleFilterChange('')}>Todos</button>
                    <button className="btn btn-outline-dark" onClick={() => handleFilterChange('rejected')}>Rechazados</button>
                    <button className="btn btn-outline-dark" onClick={() => handleFilterChange('pending')}>Pendientes</button>
                    <button className="btn btn-outline-dark" onClick={() => handleFilterChange('accepted')}>Aceptadas</button>
                </div>
            </div>
            {/* esto esta horrible pero basicamente si el perfil logueado 
            es oferente muestra las solicitudes con los botones aceptar y rechazar 
            si es buscador solo muestra las solicitudes que mando
            */}
            <div className="row"> 
                {profileData.is_supplier ? ( 
                    filteredRequests.length === 0 ? ( 
                        <div className="alert alert-warning text-center" role='alert'>No hay servicios disponibles para oferentes.</div> 
                    ) : ( filteredRequests.map((request, index) => ( 
                        <div key={index} className="col-12 col-md-4 mb-4"> 
                        <RequestCard 
                        key={index} 
                        request={request}
                        token={token} //provisorio,cambiar a la extraccion por profile 
                        isSupplier={profileData.is_supplier}
                        setFilteredRequests={setFilteredRequests}
                        filteredRequests={filteredRequests}
                        /> 
                        </div>
                    )) 
                    )
             ) : ( filteredRequests.length === 0 ? ( 
             <div className="alert alert-warning text-center" role='alert'>No hay servicios disponibles para buscador.</div>
              ) : ( filteredRequests.map((request, index) => ( 
              <div key={index} className="col-12 col-md-4 mb-4">
                 <RequestCard 
                 key={index}
                 request={request}
                 token={token}//provisorio,cambiar a la extraccion por profile 
                 isSupplier={profileData.is_supplier}
                 setFilteredRequests={setFilteredRequests}
                 filteredRequests={filteredRequests}
                 /> 
                 </div> ))
                  ) 
                )} 
            </div>
        </div>
    );
};
