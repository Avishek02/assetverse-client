import { NavLink, Outlet } from "react-router-dom"

function EmployeeDashboard() {
  const linkBase =
    "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition"
  const linkInactive = "text-[#1f2a44] hover:bg-[#f1f5ff]"
  const linkActive = "bg-[#eef5ff] text-[#0065ff]"

  return (
    <div className="min-h-screen bg-[#f5f7fb] grid md:grid-cols-[240px_1fr]">
      <aside className="border-r border-[#e6eaf2] bg-white">
        <div className="px-4 py-4 border-b border-[#eef1f6]">
          <div className="text-xs text-[#6b778c]">Dashboard</div>
          <h2 className="mt-1 text-2xl font-semibold text-[#1f2a44]">
            Employee
          </h2>
        </div>

        <nav className="p-3 space-y-1">
          <NavLink
            to="/dashboard/employee/my-assets"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <span className="h-8 w-8 rounded-lg border border-[#e6eaf2] bg-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7L12 3L21 7L12 11L3 7Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 7V17L12 21L21 17V7" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <span>My Assets</span>
          </NavLink>

          <NavLink
            to="/dashboard/employee/request-asset"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <span className="h-8 w-8 rounded-lg border border-[#e6eaf2] bg-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span>Request Asset</span>
          </NavLink>

          <NavLink
            to="/dashboard/employee/my-team"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <span className="h-8 w-8 rounded-lg border border-[#e6eaf2] bg-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11C17.6569 11 19 9.65685 19 8C19 6.34315 17.6569 5 16 5C14.3431 5 13 6.34315 13 8C13 9.65685 14.3431 11 16 11Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 13C5.79086 13 4 14.7909 4 17V19H12V17C12 14.7909 10.2091 13 8 13Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M16 13C13.7909 13 12 14.7909 12 17V19H20V17C20 14.7909 18.2091 13 16 13Z" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <span>My Team</span>
          </NavLink>

          <NavLink
            to="/dashboard/employee/notices"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <span className="h-8 w-8 rounded-lg border border-[#e6eaf2] bg-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 7H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M8 11H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M8 15H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span>Notices</span>
          </NavLink>

          <NavLink
            to="/dashboard/employee/profile"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <span className="h-8 w-8 rounded-lg border border-[#e6eaf2] bg-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span>Profile</span>
          </NavLink>
        </nav>
      </aside>

      <main className="bg-[#f5f7fb] p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default EmployeeDashboard
