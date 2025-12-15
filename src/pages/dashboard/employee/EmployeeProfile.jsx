import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../../providers/AuthProvider"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"
import Loading from "../../../components/Loading"



function EmployeeProfile() {
  const { user, updateUserProfile } = useContext(AuthContext)
  const [name, setName] = useState(user?.displayName || "")
  const [profileImage, setProfileImage] = useState(user?.photoURL || "https://res.cloudinary.com/dbanni0vy/image/upload/v1765461579/default_profile_shlfo5.jpg")
  const [dob, setDob] = useState("")

  const [affiliations, setAffiliations] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    apiClient
      .get("/api/affiliations/me")
      .then(res => setAffiliations(res.data))
      .catch(err => console.error(err))
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
      .catch(err => {
        console.error(err)
        toast.error("Failed to update profile")
      })
  }

  if (loading) return <Loading />
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">My Profile</h1>

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
          value={user?.email || ""}
          disabled
        />

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Profile Image URL"
          value={profileImage}
          onChange={e => setProfileImage(e.target.value)}
        />

        <input
          type="date"
          className="input input-bordered w-full"
          value={dob}
          onChange={e => setDob(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>

      <div className="card bg-base-100 shadow border">
        <div className="card-body">
          <h2 className="text-lg font-semibold mb-3">Affiliated Companies</h2>

          {affiliations.length === 0 && (
            <p className="text-sm text-base-content/70">No active affiliation</p>
          )}

          <div className="space-y-3">
            {affiliations.map(item => (
              <div key={item._id} className="flex items-center justify-between gap-3 border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded">
                      <img src={item.companyLogo} alt={item.companyName} />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{item.companyName}</div>
                    <div className="text-xs text-base-content/70">HR: {item.hrEmail}</div>
                  </div>
                </div>
                <div className="text-xs text-base-content/70">
                  {new Date(item.affiliationDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default EmployeeProfile
