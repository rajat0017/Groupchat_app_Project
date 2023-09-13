const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
  origin:"http://127.0.0.1:5500",
  methods:['GET','POST']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const sequelize = require('./utils/database');

const userRoutes = require('./routes/userRoute');

app.use(userRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })