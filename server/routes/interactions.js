import express from 'express';
import Interaction from '../models/Interaction.js';
const router = express.Router();

// Get interactions for a contact
router.get('/contact/:contactId', async (req, res) => {
    try {
        const interactions = await Interaction.find({ contact: req.params.contactId }).sort({ createdAt: -1 });
        res.json(interactions);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST a new interaction
router.post('/', async (req, res) => {
    const { contact, type, notes } = req.body;
    try {
        const newInteraction = new Interaction({
            contact,
            type,
            notes,
            user: req.user.id
        });
        const interaction = await newInteraction.save();
        res.json(interaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


export default router;