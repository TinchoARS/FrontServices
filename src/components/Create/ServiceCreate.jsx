import React, { useState } from "react";
import useFetch from "../../hooks/fetchHook";
import '../../styles/app.css'
import '../../styles/mainContent.css'

export default function AddServices() {
    const [artData, setArtData] = useState({ title: "", description: "", category: "", duration: "", tags: ""});
    const [triggerFetch, setTriggerFetch] = useState(false);
    const token = localStorage.getItem("AuthToken") //const {token} = useAuth("state")// otra forma de obtener el token


    //VERIFICAR SI SE AGREGAN TODOS LOS DATOS
    let updateData = { title: artData.title }; //prioridad
    if (artData.description) { updateData = { ...updateData, description: artData.description } }
    if (artData.category) { updateData = { ...updateData, category: artData.category } }
    if (artData.duration) { updateData = { ...updateData, duration: artData.duration } }
    if (artData.tags) { updateData = { ...updateData, tags: artData.tags } }

    const mapped = Object.keys(updateData).map(key => { return `${key}: ${updateData[key]}` })
    console.log("MAPEO: ", mapped);


    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_BASE_URL}/addService/`,           //'https://sandbox.academiadevelopers.com/harmonyhub/artists/',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`
            },
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
        <div className="service-container">
            <div className= "cont-1">
                <div className= "cont-2">
                    <h1>Crear Servicios</h1>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" id="title" name="title" placeholder="Title"  
                        value={artData.title}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="description" name="description" placeholder="Description"  
                        value={artData.description}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="category" name="category" placeholder="Category" 
                        value={artData.category}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="duration" name="duration" placeholder="Duration" 
                        value={artData.duration}
                        onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="tags" name="tags" placeholder="Tags" 
                        value={artData.tags}
                        onChange={handleInputChange}/>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">Create Services</button>
                    {isLoading && triggerFetch && (<p>Cargando...</p>)}
                    {isError && <p>Error al cargar los datos.</p>}
                    {data && (<p>Exito</p>)}
                </div>
            </form>
        </div>
    );
}
