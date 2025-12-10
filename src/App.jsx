import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import RegisterEmployee from "./pages/auth/RegisterEmployee"
import RegisterHR from "./pages/auth/RegisterHR"
import EmployeeDashboard from "./pages/dashboard/employee/EmployeeDashboard"
import HrDashboardLayout from "./layouts/HrDashboardLayout"
import AssetList from "./pages/dashboard/hr/AssetList"
import AddAsset from "./pages/dashboard/hr/AddAsset"
import Requests from "./pages/dashboard/hr/Requests"
import EmployeeList from "./pages/dashboard/hr/EmployeeList"
import UpgradePackage from "./pages/dashboard/hr/UpgradePackage"
import HrProfile from "./pages/dashboard/hr/HrProfile"
import RoleRoute from "./routes/RoleRoute"
import RequestAsset from "./pages/dashboard/employee/RequestAsset"
import MyAssets from "./pages/dashboard/employee/MyAssets"
import MyTeam from "./pages/dashboard/employee/MyTeam"
import EmployeeProfile from "./pages/dashboard/employee/EmployeeProfile"
import PaymentSuccess from "./pages/PaymentSuccess"
import NotFound from "./pages/NotFound"


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="join/employee" element={<RegisterEmployee />} />
        <Route path="join/hr" element={<RegisterHR />} />

        <Route
          path="dashboard/employee"
          element={
            <RoleRoute allowedRole="employee">
              <EmployeeDashboard />
            </RoleRoute>
          }
        >
          <Route path="request-asset" element={<RequestAsset />} />
          <Route path="my-assets" element={<MyAssets />} />
          <Route path="my-team" element={<MyTeam />} />
          <Route path="profile" element={<EmployeeProfile />} />

        </Route>

        <Route
          path="dashboard/hr"
          element={
            <RoleRoute allowedRole="hr">
              <HrDashboardLayout />
            </RoleRoute>
          }
        >
          <Route index element={<AssetList />} />
          <Route path="add-asset" element={<AddAsset />} />
          <Route path="requests" element={<Requests />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="upgrade" element={<UpgradePackage />} />
          <Route path="profile" element={<HrProfile />} />
        </Route>

      </Route>

      <Route path="/payment-success" element={<PaymentSuccess />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
