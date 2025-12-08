import { useState, useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import { useNavigate } from "react-router-dom"

function RegisterEmployee() {
  const { registerWithEmail, updateUserProfile } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState("")
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    registerWithEmail(email, password)
      .then(res => {
        updateUserProfile({ displayName: name })
        navigate("/login")
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <h2 className="text-2xl font-bold text-center">Join as Employee</h2>

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
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

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

export default RegisterEmployee
