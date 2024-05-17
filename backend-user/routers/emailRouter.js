const express = require('express');
const router = express.Router();
const Email = require('../models/email');

// Route to add a new email
router.post('/add', async (req, res) => {
    const { email, status } = req.body;
    try {
        const newEmail = new Email({ email, status });
        await newEmail.save();
        res.status(201).json(newEmail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all emails
router.get('/', async (req, res) => {
    try {
        const emails = await Email.find();
        res.json(emails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
