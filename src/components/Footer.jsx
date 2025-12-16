import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden gradient-bg text-base-content">

      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 -left-24 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-56 -right-24 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl" />
      </div> */}

      <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-600 text-white shadow-sm">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.3L5 8v8l7 3.7 7-3.7V8l-7-3.7z" />
                </svg>
              </span>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#0065ff] to-[#00b4ff] bg-clip-text text-transparent">
                AssetVerse
              </span>

            </Link>


            <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-80">
              Corporate Asset &amp; HR Management platform for modern teams.
            </p>

            <div className="mt-4 space-y-1 text-sm opacity-80">
              <div>
                Email:{" "}
                <a href="mailto:support@assetverse.com" className="link link-hover">
                  support@assetverse.com
                </a>
              </div>
              <div>
                Phone:{" "}
                <a href="tel:+8801000000000" className="link link-hover">
                  +880 10-0000-0000
                </a>
              </div>
              {/* <div>Dhaka, Bangladesh</div> */}
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h4 className="text-sm font-semibold tracking-wide">Quick Links</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link className="link link-hover opacity-80 hover:opacity-100" to="/">Home</Link></li>
                  <li><Link className="link link-hover opacity-80 hover:opacity-100" to="/join/employee">Join as Employee</Link></li>
                  <li><Link className="link link-hover opacity-80 hover:opacity-100" to="/join/hr">Join as HR Manager</Link></li>
                  <li><Link className="link link-hover opacity-80 hover:opacity-100" to="/login">Login</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold tracking-wide">Support</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link className="link link-hover opacity-80 hover:opacity-100" to="/faq">FAQ</Link></li>
                  <li><Link className="link link-hover opacity-80 hover:opacity-100" to="/contact">Contact</Link></li>
                  <li><Link className="link link-hover opacity-80 hover:opacity-100" to="/privacy">Privacy Policy</Link></li>
                  <li><Link className="link link-hover opacity-80 hover:opacity-100" to="/terms">Terms</Link></li>
                </ul>
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <h4 className="text-sm font-semibold tracking-wide">Stay in the loop</h4>
                <p className="mt-4 text-sm opacity-80">
                  Get product updates, release notes, and best practices.
                </p>

                <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={e => e.preventDefault()}>
                  <label className="input input-bordered flex items-center gap-2 w-full rounded-2xl">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-70" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
                    </svg>
                    <input type="email" className="grow" placeholder="you@company.com" required />
                  </label>
                  <button className="btn btn-primary bg-[#0065ff] hover:bg-[#0050cc] border-none rounded-2xl text-white" type="submit">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-sm opacity-80">
            <p>© {year} AssetVerse. All rights reserved.</p>
            <div className="flex gap-4">
              <Link className="link link-hover" to="/privacy">Privacy</Link>
              <Link className="link link-hover" to="/terms">Terms</Link>
              <Link className="link link-hover" to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
