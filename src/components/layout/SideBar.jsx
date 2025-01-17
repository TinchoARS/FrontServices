import '../../styles/SideBar.css'
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="sidebar d-flex flex-column p-3">
      <div className="row">
        <img src="src/assets/logo.png" alt="logo Servify"/>
      </div>
      <div className="row">
        <NavLink
          to="/"
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "nav-link active text-dark bold" : "nav-link",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          }
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline", fontWeight: "bold"} : {}
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "nav-link active text-dark bold" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          }
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline", fontWeight: "bold"} : {}
          }
        >
          Servicios
        </NavLink>

        <NavLink
          to="/posts"
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "nav-link active text-dark bold" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          }
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline", fontWeight: "bold"} : {}
          }
        >
          Publicaciones
        </NavLink>

        <NavLink
          to="/requests"
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "nav-link active text-dark bold" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          }
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline", fontWeight: "bold"} : {}
          }
        >
          Mis solicitudes
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "nav-link active text-dark bold" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          }
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline", fontWeight: "bold"} : {}
          }
        >
          Guardado
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "nav-link active text-dark bold" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          }
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline", fontWeight: "bold"} : {}
          }
        >
          Perfil
        </NavLink>
      </div>
    
      <div className="row m-1">
        <button className="btn btn-danger mt-5">Cerrar sesión</button>
      </div>
    </div>
  );
}