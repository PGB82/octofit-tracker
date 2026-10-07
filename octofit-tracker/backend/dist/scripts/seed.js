import { connectDatabase } from '../config/database.js';
async function seedDatabase() {
    try {
        await connectDatabase();
        console.log('Database seeding complete');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
