import { useEffect, useMemo, useState } from "react"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"
import Loading from "../../../components/Loading"

function RequestAsset() {
  const [assets, setAssets] = useState([])
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState("")
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  const fetchAssets = () => {
    setLoading(true)
    apiClient
      .get("/api/assets/public")
      .then(res => setAssets(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchAssets()
  }, [])

  const filteredAssets = useMemo(() => {
    const s = search.trim().toLowerCase()
    return assets.filter(item => {
      const name = (item.productName || "").toLowerCase()
      const matchesName = s ? name.includes(s) : true
      const matchesType = typeFilter === "all" ? true : item.productType === typeFilter
      return matchesName && matchesType
    })
  }, [assets, search, typeFilter])

  const handleRequest = e => {
    e.preventDefault()
    if (!selected) return

    apiClient
      .post("/api/requests", {
        assetId: selected._id,
        note,
      })
      .then(() => {
        toast.success("Request submitted")
        setSelected(null)
        setNote("")
      })
      .catch(() => toast.error("Failed to submit request"))
  }

  if (loading) return <Loading />

  return (
    <div className="bg-[#f5f7fb] -m-4 p-4 md:p-6 min-h-screen">
      <div className="max-w-6xl space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs text-[#6b778c]">Employee</div>
            <h1 className="mt-1 text-xl font-semibold text-[#1f2a44]">Request an Asset</h1>
            <div className="mt-1 text-sm text-[#6b778c]">
              Select an available asset and submit your request.
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-lg border border-[#e6eaf2] bg-white px-3 py-2 focus-within:border-[#0065ff] w-full sm:w-[300px]">
              <input
                type="text"
                className="w-full bg-transparent text-sm text-[#1f2a44] outline-none placeholder:text-[#9aa5b1]"
                placeholder="Search assets"
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

            <div className="rounded-lg border border-[#e6eaf2] bg-white px-3 py-2 text-sm text-[#6b778c]">
              Showing <span className="font-semibold text-[#1f2a44]">{filteredAssets.length}</span>
            </div>
          </div>
        </div>

        {filteredAssets.length === 0 ? (
          <div className="rounded-xl border border-[#e6eaf2] bg-white px-4 py-10 text-center text-sm text-[#6b778c]">
            No assets available.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAssets.map(item => {
              const disabled = Number(item.availableQuantity) <= 0
              return (
                <div
                  key={item._id}
                  className="rounded-xl border border-[#e6eaf2] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <div className="relative w-full overflow-hidden rounded-lg border border-[#eef1f6] bg-[#fbfcff] aspect-[5/4] sm:aspect-[4/3] lg:aspect-[5/4]">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>



                    <div className="mt-6 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-[15px] leading-5 font-semibold text-[#1f2a44]">
                            {item.productName}
                          </div>
                          <div className="mt-0.5 text-[13px] leading-4 text-[#6b778c]">
                            {item.productType}
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] leading-4 font-semibold ${disabled
                            ? "bg-[#f1f5f9] text-[#6b778c]"
                            : "bg-[#e6f4ea] text-[#1e7e34]"
                            }`}
                        >
                          {disabled ? "Out" : "Available"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-0">
                        <div className="text-[13px] leading-4 text-[#6b778c]">
                          Available:{" "}
                          <span className="font-semibold text-[#1f2a44]">
                            {item.availableQuantity}
                          </span>
                        </div>

                        <button
                          className={`rounded-lg px-4 py-2 text-[13px] font-semibold transition ${disabled
                            ? "cursor-not-allowed bg-[#f1f5f9] text-[#6b778c]"
                            : "bg-[#0065ff] text-white hover:bg-[#0052cc]"
                            }`}
                          onClick={() => setSelected(item)}
                          disabled={disabled}
                        >
                          Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {selected && (
          <dialog className="modal modal-open">
            <div className="modal-box bg-white border border-[#e6eaf2] rounded-xl max-w-lg">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-[#6b778c]">Request</div>
                  <div className="mt-1 text-lg font-semibold text-[#1f2a44]">
                    {selected.productName}
                  </div>
                  <div className="mt-1 text-sm text-[#6b778c]">
                    Add a note (optional) and submit your request.
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-sm font-semibold text-[#6b778c] hover:bg-[#f5f7fb]"
                  onClick={() => {
                    setSelected(null)
                    setNote("")
                  }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRequest} className="mt-4 space-y-3">
                <textarea
                  className="w-full rounded-lg border border-[#e6eaf2] px-3 py-2 text-sm outline-none focus:border-[#0065ff]"
                  placeholder="Note (optional)"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={4}
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="rounded-lg border border-[#e6eaf2] bg-white px-4 py-2 text-sm font-semibold text-[#1f2a44] hover:bg-[#f7faff]"
                    onClick={() => {
                      setSelected(null)
                      setNote("")
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#0065ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0052cc]"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    </div>
  )
}

export default RequestAsset
