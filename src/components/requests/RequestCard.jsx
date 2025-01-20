/* eslint-disable react/prop-types */

export const RequestCard = ({ request }) => {

  const anchoCard = {
    width: "auto",
  };

  return (
    <div className="card" style={anchoCard}>
      <div className="card-body">
        <h5 className="card-title"> {request.message} </h5>
        <li className="list-group-item"> 
          <h1><span className="badge text-bg-dark">{request.status}</span></h1>
        </li>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"> {request.post.description} </li>
      </ul>
    </div>
  );
};