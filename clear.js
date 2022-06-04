'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/book');

async function clear() {
  try {
    await Book.deleteMany({});
    console.log('Books Deleted!');
  } catch(error) {
    console.error('Something went wrong when deleting', error);
  } finally {
    mongoose.disconnect();
  }
}
clear();
