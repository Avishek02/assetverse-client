import { useState, useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import { Link, useNavigate } from "react-router-dom"

function Login() {
  const { loginWithEmail, loginWithGoogle, saveUserToBackend, checkUserExists } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    loginWithEmail(email, password)
      .then(res => {
        return saveUserToBackend({
          email,
          name: res.user.displayName,
        })
      })
      .then(() => {
        navigate("/")
      })
      .catch(err => console.error(err))
  }

  const handleGoogle = async () => {
    try {
      const result = await loginWithGoogle()
      const gUser = result.user

      const data = await checkUserExists(gUser.email)

      if (data.exists) {
        if (data.user?.role === "hr") {
          navigate("/dashboard/hr")
        } else if (data.user?.role === "employee") {
          navigate("/dashboard/employee/my-assets")
        } else {
          navigate("/")
        }
        return
      }

      navigate("/choose-role", {
        state: {
          googleUser: {
            name: gUser.displayName,
            email: gUser.email,
            photoURL: gUser.photoURL,
          },
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <button onClick={handleGoogle} className="btn btn-outline w-full">
            Continue with Google
          </button>

          <p className="text-center text-sm">
            New here? <Link to="/join/employee" className="link">Join as Employee</Link> or{" "}
            <Link to="/join/hr" className="link">Join as HR</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
