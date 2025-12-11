import { Link, NavLink } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"


function Navbar() {
  const { user, logout, role } = useContext(AuthContext)
  const profileImage = user?.photoURL || "https://res.cloudinary.com/dbanni0vy/image/upload/v1765461579/default_profile_shlfo5.jpg"

  // console.log("ROLE:", role)



  const publicLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/join/employee">Join as Employee</NavLink>
      </li>
      <li>
        <NavLink to="/join/hr">Join as HR Manager</NavLink>
      </li>
    </>
  )

  return (
    <div className="navbar bg-base-100 px-4 shadow">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {publicLinks}
          </ul>
        </div>

        <Link to="/" className="text-2xl font-bold tracking-tight">
          AssetVerse
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{publicLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        {!user && (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}

        {user && role === "employee" && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profileImage} alt="profile" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NavLink to="/dashboard/employee/my-assets">My Assets</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/employee/my-team">My Team</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/employee/request-asset">Request Asset</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/employee/profile">Profile</NavLink>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>

            </ul>
          </div>
        )}

        {user && role === "hr" && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profileImage} alt="profile" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56">
              <li>
                <NavLink to="/dashboard/hr">Asset List</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/hr/add-asset">Add Asset</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/hr/requests">All Requests</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/hr/employees">Employee List</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/hr/upgrade">Upgrade Package</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/hr/profile">Profile</NavLink>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}


      </div>
    </div>
  )
}

export default Navbar
