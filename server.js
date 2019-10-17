// Check to see if we are in development environment, but not in production env.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Loading the index router
const indexRouter = require('./routes/index');

// View engine
app.set('view engine', 'ejs');
// Views location
app.set('views', __dirname + '/views');
// Layouts
app.set('layout', 'layouts/layout');
// Using Express layouts
app.use(expressLayouts);
// Public assets
app.use(express.static('public'));
// Importing Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log(`Connected to Mongoose..`));

// Using the indexRouter
app.use('/', indexRouter);

// Setting up a dev server
let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
