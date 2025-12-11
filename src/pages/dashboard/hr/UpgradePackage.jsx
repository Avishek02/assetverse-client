import { useEffect, useState } from "react"
import apiClient from "../../../api/client"
import toast from "react-hot-toast"

function UpgradePackage() {
  const [packages, setPackages] = useState([])
  const [loadingId, setLoadingId] = useState(null)

  useEffect(() => {
    apiClient
      .get("/api/packages")
      .then(res => setPackages(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleUpgrade = pkg => {
    setLoadingId(pkg._id)
    apiClient
      .post("/api/payments/create-checkout-session", {
        packageName: pkg.name
      })
      .then(res => {
        if (res.data.url) {
          window.location.href = res.data.url
        } else {
          toast.error("Payment session failed")
        }
      })
      .catch(err => {
        console.error(err)
        toast.error("Failed to start payment")
      })
      .finally(() => setLoadingId(null))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upgrade Package</h1>
      <p className="text-sm mb-6 text-base-content/70">
        Choose a package to increase your employee limit.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {packages.map(pkg => (
          <div key={pkg._id} className="card bg-base-100 shadow border">
            <div className="card-body space-y-3">
              <h2 className="text-xl font-semibold">{pkg.name}</h2>
              <p className="text-3xl font-bold">
                ${pkg.price}
                <span className="text-sm font-normal text-base-content/60">/month</span>
              </p>
              <p className="text-sm text-base-content/70">
                Up to {pkg.employeeLimit} employees.
              </p>
              <ul className="text-sm space-y-1">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="card-actions pt-2">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleUpgrade(pkg)}
                  disabled={loadingId === pkg._id}
                >
                  {loadingId === pkg._id ? "Redirecting..." : "Upgrade"}
                </button>
              </div>
            </div>
          </div>
        ))}
        {!packages.length && <p>No packages found.</p>}
      </div>
    </div>
  )
}

export default UpgradePackage
