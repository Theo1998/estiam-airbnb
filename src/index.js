const express = require('express');

const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const db = require('../config/database');
const passportJWT = require('./middlewares/passportJWT')();
const cityRoutes = require('./routes/city');
const authRoutes = require('./routes/auth');
const placeRoutes = require('./routes/place');

const router = express.Router();

const port = process.env.PORT || 8000;

app.use(morgan('combined'));

app.use(cors());
mongoose.Promise = global.Promise;
mongoose.connect(db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passportJWT.initialize());

app.set('view engine', 'pug');
app.set('views', './views');

router.get('/', (req, res) => {
  res.status(200).send('Welcome to our Airbnb API !');
});

router.use('/city', cityRoutes);
router.use('/auth', authRoutes);
router.use('/place', placeRoutes);

router.use((req, res) => {
  res.status(200).send('<h1> Page not found </h1>');
});

app.use('/api', router);

app.listen(port, () => console.log(`[🚧 server is running on ${port}]`));
