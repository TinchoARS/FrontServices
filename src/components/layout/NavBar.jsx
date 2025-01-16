import { NavLink } from "react-router-dom";
import "@fontsource/inter";
import "@fontsource/inter/700.css"; // Para el peso bold
import '../../styles/navbar.css';

export const NavBar = () => {
    const anchoImagen = 240;
    // Datos de ejemplo del usuario (después podrás reemplazarlos con datos reales)
    const usuario = {
        nombre: "John Doe",
        imagen: "https://via.placeholder.com/50"
    };

    return (
        <nav style={{
            height: '100vh',
            width: '250px',
            position: 'fixed',
            left: 0,
            top: 0,
            backgroundColor: '#E0E8EE',
            padding: '20px 15px',
            fontFamily: 'Inter, sans-serif',

        }}>
            <div className="d-flex flex-column h-100">
                {/* Logo */}
                <div className="text-center mb-5">
                    <a className="navbar-brand" href="/">
                        <img src="src\assets\logo.png" alt="logo" width={anchoImagen}/>
                    </a>
                </div>

                {/* Enlaces de navegación */}
                <ul className="nav flex-column gap-2">
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link bg-white rounded-3 px-4 py-3 ${isActive ? 'active fw-bold' : ''}`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/browse-services"
                            className={({ isActive }) =>
                                `nav-link bg-white rounded-3 px-4 py-3 ${isActive ? 'active fw-bold' : ''}`
                            }
                        >
                            Browse Services
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/my-services"
                            className={({ isActive }) =>
                                `nav-link bg-white rounded-3 px-4 py-3 ${isActive ? 'active fw-bold' : ''}`
                            }
                        >
                            My Services
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/my-requests"
                            className={({ isActive }) =>
                                `nav-link bg-white rounded-3 px-4 py-3 ${isActive ? 'active fw-bold' : ''}`
                            }
                        >
                            My Requests
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/saved"
                            className={({ isActive }) =>
                                `nav-link bg-white rounded-3 px-4 py-3 ${isActive ? 'active fw-bold' : ''}`
                            }
                        >
                            Saved
                        </NavLink>
                    </li>
                </ul>

                {/* Perfil de usuario */}
                <div className="mt-auto text-center">
                    <div className="avatar-container mb-2">
                        <img 
                            src={usuario.imagen} 
                            alt="Foto de perfil"
                            className="rounded-circle"
                            style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    <h6 className="mb-3">{usuario.nombre}</h6>
                </div>
            </div>
        </nav>
    );
};