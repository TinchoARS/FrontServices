import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import "../../styles/css/login.css"
import useFetch from "../../hooks/fetchHook"; 
import { useAuth } from "../../contexts/AuthContext";

function Login() {
    const [triggerFetch, setTriggerFetch] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [{data, isError, isLoading}, doFetch] = useFetch(
         `${import.meta.env.VITE_BASE_URL}/api-auth/`,    //"https://sandbox.academiadevelopers.com/api-auth/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }
    );

    const {login} = useAuth("actions"); // Obtenemos la accion

    function handleSubmit(event){ //recibimos el formulario <form onSubmit={handleSubmit}>
        event.preventDefault();
        setTriggerFetch(true);
        doFetch();
    }

    function handleChange(event){//recivimos el username y password de consola
        const {name, value} = event.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
        
    }

    /*Para que login obtenga un token y poder iniciar (ACTION.LOGIN)
    Tiene que haber una coneccion estable:
        - triggerFetch: Enviar los datos (true)
        - data : Debemos obtener sus datos
        - isError: No debe haber errores*/
    useEffect(() =>{
        if (data && !isError && triggerFetch){ 
            login(data.token, username, password); //login y contexto obtiene un token y datos personales
            console.log("Token: ",data.token," username: ",username," password: ",password)
        }
    }, [data, isError, triggerFetch])

    
    const navigate = useNavigate();

return (
    <div className="login-container">
        <img src="/img/concentracion/marco_spoty_2.jpg" id="marco"/>
        <div className="formulario">
            <form id="loginForm" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="icons">
                    <img src="/img/concentracion/spotify.png" alt="logo"/>
                </div>
                <div className="input-box">
                    <input type="text" id="username" name="username" placeholder="Usuario" required
                        value={username}
                        onChange={handleChange}/>
                </div>
                <div className="input-box">
                    <input type="password" id="password" name="password" placeholder="Password" required
                        value={password}
                        onChange={handleChange}/>
                </div>

                <button type="button" className="btn" id="return"  onClick={()=> navigate('/inicio')}>Return to Top</button>
                <div className="register-link">
                    <button type="submit" className="btn">Login</button>
                    {isLoading && triggerFetch && (<p>Cargando...</p>)}
                    {isError && <p>Error al cargar los datos.</p>}
                    {data && (<p>logeado</p>)}
                </div>
                
            </form>
        </div>
    </div>
        
    );
}

export default Login;