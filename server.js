// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const itemsRoutes = require('./routes/items');
const favoritesRoutes = require('./routes/favorites');
const itemsApiRoutes = require('./routes/items-api');
const loginRoutes = require('./routes/login');
const landingRoutes = require('./routes/landing');
const landingApiRoutes = require('./routes/landing-api');
const logoutRoutes = require('./routes/logout');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/items', itemsRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/api/items', itemsApiRoutes);
app.use('/login', loginRoutes);
app.use('/landing', landingRoutes);
app.use('/api/landing', landingApiRoutes);
app.use('/logout', logoutRoutes);



// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

const items = require('./routes/items-api');

app.get('/', (req, res) => {
  const userId = req.cookies.userId;

  res.render('landing', { userId });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
