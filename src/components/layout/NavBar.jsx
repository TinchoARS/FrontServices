import { NavLink } from "react-router-dom";

export const NavBar = () => {
    const anchoImagen = 40;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="" alt="logo" width={anchoImagen}/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="nav-link">
                  <NavLink
                    to="/"
                    className={({ isActive, isPending, isTransitioning }) =>
                    [
                        isPending ? "pending" : "",
                        isActive ? "text-white border-bottom border-white border-3" : "",
                        isTransitioning ? "transitioning" : "",
                    ].join(" ")
                    }
                  >
                      Inicio
                  </NavLink>
              </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <NavLink
                    to="/services"
                    className={({ isActive, isPending, isTransitioning }) =>
                      [
                          isPending ? "pending" : "",
                          isActive ? "text-white border-bottom border-white border-3" : "",
                          isTransitioning ? "transitioning" : "",
                      ].join(" ")
                    }
                  >
                    Services
                  </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <NavLink
                    to="/posts"
                    className={({ isActive, isPending, isTransitioning }) =>
                      [
                          isPending ? "pending" : "",
                          isActive ? "text-white border-bottom border-white border-3" : "",
                          isTransitioning ? "transitioning" : "",
                      ].join(" ")
                    }
                  >
                    Posts
                  </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <NavLink
                    to="/profile"
                    className={({ isActive, isPending, isTransitioning }) =>
                      [
                          isPending ? "pending" : "",
                          isActive ? "text-white border-bottom border-white border-3" : "",
                          isTransitioning ? "transitioning" : "",
                      ].join(" ")
                    }
                  >
                    Profile
                  </NavLink>
                </div>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button className="btn btn-outline-light" type="button">
                Salir
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};