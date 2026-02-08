import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from "./pages/admin/AdminDashboard"
import EmpDashboard from "./pages/employee/EmpDashboard"
import Dashboard from "./pages/Dashboard"
const App = () => {
  return (
    <>
      <Routes>
         {/* Public  */}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={
          <ProtectedRoute>
             <Dashboard/>
          </ProtectedRoute>
          } />
        {/* Private */}
        <Route path="/admin/dashboard" 
             element={
                 <ProtectedRoute>
                     <AdminDashboard/>
                 </ProtectedRoute>
             }
        />
        <Route  path="/emp/dashboard" 
                 element={
                 <ProtectedRoute>
                     <EmpDashboard/>
                 </ProtectedRoute>
             }
        />
      </Routes>
    </>
  )
}

export default App
