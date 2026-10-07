import { API_BASE_URL } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function loadActivities(signal) {
  return fetch(`${API_BASE_URL}/api/activities/`, { signal })
}

const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'user', label: 'User' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'caloriesBurned', label: 'Calories' },
  {
    key: 'completedAt',
    label: 'Completed',
    render: (value) => value ? new Date(value).toLocaleDateString() : '—',
  },
  { key: 'notes', label: 'Notes' },
]

export default function Activities() {
  return (
    <ResourcePage
      title="Activities"
      description="Recent workouts and movement logged by the community."
      loadResource={loadActivities}
      columns={columns}
    />
  )
}
