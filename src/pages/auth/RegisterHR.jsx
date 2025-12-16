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
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: "var(--bg-page)" }}>
      <div className="w-full max-w-5xl">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border shadow-sm"
          style={{ borderColor: "var(--border)", background: "var(--bg-surface-soft)" }}
        >
          <div className="p-6 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--primary)]">
                  Create HR Account
                </h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Set up your company profile and start managing assets.
                </p>
              </div>

              <div
                className="h-12 w-12 rounded-2xl border flex items-center justify-center"
                style={{ borderColor: "var(--divider)", background: "var(--bg-hover-soft)" }}
              >
                <div
                  className="h-6 w-6 rounded-lg"
                  style={{
                    background: "var(--primary)",
                    boxShadow: "0 10px 24px rgba(0, 101, 255, 0.18)",
                  }}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--divider)", background: "var(--bg-hover-soft)" }}
              >
                <div className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
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
                    HR Manager
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
                  Company profile
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div
                    className="h-11 w-11 rounded-xl border overflow-hidden flex items-center justify-center"
                    style={{ borderColor: "var(--border)", background: "var(--bg-surface-soft)" }}
                  >
                    {companyLogo ? (
                      <img src={companyLogo} alt="Company logo" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-6 w-6 rounded-lg" style={{ background: "var(--bg-active)" }} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                      {companyName || "Company name preview"}
                    </div>
                    <div className="text-xs truncate" style={{ color: "var(--text-placeholder-soft)" }}>
                      {companyLogo || "Designation preview"}
                    </div>
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
                  <li>• Use a valid logo URL (https).</li>
                  <li>• Use a strong password.</li>
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
                  Company name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl px-4 py-3 border outline-none focus:ring-2 transition"
                  placeholder="Enter company name"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
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
                  Company logo URL
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl px-4 py-3 border outline-none focus:ring-2 transition"
                  placeholder="https://..."
                  value={companyLogo}
                  onChange={e => setCompanyLogo(e.target.value)}
                  required
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-surface-soft)",
                    color: "var(--text-primary)",
                  }}
                />
                <div className="text-xs" style={{ color: "var(--text-placeholder-soft)" }}>
                  This will be used as profile photo.
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl px-4 py-3 border outline-none focus:ring-2 transition"
                  placeholder="hr@company.com"
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

        {/* <div className="mt-6 text-center text-xs" style={{ color: "var(--text-secondary)" }}>
          Powered by internal HR portal
        </div> */}
      </div>
    </div>
  )
}

export default RegisterHR
