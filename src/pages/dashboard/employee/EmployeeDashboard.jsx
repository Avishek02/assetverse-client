import { NavLink, Outlet } from "react-router-dom"


function EmployeeDashboard() {
  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      <aside className="bg-base-200 p-4 space-y-6">
        <h2 className="text-xl font-bold">Employee Dashboard</h2>
        <nav className="menu gap-1">
          <NavLink to="/dashboard/employee/my-assets" className="btn btn-ghost justify-start">
            My Assets
          </NavLink>
          <NavLink to="/dashboard/employee/request-asset" className="btn btn-ghost justify-start">
            Request Asset
          </NavLink>
          <NavLink to="/dashboard/employee/my-team" className="btn btn-ghost justify-start">
            My Team
          </NavLink>

          <NavLink to="/dashboard/employee/profile" className="btn btn-ghost justify-start">
            Profile
          </NavLink>
        </nav>
      </aside>
      <main className="p-4 bg-base-100">
        <Outlet />
      </main>
    </div>
  )
}

export default EmployeeDashboard
