'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/book');

async function seed() {
  const newBook = new Book({
    title: 'The Blade Itself',
    description: 'Grim Dark Fantasy',
    status: true,
    email: 'derek.j.douglas13@gmail.com'
  });

  newBook.save(function(err){
    if (err) console.error(err);
    else console.log('Saved TBI!');
  });

  await Book.create({
    title: 'Words of Radiance',
    description: 'Epic Fantasy Set in the World of Roshar, Sequel to Way of Kings',
    status: true,
    email: 'justinmathieu0@gmail.com'
  });
  console.log('Saved WoR!');
  await Book.create({
    title: 'On Basilisk Station',
    description: 'First novel of the Honor Harrington bookseries',
    status: true,
    email: 'hyena.shenanigans@gmail.com'
  });
  console.log('Saved OBS');
  mongoose.disconnect();
}

seed();
