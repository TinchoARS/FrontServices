import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';
import {StatusRequestCard} from './StatusRequestCard';

export const StatusRequest = () => {
    
    const queryParams = new URLSearchParams(location.search);
    const requestId = queryParams.get('request');
    const { token } = useAuth('state');
    
    const [{ data, isLoading, errors }, doFetch] = useFetch(`${import.meta.env.VITE_BASE_URL}api/statusservices/?request=${requestId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
    });
    const [{ data: profileData, isLoading: isLoadingProfile, errors: errorsProfile }, doFetchProfile] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
    });

    useEffect(() => {
        doFetch();
        doFetchProfile();
    }, [requestId]);

    if (isLoading || isLoadingProfile) return <div className='container text-center'>Cargando...</div>;
    if (errors || errorsProfile) return <div className='container text-center'>Error al cargar los datos.</div>;
    if (!data || !profileData) return <div className='container text-center'>La Sesión ha expirado, vuelva a iniciar sesión.</div>;
    
    return (
        <div>{
            data.map((statusrequest,index) => (
                <div key={index} className="col-12 col-md-4 mb-4">
                    <StatusRequestCard statusrequest={statusrequest} />
                </div>
            ))
        }
        </div>
    );
};
