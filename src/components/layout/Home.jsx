import { useNavigate } from "react-router-dom";
import '../../styles/home.css';

export const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/services');
  };

  return (
    <div className='home-container'>
      <div className="content-wrapper">
        <h1 className="main-title">Servify</h1>
        
        <div className="description-box">
          <p>Servify es una plataforma que conecta a profesionales y expertos con personas que buscan sus servicios. 
          Facilitamos el proceso de encontrar y contratar servicios de calidad de manera rápida y segura.</p>
        </div>
        
        <div className="creators-container">
          <div className="creator-box">
            <h3>Cristian Villa</h3>
            <p>Desarrollador Backend</p>
          </div>
          <div className="creator-box">
            <h3>Kevin Serrano</h3>
            <p>Desarrollador Backend</p>
          </div>
          <div className="creator-box">
            <h3>Martín Fradejas</h3>
            <p>Desarrollador Frontend</p>
          </div>
          <div className="creator-box">
            <h3>José Colque</h3>
            <p>Desarrollador Frontend</p>
          </div>
        </div>

        <button className='btn btn-outline-dark btn-lg text-center mt-4' onClick={handleStart}>
          Explorar Servicios
        </button>
      </div>        
    </div>
  )
}