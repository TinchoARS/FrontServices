import { Outlet } from "react-router-dom"
import { NavBar } from "./components/layout/NavBar"
import { AuthProvider } from "./contexts/AuthContext"
import './styles/mainContent.css'
import './styles/SideBar.css'
import { SideBar } from "./components/layout/SideBar"

export const Layout = () => {
  return (
    <AuthProvider>
        <div className="App">
          <NavBar/>
          <div className="d-flex flex-column">
            <SideBar />
            <div className="main-content">
              <Outlet /> {/* Es reemplazado por el componente hijo */}
              {/* NOTIFICACIONES */}
              {/* <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              /> */}
            </div>
          </div>
        </div>
      </AuthProvider>
    
  )
}