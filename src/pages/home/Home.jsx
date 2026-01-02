import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useAnimation } from "framer-motion"

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

function RevealSection({ children, className, style, delay = 0 }) {
  const controls = useAnimation()
  const isDownRef = useRef(true)

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
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.55, delay }}
      viewport={{ amount: 0.2, once: false }}
      onViewportEnter={() => {
        if (isDownRef.current) controls.start("visible")
        else controls.set("visible")
      }}
      onViewportLeave={() => {
        controls.set("hidden")
      }}
    >
      {children}
    </motion.section>
  )
}

function RevealBlock({ children, className, style, delay = 0 }) {
  const controls = useAnimation()
  const isDownRef = useRef(true)

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
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.45, delay }}
      viewport={{ amount: 0.25, once: false }}
      onViewportEnter={() => {
        if (isDownRef.current) controls.start("visible")
        else controls.set("visible")
      }}
      onViewportLeave={() => {
        controls.set("hidden")
      }}
    >
      {children}
    </motion.div>
  )
}

function Home() {
  return (
    <div className="space-y-20" style={{ background: "var(--bg-page)" }}>
      <section className="min-h-[80vh] px-4 pt-10">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              borderColor: "var(--border)",
              background: "linear-gradient(135deg, var(--bg-surface-soft), var(--bg-hover))",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <motion.div
                className="p-6 sm:p-10 lg:p-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold tracking-wide uppercase"
                  style={{
                    borderColor: "var(--divider)",
                    background: "var(--bg-hover-soft)",
                    color: "var(--primary)",
                  }}
                >
                  Corporate Asset Management
                </div>

                <h1
                  className="mt-5 text-4xl md:text-5xl font-semibold leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Track every asset. Empower every employee.
                </h1>

                <p className="mt-4 max-w-xl text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
                  AssetVerse helps HR teams control laptops, devices, and office equipment in one secure, centralized
                  platform, with clear visibility across every company asset.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/join/hr"
                    className="rounded-xl px-5 py-3 font-semibold border transition"
                    style={{ background: "var(--primary)", borderColor: "var(--primary)", color: "white" }}
                  >
                    Join as HR Manager
                  </Link>

                  <Link
                    to="/join/employee"
                    className="rounded-xl px-5 py-3 font-semibold border transition"
                    style={{
                      background: "var(--bg-surface-soft)",
                      borderColor: "var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Join as Employee
                  </Link>

                  <Link
                    to="/login"
                    className="rounded-xl px-5 py-3 font-semibold border transition"
                    style={{
                      background: "transparent",
                      borderColor: "var(--divider)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Login
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: "var(--divider)", background: "var(--bg-hover-soft)" }}
                  >
                    <div className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                      Adoption
                    </div>
                    <div className="mt-1 text-sm" style={{ color: "var(--text-primary)" }}>
                      <span className="font-semibold">100+ companies</span>{" "}
                      <span style={{ color: "var(--text-secondary)" }}>managing assets with AssetVerse</span>
                    </div>
                  </div>

                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: "var(--divider)", background: "var(--bg-hover-soft)" }}
                  >
                    <div className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                      Highlights
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span
                        className="rounded-lg border px-2 py-1"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-surface-soft)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Real-time tracking
                      </span>
                      <span
                        className="rounded-lg border px-2 py-1"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-surface-soft)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Secure access
                      </span>
                      <span
                        className="rounded-lg border px-2 py-1"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-surface-soft)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Audit-ready history
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-6 sm:p-10 lg:p-12 border-t lg:border-t-0 lg:border-l"
                style={{ borderColor: "var(--divider)" }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div
                  className="rounded-2xl border shadow-sm"
                  style={{ borderColor: "var(--border)", background: "var(--bg-surface-soft)" }}
                >
                  <div className="p-6 space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          Live asset overview
                        </div>
                        <div className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                          See assigned, available, and returnable assets at a glance.
                        </div>
                      </div>

                      <span
                        className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold border"
                        style={{
                          borderColor: "var(--brand-soft)",
                          background: "var(--bg-active)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Q1 Snapshot
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div
                        className="rounded-xl border border-[#dbe7ff] bg-[#eef5ff] p-4"
                      >
                        <div className="text-[11px] uppercase tracking-wide text-[#3358a4]">
                          Active assets
                        </div>
                        <div className="mt-1 text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                          320
                        </div>
                      </div>

                      <div
                        className="rounded-xl border border-[#d6f3e1] bg-[#eafaf0] p-4"
                      >
                        <div className="text-[11px] uppercase tracking-wide text-[#1e7e34]" >
                          Assigned
                        </div>
                        <div className="mt-1 text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                          245
                        </div>
                      </div>

                      <div
                        className="rounded-xl border border-[#ffe7c2] bg-[#fff4e5] p-4"

                      >
                        <div className="text-[11px] uppercase tracking-wide text-[#b26a00]" >
                          Returnable
                        </div>
                        <div className="mt-1 text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                          75
                        </div>
                      </div>
                    </div>

                    <div className="h-px w-full" style={{ background: "var(--divider)" }} />

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                        Onboarding batch Q1
                      </span>
                      <span
                        className="rounded-lg border px-2.5 py-1 text-xs font-semibold"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--bg-hover)",
                          color: "var(--primary)",
                        }}
                      >
                        In progress
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: "var(--divider)", background: "var(--bg-hover-soft)" }}
                  >
                    <div className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                      Security
                    </div>
                    <div className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      Role-based access for HR and employees with audit-ready actions.
                    </div>
                  </div>

                  <div
                    className="rounded-xl border p-4"
                    style={{ borderColor: "var(--divider)", background: "var(--bg-hover-soft)" }}
                  >
                    <div className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                      Automation
                    </div>
                    <div className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      Approvals, limits, and tracking designed for HR workflows.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="px-4 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-semibold" style={{ color: "var(--text-primary)" }}>
            Why teams choose AssetVerse
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Prevent asset loss, reduce manual work, and keep every device accountable from day one.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Full lifecycle tracking",
              desc: "From inventory to assignment and return, keep a complete history for every asset.",
            },
            {
              title: "Employee self-service",
              desc: "Employees request assets, view allocations, and manage profiles from a single dashboard.",
            },
            {
              title: "HR-first workflows",
              desc: "Approval queues, package limits, and analytics designed for modern HR teams.",
            },
          ].map((card, i) => (
            <RevealBlock
              key={card.title}
              delay={i * 0.08}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--bg-surface-soft)" }}
            >
              <div className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                {card.title}
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                {card.desc}
              </div>
            </RevealBlock>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="py-16" style={{ background: "var(--bg-hover)" }}>
        <div className="px-4 max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-semibold" style={{ color: "var(--text-primary)" }}>
              Packages built for growing teams
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
              Start with the default package and upgrade when your employee base grows.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((item, i) => (
              <RevealBlock
                key={item.name}
                delay={i * 0.08}
                className="rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--border)", background: "var(--bg-surface-soft)" }}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
                        {item.name}
                      </div>
                      <div className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                        Up to {item.employeeLimit} employees
                      </div>
                    </div>

                    <div
                      className="rounded-xl border px-3 py-2 text-sm font-semibold"
                      style={{
                        borderColor: "var(--divider)",
                        background: "var(--bg-hover-soft)",
                        color: "var(--primary)",
                      }}
                    >
                      ${item.price}
                      <span className="ml-1 text-xs font-normal" style={{ color: "var(--text-secondary)" }}>
                        /month
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    {item.features.map(f => (
                      <div key={f} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary)" }} />
                        <span style={{ color: "var(--text-secondary)" }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/join/hr"
                    className="block text-center rounded-xl px-4 py-3 font-semibold border transition"
                    style={{ background: "var(--primary)", borderColor: "var(--primary)", color: "white" }}
                  >
                    Start as HR Manager
                  </Link>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="px-4 max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-start">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold" style={{ color: "var(--text-primary)" }}>
            How AssetVerse works
          </h2>
          <ol className="space-y-3 text-sm">
            <li style={{ color: "var(--text-secondary)" }}>
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Step 1:
              </span>{" "}
              HR registers the company and adds assets to inventory.
            </li>
            <li style={{ color: "var(--text-secondary)" }}>
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Step 2:
              </span>{" "}
              Employees register and request assets from available pools.
            </li>
            <li style={{ color: "var(--text-secondary)" }}>
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Step 3:
              </span>{" "}
              HR approves requests, auto-affiliates employees, and tracks returns.
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold" style={{ color: "var(--text-primary)" }}>
            Frequently asked questions
          </h2>

          <div className="space-y-3">
            {[
              {
                q: "Can one employee work with multiple companies?",
                a: "Yes, employees can hold affiliations with multiple companies in parallel.",
              },
              {
                q: "What happens when the package employee limit is reached?",
                a: "HR will be prompted to upgrade the package before approving new requests.",
              },
              {
                q: "Is return tracking supported?",
                a: "Yes, returnable items can be returned with full history and condition notes.",
              },
            ].map((item, i) => (
              <RevealBlock
                key={item.q}
                delay={i * 0.06}
                className="rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--border)", background: "var(--bg-surface-soft)" }}
              >
                <details className="group">
                  <summary
                    className="cursor-pointer list-none px-5 py-4 flex items-center justify-between"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span className="text-sm font-semibold">{item.q}</span>
                    <span
                      className="h-8 w-8 rounded-xl border flex items-center justify-center transition"
                      style={{
                        borderColor: "var(--divider)",
                        background: "var(--bg-hover-soft)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {item.a}
                  </div>
                </details>
              </RevealBlock>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="px-4 max-w-4xl mx-auto pb-16 text-center space-y-4">
        <h2 className="text-3xl font-semibold" style={{ color: "var(--text-primary)" }}>
          Ready to bring order to your assets?
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
          Create your HR account, invite employees, and start tracking every laptop, monitor, and device in minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/join/hr"
            className="rounded-xl px-5 py-3 font-semibold border transition"
            style={{ background: "var(--primary)", borderColor: "var(--primary)", color: "white" }}
          >
            Get started as HR
          </Link>
          <Link
            to="/join/employee"
            className="rounded-xl px-5 py-3 font-semibold border transition"
            style={{
              background: "var(--bg-surface-soft)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          >
            Join as Employee
          </Link>
        </div>
      </RevealSection>
    </div>
  )
}

export default Home
