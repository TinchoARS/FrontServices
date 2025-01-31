/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/fetchHook";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";


export const FormServiceAdd = () => {
    const navigate = useNavigate();
    const { token } = useAuth('state');
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        duration: "",
        tags: "",
        // imagen: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
        ...formData,
        //   imagen: e.target.files[0], // Solo se permite seleccionar un archivo
        });
    };

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_BASE_URL}api/services/`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        }
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        // Crea un objeto FormData para enviar datos al backend
        const form = new FormData();
        form.append("title", formData.title);
        form.append("description", formData.description);
        form.append("category", formData.category);
        form.append("duration", formData.duration);
        form.append("tags", formData.tags);
        // form.append("imagen", formData.imagen); // Incluye la imagen en el form

        doFetch({ body: form });
        toast.success("Servicio creado con exito");
        navigate("/services");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex align-items-center">
                    <h1 className="flex-grow-1"> Agregar Servicio </h1>
                </div>
            </div>
            <hr />

            <div className="row">
                <div className="col-12">
                <form onSubmit={handleSubmit} className="rounded bg-white p-5">
                    <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Titulo del Servicio
                    </label>
                    <input
                        type="text"
                        className="form-control bg-light"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    </div>
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
                    <label htmlFor="category" className="form-label">
                        Categoria
                    </label>
                    <input
                        type="text"
                        className="form-control bg-light"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="duration" className="form-label">
                        Duración
                    </label>
                    <input
                        type="text"
                        className="form-control bg-light"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">
                            Etiquetas
                        </label>
                        <input
                            type="text"
                            className="form-control bg-light"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 text-center">
                        <div className="control">
                            <button type="submit" className="btn btn-dark text-center ">
                            Agregar
                            </button>
                        </div>
                    </div>
                    <div className="mb-3 text-center">
                        <div className="control">
                            {isError && <p>Error al cargar los datos.</p>}
                            {data && <p>Servicio registrado con exito!</p>}
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
};