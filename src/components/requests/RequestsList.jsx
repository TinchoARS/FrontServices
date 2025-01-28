import useFetch from '../../hooks/fetchHook';
import { useEffect, useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { RequestCard } from './RequestCard';

export const RequestsList = () => {
  const { token } = useAuth('state');
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);

  const [{ data: profileData, isLoading: isLoadingProfile, errors: errorsProfile }, doFetchProfile] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
  });

  const [{ data: requestsData, isLoading: isLoadingRequests, errors: errorsRequests }, doFetchRequests] = useFetch(`${import.meta.env.VITE_BASE_URL}api/requests/?user=${profileData?.id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
  });

  useEffect(() => {
    doFetchProfile();
  }, []);

  useEffect(() => {
    if (profileData) {
      doFetchRequests();
    }
  }, [profileData]);

  useEffect(() => {
    if (requestsData) {
      setFilteredRequests(requestsData);
    }
  }, [requestsData]);

  if (isLoadingProfile || !profileData) {
    return <div className='container text-center'>Cargando...</div>;
  }

  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
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
            profileId={profileData.id}
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
            profileId={profileData.id}
            /> 
            </div>  ))
          ) 
        )} 
      </div>
    </div>
  );
};