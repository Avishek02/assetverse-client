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
      .then(async res => {
        const data = await checkUserExists(res.user.email)

        if (data.user?.role === "hr") {
          navigate("/dashboard/hr")
          return
        }

        if (data.user?.role === "employee") {
          navigate("/dashboard/employee/my-assets")
          return
        }

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
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: "var(--bg-page)" }}>
      <div className="w-full max-w-5xl">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border shadow-sm"
          style={{ borderColor: "var(--border)", background: "var(--bg-surface-soft)" }}
        >
          <div className="p-6 sm:p-10">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: "var(--primary)" }}>
                Welcome back
              </h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Sign in to continue to your dashboard.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--divider)", background: "var(--bg-hover-soft)" }}
              >
                <div className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                  Access
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <div className="flex items-center justify-between">
                    <span>HR dashboard</span>
                    <span className="text-xs" style={{ color: "var(--text-placeholder-soft)" }}>
                      /dashboard/hr
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Employee assets</span>
                    <span className="text-xs" style={{ color: "var(--text-placeholder-soft)" }}>
                      /dashboard/employee/my-assets
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--divider)", background: "var(--bg-hover-soft)" }}
              >
                <div className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                  Notes
                </div>
                <ul className="mt-2 space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <li>• Use your registered email.</li>
                  <li>• Google sign-in will continue existing accounts.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 border-t lg:border-t-0 lg:border-l" style={{ borderColor: "var(--divider)" }}>
            <div className="mb-5">
              <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Sign in
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                Enter your credentials below.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl px-4 py-3 border outline-none focus:ring-2 transition"
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-surface-soft)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    Password
                  </label>
                </div>

                <div
                  className="flex items-center gap-2 rounded-xl border px-3 py-2"
                  style={{ borderColor: "var(--border)", background: "var(--bg-surface-soft)" }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-transparent px-1 py-1 outline-none"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ color: "var(--text-primary)" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="rounded-lg px-3 py-2 text-sm font-medium border transition"
                    style={{
                      borderColor: "var(--divider)",
                      background: "var(--bg-hover)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="text-xs" style={{ color: "var(--text-placeholder-soft)" }}>
                  Keep your credentials secure.
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl px-4 py-3 font-semibold transition border"
                style={{
                  background: "var(--primary)",
                  borderColor: "var(--primary)",
                  color: "white",
                }}
                onMouseOver={e => (e.currentTarget.style.background = "var(--primary-hover)")}
                onMouseOut={e => (e.currentTarget.style.background = "var(--primary)")}
              >
                Login
              </button>
            </form>

            <div className="mt-5">
              <button
                onClick={handleGoogle}
                className="w-full rounded-xl px-4 py-3 font-semibold transition border"
                style={{
                  background: "var(--bg-surface-soft)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
                onMouseOver={e => (e.currentTarget.style.background = "var(--bg-hover)")}
                onMouseOut={e => (e.currentTarget.style.background = "var(--bg-surface-soft)")}
              >
                Continue with Google
              </button>
            </div>

            <div className="mt-6 text-sm text-center" style={{ color: "var(--text-secondary)" }}>
              New here?{" "}
              <Link to="/join/employee" className="font-medium underline underline-offset-4" style={{ color: "var(--primary)" }}>
                Join as Employee
              </Link>{" "}
              or{" "}
              <Link to="/join/hr" className="font-medium underline underline-offset-4" style={{ color: "var(--primary)" }}>
                Join as HR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
