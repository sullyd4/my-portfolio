import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  status: {
    type: String,
    enum: ['Lead', 'Opportunity', 'Customer'],
    default: 'Lead',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;