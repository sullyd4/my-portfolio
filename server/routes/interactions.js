import express from 'express';
import Interaction from '../models/Interaction.js';
const router = express.Router();

// Get interactions for a contact
router.get('/contact/:contactId', async (req, res) => {
    try {
        const interactions = await Interaction.find({ contact: req.params.contactId });
        res.json(interactions);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add other CRUD routes (POST, PATCH, DELETE) here...

export default router;