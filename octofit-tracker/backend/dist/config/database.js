import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
export async function connectDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        return db;
    }
    catch (error) {
        console.error('Error connecting to octofit_db:', error);
        throw error;
    }
}
export default db;
