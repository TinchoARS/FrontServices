import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import "../../styles/css/login.css"
import useFetch from "../../hooks/fetchHook";
import { useAuth } from "../../contexts/AuthContext";
import '../../styles/app.css'
import '../../styles/mainContent.css'

function Login() {
    const [triggerFetch, setTriggerFetch] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_BASE_URL}/api-auth/`,    //"https://sandbox.academiadevelopers.com/api-auth/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }
    );

    const { login } = useAuth("actions"); // Obtenemos la accion

    function handleSubmit(event) { //recibimos el formulario <form onSubmit={handleSubmit}>
        event.preventDefault();
        setTriggerFetch(true);
        doFetch();
    }

    function handleChange(event) {//recivimos el username y password de consola
        const { name, value } = event.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);

    }

    /*Para que login obtenga un token y poder iniciar (ACTION.LOGIN)
    Tiene que haber una coneccion estable:
        - triggerFetch: Enviar los datos (true)
        - data : Debemos obtener sus datos
        - isError: No debe haber errores*/
    useEffect(() => {
        if (data && !isError && triggerFetch) {
            login(data.token, username, password); //login y contexto obtiene un token y datos personales
            console.log("Token: ", data.token, " username: ", username, " password: ", password)
        }
    }, [data, isError, triggerFetch])


    const navigate = useNavigate();

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
            <label for="exampleInputPassword1" class="form-label">Login</label>
                <div className="mb-3">
                    <input type="text" class="form-control" id="username" name="username" placeholder="Usuario"  aria-describedby="emailHelp"
                        value={username}
                        onChange={handleChange}/>
                        
                </div>
                <div className="mb-3">
                    <input type="password" class="form-control" id="password" placeholder="Password" name="password"
                        value={password}
                        onChange={handleChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>

                <div className="Login">
                    <button type="submit" className="btn btn-primary">Sing Up</button>
                    {isLoading && triggerFetch && (<p>Cargando...</p>)}
                    {isError && <p>Error al cargar los datos.</p>}
                    {data && (<p>logeado</p>)}
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => navigate("/register")}>Create count</button>
            </form>
        </div>
    );
}

export default Login;


