const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const messages = sequelize.define('messages',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
     },
    message:{
       type: Sequelize.STRING,
    }
})

module.exports = messages;