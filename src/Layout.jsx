import { Outlet, useLocation } from "react-router-dom"
import { NavBar } from "./components/layout/NavBar"
//import { TopBar } from "./components/layout/TopBar";
//import { SideBar } from "./components/layout/SideBar";
//import { Footer } from "./components/layout/Footer";
//import { Banner } from "./components/layout/Banner"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import './styles/app.css'
import './styles/mainContent.css'

export const Layout = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();  // Normaliza la ruta

  //  Incluye coincidencias parciales como /login/reset
  const isLogin = path.startsWith("/login");
  const isRegister = path.startsWith("/register");

  const mainClassName = isLogin || isRegister  ? 'login-container' : '';

  return (
    <AuthProvider>
      <div className={mainClassName}>
        <div className="row">
          <div className="col-12">
          {(!isLogin && !isRegister) && <NavBar />}
          </div>
        </div>

        <div className="row">
          <div className="main-content">
            <Outlet />
          </div>
        </div>
        </div>
    </AuthProvider>
    
  )
}