import { Outlet, useLocation } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import './styles/mainContent.css'
import './styles/SideBar.css'
import { SideBar } from "./components/layout/SideBar"
import { FloatingLogo } from "./components/layout/FloatingLogo"
import { ToastContainer } from "react-toastify"

export const Layout = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const hideLogoPaths = ['/profile'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  const shouldShowLogo = !hideLogoPaths.includes(location.pathname);

  return (
    <AuthProvider>
      <div className="App">
        <div className="d-flex flex-column">
          {shouldShowNavbar && <SideBar />}
          <div className={`main-content ${!shouldShowNavbar ? 'without-sidebar' : ''}`}>
            <Outlet />
            <ToastContainer 
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
            />
          </div>
          {shouldShowLogo && <FloatingLogo />}
        </div>
      </div>
    </AuthProvider>
  )
}