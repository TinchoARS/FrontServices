import '../../styles/SideBar.css'
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import home from '/assets/home.png'
import services from '/assets/shop.png'
import saved from '/assets/bookmark.png'
import requests from '/assets/text-bubble.png'
import profile from '/assets/user.png'
import post from '/assets/menu.png'
import logo from '/assets/logo.png'

export const SideBar = () => {
    const { logout } = useAuth("actions");

    // funcion para cerrar sesion
    const handleLogout = () => {
      logout();
      window.location.href = '/login';
    };

  return (
    <div className="sidebar d-flex flex-column p-3 rounded">
      <div className="logo-container">
        <img src={logo} alt="logo Servify"/>
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
          <img src={home} alt="home" className= "img-fluid" style={{maxWidth: '30px'}} />
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
          <img src={services} alt="services" className= "img-fluid" style={{maxWidth: '50px'}} />
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
          <img src={post} alt="post" className= "img-fluid" style={{maxWidth: '50px'}} />
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
          <img src={requests} alt="requests" className= "img-fluid" style={{maxWidth: '50px'}} />
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
          <img src={saved} alt="saved" className= "img-fluid" style={{maxWidth: '50px'}} />
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
          <img src={profile} alt="profile" className= "img-fluid" style={{maxWidth: '50px'}} />
          Perfil
        </NavLink>
      </div>
    
      <div className="row m-1">
        <button className="btn btn-danger mt-5" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
}