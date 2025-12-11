import { useEffect, useState } from "react"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"

function Requests() {
  const [requests, setRequests] = useState([])
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("low")


  const fetchRequests = () => {
    apiClient
      .get("/api/requests/hr")
      .then(res => setRequests(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleApprove = id => {
    apiClient
      .patch(`/api/requests/${id}/approve`)
      .then(() => {
        toast.success("Request approved")
        fetchRequests()
      })
      .catch(err => {
        console.error(err)
        toast.error("Failed to approve")
      })
  }

  const handleReject = id => {
    apiClient
      .patch(`/api/requests/${id}/reject`)
      .then(() => {
        toast.success("Request rejected")
        fetchRequests()
      })
      .catch(err => {
        console.error(err)
        toast.error("Failed to reject")
      })
  }


  const handleCreateNotice = e => {
    e.preventDefault()
    apiClient
      .post("/api/notices", { title, message, priority })
      .then(() => {
        toast.success("Notice created")
        setTitle("")
        setMessage("")
        setPriority("low")
      })
      .catch(err => {
        console.error(err)
        toast.error("Failed to create notice")
      })
  }


  return (
    <div>
      <div className="card bg-base-100 shadow border mb-6">
        <div className="card-body space-y-3">
          <h2 className="card-title text-lg">Create Notice</h2>
          <form onSubmit={handleCreateNotice} className="grid gap-3 md:grid-cols-[2fr_1fr]">
            <div className="space-y-3">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Notice title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <select
                className="select select-bordered w-full"
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                <option value="low">Low priority</option>
                <option value="medium">Medium priority</option>
                <option value="high">High priority</option>
              </select>
              <button type="submit" className="btn btn-primary w-full mt-auto">
                Publish Notice
              </button>
            </div>
          </form>
        </div>
      </div>


      <h1 className="text-2xl font-bold mb-4">All Requests</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Asset</th>
              <th>Company</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(item => (
              <tr key={item._id}>
                <td>
                  <div>
                    <div className="font-semibold">{item.requesterName}</div>
                    <div className="text-xs text-base-content/70">{item.requesterEmail}</div>
                  </div>
                </td>
                <td>
                  <div>{item.assetName}</div>
                  <div className="text-xs text-base-content/70">{item.assetType}</div>
                </td>
                <td>{item.companyName}</td>
                <td>{new Date(item.requestDate).toLocaleDateString()}</td>
                <td className="capitalize">{item.requestStatus}</td>
                <td className="flex gap-2">
                  {item.requestStatus === "pending" && (
                    <>
                      <button className="btn btn-xs btn-success" onClick={() => handleApprove(item._id)}>
                        Approve
                      </button>
                      <button className="btn btn-xs btn-error" onClick={() => handleReject(item._id)}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Requests
