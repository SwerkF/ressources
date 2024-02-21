const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create express instance
const app = express();

// Apply body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Apply CORS
app.use(cors());

// Require & Import API routes
const databaseRoutes = require('./routes/database');
const users = require('./routes/users');
const ressourcesRouter = require('./routes/ressource'); // Import the router, not the file itself

// Use API Routes
app.use('/api/database', databaseRoutes);
app.use('/api/ressources', ressourcesRouter); // Use the router as middleware

// Listen to port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
