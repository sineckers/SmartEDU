const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const pageRoute = require('./routes/pageRoute.js');
const courseRoute = require('./routes/courseRoute.js');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
}).then(() => {
  console.log("Database connection succesful.")
})

const app = express();

//Template Engine
app.set('view engine', 'ejs');

global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(
  session({
    secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGOURL }),
  })
);
app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})

//Routes
app.use('*', (req, res, next)=> {
  userIN = req.session.userID;
  next();
})
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});