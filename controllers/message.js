const messages = require('../models/message');
const User = require('../models/user')

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
        res.status(200).json({ allMessages: Messages });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}