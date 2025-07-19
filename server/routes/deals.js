import express from 'express';
import Deal from '../models/Deal.js';
const router = express.Router();

// Get all deals
router.get('/', async (req, res) => {
    try {
        const deals = await Deal.find({ assignedTo: req.user.id }).populate('contact', ['firstName', 'lastName']);
        res.json(deals);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add other CRUD routes (POST, PATCH, DELETE) here...

export default router;