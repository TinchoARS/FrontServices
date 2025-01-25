/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useFetch from "../../hooks/fetchHook";
import { useAuth } from "../../contexts/AuthContext";
import logo from '../../assets/logo.png'
import background from '../../assets/background3.png'

export const Login = () => {
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_BASE_URL}login/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }
    );

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        setTriggerFetch(true);
        doFetch();
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
    }

    useEffect(() => {
        if (data && !isError && triggerFetch) {
            login(data.access);
        }
    }, [data, isError, triggerFetch])


    return (
        <div className="container-sm">
            <div className="row-left">
                <div className="col-12 col-md-4">
                    <div className="text-center mb-4">
                        <img src={logo} alt="logo Servify" className="img-fluid" style={{ maxWidth: '150px' }} />
                    </div>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Usuario</label>
                            <input 
                                type="user" 
                                className="form-control" 
                                id="username" 
                                name="username" 
                                onChange={handleChange} 
                                required 
                                autoComplete="username"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                onChange={handleChange} 
                                required 
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="text-center mb-4">
                            <button type="submit" className="btn btn-primary w-100">
                                Ingresar
                            </button>
                            {isLoading && triggerFetch && (
                                <p className="mt-3">Cargando...</p>
                            )}
                            {isError && <p className="text-danger mt-3">Error al cargar los datos.</p>}
                        </div>
                        <hr style={{ backgroundColor: '#dee2e6', opacity: '0.3' }} />
                        <div className="text-center mt-4">
                            <p className="text-muted mb-3">
                                Si no tienes cuenta
                            </p>
                            <a href="/register" className="btn btn-secondary w-100">
                                Crear cuenta
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row-right">
                <img 
                    src={background} 
                    alt="Imagen decorativa" 
                    style={{ 
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '100vh',
                        objectFit: 'cover'
                    }} 
                />
            </div>
        </div>
    );
}