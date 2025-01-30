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
        image: null,
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
                    username: data.username || "",
                    email: data.email || "",
                    first_name: data.first_name || "",
                    last_name: data.last_name || "",
                    telephone: data.telephone || "",
                    image: data.image || null,
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
          image: e.target.files[0], // Solo se permite seleccionar un archivo
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append("username", formData.username);
        form.append("email", formData.email);
        form.append("first_name", formData.first_name);
        form.append("last_name", formData.last_name);
        form.append("telephone", formData.telephone);
        if (formData.image instanceof File) {
            form.append("image", formData.image); // Incluye la imagen solo si es un archivo
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: form,
            });

            if (response.ok) {
                const updatedData = await response.json();
                setFormData({
                    username: updatedData.username || "",
                    email: updatedData.email || "",
                    first_name: updatedData.first_name || "",
                    last_name: updatedData.last_name || "",
                    telephone: updatedData.telephone || "",
                    image: updatedData.image || null,
                });
                toast.success("Perfil actualizado con éxito!");
                navigate("/profile");
            } else {
                toast.error("Error al actualizar datos del perfil.");
                console.error("Error updating user data:", response.statusText);
            }
        } catch (error) {
            console.error("Error Al actualizar los datos del usuario:", error);
        }
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>

                <div className="col-12 col-md-6">
                <h2 className="text-center mb-5">Editar Perfil</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <div className="mb-3">
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
                    </div>
                    <div className="mb-3 text-center">
                        <div className="control">
                            <button type="submit" className="btn btn-primary text-center">
                                Confirmar
                            </button>
                        </div>
                    </div>
                </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
};