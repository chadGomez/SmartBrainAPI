const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// const register = require('./controllers/register');
import handleRegister from './controllers/register';
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL;
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB
    // host: '127.0.0.1',
    // user: 'postgres',
    // password: 'test',
    // database: 'SmartBrain'
  }
});

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', handleRegister.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db) );
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, resp) => { image.handleApiCall(req, resp) });

app.listen(3000, () => {
  console.log('app is running on port:3000');
});