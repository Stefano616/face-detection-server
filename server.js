import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';

import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import handleImage from './controllers/image.js';
// Clarifai back-end
import handleImageUrl from './controllers/detect.js';


const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: rocess.env.DATABASE_USER,
        password: rocess.env.DATABASE_PW,
        database: rocess.env.DATABASE_DB
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

app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db, bcrypt) })

app.put('/imageUpload', (req, res) => { handleImage(req, res, db) })

// Clarifai back-end
// endpoint to receive image url and return response from clarifai

app.post('/detect', (req, res) => { handleImageUrl(req, res) })

// app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3001, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});

