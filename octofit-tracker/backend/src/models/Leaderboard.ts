import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, min: 0, required: true, default: 0 },
    period: { type: String, enum: ['weekly', 'all-time'], default: 'weekly' },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
