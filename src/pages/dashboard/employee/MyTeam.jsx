import { useEffect, useState } from "react"
import apiClient from "../../../api/client"
import Loading from "../../../components/Loading"

function MyTeam() {
  const [teams, setTeams] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiClient
      .get("/api/teams")
      .then(res => setTeams(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />

  if (!teams.length) {
    return (
      <div className="bg-[#f5f7fb] -m-4 p-4 md:p-6 min-h-screen">
        <div className="text-sm text-[#6b778c]">
          You are not affiliated with any company yet.
        </div>
      </div>
    )
  }

  const activeTeam = teams[activeIndex]

  return (
    <div className="bg-[#f5f7fb] -m-4 p-4 md:p-6 min-h-screen">
      <div className="max-w-6xl space-y-6">
        <div>
          <div className="text-xs text-[#6b778c]">Employee</div>
          <h1 className="mt-1 text-xl font-semibold text-[#1f2a44]">My Team</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {teams.map((team, index) => (
            <button
              key={team.hrEmail}
              onClick={() => setActiveIndex(index)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                index === activeIndex
                  ? "bg-[#0065ff] text-white"
                  : "bg-white border border-[#e6eaf2] text-[#1f2a44] hover:bg-[#f7faff]"
              }`}
            >
              {team.companyName}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[#e6eaf2] bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-lg border border-[#e6eaf2] bg-[#fbfcff]">
              <img
                src={activeTeam.companyLogo}
                alt={activeTeam.companyName}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-lg font-semibold text-[#1f2a44]">
                {activeTeam.companyName}
              </div>
              <div className="text-sm text-[#6b778c]">
                HR: {activeTeam.hrEmail}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#1f2a44] mb-3">
            Colleagues
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeTeam.colleagues.map(col => (
              <div
                key={col.email}
                className="rounded-xl border border-[#e6eaf2] bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-[#e6eaf2] bg-[#f1f5f9] flex items-center justify-center text-sm font-semibold text-[#1f2a44]">
                    {col.profileImage ? (
                      <img
                        src={col.profileImage}
                        alt={col.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      col.name?.[0]
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[#1f2a44]">
                      {col.name}
                    </div>
                    <div className="truncate text-xs text-[#6b778c]">
                      {col.email}
                    </div>
                  </div>
                </div>

                {col.dateOfBirth && (
                  <div className="mt-2 text-xs text-[#6b778c]">
                    Birthday:{" "}
                    {new Date(col.dateOfBirth).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#1f2a44] mb-3">
            Upcoming Birthdays
          </h2>

          {activeTeam.upcomingBirthdays.length === 0 ? (
            <div className="text-sm text-[#6b778c]">
              No upcoming birthdays this month.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeTeam.upcomingBirthdays.map(b => (
                <div
                  key={b.email}
                  className="rounded-xl border border-[#e6eaf2] bg-white p-4"
                >
                  <div className="text-sm font-semibold text-[#1f2a44]">
                    {b.name}
                  </div>
                  <div className="mt-1 text-xs text-[#6b778c]">
                    {b.email}
                  </div>
                  <div className="mt-1 text-xs text-[#1f2a44]">
                    {new Date(b.dateOfBirth).toLocaleDateString()}
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

export default MyTeam
