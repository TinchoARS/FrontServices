/* eslint-disable no-unused-vars */
import { useState } from "react";
import useFetch from "../../hooks/fetchHook";
import { useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";
import background from "/assets/background3.png";
import { toast } from "react-toastify";

export const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        telephone: "",
        password: "",
        is_supplier: 0,
        is_finder: 0,
        image: null,
    });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData({
        ...formData,
        is_supplier: value === 'is_supplier' ? 1 : 0,
        is_finder: value === 'is_finder' ? 1 : 0,
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
    form.append("is_supplier", formData.is_supplier);
    form.append("is_finder", formData.is_finder);
    form.append("password", formData.password);
    if (formData.image instanceof File) {
        form.append("image", formData.image); // Incluye la imagen solo si es un archivo
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}register/`, {
            method: 'POST',
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
                password: updatedData.password || "",
                image: updatedData.image || null,
            });
            toast.success("Cuenta creada con éxito!");
            navigate("/login");
        } else {
            toast.error("Error al crear cuenta :(.");
            console.error("Error create user data:", response.statusText);
        }
    } catch (error) {
        console.error("Error al crear cuenta:", error);
    }
  };


    return (
        <div className="container-sm">
            <div className="row-left">
                <div className="col-12 col-md-4">
                    <div className="text-center mb-4">
                        <img src={logo} alt="logo Servify" className="img-fluid" style={{ maxWidth: '150px' }} />
                    </div>
                    <h2 className="text-center mb-4">Registrarse</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="first_name" className="form-label">Nombre</label>
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
                            <label htmlFor="last_name" className="form-label">Apellido</label>
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
                            <label htmlFor="username" className="form-label">Nombre de usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telephone" className="form-label">Celular</label>
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
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
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
                        <div className="mb-4">
                            <label className="form-label d-block">Elige tu rol:</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="is_supplier"
                                    name="role"
                                    value="is_supplier"
                                    checked={formData.is_supplier === 1}
                                    onChange={handleRoleChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="is_supplier">Proveedor</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="is_finder"
                                    name="role"
                                    value="is_finder"
                                    checked={formData.is_finder === 1}
                                    onChange={handleRoleChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="is_finder">Buscador</label>
                            </div>
                        </div>
                        <div className="text-center mb-4">
                            <button type="submit" className="btn btn-primary w-100">
                                Registrarme
                            </button>
                        </div>
                        <hr style={{ backgroundColor: '#dee2e6', opacity: '0.3' }} />
                        <div className="text-center mt-4">
                            <p className="text-muted mb-3">
                                ¿Ya tienes una cuenta?
                            </p>
                            <a href="/login" className="btn btn-secondary w-100">
                                Iniciar Sesión
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
