/* eslint-disable react/prop-types */

export const StatusRequestCard = ({ statusrequest }) => {


  const anchoCard = {
    width: "auto",
  };

  return (
    <div className="card" style={anchoCard}>
      <div className="card-body">
        <h5 className="card-title"> {statusrequest.status} </h5>
        <li className="list-group-item"> 
          <span className="badge text-bg-dark">{statusrequest.comment}</span>
        </li>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"> {statusrequest.dateupdated} </li>
        <li className="list-group-item"> {statusrequest.id} </li>
        <li className="list-group-item"> {statusrequest.user.username} </li>
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