const users = require('../models/user');
const jwt = require('jsonwebtoken');
const TOKEN = process.env.TOKEN;

async function login(req, res) {
  const user = await req.body;
  const validation = validate(user.email, user.password);
  if (validation.bad === true) {
    res.status(400).json({ message: validation.message });
    return;
  }
  const check = await users.findOne({
    where: { email: user.email },
  });
  if (check === null) {
    res.status(404).json({ message: 'Email not registered' });
  } else {
    jwt.sign({ user }, TOKEN, (err, token) => {
      res.json({ token });
    });
  }
}
function validate(email, password) {
  if (email.length === 0) {
    return { message: 'Email cannot be empty', bad: true };
  }
  const atPos = email.indexOf('@');
  var dotPos = email.lastIndexOf('.');
  if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= email.length) {
    return { message: 'Please enter a valid e-mail address', bad: true };
  }
  if (password.length < 6) {
    return { message: 'Password must be at least 6 characters', bad: true };
  }
  return { bad: false };
}
async function register(req, res, next) {
  try {
    const data = await req.body;
    const check = await users.findOne({
      where: { email: data.email },
    });
    if (check === null) {
      const validation = validate(data.email, data.password);
      if (validation.bad === true) {
        res.status(400).json({ message: validation.message });
        return;
      }
      const newUser = await users.create({
        email: data.email,
        password: data.password,
      });
      res
        .status(201)
        .json({ message: 'User registered successfully', data: newUser });
    } else {
      res.status(409).json({ message: 'Email already registered' });
    }
  } catch (err) {
    next(err);
  }
}

/** Authorization: Bearer <token> */
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader !== undefined) {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = { login, register, verifyToken };
