const userdetails = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

function validstring(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.adduser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (validstring(name) || validstring(email) || validstring(password)) {
      return res.status(400).json({ err: "bad parameters" });
    }

    if (
      (await userdetails.findOne({ where: { email: email } })) ||
      (await userdetails.findOne({ where: { phone: phone } }))
    ) {
      return res.status(409).json({ err: "user already exist" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      await userdetails.create({ name, email, phone, password: hash });
      res.status(201).json({ meessage: "User created succesfully" });
    });
  } catch (err) {
    return res.status(409).json({ err: "Something went wrong" });
  }
};

exports.generateToken = (id,name)=> {
    return jwt.sign({userId:id, name:name}, process.env.TOKEN_ID)
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userdetails.findAll({ where: { email: email } });
    try {
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    res.status(500).json({ success: false, message: 'something went wrong' })
                }
                if (result == true) {
                    res.status(200).json({ success: true, message: 'user logged in', token: exports.generateToken(user[0].id,user[0].name) })
                }
                else {
                     res.status(400).json({ success: false, message: 'Password is Incorrect' })
                }
            })
        }
        else {
            return res.status(404).json({ error: "User not found" });
        }
    }
    catch (err) {
        console.log(err);
    }
}