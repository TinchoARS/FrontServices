import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  // Funcion que redirecciona a la pagina de explore de la App
  const handleStart = () => {
    navigate('/services');
  };

  return (
    <div className='container text-center'>
      <div className="row">
        <h1>Servify</h1>
        <p>Esta aplicación permite a los usuarios.....</p>
      </div>
        
      <div className="row mt-5">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <button className='btn btn-outline-light btn-lg text-center' onClick={handleStart}>Explorar Servicios</button>
        </div>
        <div className="col-md-4"></div>
      </div>        
    </div>
  )
}