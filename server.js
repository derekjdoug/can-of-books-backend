'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose is connected'));

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => response.send('test request received'));
app.get('/books', async (request, response) => response.send(await Book.find({})));
app.post('/books', async (request, response) => {
  try {
    response.status(201).send(await Book.create(request.body))
  } catch (error) {
    console.error(error);
    response.status(500).send('Error on creation')
  }
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));
