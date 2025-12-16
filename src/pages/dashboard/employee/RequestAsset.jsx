import { useEffect, useMemo, useRef, useState } from "react"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"
import Loading from "../../../components/Loading"
import { motion, useAnimation } from "framer-motion"

function RevealSection({ children, className, style, delay = 0 }) {
  const controls = useAnimation()
  const isDownRef = useRef(true)
  const playedRef = useRef(false)

  useEffect(() => {
    let lastY = window.scrollY || 0
    const onScroll = () => {
      const y = window.scrollY || 0
      isDownRef.current = y > lastY
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.section
      className={className}
      style={style}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay }}
      viewport={{ amount: 0.2, once: false }}
      onViewportEnter={() => {
        if (playedRef.current) return
        if (isDownRef.current) {
          playedRef.current = true
          controls.start("visible")
        } else {
          controls.set("visible")
        }
      }}
    >
      {children}
    </motion.section>
  )
}

function RevealBlock({ children, className, style, delay = 0 }) {
  const controls = useAnimation()
  const isDownRef = useRef(true)
  const playedRef = useRef(false)

  useEffect(() => {
    let lastY = window.scrollY || 0
    const onScroll = () => {
      const y = window.scrollY || 0
      isDownRef.current = y > lastY
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.42, delay }}
      viewport={{ amount: 0.25, once: false }}
      onViewportEnter={() => {
        if (playedRef.current) return
        if (isDownRef.current) {
          playedRef.current = true
          controls.start("visible")
        } else {
          controls.set("visible")
        }
      }}
    >
      {children}
    </motion.div>
  )
}

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
      .catch(() => { })
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
    <div className="bg-[var(--bg-page)] -m-4 p-4 md:p-6 min-h-screen">
      <div className="max-w-6xl space-y-5">
        <RevealSection delay={0} className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mt-1 text-xl font-semibold text-[var(--primary)]">Request an Asset</h1>
              <div className="mt-1 text-sm text-[var(--text-secondary)]">
                Select an available asset and submit your request.
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-3 py-2 focus-within:border-[var(--primary)] w-full sm:w-[300px]">
                <input
                  type="text"
                  className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-placeholder-soft)]"
                  placeholder="Search assets"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <select
                className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)]"
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>

              <div className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--text-secondary)]">
                Showing{" "}
                <span className="font-semibold text-[var(--text-primary)]">{filteredAssets.length}</span>
              </div>
            </div>
          </div>

          {filteredAssets.length === 0 ? (
            <RevealBlock className="rounded-xl border border-[var(--border)] bg-white px-4 py-10 text-center text-sm text-[var(--text-secondary)]">
              No assets available.
            </RevealBlock>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAssets.map((item, i) => {
                const disabled = Number(item.availableQuantity) <= 0
                return (
                  <RevealBlock
                    key={item._id}
                    delay={(i % 9) * 0.03}
                    className="group rounded-xl border border-[var(--border)] bg-white overflow-hidden shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-lg hover:border-[var(--brand-soft)]"
                  >
                    <div className="p-4">
                      <div className="relative w-full overflow-hidden rounded-lg border border-[var(--divider)] bg-[var(--bg-surface-soft)] aspect-[5/4] sm:aspect-[4/3] lg:aspect-[5/4]">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
                          loading="lazy"
                        />

                      </div>

                      <div className="mt-6 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-[15px] leading-5 font-semibold text-[var(--text-primary)]">
                              {item.productName}
                            </div>
                            <div className="mt-0.5 text-[13px] leading-4 text-[var(--text-secondary)]">
                              {item.productType}
                            </div>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] leading-4 font-semibold ${disabled
                                ? "bg-[var(--bg-disabled-soft)] text-[var(--stock-status-01)]"
                                : "bg-[var(--stock-status-02)] text-[var(--stock-status-03)]"
                              }`}
                          >
                            {disabled ? "Out" : "Available"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-0">
                          <div className="text-[13px] leading-4 text-[var(--text-secondary)]">
                            Available:{" "}
                            <span className="font-semibold text-[var(--text-primary)]">{item.availableQuantity}</span>
                          </div>

                          <button
                            className={`rounded-lg px-4 py-2 text-[13px] font-semibold transition ${disabled
                                ? "cursor-not-allowed bg-[var(--bg-disabled-soft)] text-[var(--text-secondary)]"
                                : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover-dark)]"
                              }`}
                            onClick={() => setSelected(item)}
                            disabled={disabled}
                          >
                            Request
                          </button>
                        </div>
                      </div>
                    </div>
                  </RevealBlock>
                )
              })}
            </div>
          )}
        </RevealSection>

        {selected && (
          <dialog className="modal modal-open">
            <div className="modal-box bg-white border border-[var(--border)] rounded-xl max-w-lg">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-[var(--text-secondary)]">Request</div>
                  <div className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{selected.productName}</div>
                  <div className="mt-1 text-sm text-[var(--text-secondary)]">
                    Add a note (optional) and submit your request.
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-hover-soft)]"
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
                  className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                  placeholder="Note (optional)"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={4}
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-hover-soft)]"
                    onClick={() => {
                      setSelected(null)
                      setNote("")
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-hover-dark)]"
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
