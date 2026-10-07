const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

if (codespaceName && !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(codespaceName)) {
  throw new Error('VITE_CODESPACE_NAME must contain only letters, numbers, and hyphens.')
}

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function extractRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'data', 'items']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
    }
  }

  throw new Error('The API response did not contain a list of records.')
}
