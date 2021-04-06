// Packages used for authentication (Session & Passport)
const session = require('express-session');
const passport = require('passport');

// Passport initial setup
require('./config/passport');

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// Session settings. Allows our app to mantain the sessions and our users in it
app.use(
  session({
    secret: 'some secret goes here',
    resave: true,
    saveUninitialized: false
  })
);

// To allow our app to use passport for auth
app.use(passport.initialize());
app.use(passport.session());

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'project-management-server';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

// ROUTES MIDDLEWARE STARTS HERE:
const authRouter = require('./routes/auth.routes'); // <== has to be added
app.use('/api', authRouter); // <== has to be added

const projectRouter = require('./routes/project.routes'); // <== has to be added
app.use('/api', projectRouter); // <== has to be added

const taskRouter = require('./routes/task.routes'); // <== has to be added
app.use('/api', taskRouter); // <== has to be added

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
