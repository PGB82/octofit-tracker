import express from 'express';
import { connectDatabase } from './config/database.js';
const app = express();
const PORT = Number(process.env.PORT) || 8000;
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        port: PORT,
    });
});
connectDatabase()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`OctoFit API running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Unable to start server:', error);
    process.exit(1);
});
