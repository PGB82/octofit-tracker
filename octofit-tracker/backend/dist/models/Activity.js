import { model, Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        required: true,
        enum: ['running', 'walking', 'cycling', 'strength', 'yoga', 'other'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, min: 0, default: 0 },
    notes: { type: String, trim: true, default: '' },
    completedAt: { type: Date, default: Date.now },
}, { timestamps: true });
export default model('Activity', activitySchema);
