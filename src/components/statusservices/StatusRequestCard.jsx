/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';

export const StatusRequestCard = ({ statusrequest, profile }) => {
  const { token } = useAuth('state');
  const navigate = useNavigate();
  const [status, setStatus] = useState({ status: statusrequest.status, user_id: "", });
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [{ data_c, isError_c, isLoading_c }, doFetch_c] = useFetch(
    `${import.meta.env.VITE_BASE_URL}api/statusservices/update/`,
    {
      method: "POST",
      headers: {
        'Authorization': `Token ${token}`,
    },
    }
  );

  useEffect(() => {
    setStatus({ status: statusrequest.status });
  }, [statusrequest.status]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm('¿Estás seguro de que deseas calificar al oferente?');
    if (isConfirmed) {
      const form = new FormData();
      form.append("status", status.status); //estado
      form.append("id", statusrequest.id); //id del status_service a cambia
      doFetch_c({ body: form });
      console.log(form)
      setFeedbackMessage(data_c ? '¡El cambio de estado se ha finalizado correctamente.!' : 'Hubo un problema al intentar cambiar el estado.');
    }
  };

  const handleClick = () => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      status: prevStatus.status === "en progreso" ? "finalizado" : "en progreso",
    }));
  };

  const handleEditarPerfil = () => {
    navigate(`/ratings`, { //interesante uso de state aunque no tiene persistencia
      state: {
        firstName: statusrequest.user.first_name,
        lastName: statusrequest.user.last_name,
        username: statusrequest.user.username,
        email: statusrequest.user.email,
        telephone: statusrequest.user.telephone,
        id_oferente: statusrequest.user.id,
        state_oferente: statusrequest.status,
      },
    });
  };

  const anchoCard = {
    width: "auto",
  };

  return (
    <div className="card" style={anchoCard}>
      <div className="card-body">
        <li className="list-group-item">
          <span className="badge bg-warning text-bg-dark">estado: {statusrequest.status}</span>
          {profile.is_supplier === true && (
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <button onClick={handleClick} className="btn btn-dark fw-bold me-3 mt-4">
                  Cambiar estado
                </button>
                <div className="mb-3 text-center">
                  <div className="control">
                    <p>{feedbackMessage}</p>
                  </div>
                </div>
              </form>
            </div>
          )}
        </li>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"> {statusrequest.dateupdated} </li>
        <li className="list-group-item"> id del estado del servicio: {statusrequest.id} </li>
        <li className="list-group-item"> a cargo del oferente: <strong>{statusrequest.user.username}</strong> </li>
      </ul>

      {statusrequest.status === "finalizado" && profile.is_finder === true && (
        <div className="card-body">
          <button className="btn btn-outline-dark fw-bold w-100"
            onClick={handleEditarPerfil}>
            calificar
          </button>
        </div>
      )}
    </div>
  );
};