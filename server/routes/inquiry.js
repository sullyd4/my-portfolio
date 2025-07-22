import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route   POST api/inquiry
// @desc    Create a new contact from the public form
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Attempt to split the full name into first and last names.
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || ''; // Handle names with multiple parts

    // Create a new contact with the status of "Lead"
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      status: 'Lead',
      // You can add a note with the message content if you add a 'notes' field to your Contact model
    });

    await newContact.save();

    res.status(201).json({ message: 'Inquiry received. Thank you!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;