/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const RequestCard = ({ request, token, isSupplier,profileId,setFilteredRequests, filteredRequests }) => {
    const anchoCard = {
        width: "auto",
    };
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState('');

    const handleShow = (newStatus) => {
        setStatus(newStatus);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleAcceptOrReject = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/requests/${request.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ status, reason })
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la solicitud');
            }
            // Actualizar la lista de solicitudes después de la actualización
            const updatedRequests = filteredRequests.map(r => 
                r.id === request.id ? { ...r, status, reason } : r
            );
            setFilteredRequests(updatedRequests);
            console.log(status)
            console.log(request.id)
            if (status === 'accepted') {
                const statusServiceResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/statusservices/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    body: JSON.stringify({
                    status: 'en progreso',
                    comment: 'en progreso',
                    dateupdated : new Date(),
                    request : request.id,
                    user : profileId 
                    })
                });
                if (!statusServiceResponse.ok) {
                    throw new Error('Error al actualizar el estado del servicio');
                }
            }
        } catch (error) {
            console.error(error);
        }
        handleClose();
    };

    return (
        <div className="card" style={anchoCard}>
            <div className="card-body">
                <h5 className="card-title"> {request.message} </h5>
                <li className="list-group-item"> 
                    {request.status === 'accepted' ? <h1><span className="badge bg-success">{request.status}</span></h1> : null}
                    {request.status === 'rejected' ? <h1><span className="badge bg-danger">{request.status}</span></h1> : null}
                    {request.status === 'pending' ? <h1><span className="badge bg-warning">{request.status}</span></h1> : null}
                </li>
                {isSupplier && request.status === 'pending' && (
                <div className="btn-group mt-2"> 
                    <button className="btn btn-success" onClick={() => handleShow('accepted')}>Aceptar</button> 
                    <button className="btn btn-danger" onClick={() => handleShow('rejected')}>Rechazar</button>
                </div>
                )}
                {request.status === 'accepted' && (
                 <div className="btn-group mt-2"> 
                 <button className="btn btn-info" onClick={() => navigate(`/statusservices?request=${request.id}`)}>Ver estado</button> 
             </div>   
                )}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"> {request.post.description} </li>
            </ul>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{status === 'accepted' ? 'Aceptar Solicitud' : 'Rechazar Solicitud'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="reason">
                            <Form.Label>Razón</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ingresa la razón" 
                                value={reason} 
                                onChange={(e) => setReason(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleAcceptOrReject}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
