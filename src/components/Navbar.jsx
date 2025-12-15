import { Link, NavLink } from "react-router-dom"
import { useContext, useEffect, useMemo, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"

function Navbar() {
  const { user, logout, role } = useContext(AuthContext)
  const profileImage =
    user?.photoURL ||
    "https://res.cloudinary.com/dbanni0vy/image/upload/v1765461579/default_profile_shlfo5.jpg"

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const linkBase =
    "relative rounded-xl px-4 py-2 text-sm font-medium text-base-content/90 transition-all hover:text-[var(--brand)] hover:bg-[var(--brand-soft)]"

  const PublicLinks = ({ compact = false }) => (
    <>
      <li>
        <NavLink
          to="/"
          className={() =>
            compact
              ? "rounded-lg px-3 py-2 text-base-content/90 hover:text-[var(--brand)] hover:bg-[var(--brand-soft)]"
              : linkBase
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/join/employee"
          className={() =>
            compact
              ? "rounded-lg px-3 py-2 text-base-content/90 hover:text-[var(--brand)] hover:bg-[var(--brand-soft)]"
              : linkBase
          }
        >
          Join as Employee
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/join/hr"
          className={() =>
            compact
              ? "rounded-lg px-3 py-2 text-base-content/90 hover:text-[var(--brand)] hover:bg-[var(--brand-soft)]"
              : linkBase
          }
        >
          Join as HR Manager
        </NavLink>
      </li>
    </>
  )

  const employeeMenu = useMemo(
    () => [
      { to: "/dashboard/employee/my-assets", label: "My Assets" },
      { to: "/dashboard/employee/my-team", label: "My Team" },
      { to: "/dashboard/employee/request-asset", label: "Request Asset" },
      { to: "/dashboard/employee/profile", label: "Profile" },
      { to: "/dashboard/employee/notices", label: "Notices" },
    ],
    []
  )

  const hrMenu = useMemo(
    () => [
      { to: "/dashboard/hr", label: "Asset List" },
      { to: "/dashboard/hr/add-asset", label: "Add Asset" },
      { to: "/dashboard/hr/requests", label: "All Requests" },
      { to: "/dashboard/hr/employees", label: "Employee List" },
      { to: "/dashboard/hr/upgrade", label: "Upgrade Package" },
      { to: "/dashboard/hr/profile", label: "Profile" },
    ],
    []
  )

  const menuItems = role === "hr" ? hrMenu : employeeMenu

  return (
    <header className="sticky top-0 z-50">
      <div
        className={[
          "relative transition-all",
          scrolled ? "bg-base-100/80 backdrop-blur-md" : "bg-base-100",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="navbar min-h-[72px] px-0">
            <div className="navbar-start gap-2">
              <div className="dropdown lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>

                <ul className="menu dropdown-content mt-3 w-64 rounded-2xl bg-base-100/95 p-2 shadow-xl backdrop-blur">
                  <PublicLinks compact />

                  {!user && (
                    <li>
                      <Link
                        to="/login"
                        className="rounded-xl px-3 py-2 text-base-content/90 hover:text-[var(--brand)] hover:bg-[var(--brand-soft)]"
                      >
                        Login
                      </Link>
                    </li>
                  )}

                  {user && (
                    <>
                      {menuItems.map(it => (
                        <li key={it.to}>
                          <NavLink
                            to={it.to}
                            className={() =>
                              "rounded-xl px-3 py-2 text-base-content/90 hover:text-[var(--brand)] hover:bg-[var(--brand-soft)]"
                            }
                          >
                            {it.label}
                          </NavLink>
                        </li>
                      ))}

                      <li>
                        <button onClick={logout} className="rounded-xl px-3 py-2 text-error font-semibold">
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <Link to="/" className="group flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--brand)] text-white shadow-md">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
                  </svg>
                </span>
                <span className="text-xl font-bold tracking-tight">AssetVerse</span>
              </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="flex items-center gap-1 rounded-2xl bg-base-100/60 p-1 backdrop-blur">
                <PublicLinks />
              </ul>
            </div>

            <div className="navbar-end gap-2">
              {!user && (
                <Link to="/login" className="btn btn-primary rounded-2xl">
                  Login
                </Link>
              )}

              {user && (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost rounded-2xl px-2 hover:bg-base-200/50">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 rounded-2xl ring-1 ring-base-300">
                          <img src={profileImage} alt="profile" />
                        </div>
                      </div>

                      <div className="hidden md:flex flex-col items-start leading-tight">
                        <span className="text-sm font-semibold text-base-content">
                          {user?.displayName || "User"}
                        </span>
                        <span className="text-xs text-base-content/60">
                          {role === "hr" ? "HR Manager" : "Employee"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul className="menu dropdown-content mt-3 w-64 rounded-2xl bg-base-100/95 p-2 shadow-xl backdrop-blur">
                    {menuItems.map(it => (
                      <li key={it.to}>
                        <NavLink
                          to={it.to}
                          className={() =>
                            "rounded-xl px-3 py-2 text-base-content/90 hover:text-[var(--brand)] hover:bg-[var(--brand-soft)]"
                          }
                        >
                          {it.label}
                        </NavLink>
                      </li>
                    ))}

                    <li>
                      <button onClick={logout} className="rounded-xl px-3 py-2 text-error font-semibold">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
