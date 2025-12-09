import { useState } from "react"
import apiClient from "../../../api/client"

function AddAsset() {
  const [productName, setProductName] = useState("")
  const [productImage, setProductImage] = useState("")
  const [productType, setProductType] = useState("Returnable")
  const [productQuantity, setProductQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    apiClient
      .post("/api/assets", {
        productName,
        productImage,
        productType,
        productQuantity: Number(productQuantity),
      })
      .then(() => {
        setProductName("")
        setProductImage("")
        setProductType("Returnable")
        setProductQuantity(1)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Add Asset</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Product Name"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          required
        />
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Product Image URL"
          value={productImage}
          onChange={e => setProductImage(e.target.value)}
          required
        />
        <select
          className="select select-bordered w-full"
          value={productType}
          onChange={e => setProductType(e.target.value)}
          required
        >
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
        <input
          type="number"
          min="1"
          className="input input-bordered w-full"
          placeholder="Quantity"
          value={productQuantity}
          onChange={e => setProductQuantity(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Asset"}
        </button>
      </form>
    </div>
  )
}

export default AddAsset
