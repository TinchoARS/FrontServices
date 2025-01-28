/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import useFetch from "../../hooks/fetchHook";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export const ProfileEdit = () => {
    const navigate = useNavigate();
    const { token } = useAuth('state');
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        telephone: "",
        // imagen: null,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                const data = await response.json();
                setFormData({
                    username: data.username,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    telephone: data.telephone,
                    // imagen: data.imagen,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

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
        `${import.meta.env.VITE_BASE_URL}api/profile/`,
        {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );


    // funcion para registart usuario y redirigir a la pagina de login
    const handleSubmit = (event) => {
        event.preventDefault();
        // Crea un objeto FormData para enviar datos al backend
        const form = new FormData();
        form.append("username", formData.username);
        form.append("email", formData.email);
        form.append("first_name", formData.first_name);
        form.append("last_name", formData.last_name);
        form.append("telephone", formData.telephone);
        // form.append("imagen", formData.imagen); // Incluye la imagen en el form

        doFetch({ body: form });
        toast.success("Usuario Actualizado con exito");
        navigate("/profile");
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>

                <div className="col-12 col-md-6">
                <h2 className="text-center mb-5">Editar Perfil</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">
                        Apellido
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        autoComplete="new-username"
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Correo electronico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="new-email"
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="telephone" className="form-label">
                        Celular
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    {/* <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">
                        Foto de perfil
                    </label>
                    <div className="control has-icons-left">
                        <input
                        className="form-control"
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleFileChange}
                        />
                    </div>
                    </div> */}
                    <div className="mb-3 text-center">
                        <div className="control">
                            <button type="submit" className="btn btn-primary text-center">
                                Confirmar
                            </button>
                        </div>
                    </div>
                </form>
                </div>
                <div>
                    {isError && <div className="text-center">Error al cargar datos del perfil.</div>}
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
};