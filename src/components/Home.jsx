export const Home = () => {
  return (
      <div
          className="container text-center"
          style={{
              backgroundColor: '#B5DBFF',
              fontFamily: 'Inter',
              padding: '20px',
            
              
          }}
      >
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            paddingLeft: '100px',
          }}>
            Hello, I am Pedro
          </h1>
          {/* Cuadro blanco superior */}
          <div className="row mt-5 justify-content-center"
              style={{
                  paddingLeft: '100px',
              }}
          >
            
              <div className="col-md-8">
                  <div
                      style={{
                          backgroundColor: 'white',
                          borderRadius: '10px',
                          padding: '20px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                  >
                      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Create Services</h1>
                      <p style={{ fontSize: '16px', color: '#555', marginTop: '10px' }}>
                          Design solutions tailored to your customers. Our flexible system adapts to your needs and
                          grows your business.
                      </p>
                      <button
                          className="btn btn-outline-dark mt-3"
                          style={{ borderRadius: '5px', fontSize: '14px', padding: '10px 20px' }}
                      >
                          Learn More
                      </button>
                  </div>
              </div>
          </div>

          {/* Sección de cuadros blancos inferiores */}
          <div className="row mt-5"
              style={{
                  paddingLeft: '100px',
                  textAlign: 'left',
                  
              }}
          >
            <h2>
              Services
            </h2>
              {['IT Technician', 'Gas Fitter', 'Architect'].map((title, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                      <div
                          style={{
                              backgroundColor: 'white',
                              borderRadius: '10px',
                              padding: '20px',
                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                              textAlign: 'center',
                          }}
                      >
                          <img
                              src="https://via.placeholder.com/150"
                              alt={title}
                              style={{ borderRadius: '5px', marginBottom: '15px', width: '100%' }}
                          />
                          <h5 style={{ fontWeight: 'bold' }}>{title}</h5>
                          <p style={{ fontSize: '14px', color: '#555' }}>
                              Variants simplify your design system, improving component organization and code
                              mapping.
                          </p>
                          <button
                              className="btn btn-outline-dark"
                              style={{ borderRadius: '5px', fontSize: '14px', padding: '8px 16px' }}
                          >
                              Learn More
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
};
