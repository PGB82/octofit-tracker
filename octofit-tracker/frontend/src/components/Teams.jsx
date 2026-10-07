import { API_BASE_URL } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function loadTeams(signal) {
  return fetch(`${API_BASE_URL}/api/teams/`, { signal })
}

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'About' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return (
    <ResourcePage
      title="Teams"
      description="Meet the teams and track their collective progress."
      loadResource={loadTeams}
      columns={columns}
    />
  )
}
