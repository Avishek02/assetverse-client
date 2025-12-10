
import { useEffect, useState } from "react"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"


function MyAssets() {
  const [assets, setAssets] = useState([])

  const fetchAssets = () => {
    apiClient
      .get("/api/assigned-assets")
      .then(res => setAssets(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchAssets()
  }, [])

  const handleReturn = id => {
    apiClient
      .patch(`/api/assigned-assets/${id}/return`)
      .then(() => {
        toast.success("Asset returned")
        fetchAssets()
      })
      .catch(err => {
        console.error(err)
        toast.error("Failed to return asset")
      })
  }



  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Assets</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Asset</th>
              <th>Company</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {assets.map(item => (
              <tr key={item._id}>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded">
                      <img src={item.assetImage} />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-semibold">{item.assetName}</div>
                  <div className="text-xs">{item.assetType}</div>
                </td>
                <td>{item.companyName}</td>
                <td>{new Date(item.assignmentDate).toLocaleDateString()}</td>
                <td className="capitalize">{item.status}</td>

                <td>
                  {item.status.toLowerCase() === "assigned"
                    && item.assetType === "Returnable" && (
                      <button className="btn btn-xs btn-outline" onClick={() => handleReturn(item._id)}>
                        Return
                      </button>
                    )}
                </td>
              </tr>
            ))}
            {assets.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No assigned assets</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyAssets
