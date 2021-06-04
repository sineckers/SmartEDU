const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoute.js');
const courseRoute = require('./routes/courseRoute.js');
const categoryRoute = require('./routes/categoryRoute');

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

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});