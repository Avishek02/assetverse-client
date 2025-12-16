import { useEffect, useState } from "react"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import Loading from "../../../components/Loading"

function AssetList() {
  const [assets, setAssets] = useState([])
  const [search, setSearch] = useState("")
  const [assetTypeData, setAssetTypeData] = useState([])
  const [topRequestedData, setTopRequestedData] = useState([])
  const [employees, setEmployees] = useState([])
  const [assignAssetId, setAssignAssetId] = useState(null)
  const [assignEmployeeEmail, setAssignEmployeeEmail] = useState("")
  const [overview, setOverview] = useState({ activeAssets: 0, assigned: 0, returnable: 0 })
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const pieData = assetTypeData.map(item => ({
    name: item.type,
    value: item.count,
  }))

  const barData = topRequestedData.map(item => ({
    name: item.assetName,
    requests: item.requests,
  }))

  const PIE_COLORS = [
    "#0065ff",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#06b6d4",
    "#64748b",
    "#ec4899",
    "#84cc16",
    "#f97316",
  ]

  const refetchAll = (nextSearch = search) => {
    setLoading(true)
    return Promise.all([
      apiClient.get("/api/assets", { params: { page: 1, limit: 100000, search: nextSearch } }),
      apiClient.get("/api/analytics/asset-types"),
      apiClient.get("/api/analytics/top-requested-assets"),
      apiClient.get("/api/analytics/hr/overview"),
    ])
      .then(([assetsRes, typeRes, topRes, overviewRes]) => {
        setAssets(assetsRes.data.data)
        setAssetTypeData(typeRes.data)
        setTopRequestedData(topRes.data)
        setOverview(overviewRes.data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refetchAll(search)
  }, [])

  useEffect(() => {
    apiClient
      .get("/api/employees/hr")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
  }, [])

  const openAssignModal = assetId => {
    setAssignAssetId(assetId)
    setAssignEmployeeEmail("")
    document.getElementById("assign_modal").showModal()
  }

  const handleDirectAssign = e => {
    e.preventDefault()
    apiClient
      .post(`/api/assets/${assignAssetId}/direct-assign`, {
        employeeEmail: assignEmployeeEmail,
      })
      .then(() => {
        toast.success("Asset assigned")
        document.getElementById("assign_modal").close()
        refetchAll()
      })
      .catch(err => {
        toast.error(err.response?.data?.message || "Failed to assign")
      })
  }

  const handleSearch = e => {
    e.preventDefault()
    setCurrentPage(1)
    refetchAll(search)
  }

  const handleDelete = id => {
    apiClient
      .delete(`/api/assets/${id}`)
      .then(() => {
        toast.success("Asset deleted successfully")
        refetchAll()
      })
      .catch(() => toast.error("Failed to delete asset"))
  }

  if (loading) return <Loading />

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentAssets = assets.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.max(1, Math.ceil(assets.length / rowsPerPage))

  return (
    <div className="bg-[#f5f7fb] -m-4 p-4 md:p-6 min-h-[calc(100vh-120px)]">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-semibold text-[var(--primary)]">Asset List</h1>
            </div>
          </div>

          <form onSubmit={handleSearch} className="w-full md:w-[460px]">
            <div className="flex items-center gap-2 rounded-lg border border-[#e6eaf2] bg-white px-3 py-2 focus-within:border-[#0065ff]">
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
                type="text"
                className="w-full bg-transparent text-sm text-[#1f2a44] outline-none placeholder:text-[#9aa5b1]"
                placeholder="Search by name"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />

              <button
                type="submit"
                className="rounded-md bg-[#eef5ff] px-3 py-1.5 text-xs font-semibold text-[#0065ff] hover:bg-[#e3efff]"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-xl border border-[#e6eaf2] bg-white">
          <div className="border-b border-[#eef1f6] px-5 py-3">
            <div className="text-sm font-semibold text-[#1f2a44]">Live asset overview</div>
            <div className="mt-1 text-sm text-[#6b778c]">
              See assigned, available, and returnable assets at a glance.
            </div>
          </div>

          <div className="grid gap-3 p-5 md:grid-cols-3">
            <div className="rounded-xl border border-[#dbe7ff] bg-[#eef5ff] p-4">
              <div className="text-[11px] font-semibold tracking-wide text-[#3358a4]">ACTIVE ASSETS</div>
              <div className="mt-1 text-3xl font-semibold text-[#1f2a44]">{overview.activeAssets}</div>
            </div>

            <div className="rounded-xl border border-[#d6f3e1] bg-[#eafaf0] p-4">
              <div className="text-[11px] font-semibold tracking-wide text-[#1e7e34]">ASSIGNED</div>
              <div className="mt-1 text-3xl font-semibold text-[#1f2a44]">{overview.assigned}</div>
            </div>

            <div className="rounded-xl border border-[#ffe7c2] bg-[#fff4e5] p-4">
              <div className="text-[11px] font-semibold tracking-wide text-[#b26a00]">RETURNABLE</div>
              <div className="mt-1 text-3xl font-semibold text-[#1f2a44]">{overview.returnable}</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-[#e6eaf2] bg-white">
            <div className="border-b border-[#eef1f6] px-5 py-3">
              <div className="text-sm font-semibold text-[#1f2a44]">Returnable vs Non-returnable</div>
            </div>

            <div className="h-64 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="value" data={pieData} outerRadius={85} label>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-[#e6eaf2] bg-white">
            <div className="border-b border-[#eef1f6] px-5 py-3">
              <div className="text-sm font-semibold text-[#1f2a44]">Top 5 most requested assets</div>
            </div>

            <div className="h-64 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" hide={barData.length === 0} />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{ fill: "#F73D93", opacity: 0.08 }} />
                  <Bar
                    dataKey="requests"
                    fill="#F73D93"
                    radius={[6, 6, 0, 0]}
                    activeBar={{ fill: "#E73385" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#e6eaf2] bg-white">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-12 gap-3 border-b border-[#eef1f6] bg-[#fbfcff] px-4 py-3 text-[12px] font-semibold text-[#6b778c]">
                <div className="col-span-2">Image</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-1 text-right">Qty</div>
                <div className="col-span-1 text-right">Avail</div>
                <div className="col-span-2">Date Added</div>
                <div className="col-span-1 text-right">Action</div>
              </div>

              {assets.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-[#6b778c]">No assets found</div>
              ) : (
                <div className="divide-y divide-[#eef1f6]">
                  {currentAssets.map(item => (
                    <div
                      key={item._id}
                      className="grid grid-cols-12 gap-3 px-4 py-3 text-sm hover:bg-[#f7faff]"
                    >
                      <div className="col-span-2">
                        <div className="h-11 w-11 overflow-hidden rounded-lg border border-[#e6eaf2] bg-white">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="col-span-3 min-w-0">
                        <div className="truncate font-semibold text-[#1f2a44]">{item.productName}</div>
                        <div className="mt-1 text-[12px] text-[#6b778c]">ID: {item._id}</div>
                      </div>

                      <div className="col-span-2 text-[#1f2a44]">{item.productType}</div>

                      <div className="col-span-1 text-right font-semibold text-[#1f2a44]">
                        {item.productQuantity}
                      </div>

                      <div className="col-span-1 text-right font-semibold text-[#1f2a44]">
                        {item.availableQuantity}
                      </div>

                      <div className="col-span-2 text-[#1f2a44]">
                        {new Date(item.dateAdded).toLocaleDateString()}
                      </div>

                      <div className="col-span-1 flex justify-end gap-2">
                        <button
                          className="rounded-md bg-[#eef5ff] px-2.5 py-1 text-xs font-semibold text-[#0065ff] hover:bg-[#e3efff]"
                          onClick={() => openAssignModal(item._id)}
                        >
                          Assign
                        </button>
                        <button
                          className="rounded-md bg-[#fdecea] px-2.5 py-1 text-xs font-semibold text-[#c92a2a] hover:bg-[#f8d7da]"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-md px-3 py-1 text-sm font-semibold ${
                  currentPage === page
                    ? "bg-[#0065ff] text-white"
                    : "border border-[#e6eaf2] text-[#1f2a44]"
                }`}
              >
                {page}
              </button>
            )
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="rounded-md bg-[#0065ff] px-3 py-1 text-sm text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <dialog id="assign_modal" className="modal">
          <div className="modal-box bg-white border border-[#e6eaf2] rounded-xl max-w-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-[#1f2a44]">Direct Assign</div>
                <div className="mt-1 text-sm text-[#6b778c]">Select an employee to assign this asset.</div>
              </div>
              <button
                type="button"
                className="rounded-md px-2 py-1 text-sm font-semibold text-[#6b778c] hover:bg-[#f5f7fb]"
                onClick={() => document.getElementById("assign_modal").close()}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDirectAssign} className="mt-4 space-y-3">
              <select
                className="w-full rounded-lg border border-[#e6eaf2] px-3 py-2 text-sm outline-none focus:border-[#0065ff]"
                value={assignEmployeeEmail}
                onChange={e => setAssignEmployeeEmail(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select employee
                </option>
                {employees.map(emp => (
                  <option key={emp.employeeEmail} value={emp.employeeEmail}>
                    {emp.employeeName} - {emp.employeeEmail}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="rounded-lg border border-[#e6eaf2] bg-white px-4 py-2 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7faff]"
                  onClick={() => document.getElementById("assign_modal").close()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0065ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0052cc]"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  )
}

export default AssetList
