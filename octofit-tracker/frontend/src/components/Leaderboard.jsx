import { API_BASE_URL } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function loadLeaderboard(signal) {
  return fetch(`${API_BASE_URL}/api/leaderboard/`, { signal })
}

const columns = [
  { key: 'user', label: 'User' },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
]

export default function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      description="See how members rank by earned points."
      loadResource={loadLeaderboard}
      columns={columns}
    />
  )
}
