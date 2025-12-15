import { useContext, useState } from "react"
import { AuthContext } from "../../../providers/AuthProvider"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"

function HrProfile() {
  const { user, updateUserProfile } = useContext(AuthContext)
  const [name, setName] = useState(user?.displayName || "")
  const [companyName, setCompanyName] = useState("")
  const [companyLogo, setCompanyLogo] = useState(user?.photoURL || "https://res.cloudinary.com/dbanni0vy/image/upload/v1765566131/test_logo_llyfvt.avif")
  const [dob, setDob] = useState("")

  const handleSubmit = e => {
    e.preventDefault()

    apiClient
      .patch("/api/users/me", {
        name,
        companyName,
        companyLogo,
        dateOfBirth: dob,
      })
      .then(() => {
        updateUserProfile({ displayName: name, photoURL: companyLogo })
        toast.success("Profile updated")
      })
      .catch(err => {
        console.error(err)
        toast.error("Failed to update profile")
      })
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">HR Profile</h1>

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
          placeholder="Company Name"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Company Logo URL"
          value={companyLogo}
          onChange={e => setCompanyLogo(e.target.value)}
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
    </div>
  )
}

export default HrProfile
