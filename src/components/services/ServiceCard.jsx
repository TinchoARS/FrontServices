/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import '../../styles/ServiceCard.css';
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const timeAgo = formatDistanceToNow(new Date(service.created_at), { addSuffix: true, locale: es });

  const handleServiceDetails = () => {
    navigate(`/services/${service.id}/`);
  };

  return (
    <div id="cardService" className="cardServ">
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