import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import RegisterEmployee from "./pages/auth/RegisterEmployee"
import RegisterHR from "./pages/auth/RegisterHR"
import EmployeeDashboard from "./pages/dashboard/employee/EmployeeDashboard"
import HrDashboard from "./pages/dashboard/hr/HrDashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="join/employee" element={<RegisterEmployee />} />
        <Route path="join/hr" element={<RegisterHR />} />
        <Route path="dashboard/employee" element={<EmployeeDashboard />} />
        <Route path="dashboard/hr" element={<HrDashboard />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}

export default App
