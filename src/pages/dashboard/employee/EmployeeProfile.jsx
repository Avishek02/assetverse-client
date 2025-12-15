import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../providers/AuthProvider"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"
import Loading from "../../../components/Loading"

function EmployeeProfile() {
  const { user, updateUserProfile } = useContext(AuthContext)
  const [name, setName] = useState(user?.displayName || "")
  const [profileImage, setProfileImage] = useState(
    user?.photoURL ||
      "https://res.cloudinary.com/dbanni0vy/image/upload/v1765461579/default_profile_shlfo5.jpg"
  )
  const [dob, setDob] = useState("")
  const [affiliations, setAffiliations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiClient
      .get("/api/affiliations/me")
      .then(res => setAffiliations(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    apiClient
      .patch("/api/users/me", {
        name,
        profileImage,
        dateOfBirth: dob,
      })
      .then(() => {
        updateUserProfile({ displayName: name, photoURL: profileImage })
        toast.success("Profile updated")
      })
      .catch(() => toast.error("Failed to update profile"))
  }

  if (loading) return <Loading />

  return (
    <div className="bg-[#f5f7fb] -m-4 p-4 md:p-6 min-h-screen">
      <div className="max-w-6xl space-y-6">
        <div>
          <div className="text-xs text-[#6b778c]">Account</div>
          <h1 className="mt-1 text-xl font-semibold text-[#1f2a44]">My Profile</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-xl border border-[#e6eaf2] bg-white">
            <div className="border-b border-[#eef1f6] px-5 py-4">
              <div className="text-sm font-semibold text-[#1f2a44]">Profile Details</div>
              <div className="mt-1 text-sm text-[#6b778c]">
                Update your personal information and profile image.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full border border-[#e6eaf2] bg-[#fbfcff]">
                  <img
                    src={profileImage}
                    alt={name || "Profile"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#1f2a44] truncate">
                    {name || "Your Name"}
                  </div>
                  <div className="text-xs text-[#6b778c] truncate">{user?.email || ""}</div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#6b778c]">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-[#e6eaf2] px-3 py-2 text-sm outline-none focus:border-[#0065ff]"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#6b778c]">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-[#e6eaf2] bg-[#f7faff] px-3 py-2 text-sm text-[#6b778c]"
                  value={user?.email || ""}
                  disabled
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#6b778c]">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-[#e6eaf2] px-3 py-2 text-sm outline-none focus:border-[#0065ff]"
                  value={profileImage}
                  onChange={e => setProfileImage(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#6b778c]">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-[#e6eaf2] px-3 py-2 text-sm outline-none focus:border-[#0065ff]"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-[#0065ff] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0052cc]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-xl border border-[#e6eaf2] bg-white">
            <div className="border-b border-[#eef1f6] px-5 py-4">
              <div className="text-sm font-semibold text-[#1f2a44]">
                Affiliated Companies
              </div>
              <div className="mt-1 text-sm text-[#6b778c]">
                Companies where you are currently affiliated.
              </div>
            </div>

            <div className="p-5">
              {affiliations.length === 0 ? (
                <div className="text-sm text-[#6b778c]">No active affiliation</div>
              ) : (
                <div className="space-y-3">
                  {affiliations.map(item => (
                    <div
                      key={item._id}
                      className="flex flex-col gap-3 rounded-xl border border-[#e6eaf2] bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 overflow-hidden rounded-lg border border-[#e6eaf2] bg-[#fbfcff]">
                          <img
                            src={item.companyLogo}
                            alt={item.companyName}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-[#1f2a44]">
                            {item.companyName}
                          </div>
                          <div className="truncate text-xs text-[#6b778c]">
                            HR: {item.hrEmail}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-[#6b778c]">
                        {new Date(item.affiliationDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile
