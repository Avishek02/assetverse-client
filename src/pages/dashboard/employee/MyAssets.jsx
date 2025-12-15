import { useEffect, useRef, useState } from "react"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"
import { useReactToPrint } from "react-to-print"
import Loading from "../../../components/Loading"

function MyAssets() {
  const [assets, setAssets] = useState([])
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  const printRef = useRef(null)

  const fetchAssets = () => {
    setLoading(true)
    apiClient
      .get("/api/assigned-assets")
      .then(res => setAssets(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
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
      .catch(() => toast.error("Failed to return asset"))
  }

  const filteredAssets = assets.filter(item => {
    const matchesName = (item.assetName || "").toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === "all" ? true : item.assetType === typeFilter
    return matchesName && matchesType
  })

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "AssetVerse - My Assets",
  })

  if (loading) return <Loading />

  return (
    <div className="bg-[#f5f7fb] -m-4 p-4 md:p-6 min-h-screen">
      <div className="max-w-6xl space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs text-[#6b778c]">Employee</div>
            <h1 className="mt-1 text-xl font-semibold text-[#1f2a44]">My Assets</h1>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-lg border border-[#e6eaf2] bg-white px-3 py-2 focus-within:border-[#0065ff] w-full sm:w-[300px]">
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
                placeholder="Search by asset name"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select
              className="rounded-lg border border-[#e6eaf2] bg-white px-3 py-2 text-sm text-[#1f2a44] outline-none focus:border-[#0065ff]"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>

            <button
              className="rounded-lg border border-[#e6eaf2] bg-white px-4 py-2 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7faff]"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#e6eaf2] bg-white" ref={printRef}>
          <div className="grid grid-cols-12 gap-3 border-b border-[#eef1f6] bg-[#fbfcff] px-4 py-3 text-[12px] font-semibold text-[#6b778c]">
            <div className="col-span-2">Image</div>
            <div className="col-span-3">Asset</div>
            <div className="col-span-2">Company</div>
            <div className="col-span-2">Assigned</div>
            <div className="col-span-2">Return Date</div>
            <div className="col-span-1">Status</div>
          </div>

          {filteredAssets.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-[#6b778c]">No assets found</div>
          ) : (
            <div className="divide-y divide-[#eef1f6]">
              {filteredAssets.map(item => (
                <div
                  key={item._id}
                  className="grid grid-cols-12 gap-3 px-4 py-3 text-sm hover:bg-[#f7faff]"
                >
                  <div className="col-span-2">
                    <div className="h-11 w-11 overflow-hidden rounded-lg border border-[#e6eaf2] bg-white">
                      <img src={item.assetImage} alt={item.assetName} className="h-full w-full object-cover" />
                    </div>
                  </div>

                  <div className="col-span-3 min-w-0">
                    <div className="truncate font-semibold text-[#1f2a44]">{item.assetName}</div>
                    <div className="mt-1 text-[12px] text-[#6b778c]">{item.assetType}</div>
                  </div>

                  <div className="col-span-2 text-[#1f2a44]">{item.companyName}</div>

                  <div className="col-span-2 text-[#1f2a44]">
                    {new Date(item.assignmentDate).toLocaleDateString()}
                  </div>

                  <div className="col-span-2 text-[#1f2a44]">
                    {item.returnDate ? new Date(item.returnDate).toLocaleDateString() : "-"}
                  </div>

                  <div className="col-span-1 flex items-center justify-between gap-2">
                    <span
                      className={`rounded-md px-2 py-1 text-[11px] font-semibold capitalize ${
                        item.status === "assigned"
                          ? "bg-[#eef5ff] text-[#0065ff]"
                          : item.status === "returned"
                          ? "bg-[#fff1f2] text-[#be123c]"
                          : "bg-[#f1f5f9] text-[#6b778c]"
                      }`}
                    >
                      {item.status}
                    </span>

                    {item.status === "assigned" && item.assetType === "Returnable" ? (
                      <button
                        className="rounded-md border border-[#e6eaf2] bg-white px-2.5 py-1 text-xs font-semibold text-[#1f2a44] hover:bg-[#f7faff]"
                        onClick={() => handleReturn(item._id)}
                      >
                        Return
                      </button>
                    ) : null}
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

export default MyAssets
