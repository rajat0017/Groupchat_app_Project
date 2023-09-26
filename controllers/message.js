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