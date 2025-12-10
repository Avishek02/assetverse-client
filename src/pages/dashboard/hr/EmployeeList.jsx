import { useEffect, useState } from "react"
import apiClient from "../../../api/client"

function EmployeeList() {
  const [employees, setEmployees] = useState([])

  const fetchEmployees = () => {
    apiClient
      .get("/api/employees/hr")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Employee List</h1>
      <p className="mb-4 text-sm">
        Total employees: {employees.length}
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employees.map(item => (
          <div key={item.id} className="card bg-base-100 shadow-md border">
            <div className="card-body space-y-2">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={item.companyLogo} alt={item.companyName} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{item.employeeName}</h3>
                  <p className="text-xs text-base-content/70">{item.employeeEmail}</p>
                </div>
              </div>
              <p className="text-sm text-base-content/70">
                Company: {item.companyName}
              </p>
              <p className="text-sm text-base-content/70">
                Join date: {new Date(item.affiliationDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Assets: <span className="font-semibold">{item.assetsCount}</span>
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-outline btn-disabled">
                  Remove from team
                </button>
              </div>
            </div>
          </div>
        ))}
        {employees.length === 0 && <p>No employees found.</p>}
      </div>
    </div>
  )
}

export default EmployeeList
