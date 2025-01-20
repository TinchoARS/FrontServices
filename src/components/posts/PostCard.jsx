/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';


export const PostCard = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [message, setMessage] = useState(''); // Estado para el mensaje del usuario
  const { token } = useAuth('state');
  const navigate = useNavigate();

  const anchoCard = { width: '100%' };

  const handleClick = () => {
    setIsModalOpen(true); // Mostrar el modal al hacer clic
  };

  const handleConfirm = async () => {
    try {
        console.log(post.id)
      // Aquí realizamos el POST con el mensaje del usuario y el ID del post
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/requests/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          post_id: post.id,
          message: message,
        }),
      });

      if (response.ok) {
        alert('Solicitud registrada correctamente');
        // Aquí puedes actualizar el estado o recargar los datos de la página
        // por ejemplo, actualizando el estado del post, o realizando un fetch nuevamente
        setIsModalOpen(false); // Cerrar el modal
        navigate('/requests');  
    } else {
        alert('Hubo un error al registrar la solicitud');
      }
    } catch (error) {
      alert('Error en la solicitud');
    }
  };

  return (
    <div className="card mb-3" style={anchoCard}>
      <div className="row g-0">
        <div className="col-md-1">
          <img src='src/assets/userLogo.jpeg' alt="User" className="img-fluid rounded-start p-2" width={'100px'}/>
        </div>
        <div className="col-md-11">
          <div className="card-body">
            <h5 className="card-title">{post.user.first_name} {post.user.last_name}</h5>
            <p className="card-text">{post.description}</p>
            <span className="badge text-bg-dark">{post.service.title}</span>
            <p className="card-text">Disponibilidad: {post.disponibility}</p>
            <p className="card-text">
              <small className="text-muted">creado el {new Date(post.datecreated).toISOString().slice(0, 19).replace('T', ' ')}</small>
            </p>
            <button
              className="btn btn-outline-dark fw-bold w-100 mt-3"
              style={{ backgroundColor: '#66b3a5', color: 'white' }}
              onClick={handleClick}
            >
              Contratar servicio
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {isModalOpen && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar solicitud</h5>
              </div>
              <div className="modal-body">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  rows="4"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleConfirm}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
