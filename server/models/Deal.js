import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  value: { type: Number },
  stage: {
    type: String,
    enum: ['Prospecting', 'Proposal', 'Negotiation', 'Closed-Won', 'Closed-Lost'],
    default: 'Prospecting',
  },
  expectedCloseDate: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Deal = mongoose.model('Deal', dealSchema);
export default Deal;