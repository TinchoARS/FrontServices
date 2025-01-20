/* eslint-disable no-unused-vars */
import { useState } from "react";
import useFetch from "../../hooks/fetchHook";
import { useNavigate } from "react-router-dom";

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
        // imagen: null,
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
    //   imagen: e.target.files[0], // Solo se permite seleccionar un archivo
    });
  };

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    `${import.meta.env.VITE_BASE_URL}register/`,
    {
      method: "POST",
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
    form.append("is_supplier", formData.is_supplier);
    form.append("is_finder", formData.is_finder);
    form.append("password", formData.password);
    // form.append("imagen", formData.imagen); // Incluye la imagen en el form

    doFetch({ body: form });
    console.log(form)
    alert("Usuario registrado con exito");
    navigate("/login");
  };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>

                <div className="col-12 col-md-6">
                <h2 className="text-center mb-5">Registrarse</h2>
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
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                    </div>
                    <label className="form-label">Elige tu rol:</label>
                    <div>
                        <input
                            type="radio"
                            id="is_supplier"
                            name="role"
                            value="is_supplier"
                            checked={formData.is_supplier === 1}
                            onChange={handleRoleChange}
                            required
                        />
                        <label htmlFor="is_supplier">Proveedor</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="is_finder"
                            name="role"
                            value="is_finder"
                            checked={formData.is_finder === 1}
                            onChange={handleRoleChange}
                            required
                        />
                        <label htmlFor="is_finder">Buscador</label>
                    </div>
                    <div className="mb-3 text-center">
                    <div className="control">
                        <button type="submit" className="btn btn-primary text-center">
                        Registrarme
                        </button>
                    </div>
                    </div>
                    <div className="mb-3 text-center">
                    <div className="control">
                        {isError && <p>Error al cargar los datos.</p>}
                        {data && <p>Usuario registrado con exito</p>}
                    </div>
                    </div>
                </form>
                </div>

                <div className="col-md-3"></div>
            </div>
        </div>
    );
}
