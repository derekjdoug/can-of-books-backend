'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');
const verifyUser = require('./auth.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(verifyUser);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose is connected'));

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => response.send('test request received'));
app.get('/books', handleGetBooks);
app.post('/books', handlePostBooks);
app.delete('/books/:id', handleDeleteBooks);
app.put('/books/:id', handlePutBooks);
app.get('/user', handleGetUser);

async function handleGetBooks(req, res) {
  try {
    const booksFromDb = await Book.find({ email: req.params.email });
    if (booksFromDb.length > 0) {
      res.status(200).send(booksFromDb);
    } else {
      res.status(404).send('error');
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('server error');
  }
}

async function handlePostBooks(req, res) {
  const { title, description, status } = req.body;
  try {
    const newBook = await Book.create({ ...req.body, email: req.user.email })
    res.status(200).send(newBook)
  } catch (e) {
    res.status(500).send('server error');
  }
}

async function handleDeleteBooks(req, res) {
  const { id } = req.params;

  try {
    const book = await Book.findOne({ _id: id, email: req.params.email });
    if (!book) res.status(400).send('unable to delete book');
    else {
      await Book.findByIdAndDelete(id);
      res.status(204).send('bye book');
    }
  } catch (e) {
    res.status(500).send('server error');
  }
}

async function handlePutBooks(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findOne({ _id: id, email: req.params.email });
    if (!book) res.status(400).send('unable to update book');
    else {
      const updatedBook = await Book.findByIdAndUpdate(id, { ...req.body, email: req.params.email }, { new: true, overwrite: true });
      res.status(200).send(updatedBook);
    }
  } catch (e) {
    res.status(500).send('server error');
  }
}

function handleGetUser(req, res) {
  console.log('Getting the user');
  res.send(req.user);
};


app.listen(PORT, () => console.log(`listening on ${PORT}`));
