const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const NotFoundError = require('./errors/NotFoundError');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const cookieParser = require('cookie-parser');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017',
} = process.env;

const app = express();

mongoose.connect(`${MONGO_URL}/mestodb`);

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
  },
));

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

app.listen(PORT, () => { console.log(`listen ${PORT} port`); });
