import { useEffect, useState } from "react"
import apiClient from "../../../api/client"

function MyTeam() {
  const [teams, setTeams] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    apiClient
      .get("/api/teams")
      .then(res => setTeams(res.data))
      .catch(err => console.error(err))
  }, [])

  if (!teams.length) {
    return <p>You are not affiliated with any company yet.</p>
  }

  const activeTeam = teams[activeIndex]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Team</h1>

      <div className="tabs tabs-boxed w-full max-w-xl">
        {teams.map((team, index) => (
          <button
            key={team.hrEmail}
            className={`tab w-full ${index === activeIndex ? "tab-active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {team.companyName}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded">
              <img src={activeTeam.companyLogo} alt={activeTeam.companyName} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{activeTeam.companyName}</h2>
            <p className="text-sm text-base-content/70">HR: {activeTeam.hrEmail}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Colleagues</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeTeam.colleagues.map(col => (
              <div key={col.email} className="card bg-base-100 shadow border">
                <div className="card-body space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        {col.profileImage ? (
                          <img src={col.profileImage} alt={col.name} />
                        ) : (
                          <div className="bg-base-300 flex items-center justify-center w-full h-full text-xs font-semibold">
                            {col.name?.[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{col.name}</div>
                      <div className="text-xs text-base-content/70">{col.email}</div>
                    </div>
                  </div>
                  {col.dateOfBirth && (
                    <p className="text-xs text-base-content/70">
                      Birthday: {new Date(col.dateOfBirth).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Upcoming Birthdays (this month)</h3>
          {activeTeam.upcomingBirthdays.length === 0 && (
            <p className="text-sm text-base-content/70">No upcoming birthdays this month.</p>
          )}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {activeTeam.upcomingBirthdays.map(b => (
              <div key={b.email} className="card bg-base-100 shadow border">
                <div className="card-body py-3 px-4">
                  <div className="font-semibold text-sm">{b.name}</div>
                  <div className="text-xs text-base-content/70">{b.email}</div>
                  <div className="text-xs">
                    {new Date(b.dateOfBirth).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyTeam
