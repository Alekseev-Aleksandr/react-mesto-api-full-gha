const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const NotFoundError = require('./errors/NotFoundError');
const { errorLogger, requestLogger } = require('./middlewares/logger');
require('dotenv').config();

const {
  PORT = 4000,
  MONGO_URL = 'mongodb://localhost:27017',
  // FRONT_LINK,
} = process.env;

const options = {
  origin: [
    'http://api.alekseev.nomoreparties.sbs',
    'http://alekseev.nomoreparties.sb.nomoreparties.sbs',
    'https://api.alekseev.nomoreparties.sbs',
    'https://alekseev.nomoreparties.sb.nomoreparties.sbs',
  ],
  allowedHeaders: ['Content-Type', 'origin'],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  preflightContinue: false,
  credentials: true,
};

const app = express();

mongoose.connect(`${MONGO_URL}/mestodb`);

app.use(express.json());

app.use(cors(options));

app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use('*', (req, res, next) => {
  try {
    throw new NotFoundError('404 page not found');
  } catch (err) {
    next(err);
  }
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message || 'Server error' });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`listen ${PORT} port`);
});
