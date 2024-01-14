// server.js
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const JIFFServer = require('jiff-mpc').JIFFServer; // Correct path to jiff-server
const mpc = require('./mpc'); // Adapted mpc.js for server use
const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

// Initialize JIFF Server
const jiffInstance = new JIFFServer(server, { logs: true });

// Endpoint to perform MPC computation
app.post('/compute', async (req, res) => {
  const inputs = req.body.inputs; // Array of inputs from clients
  const computationId = req.body.computationId || 'default_computation';

  try {
    const result = await mpc.compute(inputs, jiffInstance, computationId);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
server.listen(process.env.PORT || 8080, () => {
  console.log('Server running on port ' + (process.env.PORT || 8080));
});
