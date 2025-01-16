/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleServiceDetails = () => {
    navigate(`/services/${service.id}`);
  };

  const anchoCard = {
    width: "auto",
  };

  return (
    <div className="card" style={anchoCard}>
      <div className="card-body">
        <h5 className="card-title"> {service.title} </h5>
        <li className="list-group-item"> 
          <span className="badge text-bg-dark">{service.category}</span>
        </li>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"> {service.description} </li>
      </ul>
      <div className="card-body">
        <button className="btn btn-outline-dark fw-bold w-100" onClick={handleServiceDetails}>
          Ver detalles
        </button>
      </div>
    </div>
  );
};