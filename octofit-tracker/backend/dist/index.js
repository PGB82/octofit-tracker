import { connectDatabase } from './config/database.js';
import app, { baseUrl, PORT } from './server.js';
connectDatabase()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`OctoFit API running at ${baseUrl}`);
    });
})
    .catch((error) => {
    console.error('Unable to start server:', error);
    process.exitCode = 1;
});
