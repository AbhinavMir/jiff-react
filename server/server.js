const express = require('express');
const bodyParser = require('body-parser');
const mpc = require('./mpc');
const app = express();
const port = 8080;

app.use(bodyParser.json());

// API endpoint to perform MPC computation
app.post('/compute', (req, res) => {
    const input = req.body.input;
    const partyCount = req.body.partyCount || 2; // default party count

    // Initialize JIFF instance with default options
    const options = { party_count: partyCount };
    const jiffInstance = mpc.connect('http://localhost:' + port, 'api_computation', options);

    // Perform MPC computation
    mpc.compute(input, jiffInstance)
        .then(result => {
            res.json({ result });
            jiffInstance.disconnect(true, true);
        })
        .catch(error => {
            res.status(500).json({ error: error.toString() });
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
