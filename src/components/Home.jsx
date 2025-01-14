export const Home = () => {
    return (
      <div className='container text-center'>
        <div className="row">
          <h1>Bienvenidos a Servify</h1>
          <p>Esta aplicación permite a los usuarios poder encontrar algun servicio que necesite contratar.</p>
        </div>
          
        <div className="row mt-5">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <button className='btn btn-outline-light btn-lg text-center'>Empezar</button>
          </div>
          <div className="col-md-4"></div>
        </div>        
      </div>
    )
  }