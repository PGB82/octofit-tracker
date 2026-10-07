import { API_BASE_URL } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function loadWorkouts(signal) {
  return fetch(`${API_BASE_URL}/api/workouts/`, { signal })
}

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'type', label: 'Type' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'description', label: 'Description' },
  { key: 'exercises', label: 'Exercises' },
]

export default function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      description="Find a workout that fits your training plan."
      loadResource={loadWorkouts}
      columns={columns}
    />
  )
}
