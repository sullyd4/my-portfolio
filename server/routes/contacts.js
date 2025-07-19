import express from 'express';
import Contact from '../models/Contact.js';
const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find({ assignedTo: req.user.id });
        res.json(contacts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add other CRUD routes (POST, PATCH, DELETE) here...

export default router;