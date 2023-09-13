const userdetails = require("../models/user");

const bcrypt = require("bcrypt");

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
    return res.status(409).json({ err: "user already exist" });
  }
};
