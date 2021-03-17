const express = require('express');

const path = require('path');

const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 80;

const mongoose = require('mongoose');

const dbURI = "mongodb+srv://reacter:TravelApp@custom-cluster.dt2sl.mongodb.net/travel-app?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
  app.listen(PORT, () => {});
});

app.use(cors());

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Server is running...');
    return;
  }
  next();
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const countriesRouter = require('./routes/countries');
app.use('/countries', countriesRouter);

app.use('/images', express.static(path.join(__dirname, 'images')));

const statesRouter = require('./routes/states');
app.use('/states', statesRouter);
