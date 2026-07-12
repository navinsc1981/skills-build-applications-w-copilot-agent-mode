import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  fitnessGoal: string;
  level: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  fitnessGoal: { type: String, default: 'Improve endurance' },
  level: { type: String, default: 'intermediate' },
});

export const User = mongoose.model<IUser>('User', userSchema);
