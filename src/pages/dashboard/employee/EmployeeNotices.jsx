import { useEffect, useState } from "react"
import apiClient from "../../../api/client"

function EmployeeNotices() {
  const [notices, setNotices] = useState([])

  useEffect(() => {
    apiClient
      .get("/api/notices/employee")
      .then(res => setNotices(res.data))
      .catch(err => console.error(err))
  }, [])

  if (!notices.length) {
    return <p>No notices available for your companies.</p>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Company Notices</h1>
      <div className="space-y-3">
        {notices.map(item => (
          <div key={item._id} className="card bg-base-100 shadow border">
            <div className="card-body space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold">{item.title}</h2>
                <span
                  className={`badge badge-sm ${
                    item.priority === "high"
                      ? "badge-error"
                      : item.priority === "medium"
                      ? "badge-warning"
                      : "badge-ghost"
                  }`}
                >
                  {item.priority}
                </span>
              </div>
              <p className="text-sm">{item.message}</p>
              <div className="flex justify-between text-xs text-base-content/70">
                <span>{item.companyName}</span>
                <span>{new Date(item.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmployeeNotices
