const express = require('express');
const router = express.Router();
const Url = require('../models/url');

// Route to add a new URL
router.post('/add', async (req, res) => {
    const { url, status } = req.body;
    try {
        const newUrl = new Url({ url, status });
        await newUrl.save();
        res.status(201).json(newUrl);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all URLs
router.get('/', async (req, res) => {
    try {
        const urls = await Url.find();
        res.json(urls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
