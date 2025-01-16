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

  const tags = service.tags.split(","); // convierte un string con comas en un array de strings


  return (
    <div className="card" style={anchoCard}>
      <div className="card-body">
        <h5 className="card-title"> {service.title} </h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"> {service.description} </li>
        <li className="list-group-item">
            {tags.map((tag, index) => (
              <span key={index} className="badge text-bg-dark ms-1">
                {tag}
              </span>
            ))}
        </li>
      </ul>
      <div className="card-body">
        <button className="btn btn-outline-dark fw-bold w-100" onClick={handleServiceDetails}>
          Ver detalles
        </button>
      </div>
    </div>
  );
};