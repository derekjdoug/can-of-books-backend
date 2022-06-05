'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/book');

async function seed() {
  const newBook = new Book({
    title: 'The Blade Itself',
    description: 'Grim Dark Fantasy',
    status: true
  });

  newBook.save(function(err){
    if (err) console.error(err);
    else console.log('Saved TBI!');
  });

  await Book.create({
    title: 'Words of Radiance',
    description: 'Epic Fantasy Set in the World of Roshar, Sequel to Way of Kings',
    status: true
  });
  console.log('Saved WoR!')
  mongoose.disconnect();
}

seed();
