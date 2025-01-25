import { Outlet, useLocation } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import './styles/mainContent.css'
import './styles/SideBar.css'
import { SideBar } from "./components/layout/SideBar"

export const Layout = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <AuthProvider>
      <div className="App">
        <div className="d-flex flex-column">
          {shouldShowNavbar && <SideBar />}
          <div className={`main-content ${!shouldShowNavbar ? 'without-sidebar' : ''}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}