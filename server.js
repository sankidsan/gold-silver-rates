const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000; // You can change this port if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for rates (you can use a database later)
let rates = {
    gold: null,
    silver: null,
};

// Route to update rates
app.post('/update-rates', (req, res) => {
    const { gold, silver } = req.body;
    if (gold !== undefined && silver !== undefined) {
        rates.gold = gold;
        rates.silver = silver;
        return res.status(200).json({ message: 'Rates updated successfully!' });
    }
    return res.status(400).json({ message: 'Invalid rates provided.' });
});

// Route to get rates
app.get('/rates', (req, res) => {
    res.status(200).json(rates);
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
