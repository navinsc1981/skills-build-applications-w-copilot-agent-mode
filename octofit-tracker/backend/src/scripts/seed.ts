import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava.patel@example.com',
        role: 'captain',
        fitnessGoal: 'Run a half marathon',
        level: 'advanced',
      },
      {
        name: 'Liam Chen',
        email: 'liam.chen@example.com',
        role: 'member',
        fitnessGoal: 'Build strength',
        level: 'intermediate',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Phoenix Squad',
        members: 8,
        goal: 'Consistency challenge',
        focus: 'weekly streaks',
      },
      {
        name: 'River Runners',
        members: 6,
        goal: 'Improve endurance',
        focus: 'long distance',
      },
    ]);

    const activities = await Activity.insertMany([
      {
        type: 'run',
        durationMinutes: 35,
        calories: 320,
        date: new Date('2026-07-10T06:30:00Z'),
      },
      {
        type: 'strength',
        durationMinutes: 45,
        calories: 260,
        date: new Date('2026-07-11T18:00:00Z'),
      },
    ]);

    const leaderboardEntries = await Leaderboard.insertMany([
      { user: users[0].name, points: 1280, streak: 7, rank: 1 },
      { user: users[1].name, points: 1040, streak: 4, rank: 2 },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'HIIT Cardio',
        difficulty: 'medium',
        durationMinutes: 25,
        focus: 'cardio',
      },
      {
        title: 'Core Recovery',
        difficulty: 'easy',
        durationMinutes: 20,
        focus: 'mobility',
      },
    ]);

    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', teams.length);
    console.log('Seeded activities:', activities.length);
    console.log('Seeded leaderboard entries:', leaderboardEntries.length);
    console.log('Seeded workouts:', workouts.length);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
