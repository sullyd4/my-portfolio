import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  type: {
    type: String,
    enum: ['Call', 'Email', 'Meeting'],
    required: true,
  },
  notes: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Interaction = mongoose.model('Interaction', interactionSchema);
export default Interaction;