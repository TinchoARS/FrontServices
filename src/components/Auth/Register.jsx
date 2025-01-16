import React, { useState } from "react";
import useFetch from "../../hooks/fetchHook";
import { useNavigate } from "react-router-dom";
import '../../styles/app.css'
import '../../styles/mainContent.css'

export default function Register() {
    const navigate = useNavigate();

    const [artData, setArtData] = useState({ username: "", lastname: "", email: "", telephone: "", password: ""});
    const [triggerFetch, setTriggerFetch] = useState(false);


    //VERIFICAR SI SE AGREGAN TODOS LOS DATOS
    let updateData = { username: artData.username }; //prioridad
    if (artData.lastname) { updateData = { ...updateData, lastname: artData.lastname } }
    if (artData.email) { updateData = { ...updateData, email: artData.email } }
    if (artData.telephone) { updateData = { ...updateData, telephone: artData.telephone } }
    if (artData.password) { updateData = { ...updateData, password: artData.password } }

    const mapped = Object.keys(updateData).map(key => { return `${key}: ${updateData[key]}` })
    console.log("MAPEO: ", mapped);

    //POST
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_BASE_URL}register/`,           //'https://sandbox.academiadevelopers.com/harmonyhub/artists/',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateData),
        }
    );


    const handleInputChange = (event) => {
        setArtData({
            ...artData,
            [event.target.name]: event.target.value,
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const isConfirmed = window.confirm('¿Estás seguro de que deseas crear los datos?');

        if (isConfirmed) {
            alert('¡Has hecho clic en confirmar!');
            // Enviamos los datos
            setTriggerFetch(true);
            doFetch()

        } else {
            alert('Operación cancelada');
        }
    }


    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" id="username" name="username" placeholder="User name"  
                        value={artData.username}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Last name"  
                        value={artData.lastname}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="email" name="email" placeholder="Email" 
                        value={artData.email}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="telephone" name="telephone" placeholder="Telephone" 
                        value={artData.telephone}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" 
                        value={artData.password}
                        onChange={handleInputChange}/>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">Create an account</button>
                    {isLoading && triggerFetch && (<p>Cargando...</p>)}
                    {isError && <p>Error al cargar los datos.</p>}
                    {data && (<p>Exito</p>)}
                </div>

                <button type="button" className="btn btn-primary" onClick={() => navigate("/Login")}>Sing in</button>
            </form>
            
        </div>
    );
}
