import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <p className="text-sm text-base-content/70">
          It might have been moved or deleted.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
