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
const messageRoute = require('./routes/messageRoute');

app.use(userRoutes);
app.use(messageRoute);

const user= require('./models/user');
const message= require('./models/message');

user.hasMany(message);
message.belongsTo(user);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })