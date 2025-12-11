import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"

function ChooseRole() {
  const location = useLocation()
  const navigate = useNavigate()
  const { saveUserToBackend } = useContext(AuthContext)

  const googleUser = location.state?.googleUser

  if (!googleUser) {
    navigate("/login")
    return null
  }

  const handleSelectRole = async selectedRole => {
    try {
      const payload = {
        name: googleUser.name,
        email: googleUser.email,
        photoURL: googleUser.photoURL || "",
        role: selectedRole,
        companyName: selectedRole === "hr" ? googleUser.name + " Company" : "",
        companyLogo: googleUser.photoURL || "",
        dateOfBirth: null,
        packageLimit: selectedRole === "hr" ? 5 : 0,
        currentEmployees: selectedRole === "hr" ? 1 : 0,
        subscription: "basic",
      }

      await saveUserToBackend(payload)

      if (selectedRole === "hr") {
        navigate("/dashboard/hr")
      } else {
        navigate("/dashboard/employee/my-assets")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Select your role</h2>
      <p className="mb-4">Continue as Employee or HR for this Google account.</p>

      <div className="space-y-3">
        <button
          className="btn btn-outline w-full"
          onClick={() => handleSelectRole("employee")}
        >
          Continue as Employee
        </button>
        <button
          className="btn btn-primary w-full"
          onClick={() => handleSelectRole("hr")}
        >
          Continue as HR
        </button>
      </div>
    </div>
  )
}

export default ChooseRole
