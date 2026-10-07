import { connectDatabase } from '../config/database.js';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

async function seedDatabase() {
  try {
    await connectDatabase();

    // Seed the octofit_db database with test data.
    const users =
      (await User.countDocuments()) === 0
        ? await User.insertMany([
            { username: 'mona', email: 'mona@example.com', name: 'Mona the Octocat' },
            { username: 'hanna', email: 'hanna@example.com', name: 'Hanna' },
            { username: 'leo', email: 'leo@example.com', name: 'Leo' },
          ])
        : await User.find().limit(3);

    if ((await Team.countDocuments()) === 0) {
      await Team.insertMany([
        {
          name: 'Octocats',
          description: 'A friendly team focused on building healthy habits.',
          members: users.slice(0, 2).map((user) => user._id),
          points: 340,
        },
        {
          name: 'Code Runners',
          description: 'Small steps, stronger strides.',
          members: users.slice(2).map((user) => user._id),
          points: 275,
        },
      ]);
    }

    if ((await Activity.countDocuments()) === 0) {
      await Activity.insertMany([
        {
          user: users[0]._id,
          type: 'running',
          durationMinutes: 30,
          caloriesBurned: 260,
          notes: 'Easy morning run',
        },
        {
          user: users[1]._id,
          type: 'cycling',
          durationMinutes: 45,
          caloriesBurned: 390,
          notes: 'Neighborhood ride',
        },
        {
          user: users[2]._id,
          type: 'strength',
          durationMinutes: 35,
          caloriesBurned: 220,
          notes: 'Full-body strength session',
        },
      ]);
    }

    if ((await Leaderboard.countDocuments()) === 0) {
      await Leaderboard.insertMany([
        { user: users[0]._id, points: 340, period: 'weekly' },
        { user: users[1]._id, points: 295, period: 'weekly' },
        { user: users[2]._id, points: 275, period: 'weekly' },
      ]);
    }

    if ((await Workout.countDocuments()) === 0) {
      await Workout.insertMany([
        {
          name: 'Starter Interval Run',
          description: 'A gentle introduction to run-and-recover intervals.',
          type: 'cardio',
          durationMinutes: 25,
          difficulty: 'beginner',
          exercises: ['5-minute warm-up walk', '6 rounds of 1-minute jog and 90-second walk', '5-minute cool-down'],
        },
        {
          name: 'Bodyweight Basics',
          description: 'A balanced strength session using bodyweight movements.',
          type: 'strength',
          durationMinutes: 30,
          difficulty: 'beginner',
          exercises: ['Squats', 'Incline push-ups', 'Glute bridges', 'Bird dogs'],
        },
      ]);
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await seedDatabase();
