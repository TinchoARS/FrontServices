/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import useFetch from '../../hooks/fetchHook';
import { useEffect,useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

//se configuro el boton contratar servicio solo para el usuario buscador
export const PostCard = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [message, setMessage] = useState(''); // Estado para el mensaje del usuario
  const { token } = useAuth('state');
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const [{ data: profileData, isLoading: isLoadingProfile, errors: errorsProfile }, doFetchProfile] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
  });

  const anchoCard = { width: '100%' };
  useEffect(() => {
    doFetchProfile();
}, []);
  const handleClick = () => {
    setIsModalOpen(true); // Mostrar el modal al hacer clic
  };

  const handleEditarPerfil = () => {
    navigate(`/ratings`, { //interesante uso de state aunque no tiene persistencia
      state: {
        firstName: post.user.first_name,
        lastName: post.user.last_name,
        username: post.user.username,
        email: post.user.email,
        telephone: post.user.telephone,
        id_oferente: post.user.id, // id del oferente para traer sus ratings
        image: post.user.image,
      },
    });
  };

  const handleSavedPost = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/savedPosts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: post.id,
        }),
      });

      if (!response.ok) {
        toast.error('Hubo un error al guardar el post');
      } else {
        setIsSaved(true);
        toast.success('Post guardado correctamente!');
      }

    } catch (error) {
      console.log(error)
      toast.error('Hubo un error al guardar el post');
    }
  };

  const handleDeleteSavedPost = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/savedPosts/${post.id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast.error('Hubo un error al eliminar el post guardado');
      } else {
        setIsSaved(false);
        toast.success('Post eliminado correctamente!');
      }
    } catch (error) {
      console.log(error)
      toast.error('Hubo un error al eliminar el post guardado');
    }
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
        toast.success('Solicitud registrada correctamente!');
        // Aquí puedes actualizar el estado o recargar los datos de la página
        // por ejemplo, actualizando el estado del post, o realizando un fetch nuevamente
        setIsModalOpen(false); // Cerrar el modal
        navigate('/requests');
      } else {
        toast.error('Hubo un error al registrar la solicitud');
      }
    } catch (error) {
      console.log(error)
      toast.error('Hubo un error al registrar la solicitud');
    }
  };

  // Función para formatear la fecha y hora
  const timeAgo = formatDistanceToNow(new Date(post.datecreated), { addSuffix: true, locale: es });

  if (isLoadingProfile) return <div className='container text-center'>Cargando...</div>;
  if (errorsProfile) return <div className='container text-center'>Error al cargar los datos.</div>;
  if (!profileData) return <div className='container text-center'>La Sesión ha expirado, vuelva a iniciar sesión.</div>;

  return (
    <div className="card mb-3" style={anchoCard}>
      <div className="row g-0">
        <div className="col-md-1">
          { post.user.image ? (
            <img src={post.user.image} alt="User" className="img-fluid rounded-circle p-2" width={'100px'} />
          ) : (
            <img src='/assets/userLogo.jpeg' alt="User" className="img-fluid rounded-circle p-2" width={'100px'} />
          )}
        </div>
        <div className="col-md-11">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <button className='btn fw-bold fs-4' onClick={handleEditarPerfil}>{post.user.first_name} {post.user.last_name}</button>
              { isSaved ? (
                <button className="btn btn-outline-danger fw-bold" onClick={handleDeleteSavedPost}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 18">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </button>
              ) : (
                <button className="btn btn-outline-dark fw-bold" onClick={handleSavedPost}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 17 18">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                  </svg>
                </button>
              )
            }
            </div>
            <p className="card-text">{post.description}</p>
            <span className="badge text-bg-dark">{post.service.title}</span>
            <p className="card-text">Disponibilidad: {post.disponibility}</p>
            <p className="card-text">
              <small className="text-muted">Publicado {timeAgo}</small>
            </p>
            {profileData.is_finder && (
            <button
              className="btn btn-outline-dark fw-bold w-100 mt-3"
              style={{ backgroundColor: '#66b3a5', color: 'white' }}
              onClick={handleClick}
            >
              Contratar servicio
            </button>
            )}
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
