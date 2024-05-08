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
const usersRoutes = require('./routes/users');
const ressourcesRouter = require('./routes/ressource'); 
const categoriesRouter = require('./routes/categorie');
const elementRouter = require('./routes/element');
const subcategoriesRouter = require('./routes/subcategorie');

// Use API Routes
app.use('/api/database', databaseRoutes);
app.use('/api/ressources', ressourcesRouter); 
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRouter);
app.use('/api/elements', elementRouter);
app.use('/api/subcategories', subcategoriesRouter);

// Listen to port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
