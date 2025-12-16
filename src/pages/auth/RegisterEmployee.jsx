import { useState, useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider"
import { useNavigate } from "react-router-dom"

function RegisterEmployee() {
  const { registerWithEmail, updateUserProfile, saveUserToBackend } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    registerWithEmail(email, password)
      .then(res => {
        return updateUserProfile({ displayName: name }).then(() => res.user)
      })
      .then(firebaseUser => {
        return saveUserToBackend({
          name,
          email,
          role: "employee",
          dateOfBirth: dob,
        })
      })
      .then(() => {
        navigate("/dashboard/employee/request-asset")
      })
      .catch(err => console.error(err))
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "var(--bg-page)" }}
    >
      <div className="w-full max-w-4xl">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border shadow-sm"
          style={{ borderColor: "var(--border)", background: "var(--bg-surface-soft)" }}
        >
          <div className="p-6 sm:p-10">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--primary)]">
                Create Employee Account
              </h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Register with your work email to access employee dashboard.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--divider)", background: "var(--bg-hover-soft)" }}
              >
                <div className="text-xs font-medium uppercase tracking-wide " style={{ color: "var(--text-secondary)" }}>
                  Account type
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold border"
                    style={{
                      borderColor: "var(--brand-soft)",
                      background: "var(--bg-active)",
                      color: "var(--primary)",
                    }}
                  >
                    Employee
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Role will be set automatically.
                  </span>
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
                  <li>• Use a strong password.</li>
                  <li>• Date of birth is required for profile completion.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 border-t lg:border-t-0 lg:border-l" style={{ borderColor: "var(--divider)" }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Full name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl px-4 py-3 border outline-none focus:ring-2 transition"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-surface-soft)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

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
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Password
                </label>
                <div
                  className="flex items-center gap-2 rounded-xl border px-3 py-2"
                  style={{ borderColor: "var(--border)", background: "var(--bg-surface-soft)" }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-transparent px-1 py-1 outline-none"
                    placeholder="Create a password"
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
                  Minimum 6+ characters recommended.
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Date of birth
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl px-4 py-3 border outline-none focus:ring-2 transition"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  required
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-surface-soft)",
                    color: "var(--text-primary)",
                  }}
                />
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
                Register
              </button>

              <div className="text-xs text-center" style={{ color: "var(--text-secondary)" }}>
                By registering, you agree to company policies and terms.
              </div>
            </form>
          </div>
        </div>
        {/* 
        <div className="mt-6 text-center text-xs" style={{ color: "var(--text-secondary)" }}>
          Powered by internal HR portal
        </div> */}
      </div>
    </div>
  )
}

export default RegisterEmployee
