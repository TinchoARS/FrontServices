/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, Button, Form } from 'react-bootstrap';

export const StatusRequestCard = ({ statusrequest, profile }) => {
  const { token } = useAuth('state');
  const navigate = useNavigate();
  const [status, setStatus] = useState({ status: statusrequest.status, user_id: "" });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [{ data, isLoading, errors }, doFetch] = useFetch(`${import.meta.env.VITE_BASE_URL}api/statusservices/${statusrequest.id}/`, {
    method: "PATCH",
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  useEffect(() => {
    setStatus({ status: statusrequest.status });
  }, [statusrequest.status,status.status]);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const handleUpdate = async () => {
    const form = new FormData();
    form.append("status", selectedStatus);
    form.append("comment", userMessage);
    doFetch({ body: form });
    setFeedbackMessage(data ? '¡El cambio de estado se ha finalizado correctamente!' : 'Hubo un problema al intentar cambiar el estado.');
    setStatus({ status: selectedStatus });
    statusrequest.status = selectedStatus;
    handleModalClose();
  };

  const handleEditarPerfil = () => {
    navigate(`/ratings`, {
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

  return (
    <div className="card mb-3" style={{ backgroundColor: '#E0E8EE' }}>
      <div className="card-body">
        <li className="list-group-item">
          <span className="badge bg-warning text-bg-dark">Estado: {statusrequest.status}</span>
          {statusrequest.status !== "finalizado" && statusrequest.status !== "cancelado" && (
            <div className="card-body">
              <button onClick={handleModalShow} className="btn btn-dark fw-bold me-3 mt-4">
                Cambiar estado
              </button>
              <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Cambiar Estado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formStatus">
                      <Form.Label>Mensaje</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formSelectStatus">
                      <Form.Check
                        type="radio"
                        label="Finalizar Servicio"
                        name="statusOptions"
                        id="finalizar"
                        value="finalizado"
                        checked={selectedStatus === "finalizado"}
                        onChange={() => handleStatusChange("finalizado")}
                      />
                      <Form.Check
                        type="radio"
                        label="Cancelar Servicio"
                        name="statusOptions"
                        id="cancelar"
                        value="cancelado"
                        checked={selectedStatus === "cancelado"}
                        onChange={() => handleStatusChange("cancelado")}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleModalClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={handleUpdate}>
                    Actualizar
                  </Button>
                </Modal.Footer>
              </Modal>
              <div className="mb-3 text-center">
                <div className="control">
                  <p>{feedbackMessage}</p>
                </div>
              </div>
            </div>
          )}
        </li>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"> {statusrequest.dateupdated} </li>
        <li className="list-group-item"> id del estado del servicio: {statusrequest.id} </li>
        <li className="list-group-item"> a cargo del oferente: <strong>{statusrequest.user.username}</strong> </li>
      </ul>
      {(statusrequest.status === "finalizado" || statusrequest.status === "cancelado") && profile.is_finder === true && (
        <div className="card-body">
          <button className="btn btn-outline-dark fw-bold w-100"
            onClick={handleEditarPerfil}>
            Calificar
          </button>
        </div>
      )}
    </div>
  );
};
