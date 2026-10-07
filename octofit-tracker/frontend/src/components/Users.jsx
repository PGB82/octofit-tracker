import { API_BASE_URL } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function loadUsers(signal) {
  return fetch(`${API_BASE_URL}/api/users/`, { signal })
}

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
]

export default function Users() {
  return (
    <ResourcePage
      title="Users"
      description="Browse OctoFit Tracker members."
      loadResource={loadUsers}
      columns={columns}
    />
  )
}
