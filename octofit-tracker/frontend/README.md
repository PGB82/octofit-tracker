# OctoFit Tracker frontend

The React application uses Vite and React Router to show activities, the leaderboard,
teams, users, and workouts. The API defaults to `http://localhost:8000` when
`VITE_CODESPACE_NAME` is not set.

## Configure the API URL

For Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`
using the name of the current Codespace:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads this value when it starts or builds the frontend. Restart the Vite
development server after changing `.env.local`. The app then requests the API at
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev`.

For local development outside Codespaces, leave the variable unset and run the
backend on port `8000`; the frontend will use `http://localhost:8000`.

## Run the frontend

```bash
npm run dev --prefix octofit-tracker/frontend
```
