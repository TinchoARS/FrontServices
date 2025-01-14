import { Outlet } from "react-router-dom"
import { NavBar } from "./components/layout/NavBar"
import './styles/app.css'
import './styles/mainContent.css'
import { AuthProvider } from "./contexts/AuthContext"

export const Layout = () => {
  return (
    <AuthProvider>
      <div>
        <div className="row">
          <div className="col-12">
            <NavBar />
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