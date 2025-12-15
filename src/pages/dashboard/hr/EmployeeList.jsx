import { useEffect, useMemo, useState } from "react"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"
import Loading from "../../../components/Loading"

function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState("")

  const fetchEmployees = () => {
    setLoading(true)
    apiClient
      .get("/api/employees/hr")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleRemove = email => {
    if (!confirm("Remove this employee? All assets will be returned.")) return

    apiClient
      .delete(`/api/employees/hr/${email}`)
      .then(() => {
        toast.success("Employee removed")
        fetchEmployees()
      })
      .catch(err => {
        console.error(err)
        toast.error("Failed to remove employee")
      })
  }

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return employees
    return employees.filter(item => {
      const name = (item.employeeName || "").toLowerCase()
      const email = (item.employeeEmail || "").toLowerCase()
      const company = (item.companyName || "").toLowerCase()
      return name.includes(s) || email.includes(s) || company.includes(s)
    })
  }, [employees, q])

  if (loading) return <Loading />

  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#f5f7fb] -m-4 p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs text-[#6b778c]">HR / Employees</div>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-semibold text-[#1f2a44]">
                My Employee List
              </h1>
              <span className="inline-flex items-center rounded-full border border-[#e6eaf2] bg-white px-2.5 py-1 text-xs font-semibold text-[#1f2a44]">
                {employees.length} Total
              </span>
            </div>
          </div>

          <div className="w-full md:w-[420px]">
            <div className="flex items-center gap-2 rounded-lg border border-[#e6eaf2] bg-white px-3 py-2 shadow-[0_1px_0_rgba(16,24,40,0.02)] focus-within:border-[#0065ff]">
              <svg
                className="h-4 w-4 text-[#6b778c]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.65 16.65"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>

              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                className="w-full bg-transparent text-sm text-[#1f2a44] outline-none placeholder:text-[#9aa5b1]"
                placeholder="Search by name, email, company"
              />

              {q.trim() ? (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="rounded-md px-2 py-1 text-xs font-semibold text-[#0065ff] hover:bg-[#eef5ff]"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <div className="mt-1 text-[12px] text-[#6b778c]">
              Showing <span className="font-semibold text-[#1f2a44]">{filtered.length}</span> of{" "}
              <span className="font-semibold text-[#1f2a44]">{employees.length}</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#e6eaf2] bg-white shadow-[0_1px_0_rgba(16,24,40,0.02)]">
          <div className="grid grid-cols-12 gap-3 border-b border-[#eef1f6] bg-[#fbfcff] px-4 py-3 text-[12px] font-semibold text-[#6b778c]">
            <div className="col-span-6 md:col-span-5">Employee</div>
            <div className="hidden md:block md:col-span-3">Company</div>
            <div className="col-span-3 md:col-span-2 text-right">Assets</div>
            <div className="col-span-3 md:col-span-2 text-right">Action</div>
          </div>

          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <div className="text-sm font-semibold text-[#1f2a44]">No employees found</div>
              <div className="mt-1 text-sm text-[#6b778c]">Try adjusting your search.</div>
            </div>
          ) : (
            <div className="divide-y divide-[#eef1f6]">
              {filtered.map(item => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-3 px-4 py-3 hover:bg-[#f7faff] transition-colors"
                >
                  <div className="col-span-6 md:col-span-5 min-w-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 overflow-hidden rounded-lg border border-[#e6eaf2] bg-white">
                        <img
                          src={item.companyLogo}
                          alt={item.companyName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-[#1f2a44]">
                          {item.employeeName}
                        </div>
                        <div className="truncate text-[12px] text-[#6b778c]">
                          {item.employeeEmail}
                        </div>
                        <div className="mt-1 text-[12px] text-[#9aa5b1]">
                          Join: {new Date(item.affiliationDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block md:col-span-3 min-w-0">
                    <div className="truncate text-sm font-semibold text-[#1f2a44]">
                      {item.companyName}
                    </div>
                    <div className="mt-1 inline-flex items-center rounded-md bg-[#eef5ff] px-2 py-1 text-[11px] font-semibold text-[#0065ff]">
                      Active
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2 flex items-center justify-end">
                    <div className="inline-flex items-center rounded-lg border border-[#e6eaf2] bg-white px-2.5 py-1 text-xs font-semibold text-[#1f2a44]">
                      {item.assetsCount}
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemove(item.employeeEmail)}
                      className="inline-flex items-center justify-center rounded-lg border border-[#ffd6d6] bg-[#fff5f5] px-3 py-2 text-xs font-semibold text-[#c92a2a] hover:bg-[#ffecec] active:scale-[0.99] transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
