const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')
// Clarifai back-end
const detect = require('./controllers/detect');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'Postgres616!',
        database: 'detectionapp'
    }
});

// db.select('*').from('users')
//     .then(data => {
//         console.log(data);
//     });

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json('all good until now');
})

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.hadleProfileGet(req, res, db, bcrypt) })

app.put('/imageUpload', (req, res) => { image.handleImage(req, res, db) })

// Clarifai back-end
// endpoint to receive image url and return response from clarifai

app.post('/detect', (req, res) => { detect.handleImageUrl(req, res) })

// app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3001);

