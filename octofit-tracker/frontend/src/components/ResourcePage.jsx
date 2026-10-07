import { useEffect, useState } from 'react'
import { extractRecords } from '../api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  if (Array.isArray(value)) {
    return value.length ? value.map(formatValue).join(', ') : '—'
  }
  if (typeof value === 'object') {
    return value.name ?? value.username ?? value.title ?? value._id ?? JSON.stringify(value)
  }
  return String(value)
}

export default function ResourcePage({
  title,
  description,
  loadResource,
  columns,
}) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError('')
      try {
        const response = await loadResource(controller.signal)
        const payload = await response.json()
        if (!response.ok) {
          throw new Error(
            payload?.error ?? payload?.detail ?? `Request failed (${response.status}).`,
          )
        }
        setRecords(extractRecords(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    load()
    return () => controller.abort()
  }, [loadResource])

  return (
    <section aria-labelledby="resource-title">
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
        <div>
          <h1 className="h2 mb-1" id="resource-title">{title}</h1>
          <p className="text-secondary mb-0">{description}</p>
        </div>
        {!loading && !error && (
          <span className="badge text-bg-primary">{records.length} records</span>
        )}
      </div>

      {loading && <p role="status">Loading {title.toLowerCase()}…</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && records.length === 0 && (
        <div className="alert alert-info" role="status">No records found.</div>
      )}
      {!loading && !error && records.length > 0 && (
        <div className="table-responsive card shadow-sm">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columns.map(({ key, label }) => <th key={key} scope="col">{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? index}>
                  {columns.map(({ key, render, label }) => (
                    <td key={key} data-label={label}>
                      {render ? render(record[key], record) : formatValue(record[key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
