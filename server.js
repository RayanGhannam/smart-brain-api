require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Database Connection
const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL || {
  },
});

const app = express();

app.use(cors());
app.use(express.json()); // Express has built-in JSON parsing, no need for body-parser

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
