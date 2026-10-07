import express from 'express';
import mongoose from 'mongoose';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';
import { createResourceRouter } from './routes/resourceRouter.js';
const app = express();
const codespaceName = process.env.CODESPACE_NAME;
export const PORT = Number(process.env.PORT) || 8000;
export const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json({ limit: '1mb' }));
app.use((request, response, next) => {
    const origin = request.get('origin');
    const localOrigin = /^https?:\/\/(?:localhost|127\.0\.0\.1):5173$/.test(origin ?? '');
    const codespaceOrigin = codespaceName !== undefined &&
        origin === `https://${codespaceName}-5173.app.github.dev`;
    if (origin && (localOrigin || codespaceOrigin)) {
        response.setHeader('Access-Control-Allow-Origin', origin);
        response.setHeader('Vary', 'Origin');
        response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    if (request.method === 'OPTIONS') {
        response.sendStatus(origin && (localOrigin || codespaceOrigin) ? 204 : 403);
        return;
    }
    next();
});
app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        service: 'octofit-backend',
        port: PORT,
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
});
app.use('/api/users/', createResourceRouter(User));
app.use('/api/teams/', createResourceRouter(Team));
app.use('/api/activities/', createResourceRouter(Activity));
app.use('/api/leaderboard/', createResourceRouter(Leaderboard, { points: -1 }));
app.use('/api/workouts/', createResourceRouter(Workout));
app.use((_request, response) => {
    response.status(404).json({ error: 'Route not found' });
});
const errorHandler = (error, _request, response, _next) => {
    if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
        response.status(400).json({ error: error.message });
        return;
    }
    if (error instanceof Error && 'code' in error && error.code === 11000) {
        response.status(409).json({ error: 'A record with one of these unique values already exists' });
        return;
    }
    if (error instanceof Error && 'status' in error && error.status === 400) {
        response.status(400).json({ error: error.message });
        return;
    }
    if (error instanceof SyntaxError &&
        'status' in error &&
        error.status === 400) {
        response.status(400).json({ error: 'Request body contains invalid JSON' });
        return;
    }
    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
};
app.use(errorHandler);
export default app;
