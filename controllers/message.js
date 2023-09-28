const messages = require('../models/message');
const User = require('../models/user')
const Sequelize = require('sequelize');

exports.storeMessage = async (req, res, next)=> {
    try {
        const{message}= req.body;
        await req.user.createMessage({message})
        return res.status(200).json({ message: "message sent succesfully" });
    } catch (err) {
        console.log(err);
    }
}

exports.getMessages = async(req, res, next)=> {
    try {
        const Messages = await messages.findAll();
        
        // const recMesseges = await messages.findAll({
        //     where: {
        //         userId: {
        //             [Sequelize.Op.not]: req.user.id
        //         }
        //     }
        // });
        
        res.status(200).json({ allMessages: Messages, id: req.user.id});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}