/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/fetchHook";
import { useAuth } from "../../contexts/AuthContext";

export const FormPostAdd = () => {
    const navigate = useNavigate();
    const { token } = useAuth("state");
    const [services, setServices] = useState(null)
    const [formData, setFormData] = useState({
        description: "",
        disponibility: "",
        service_id: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_BASE_URL}api/posts/`,
        {
        method: "POST",
        headers: {
            'Authorization': `Token ${token}`,
        },
        }
    );

    // Otro fetch para traer todos los servicios y listarlos
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/services/`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    console.log('Error al obtener los servicios');
                }
                const services_data = await response.json();
                setServices(services_data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchServices();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Crea un objeto FormData para enviar datos al backend
        const form = new FormData();
        form.append("description", formData.description);
        form.append("disponibility", formData.disponibility);
        form.append("service", parseInt(formData.service_id));
        doFetch({ body: form });
        alert("Publicacion creada con exito!");
        navigate("/posts");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex align-items-center">
                    <h1 className="flex-grow-1"> Agregar Publicación </h1>
                </div>
            </div>
            <hr />

            <div className="row">
                <div className="col-12">
                <form onSubmit={handleSubmit} className="rounded bg-white p-5">
                    <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Descripción
                    </label>
                    <input
                        type="text"
                        className="form-control bg-light"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="disponibility" className="form-label">
                            Disponibilidad
                        </label>
                        <input
                            type="text"
                            className="form-control bg-light"
                            id="disponibility"
                            name="disponibility"
                            value={formData.disponibility}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="service_id" className="form-label">
                            Servicio
                        </label>
                        <select 
                            className="form-select"
                            aria-label="Default select example"
                            name="service_id"
                            value={formData.service_id}
                            onChange={handleChange}
                            required
                            >
                            <option value="" disabled>Seleccione un servicio</option>
                            {services && services.map((service, index) => (
                                <option key={index} value={service.id}>{service.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 text-center">
                        <div className="control">
                            <button type="submit" className="btn btn-dark text-center ">
                            Publicar
                            </button>
                        </div>
                    </div>
                    <div className="mb-3 text-center">
                        <div className="control">
                            {isError && <p>Error al cargar los datos.</p>}
                            {data && <p>Publicacion registrada con exito!</p>}
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
};