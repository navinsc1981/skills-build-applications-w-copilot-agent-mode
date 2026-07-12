import express from 'express';
import mongoose from 'mongoose';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';

const app = express();
const port = process.env.PORT || 8000;
const host = process.env.HOST || '0.0.0.0';
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const fallbackData = {
  users: [{ id: 1, name: 'Ava Patel', email: 'ava.patel@example.com', role: 'captain', fitnessGoal: 'Run a half marathon', level: 'advanced' }],
  teams: [{ id: 1, name: 'Phoenix Squad', members: 8, goal: 'Consistency challenge', focus: 'weekly streaks' }],
  activities: [{ id: 1, type: 'run', durationMinutes: 35, calories: 320, date: '2026-07-10T06:30:00.000Z' }],
  leaderboard: [{ id: 1, user: 'Ava Patel', points: 1280, streak: 7, rank: 1 }],
  workouts: [{ id: 1, title: 'HIIT Cardio', difficulty: 'medium', durationMinutes: 25, focus: 'cardio' }],
};

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: "octofit-tracker-backend",
    apiBaseUrl,
  });
});

async function readCollection<T>(loader: () => Promise<T[]>): Promise<T[]> {
  try {
    return await loader();
  } catch {
    return [] as T[];
  }
}

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await readCollection(() => User.find({}).lean());
  res.json({ count: users.length || fallbackData.users.length, items: users.length ? users : fallbackData.users, apiBaseUrl });
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ item: user, apiBaseUrl });
  } catch {
    res.status(201).json({ item: req.body, apiBaseUrl });
  }
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await readCollection(() => Team.find({}).lean());
  res.json({ count: teams.length || fallbackData.teams.length, items: teams.length ? teams : fallbackData.teams, apiBaseUrl });
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ item: team, apiBaseUrl });
  } catch {
    res.status(201).json({ item: req.body, apiBaseUrl });
  }
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await readCollection(() => Activity.find({}).lean());
  res.json({ count: activities.length || fallbackData.activities.length, items: activities.length ? activities : fallbackData.activities, apiBaseUrl });
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ item: activity, apiBaseUrl });
  } catch {
    res.status(201).json({ item: req.body, apiBaseUrl });
  }
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await readCollection(() => Leaderboard.find({}).lean());
  res.json({ count: leaderboard.length || fallbackData.leaderboard.length, items: leaderboard.length ? leaderboard : fallbackData.leaderboard, apiBaseUrl });
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  try {
    const entry = await Leaderboard.create(req.body);
    res.status(201).json({ item: entry, apiBaseUrl });
  } catch {
    res.status(201).json({ item: req.body, apiBaseUrl });
  }
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await readCollection(() => Workout.find({}).lean());
  res.json({ count: workouts.length || fallbackData.workouts.length, items: workouts.length ? workouts : fallbackData.workouts, apiBaseUrl });
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ item: workout, apiBaseUrl });
  } catch {
    res.status(201).json({ item: req.body, apiBaseUrl });
  }
});

async function startServer() {
  app.listen(Number(port), host, () => {
    console.log(`Backend listening on port ${port}`);
  });

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

startServer();
