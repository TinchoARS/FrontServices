/* eslint-disable react/prop-types */

export const StatusRequestCard = ({ statusrequest }) => {


  const anchoCard = {
    width: "auto",
  };

  return (
    <div className="card" style={anchoCard}>
      <div className="card-body">
        <h5 className="card-title"> comentario: {statusrequest.comment}</h5>
        <li className="list-group-item"> 
          <span className="badge bg-warning text-bg-dark">estado: {statusrequest.status}</span>
        </li>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"> {statusrequest.dateupdated} </li>
        <li className="list-group-item"> id del estado del servicio: {statusrequest.id} </li>
        <li className="list-group-item"> a cargo del oferente: <strong>{statusrequest.user.username}</strong> </li>
      </ul>
      {statusrequest.status === "finalizado" &&(
      <div className="card-body">
        <button className="btn btn-outline-dark fw-bold w-100" >
          calificar
        </button>
      </div>
       )}
    </div>
  );
};