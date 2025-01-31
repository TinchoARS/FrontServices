/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import '../../styles/ServiceCard.css';
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import useFetch from '../../hooks/fetchHook';
import { useEffect } from "react";

export const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const { token } = useAuth('state');
  const timeAgo = formatDistanceToNow(new Date(service.created_at), { addSuffix: true, locale: es });

  const [{ data, isLoading, errors }, doFetch] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
    method: 'GET',
    headers: {
        'Authorization': `Token ${token}`,
    },
  });

  useEffect(() => {
      doFetch();
  }, []);

    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar datos del perfil.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

  const handleServiceDetails = () => {
    navigate(`/services/${service.id}/`);
  };

  const handleDeleteService = async () => {
    toast.promise(
      fetch(`${import.meta.env.VITE_BASE_URL}api/services/${service.id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      }).then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el servicio');
        }
        return response;
      }),
      {
        pending: 'Eliminando servicio...',
        success: 'Servicio eliminado correctamente',
        error: 'Error al eliminar el servicio'
      }
    ).finally(() => {
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Espera 2 segundos antes de recargar la página
    });
  };

  return (
    <div id="cardService" className="cardServ">
      { data.is_supplier === true ? (
          <button className="delete-cta" onClick={handleDeleteService}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
          </button>
        ) : (
          <button className="delete-cta"></button>
        )}
        
      <div className="containerCardService">
        <div className="left">
          <div className="status-ind"></div>
        </div>
        <div className="right">
          <div className="text-wrap">
            <p className="text-content">
              <a className="text-link" href="#">{service.category}</a>
            </p>
            <p className="text-content">{service.title}</p>
            <p className="time">Publicado {timeAgo}</p>
          </div>
          <div className="button-wrap">
            <button className="primary-cta" onClick={handleServiceDetails}>Ver detalles</button>
          </div>
        </div>
      </div>
    </div>
  );
};