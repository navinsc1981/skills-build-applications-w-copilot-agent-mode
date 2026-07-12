import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, default: 'medium' },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, default: 'mobility' },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
