import { useState, useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import { useNavigate } from "react-router-dom"

function RegisterHR() {
  const { registerWithEmail, updateUserProfile, saveUserToBackend } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [companyLogo, setCompanyLogo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    registerWithEmail(email, password)
      .then(res => {
        return updateUserProfile({ displayName: name, photoURL: companyLogo }).then(() => res.user)
      })
      .then(firebaseUser => {
        return saveUserToBackend({
          name,
          email,
          role: "hr",
          companyName,
          companyLogo,
          dateOfBirth: dob,
        })
      })
      .then(() => {
        navigate("/dashboard/hr/add-asset")
      })

      .catch(err => console.error(err))
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <h2 className="text-2xl font-bold text-center">Join as HR Manager</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Company Name"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              required
            />

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Company Logo URL"
              value={companyLogo}
              onChange={e => setCompanyLogo(e.target.value)}
              required
            />

            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type="date"
              className="input input-bordered w-full"
              value={dob}
              onChange={e => setDob(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterHR
