import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const packages = [
  {
    name: "Basic",
    employeeLimit: 5,
    price: 5,
    features: ["Asset Tracking", "Employee Management", "Basic Support"],
  },
  {
    name: "Standard",
    employeeLimit: 10,
    price: 8,
    features: ["All Basic features", "Advanced Analytics", "Priority Support"],
  },
  {
    name: "Premium",
    employeeLimit: 20,
    price: 15,
    features: ["All Standard features", "Custom Branding", "24/7 Support"],
  },
]

function Home() {
  return (
    <div className="space-y-20">
      <section className="hero min-h-[80vh] bg-base-100">
        <div className="hero-content flex-col lg:flex-row gap-12">
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-wide text-primary font-semibold">
              Corporate Asset Management
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Track every asset. Empower every employee.
            </h1>
            <p className="text-base-content/80 max-w-xl">
              AssetVerse helps HR teams control laptops, devices, and office equipment in one secure, centralized
              platform, with clear visibility across every company asset.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/join/hr" className="btn btn-primary">
                Join as HR Manager
              </Link>
              <Link to="/join/employee" className="btn btn-outline">
                Join as Employee
              </Link>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-base-content/70">
              <div>
                <span className="font-semibold text-base-content">100+ companies</span> managing assets with AssetVerse
              </div>
              <div className="flex gap-4">
                <span>Real-time tracking</span>
                <span>Secure access</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 max-w-md w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="card bg-base-100 shadow-xl border">
              <div className="card-body space-y-4">
                <h2 className="card-title">Live asset overview</h2>
                <p className="text-sm text-base-content/70">
                  See assigned, available, and returnable assets at a glance.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="stat bg-base-200 rounded-xl p-4">
                    <div className="text-xs uppercase text-base-content/60">Active assets</div>
                    <div className="text-2xl font-bold">320</div>
                  </div>
                  <div className="stat bg-base-200 rounded-xl p-4">
                    <div className="text-xs uppercase text-base-content/60">Assigned</div>
                    <div className="text-2xl font-bold">245</div>
                  </div>
                  <div className="stat bg-base-200 rounded-xl p-4">
                    <div className="text-xs uppercase text-base-content/60">Returnable</div>
                    <div className="text-2xl font-bold">75</div>
                  </div>
                </div>
                <div className="divider my-1" />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Onboarding batch Q1</span>
                  <span className="badge badge-primary badge-outline">In progress</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold">Why teams choose AssetVerse</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Prevent asset loss, reduce manual work, and keep every device accountable from day one.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card bg-base-100 shadow-md border">
            <div className="card-body space-y-2">
              <h3 className="font-semibold text-lg">Full lifecycle tracking</h3>
              <p className="text-sm text-base-content/70">
                From inventory to assignment and return, keep a complete history for every asset.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md border">
            <div className="card-body space-y-2">
              <h3 className="font-semibold text-lg">Employee self-service</h3>
              <p className="text-sm text-base-content/70">
                Employees request assets, view allocations, and manage profiles from a single dashboard.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md border">
            <div className="card-body space-y-2">
              <h3 className="font-semibold text-lg">HR-first workflows</h3>
              <p className="text-sm text-base-content/70">
                Approval queues, package limits, and analytics designed for modern HR teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-200 py-16">
        <div className="px-4 max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Packages built for growing teams</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Start with the default package and upgrade when your employee base grows.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map(item => (
              <div key={item.name} className="card bg-base-100 shadow-md border">
                <div className="card-body space-y-3">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-3xl font-bold">
                    ${item.price}
                    <span className="text-sm font-normal text-base-content/60">/month</span>
                  </p>
                  <p className="text-sm text-base-content/70">
                    Up to {item.employeeLimit} employees per company.
                  </p>
                  <ul className="text-sm space-y-1">
                    {item.features.map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-actions pt-2">
                    <Link to="/join/hr" className="btn btn-primary w-full">
                      Start as HR Manager
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-start">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">How AssetVerse works</h2>
          <ol className="space-y-3 text-sm text-base-content/80">
            <li>
              <span className="font-semibold">Step 1:</span> HR registers the company and adds assets to inventory.
            </li>
            <li>
              <span className="font-semibold">Step 2:</span> Employees register and request assets from available pools.
            </li>
            <li>
              <span className="font-semibold">Step 3:</span> HR approves requests, auto-affiliates employees, and tracks returns.
            </li>
          </ol>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Frequently asked questions</h2>
          <div className="join join-vertical w-full">
            <div className="collapse collapse-plus join-item border border-base-300">
              <input type="radio" name="faq" defaultChecked />
              <div className="collapse-title text-sm font-medium">Can one employee work with multiple companies?</div>
              <div className="collapse-content text-sm text-base-content/80">
                Yes, employees can hold affiliations with multiple companies in parallel.
              </div>
            </div>
            <div className="collapse collapse-plus join-item border border-base-300">
              <input type="radio" name="faq" />
              <div className="collapse-title text-sm font-medium">
                What happens when the package employee limit is reached?
              </div>
              <div className="collapse-content text-sm text-base-content/80">
                HR will be prompted to upgrade the package before approving new requests.
              </div>
            </div>
            <div className="collapse collapse-plus join-item border border-base-300">
              <input type="radio" name="faq" />
              <div className="collapse-title text-sm font-medium">Is return tracking supported?</div>
              <div className="collapse-content text-sm text-base-content/80">
                Yes, returnable items can be returned with full history and condition notes.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 max-w-4xl mx-auto pb-16 text-center space-y-4">
        <h2 className="text-3xl font-bold">Ready to bring order to your assets?</h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Create your HR account, invite employees, and start tracking every laptop, monitor, and device in minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/join/hr" className="btn btn-primary">
            Get started as HR
          </Link>
          <Link to="/join/employee" className="btn btn-outline">
            Join as Employee
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
