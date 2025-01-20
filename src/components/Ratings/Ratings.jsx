/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetchHook';
import { useAuth } from '../../contexts/AuthContext';

export const Ratings = () => {
    const { token } = useAuth('state');
    const [formData, setFormData] = useState({ range: "", comment: "" })
    const [{ data, isLoading, errors }, doFetch] = useFetch(`${import.meta.env.VITE_BASE_URL}api/profile/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });

    useEffect(() => {
        doFetch();
    }, []);

    //CALIFICAR USER
    const [{ data_R, isError_R, isLoading_R }, doFetch_R] = useFetch(
        `${import.meta.env.VITE_BASE_URL}api/reading/`,
        {
            method: "POST",
        }
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        const isConfirmed = window.confirm('¿Estás seguro de que deseas calificar al oferente?');
        if (isConfirmed) {
            alert('¡Has hecho clic en confirmar!');
            event.preventDefault();
            const form = new FormData();
            form.append("range", formData.range);
            form.append("comment", formData.comment);

            doFetch_R({ body: form });
            console.log(form)
            alert("Oferente calificado con exito");
        } else {
            alert('Operación cancelada');
        }
    }


    if (isLoading) return <div className='container text-center'>Cargando...</div>;
    if (errors) return <div className='container text-center'>Error al cargar datos del perfil.</div>;
    if (!data) return <div className='container text-center'>La Sesion ha expirado, vuelva a iniciar sesion.</div>;

   
    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <h1>Perfil del Oferente</h1>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src='src/assets/userLogo.jpeg' className="card-img-top p-5" alt="foto de perfil" />
                                {/* <img src={data.imagen} className="card-img-top" alt="foto de perfil" /> */}
                            </div>
                            <div className="col-md-8">
                                <div className="card-body mt-3">
                                    <h2 className='card-title'><strong> {data.first_name} {data.last_name} </strong> </h2>
                                    <p className='card-text mt-4'><strong>Usuario:</strong> {data.username} </p>
                                    <p><strong>Email:</strong> {data.email} </p>
                                    <p><strong>Celular:</strong> {data.telephone} </p>
                                    {data.is_supplier === true && <p><strong>Rol: </strong>Oferente/Proveedor</p>}
                                    {data.is_finder === true && <p><strong>Rol: </strong>Buscador</p>}

                                    <form onSubmit={handleSubmit}>
                                        <label for="customRange3" class="form-label">Calificar</label>
                                        <input type="range" class="form-range" id="range" name="range" min="0" max="5" step="0.5"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required>
                                        </input>
                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">Comentario</label>
                                            <input type="text" className="form-control" id="comment" name="comment" defaultValue=""
                                                required autoComplete="comentario"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button
                                            type='submit'
                                            className="btn btn-dark fw-bold me-3 mt-4"
                                        >
                                            Calificar
                                        </button>
                                        <div className="mb-3 text-center">
                                            <div className="control">
                                                {isError_R && <p>Error al cargar los datos.</p>}
                                                {data_R && <p>Servicio calificado con exito!</p>}
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
};